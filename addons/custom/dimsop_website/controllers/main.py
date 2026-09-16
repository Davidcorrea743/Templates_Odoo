# -*- coding: utf-8 -*-
# Copyright 2026 Dimsop

import logging

from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)

# Valores válidos del selection service_of_interest (models/crm_lead.py)
VALID_SERVICES = {'cloud', 'network', 'security', 'managed', 'fttx_isp', 'unified', 'other'}


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
        partner_name = (kw.get('name') or kw.get('nombre') or '').strip()
        email = (kw.get('email') or kw.get('correo') or '').strip()
        phone = (kw.get('phone') or kw.get('telefono') or '').strip()
        company = (kw.get('empresa') or '').strip()
        position = (kw.get('cargo') or '').strip()
        service = kw.get('servicio_interes')
        otro_motivo = (kw.get('otro_motivo') or '').strip()

        if not partner_name or not email or '@' not in email:
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
            return request.redirect('/?error=datos_incompletos#contacto')

        return request.redirect('/?mensaje=enviado#contacto')


class WebsiteCarreras(http.Controller):

    @http.route('/dimsop/postularme', type='http', auth='public', website=True, methods=['POST'], csrf=True)
    def dimsop_postularme(self, **kw):
        """Crea una postulación (dimsop.job.application) desde el modal 'Forma parte de nuestro equipo'.

        Requeridos: nombre y correo.
        Acepta archivo CV via multipart/form-data.
        Redirige a la home con query string #footer para mostrar mensaje de éxito.
        """
        name = (kw.get('name') or '').strip()
        email = (kw.get('email') or '').strip()
        phone = (kw.get('phone') or '').strip()
        profession = (kw.get('profession') or '').strip()
        city = (kw.get('city') or '').strip()

        if not name or not email or '@' not in email:
            return request.redirect('/?error=postulacion_incompleta#footer')

        cv_file = False
        cv_filename = False
        cv_upload = request.httprequest.files.get('cv')
        if cv_upload and cv_upload.filename:
            cv_file = cv_upload.read()
            cv_filename = cv_upload.filename

        try:
            request.env['dimsop.job.application'].sudo().create({
                'name': name,
                'email': email,
                'phone': phone or False,
                'profession': profession or False,
                'city': city or False,
                'cv_file': cv_file or False,
                'cv_filename': cv_filename or False,
            })
        except Exception:
            _logger.exception("Dimsop: no se pudo crear la postulación")
            return request.redirect('/?error=postulacion_incompleta#footer')

        return request.redirect('/?postulacion=enviada#footer')
