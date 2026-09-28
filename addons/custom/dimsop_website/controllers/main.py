# -*- coding: utf-8 -*-
# Copyright 2026 Dimsop

import base64
import logging
import os
import re
import threading
import time
from collections import deque

from werkzeug.utils import secure_filename

from odoo import http, models
from odoo.http import request

_logger = logging.getLogger(__name__)

# Valores válidos del selection service_of_interest (models/crm_lead.py)
VALID_SERVICES = {'cloud', 'network', 'security', 'managed', 'fttx_isp',
                  'unified', 'ia', 'other'}

# --- Límites de inputs (seguridad: rechaza/trunca payloads gigantes) ---
_MAX_LEN = {
    'name': 200, 'email': 254, 'phone': 40, 'company': 200,
    'position': 200, 'profession': 200, 'city': 200, 'otro': 1000,
}
_EMAIL_RE = re.compile(r'[^@\s]+@[^@\s]+\.[A-Za-z]{2,}')


def _clip(value, key):
    """Trunca y normaliza un campo de texto según su límite."""
    return str(value or '').strip()[:_MAX_LEN[key]]


def _valid_email(value):
    return bool(_EMAIL_RE.fullmatch(value))


# --- Validación server-side del upload de CV ---
ALLOWED_CV_EXT = {'.pdf', '.doc', '.docx'}
MAX_CV_SIZE = 5 * 1024 * 1024  # 5 MB
_MAGIC_OLE = b'\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1'  # .doc (OLE2)


def _validate_cv(upload):
    """Valida el CV subido (extensión, tamaño, magic bytes, nombre seguro).

    Devuelve (data, filename, error); error truthy => archivo rechazado.
    """
    if not upload or not upload.filename:
        return False, False, None
    ext = os.path.splitext(upload.filename)[1].lower()
    if ext not in ALLOWED_CV_EXT:
        return None, None, 'ext'
    data = upload.read(MAX_CV_SIZE + 1)
    if not data:
        return None, None, 'empty'
    if len(data) > MAX_CV_SIZE:
        return None, None, 'size'
    head = data[:1024]
    if ext == '.pdf':
        ok = b'%PDF' in head
    elif ext == '.docx':
        ok = head.startswith(b'PK')
    else:  # .doc
        ok = head.startswith(_MAGIC_OLE)
    if not ok:
        return None, None, 'magic'
    safe_name = secure_filename(upload.filename)
    return data, (safe_name or 'cv' + ext), None


# --- Rate-limit en memoria por IP ---
# Ventana deslizante: RATE_LIMIT_MAX envíos cada RATE_LIMIT_WINDOW segundos.
# Nota: en producción multi-worker la capa primaria será nginx
# (ver checklist de migración); esto es defensa en profundidad.
RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW = 600  # 10 minutos
_rate_lock = threading.Lock()
_rate_hits = {}  # ip -> deque[float timestamps]


def _rate_limited(ip):
    now = time.monotonic()
    with _rate_lock:
        hits = _rate_hits.setdefault(ip, deque())
        while hits and now - hits[0] > RATE_LIMIT_WINDOW:
            hits.popleft()
        if len(hits) >= RATE_LIMIT_MAX:
            return True
        hits.append(now)
        if len(_rate_hits) > 10000:
            stale = [k for k, v in _rate_hits.items()
                     if not v or now - v[-1] > RATE_LIMIT_WINDOW]
            for k in stale:
                del _rate_hits[k]
        return False


def _honeypot_triggered(kw):
    """True si el campo oculto anti-bots fue rellenado."""
    return bool(str(kw.get('homepage') or '').strip())


class WebsiteDimsop(http.Controller):

    @http.route('/', type='http', auth='public', website=True)
    def home(self, **kw):
        blog_posts = request.env['blog.post'].sudo().search(
            [('is_published', '=', True)],
            order='published_date desc',
            limit=3
        )
        return request.render('website.inicio-dimsop-soluciones-tic-de-vanguardia', {
            'blog_posts': blog_posts,
        })


class WebsiteContact(http.Controller):

    @http.route('/dimsop/contacto', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def dimsop_contacto(self, **kw):
        """Crea un lead (crm.lead) desde el formulario de contacto de la sección 12.

        Requeridos (según decisión de diseño): nombre y correo.
        Redirige siempre a la home con query string + ancla #contacto,
        donde el template muestra el banner de éxito/error.
        """
        ip = request.httprequest.remote_addr or 'unknown'

        if _rate_limited(ip):
            _logger.warning("Dimsop: rate-limit alcanzado en /dimsop/contacto (ip=%s)", ip)
            return request.redirect('/?error=limite#contacto')

        # Honeypot: los bots rellenan el campo oculto -> falso éxito sin crear nada
        if _honeypot_triggered(kw):
            _logger.warning("Dimsop: honeypot activado en /dimsop/contacto (ip=%s)", ip)
            return request.redirect('/?mensaje=enviado#contacto')

        partner_name = _clip(kw.get('nombre') or kw.get('name'), 'name')
        email = _clip(kw.get('correo') or kw.get('email'), 'email')
        phone = _clip(kw.get('telefono') or kw.get('phone'), 'phone')
        company = _clip(kw.get('empresa'), 'company')
        position = _clip(kw.get('cargo'), 'position')
        service = kw.get('servicio_interes')
        otro_motivo = _clip(kw.get('otro_motivo'), 'otro')

        if not partner_name or not _valid_email(email):
            return request.redirect('/?error=datos_incompletos#contacto')

        if service not in VALID_SERVICES:
            service = False

        try:
            description = False
            if otro_motivo:
                description = f'Motivo de contacto (Otro): {otro_motivo}'

            request.env['crm.lead'].sudo().create({
                'name': f'{partner_name} - {company}' if company else partner_name,
                'partner_name': partner_name,
                'contact_name': partner_name,
                'email_from': email,
                'phone': phone or False,
                'company_contact': company or False,
                'job_position': position or False,
                'service_of_interest': service,
                'description': description,
                'type': 'lead',
            })
        except Exception:
            _logger.exception("Dimsop: no se pudo crear el lead del formulario de contacto")
            request.env.cr.rollback()
            return request.redirect('/?error=datos_incompletos#contacto')

        return request.redirect('/?mensaje=enviado#contacto')


class WebsiteCarreras(http.Controller):

    @http.route('/dimsop/postularme', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def dimsop_postularme(self, **kw):
        """Crea una postulación (dimsop.job.application) desde el modal 'Forma parte de nuestro equipo'.

        Requeridos: nombre y correo.
        Acepta archivo CV via multipart/form-data con validación server-side
        (extensión, tamaño máximo 5MB, magic bytes).
        Redirige a la home con query string #footer para mostrar mensaje de éxito.
        """
        ip = request.httprequest.remote_addr or 'unknown'

        if _rate_limited(ip):
            _logger.warning("Dimsop: rate-limit alcanzado en /dimsop/postularme (ip=%s)", ip)
            return request.redirect('/?error=limite#footer')

        if _honeypot_triggered(kw):
            _logger.warning("Dimsop: honeypot activado en /dimsop/postularme (ip=%s)", ip)
            return request.redirect('/?postulacion=enviada#footer')

        name = _clip(kw.get('name'), 'name')
        email = _clip(kw.get('email'), 'email')
        phone = _clip(kw.get('phone'), 'phone')
        profession = _clip(kw.get('profession'), 'profession')
        city = _clip(kw.get('city'), 'city')

        if not name or not _valid_email(email):
            return request.redirect('/?error=postulacion_incompleta#footer')

        cv_upload = request.httprequest.files.get('cv')
        cv_file, cv_filename, cv_error = _validate_cv(cv_upload)
        if cv_error:
            _logger.warning("Dimsop: CV rechazado (%s, ip=%s)", cv_error, ip)
            return request.redirect('/?error=cv_invalido#footer')

        try:
            request.env['dimsop.job.application'].sudo().create({
                'name': name,
                'email': email,
                'phone': phone or False,
                'profession': profession or False,
                'city': city or False,
                'cv_file': base64.b64encode(cv_file) if cv_file else False,
                'cv_filename': cv_filename or False,
            })
        except Exception:
            _logger.exception("Dimsop: no se pudo crear la postulación")
            request.env.cr.rollback()
            return request.redirect('/?error=postulacion_incompleta#footer')

        return request.redirect('/?postulacion=enviada#footer')


class IrHttp(models.AbstractModel):
    """Headers de seguridad globales en toda respuesta HTTP."""
    _inherit = 'ir.http'

    @classmethod
    def _post_dispatch(cls, response):
        super()._post_dispatch(response)
        headers = response.headers
        # setdefault: no pisa headers que Odoo ya envía (p.ej. login usa DENY)
        headers.setdefault('X-Frame-Options', 'SAMEORIGIN')
        headers.setdefault('Referrer-Policy', 'strict-origin-when-cross-origin')
        headers.setdefault('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
        if str(headers.get('Content-Type') or '').startswith('text/html'):
            headers.setdefault('Content-Security-Policy', "frame-ancestors 'self'")
