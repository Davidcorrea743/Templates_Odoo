# -*- coding: utf-8 -*-
# Copyright 2026 Dimsop

from odoo import fields, models


class CrmLead(models.Model):
    _inherit = 'crm.lead'

    # Campos extra solicitados en el formulario de contacto (sección 12 del documento)
    company_contact = fields.Char(string='Empresa')
    job_position = fields.Char(string='Cargo')
    service_of_interest = fields.Selection(
        selection=[
            ('cloud', 'Soluciones en la Nube'),
            ('network', 'Redes'),
            ('security', 'Ciberseguridad'),
            ('managed', 'Servicios Gestionados'),
            ('fttx_isp', 'FTTX/ISP'),
            ('unified', 'Comunicaciones Unificadas'),
            ('other', 'Otro'),
        ],
        string='Servicio de Interés',
    )
