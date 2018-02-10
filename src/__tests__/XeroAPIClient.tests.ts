import { AccountingResponse, Invoice, ContactGroups } from '../interfaces/AccountingResponse';
import { XeroAPIClient } from '../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { InMemoryOAuthClient } from './InMenoryOAuthClient';
import { multipleInvoices } from './invoice.response.examples';
import { isUUID } from './test-helpers';
import { allContactGroups } from './contactgroups.response.examples';

describe('/invoices', () => {
	describe('and GETing', () => {
		describe('multiple invoices', () => {
			let result: AccountingResponse<Invoice>;

			beforeAll(async () => {

				const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
				const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

				const inMemoryOAuthClient = new InMemoryOAuthClient();
				inMemoryOAuthClient.returnsWithNextGet(multipleInvoices);

				const xeroClient = new XeroAPIClient({
					appType: 'private',
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
					privateKey: privateKey
				}, inMemoryOAuthClient);

				result = await xeroClient.invoices.get();
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

			it('matches the expected response', async () => {
				expect(result).toMatchObject(multipleInvoices);
			});
		});

	});
});

describe('/contactgroups', () => {
	describe('and GETing', () => {
		describe('all contact groups', () => {
			let result: AccountingResponse<ContactGroups>;

			beforeAll(async () => {

				const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
				const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

				const inMemoryOAuthClient = new InMemoryOAuthClient();
				inMemoryOAuthClient.returnsWithNextGet(allContactGroups);

				const xeroClient = new XeroAPIClient({
					appType: 'private',
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
					privateKey: privateKey
				}, inMemoryOAuthClient);

				result = await xeroClient.contactgroups.get();
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('matches the expected response', async () => {
				expect(result).toMatchObject(allContactGroups);
			});
		});

	});
});
