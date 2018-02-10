
import { XeroAPIClient } from '../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { AccountingResponse, ContactGroups, Invoice } from '../interfaces/AccountingResponse';
import { isUUID } from './test-helpers';

const privateKeyFile = path.resolve('C:\\keys\\privatekey.pem');
const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

const xero = new XeroAPIClient({
	appType: 'private',
	consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
	consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
	privateKey: privateKey
});

describe('/invoices', () => {
	describe('and GETing', () => {
		describe('a single invoices', () => {
			let result: AccountingResponse<Invoice>;

			beforeAll(async () => {
				result = await xero.invoices.get({ InvoiceId: '0e64a623-c2a1-446a-93ed-eb897f118cbc' });
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
			let result: AccountingResponse<ContactGroups>;

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

		describe('a single ContactGroup', () => {
			let result: AccountingResponse<ContactGroups>;

			beforeAll(async () => {
				result = await xero.contactgroups.get({ ContactGroupId: 'fb64fc23-d0f4-4236-a031-709d391df9e4' });
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('response.Id is a Guid and is actually the Id of the request', async () => {
				expect(isUUID(result.Id)).toBeTruthy();
			});

			it('contactgroups has a length of 1', async () => {
				expect(result.ContactGroups.length).toBe(1);
			});

			it('it has the name New Contacts 0.5082412871686646', async () => {
				expect(result.ContactGroups[0].Name).toBe('New Contacts 0.5082412871686646');
			});

			it('it has 2 contacts', async () => {
				expect(result.ContactGroups[0].Contacts.length).toBe(2);
			});

			it('first contact is call 123 Collins', async () => {
				expect(result.ContactGroups[0].Contacts[0].Name).toBe('132 Collins');
			});
		});
	});

});
