from odoo import http
from odoo.http import request


class WebsiteCompany(http.Controller):

    @http.route(
        "/company",
        type="http",
        auth="public",
        website=True,
    )
    def company_page(self, **kwargs):
        return request.render(
            "website_company.company_page"
        )