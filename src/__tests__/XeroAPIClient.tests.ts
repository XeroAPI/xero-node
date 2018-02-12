import { AccountingResponse, Invoice, ContactGroup } from '../interfaces/AccountingResponse';
import { XeroAPIClient } from '../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { InMemoryOAuthClient } from './InMenoryOAuthClient';
import { multipleInvoices } from './invoice.response.examples';
import { isUUID } from './test-helpers';
import { allContactGroups, createResponse } from './contactgroups.response.examples';

describe('/invoices', () => {
	describe('and getting', () => {
		describe('multiple invoices', () => {
			let result: AccountingResponse<Invoice>;
			const inMemoryOAuthClient = new InMemoryOAuthClient();

			beforeAll(async () => {

				const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
				const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

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

			it('response.Id is a Guid and is actually the Id of the request', () => {
				expect(isUUID(result.Id)).toBeTruthy();
			});

			it('there is more than one invoice', () => {
				expect(result.Invoices.length).toBeGreaterThan(1);
			});

			it('matches the expected response', () => {
				expect(result).toMatchObject(multipleInvoices);
			});

			it('called the correct URL', () => {
				inMemoryOAuthClient.calledThisURL('invoices');
			});
		});

	});
});

describe('/contactgroups', () => {
	describe('and getting', () => {
		describe('all contact groups', () => {
			let result: AccountingResponse<ContactGroup>;
			const inMemoryOAuthClient = new InMemoryOAuthClient();

			beforeAll(async () => {

				const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
				const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

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

			it('matches the expected response', () => {
				expect(result).toMatchObject(allContactGroups);
			});

			it('called the correct URL', () => {
				inMemoryOAuthClient.calledThisURL('contactgroups');
			});
		});

	});

	describe('and creating', () => {
		describe('a contact groups', () => {
			let result: AccountingResponse<ContactGroup>;
			const inMemoryOAuthClient = new InMemoryOAuthClient();

			beforeAll(async () => {

				const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
				const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

				inMemoryOAuthClient.returnsWithNextGet(createResponse);

				const xeroClient = new XeroAPIClient({
					appType: 'private',
					consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
					consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
					privateKey: privateKey
				}, inMemoryOAuthClient);

				const contactGroup: ContactGroup = {
					Name: 'NewContactGroup',
					Status: 'ACTIVE'
				};

				result = await xeroClient.contactgroups.create(contactGroup);
			});

			it('the response is defined', () => {
				expect(result).not.toBeNull();
			});

			it('matches the expected response', () => {
				expect(result).toMatchObject(createResponse);
			});

			it('called the correct URL', () => {
				inMemoryOAuthClient.calledThisURL('contactgroups');
			});
		});

	});
});
