
import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { AccountingResponse, Invoice, ContactGroup } from '../../interfaces/AccountingResponse';
import { isUUID } from '../test-helpers';
import { createInvoiceRequest } from '../unit/response-examples/invoice.request.examples';

const privateKeyFile = path.resolve('C:\\keys\\privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const xero = new XeroAPIClient({
	appType: 'private',
	consumerKey: 'I5Y2QCJQA5GOHXCXEC9ZOMNHK8FMUE',
	consumerSecret: 'BTONRDFRULI7WSDNFWVTARWNOSPRUC',
	privateKey: privateKey
});

describe('phils integration tests', () => {
	describe('/invoices', () => {
		describe('and GETing', () => {
			describe.skip('a single invoice as PDF', () => {
				let result: AccountingResponse<Invoice>;

				beforeAll(async () => {
					const invoice = await xero.invoices.create(createInvoiceRequest);
					result = await xero.invoices.get({ InvoiceId: invoice.Invoices[0].InvoiceID, contentType: 'application/json'  });
					// TODO: OR
					// result = await xero.invoices.get({ InvoiceId: '0e64a623-c2a1-446a-93ed-eb897f118cbc' }, { 'content-type': 'application/json' });
					// TODO: OR
					// result = await xero.invoices.get({ InvoiceId: '0e64a623-c2a1-446a-93ed-eb897f118cbc', contentType: 'application/json' });
					// TODO: OR
					// result = await xero.invoices.get({ InvoiceId: '0e64a623-c2a1-446a-93ed-eb897f118cbc'}, { headers = [{contentType: 'application/json'}] });
				});

				it('the invoice is defined', () => {
					expect(result).not.toBeNull();
				});

				it('invoice.Id is a Guid and is actually the Id of the request', async () => {
					expect(isUUID(result.Id)).toBeTruthy();
				});

				it('invoice[0].InvoiceID is a Guid', async () => {
					expect(isUUID(result.Invoices[0].InvoiceID)).toBeTruthy();
				});
			});

			describe('a single invoices', () => {
				let result: AccountingResponse<Invoice>;

				beforeAll(async () => {
					const invoice = await xero.invoices.create(createInvoiceRequest);

					result = await xero.invoices.get({ InvoiceId: invoice.Invoices[0].InvoiceID });
				});

				it('the invoice is defined', () => {
					expect(result).not.toBeNull();
				});

				it('invoice.Id is a Guid and is actually the Id of the request', async () => {
					expect(isUUID(result.Id)).toBeTruthy();
				});

				it('invoice[0].InvoiceID is a Guid', async () => {
					expect(isUUID(result.Invoices[0].InvoiceID)).toBeTruthy();
				});
			});

			describe('multiple invoices', () => {
				let result: AccountingResponse<Invoice>;

				beforeAll(async () => {
					result = await xero.invoices.get();
				});

				it('the response is defined', () => {
					expect(result).not.toBeNull();
				});

				it('response.Id is a Guid and is actually the Id of the request', async () => {
					expect(isUUID(result.Id)).toBeTruthy();
				});

				it('there is more than one invoice', async () => {
					expect(result.Invoices.length).toBeGreaterThan(1);
				});
			});

		});

	});

	describe('/contactgroups', () => {

		describe('and GETing', () => {

			describe('all ContactGroups', () => {
				let result: AccountingResponse<ContactGroup>;

				beforeAll(async () => {
					result = await xero.contactgroups.get();
				});

				it('the response is defined', () => {
					expect(result).not.toBeNull();
				});

				it('response.Id is a Guid and is actually the Id of the request', async () => {
					expect(isUUID(result.Id)).toBeTruthy();
				});

				it('contactgroups has a length greater than 0', async () => {
					expect(result.ContactGroups.length).toBeGreaterThan(0);
				});
			});

			describe('and Creating and Getting', () => {

				let result: AccountingResponse<ContactGroup> = null;
				const uniqueName = 'NewContactGroup' + new Date().getTime();

				beforeAll(async () => {
					const contactGroup: ContactGroup = {
						Name: uniqueName,
						Status: 'ACTIVE'
					};

					result = await xero.contactgroups.create(contactGroup);
				});

				it('can be retrieved', async () => {
					const id = result.ContactGroups[0].ContactGroupID;
					const response = await xero.contactgroups.get({ ContactGroupID: id });
					expect(response.ContactGroups[0].Name).toBe(uniqueName);
				});

				it('result is defined', () => {
					expect(result).not.toBeNull();
				});

				it('we have a new ContactGroupID', () => {
					expect(isUUID(result.ContactGroups[0].ContactGroupID)).toBeTruthy();
				});

				it('404 throws and error as expected when contactgoup does not exist', async () => {
					// TODO: Add contact to group
					expect.assertions(2);

					try {
						const getResult = await xero.contactgroups.get({ ContactGroupID: 'b780e528-57f5-4fd1-83c1-b82e4990fc01' }); // Is randome guid
					} catch (error) {
						expect(error.statusCode).toBe(404);
						expect(error.body).toBe('The resource you\'re looking for cannot be found');
					}
				});

				it('when deleted, then all contacts are gone', async () => {
					// TODO: Add contact to group
					const id = result.ContactGroups[0].ContactGroupID;

					const deleteResult = await xero.contactgroups.delete({ ContactGroupID: id });
					// TODO: What do we want the delete result to be?
					expect(deleteResult).toBeNull();

					const getResult = await xero.contactgroups.get({ ContactGroupID: id });
					expect(getResult.ContactGroups[0].Contacts.length).toBe(0);
				});
			});

		});

	});
});
