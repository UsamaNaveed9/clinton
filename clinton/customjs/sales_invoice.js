
frappe.ui.form.on("Sales Invoice", {
    refresh: function(frm) {
		if(frm.doc.docstatus === 1 && frm.doc.status !== 'Paid') {
			frm.add_custom_button(__('Create Paid by Cheque'), () => {
				frappe.model.open_mapped_doc({
					method: "clinton.custompy.sales_invoice.make_paid_by_cheque",
					frm: cur_frm
				})
			});
		}
	},
});
