from odoo import fields, api, models

class ResUsers(models.Model):
    _inherit='res.users'

    national_id = fields.Char(string="National ID")
    crNumber = fields.Char(string="CR Number")
    crName = fields.Char(string="CR Name")
