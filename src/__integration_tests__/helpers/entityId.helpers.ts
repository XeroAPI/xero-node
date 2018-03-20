import { AccountingAPIClient } from '../../AccountingAPIClient';
import { createSingleInvoiceRequest } from '../request-body/invoice.request.examples';

export async function getOrCreateInvoiceId(xero: AccountingAPIClient) {
	let response = await xero.invoices.get();
	if (response.Invoices.length <= 0) {
		response = await xero.invoices.create(createSingleInvoiceRequest);
	}
	return response.Invoices[0].InvoiceID;
}
export async function getOrCreateAccountId(xero: AccountingAPIClient, args?: any) {
	let response = await xero.accounts.get(args);
	if (response.Accounts.length <= 0) {
		response = await xero.accounts.create({ Name: 'AmyTest', Code: 200, Type: 'BANK', BankAccountNumber: '00-12345-678-00' });
	}
	return response.Accounts[0].AccountID;
}

export async function getOrCreateBankTransferId(xero: AccountingAPIClient) {
	let response = await xero.bankTransfers.get();
	if (response.BankTransfers.length <= 0) {
		const fromAccountId = await getOrCreateAccountId(xero, { where: 'Type=="BANK"' });
		const toAccountId = await getOrCreateAccountId(xero, { where: `Type=="BANK"&&AccountID!=GUID("${fromAccountId}")` });
		response = await xero.bankTransfers.create({
			FromBankAccount: { AccountID: fromAccountId },
			ToBankAccount: { AccountID: toAccountId },
			Amount: 123
		});
	}
	return response.BankTransfers[0].BankTransferID;
}

export async function getOrCreateContactGroupId(xero: AccountingAPIClient) {
	let response = await xero.contactgroups.get();
	if (response.ContactGroups.length <= 0) {
		response = await xero.contactgroups.create({ Name: 'xero-node test' });
	}
	return response.ContactGroups[0].ContactGroupID;
}

export async function getOrCreateContactId(xero: AccountingAPIClient) {
	let response = await xero.contacts.get();
	if (response.Contacts.length <= 0) {
		response = await xero.contacts.create({ FirstName: 'xero-node test', LastName: 'Tee' + Date.now() });
	}
	return response.Contacts[0].ContactID;
}

export async function getOrCreateContactIdInContactGroup(xero: AccountingAPIClient, contactGroupId: string) {
	const getResponse = await xero.contactgroups.get({ ContactGroupID: contactGroupId });
	if (getResponse.ContactGroups[0].Contacts.length <= 0) {
		const contactId = await getOrCreateContactId(xero);
		const createResponse = await xero.contactgroups.contacts.create({ ContactID: contactId }, { ContactGroupID: contactGroupId });
		return createResponse.Contacts[0].ContactID;
	} else {
		return getResponse.ContactGroups[0].Contacts[0].ContactID;
	}
}

export async function getOrCreateEmployeeId(xero: AccountingAPIClient) {
	let response = await xero.employees.get();
	if (response.Employees.length <= 0) {
		response = await xero.employees.create({ FirstName: 'Bryan', LastName: 'Dubb-liu' });
	}
	return response.Employees[0].EmployeeID;
}

export async function getOrCreateExpenseClaimId(xero: AccountingAPIClient) {
	let response = await xero.expenseclaims.get();
	if (response.ExpenseClaims.length <= 0) {
		response = await xero.expenseclaims.create({ AmountDue: 1 });
	}
	return response.ExpenseClaims[0].ExpenseClaimID;
}
