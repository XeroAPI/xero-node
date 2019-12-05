import { AccountingAPIClient } from '../../AccountingAPIClient';
import { createSingleInvoiceRequest } from '../request-body/invoice.request.examples';

const inMemoryCache: {
	accountId?: string,
	bankTransferId?: string,
	contactGroupId?: string,
	contactId?: string,
	contactIdInContactGroup?: string,
	employeeId?: string,
	expenseClaimId?: string,
	invoiceId?: string,
	itemId?: string,
	manualJournalId?: string,
	paymentId?: string,
	purchaseOrderId?: string,
	receiptId?: string,
	userId?: string,
} = {};

export async function getOrCreateAccountId(xero: AccountingAPIClient, args?: any) {
	if (!inMemoryCache.accountId || args) {
		let response = await xero.accounts.get(args);
		if (response.Accounts.length <= 0) {
			response = await xero.accounts.create({ Name: 'Sid BANK test', Code: 100000, Type: 'BANK', BankAccountNumber: '00-12345-678-00' });
		}
		inMemoryCache.accountId = response.Accounts[0].AccountID;
	}
	return inMemoryCache.accountId;
}

export async function getOrCreateBankTransferId(xero: AccountingAPIClient) {
	if (!inMemoryCache.bankTransferId) {
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
		inMemoryCache.bankTransferId = response.BankTransfers[0].BankTransferID;
	}
	return inMemoryCache.bankTransferId;
}

export async function getOrCreateContactGroupId(xero: AccountingAPIClient, useCache: boolean = true) {
	if (!inMemoryCache.contactGroupId || !useCache) {
		let response = await xero.contactGroups.get();
		if (response.ContactGroups.length <= 0) {
			response = await xero.contactGroups.create({ Name: 'xero-node test' });
		}
		const contactGroupId = response.ContactGroups[0].ContactGroupID;
		if (!useCache) {
			return contactGroupId;
		} else {
			inMemoryCache.contactGroupId = contactGroupId;
		}
	}
	return inMemoryCache.contactGroupId;
}

export async function getOrCreateContactId(xero: AccountingAPIClient) {
	if (!inMemoryCache.contactId) {
		let response = await xero.contacts.get();
		if (response.Contacts.length <= 0) {
			response = await xero.contacts.create({ FirstName: 'xero-node test', LastName: 'Tee' + Date.now() });
		}
		inMemoryCache.contactId = response.Contacts[0].ContactID;
	}
	return inMemoryCache.contactId;
}

export async function getOrCreateContactIdInContactGroup(xero: AccountingAPIClient, contactGroupId: string) {
	if (!inMemoryCache.contactIdInContactGroup) {
		const getResponse = await xero.contactGroups.get({ ContactGroupID: contactGroupId });
		if (getResponse.ContactGroups[0].Contacts.length <= 0) {
			const contactId = await getOrCreateContactId(xero);
			const createResponse = await xero.contactGroups.contacts.create({ ContactID: contactId }, { ContactGroupID: contactGroupId });
			inMemoryCache.contactIdInContactGroup = createResponse.Contacts[0].ContactID;
		} else {
			inMemoryCache.contactIdInContactGroup = getResponse.ContactGroups[0].Contacts[0].ContactID;
		}
	}
	return inMemoryCache.contactIdInContactGroup;
}

export async function getOrCreateEmployeeId(xero: AccountingAPIClient) {
	if (!inMemoryCache.employeeId) {
		let response = await xero.employees.get();
		if (response.Employees.length <= 0) {
			response = await xero.employees.create({ FirstName: 'Bryan', LastName: 'Dubb-liu' });
		}
		inMemoryCache.employeeId = response.Employees[0].EmployeeID;
	}
	return inMemoryCache.employeeId;
}

export async function getOrCreateExpenseClaimId(xero: AccountingAPIClient) {
	if (!inMemoryCache.expenseClaimId) {
		let response = await xero.expenseClaims.get();
		if (response.ExpenseClaims.length <= 0) {
			response = await xero.expenseClaims.create({ AmountDue: 1 });
		}
		inMemoryCache.expenseClaimId = response.ExpenseClaims[0].ExpenseClaimID;
	}
	return inMemoryCache.expenseClaimId;
}

export async function getOrCreateInvoiceId(xero: AccountingAPIClient) {
	if (!inMemoryCache.invoiceId) {
		let response = await xero.invoices.get();
		if (response.Invoices.length <= 0) {
			response = await xero.invoices.create(createSingleInvoiceRequest);
		}
		inMemoryCache.invoiceId = response.Invoices[0].InvoiceID;
	}
	return inMemoryCache.invoiceId;
}

export async function getOrCreatePurchaseOrderId(xero: AccountingAPIClient) {
	if (!inMemoryCache.purchaseOrderId) {
		const contactId = await getOrCreateContactId(xero);
		const response = await xero.purchaseOrders.create({
			Contact: { ContactID: contactId },
			Date: '2015-11-30',
			DeliveryDate: '2015-12-20',
			LineAmountTypes: 'Exclusive',
			LineItems: [
				{
					Description: 'Office Chairs',
					Quantity: 5.0000,
					UnitAmount: 120.00
				}
			]
		});

		inMemoryCache.purchaseOrderId = response.PurchaseOrders[0].PurchaseOrderID;
	}
	return inMemoryCache.purchaseOrderId;
}

export async function getOrCreateItemId(xero: AccountingAPIClient) {
	if (!inMemoryCache.itemId) {
		let response = await xero.items.get();
		if (response.Items.length <= 0) {
			response = await xero.items.create({ Code: 'Item-1' });
		}
		inMemoryCache.itemId = response.Items[0].ItemID;
	}
	return inMemoryCache.itemId;
}

export async function getOrCreateManualJournalId(xero: AccountingAPIClient) {
	if (!inMemoryCache.manualJournalId) {
		let response = await xero.manualJournals.get();
		if (response.ManualJournals.length <= 0) {
			response = await xero.manualJournals.create({
				Narration: 'Tea for the DevX Pirates',
				JournalLines: []
			});
		}
		inMemoryCache.manualJournalId = response.ManualJournals[0].ManualJournalID;
	}
	return inMemoryCache.manualJournalId;
}

export async function getOrCreatePaymentId(xero: AccountingAPIClient) {
	if (!inMemoryCache.paymentId) {
		let response = await xero.payments.get();
		if (response.Payments.length <= 0) {
			response = await xero.payments.create({
				Invoice: { InvoiceID: await getOrCreateInvoiceId(xero) },
				Account: { AccountID: await getOrCreateAccountId(xero) },
				Amount: 123
			});
		}
		inMemoryCache.paymentId = response.Payments[0].PaymentID;
	}
	return inMemoryCache.paymentId;
}

export async function getOrCreateReceiptId(xero: AccountingAPIClient) {
	if (!inMemoryCache.receiptId) {
		let response = await xero.receipts.get();
		if (response.Receipts.length <= 0) {
			response = await xero.receipts.create({
				Date: '2018-03-22',
				Contact: { ContactID: await getOrCreateContactId(xero) },
				LineItems: [
					{
						Description: 'Coffee with client to discuss support contract',
						UnitAmount: 13.80,
						AccountCode: '420'
					}
				],
				User: { UserID: await getOrCreateUserId(xero) }
			});
		}
		inMemoryCache.receiptId = response.Receipts[0].ReceiptID;
	}
	return inMemoryCache.receiptId;
}

export async function getOrCreateUserId(xero: AccountingAPIClient) {
	if (!inMemoryCache.userId) {
		const response = await xero.users.get();
		if (response.Users.length <= 0) {
			throw new Error('No users available');
		}
		inMemoryCache.userId = response.Users[0].UserID;
	}
	return inMemoryCache.userId;
}
