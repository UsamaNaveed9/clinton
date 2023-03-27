from __future__ import unicode_literals

import json

import frappe
import frappe.utils
from frappe import _
from frappe.model.mapper import get_mapped_doc
from frappe.utils import add_days, cint, cstr, flt, get_link_to_form, getdate, nowdate, strip_html
from six import string_types


@frappe.whitelist()
def make_paid_by_cheque(source_name, target_doc=None, ignore_permissions=False):
	if not frappe.db.exists("Paid by Cheque", {"sales_invoice": source_name}):
		mapping = {
			"name": "sales_invoice",
			"posting_date": "posting_date",
			"customer": "customer",
			"amount": "grand_total"
		}
		doclist = get_mapped_doc("Sales Invoice", source_name, {
			"Sales Invoice": {
				"doctype": "Paid by Cheque",
				"field_map": {
					"sales_invoice": "name"
				}
			}
		}, target_doc, ignore_permissions=ignore_permissions)
	else:
		frappe.throw(_("Paid by Cheque already created of this Sales Invoice"))    


	return doclist