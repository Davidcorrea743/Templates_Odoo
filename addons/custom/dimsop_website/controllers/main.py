# -*- coding: utf-8 -*-
# Copyright 2026 Dimsop

import logging

from odoo import http
from odoo.http import request

_logger = logging.getLogger(__name__)

# Valores válidos del selection service_of_interest (models/crm_lead.py)
VALID_SERVICES = {'cloud', 'network', 'security', 'managed', 'fttx_isp', 'unified', 'other'}


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

        if not partner_name or not email or '@' not in email:
            return request.redirect('/?error=datos_incompletos#contacto')

        if service not in VALID_SERVICES:
            service = False

        try:
            request.env['crm.lead'].sudo().create({
                'name': f'{partner_name} - {company}' if company else partner_name,
                'partner_name': partner_name,
                'contact_name': partner_name,
                'email_from': email,
                'phone': phone or False,
                'company_contact': company or False,
                'job_position': position or False,
                'service_of_interest': service,
                'type': 'lead',
            })
        except Exception:
            _logger.exception("Dimsop: no se pudo crear el lead del formulario de contacto")
            return request.redirect('/?error=datos_incompletos#contacto')

        return request.redirect('/?mensaje=enviado#contacto')
