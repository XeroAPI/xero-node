import { AccountingAPIClient } from '../../AccountingAPIClient';
import { createSingleInvoiceRequest } from '../request-body/invoice.request.examples';

export async function getOrCreateInvoiceId(xero: AccountingAPIClient) {
	let response = await xero.invoices.get();
	if (response.Invoices.length <= 0) {
		response = await xero.invoices.create(createSingleInvoiceRequest);
	}
	return response.Invoices[0].InvoiceID;
}

export async function getOrCreateContactGroupId(xero: AccountingAPIClient) {
	let response = await xero.contactgroups.get();
	if (response.ContactGroups.length <= 0) {
		response = await xero.contactgroups.create({ Name: 'xero-node test' });
	}
	const id = response.ContactGroups[0].ContactGroupID;
	return id;
}
