# -*- coding: utf-8 -*-
# Copyright 2026 Dimsop

from odoo import fields, models


class JobApplication(models.Model):
    _name = 'dimsop.job.application'
    _description = 'Postulación - Forma parte de nuestro equipo'
    _order = 'create_date desc'

    name = fields.Char(string='Nombre y Apellido', required=True, size=200)
    phone = fields.Char(string='Teléfono', size=40)
    email = fields.Char(string='Correo Electrónico', required=True, size=254)
    profession = fields.Char(string='Profesión', size=200)
    city = fields.Char(string='Ciudad de Residencia', size=200)
    cv_file = fields.Binary(string='Archivo CV', attachment=True)
    cv_filename = fields.Char(string='Nombre del Archivo', size=255)
    state = fields.Selection(
        selection=[
            ('draft', 'Recibida'),
            ('reviewed', 'En revisión'),
            ('hired', 'Contratada'),
        ],
        string='Estado',
        default='draft',
    )
