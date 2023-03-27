// Copyright (c) 2023, usama and contributors
// For license information, please see license.txt

frappe.ui.form.on('Paid by Cheque', {
	onload: function(frm) {
		if(frm.doc.sales_invoice){
			frappe.call({
                method: "frappe.client.get",
                args: {
                    doctype: "Sales Invoice",
                    name: frm.doc.sales_invoice,
                },
                callback(r) {
                    if(r.message) {
                        var d = r.message;
                        frm.clear_table("reference_sales_invoice");
							let r_add = cur_frm.add_child("reference_sales_invoice");
							r_add.sales_invoice = d.name;
							r_add.posting_date = d.posting_date;
							r_add.customer = d.customer;
							r_add.amount = d.grand_total;
							cur_frm.refresh_field("reference_sales_invoice");
                        // frm.refresh();
                    }
                }
            });
		}

	}
});
