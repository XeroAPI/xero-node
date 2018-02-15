import { AccountingResponse, Invoice } from '../../interfaces/AccountingResponse';
import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { InMemoryOAuthClient } from './InMenoryOAuthClient';
import { multipleInvoices, singleInvoice } from './response-examples/invoice.response.examples';
import { isUUID } from '../test-helpers';
import { OAuthClient } from '../../OAuthClient';
import { InMemoryOAuth } from './InMenoryOAuth';
import { createInvoiceRequest } from './request-examples/invoice.request.examples';

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

	describe('and creating', () => {
		let result: AccountingResponse<Invoice>;
		const inMemoryOAuth = new InMemoryOAuth();

		beforeAll(async () => {

			const privateKeyFile = path.resolve(__dirname + '/test-privatekey.pem');
			const privateKey = fs.readFileSync(privateKeyFile, 'utf8');

			inMemoryOAuth.callbackResultsForNextCall(null, JSON.stringify(singleInvoice), 201);

			const xeroClient = new XeroAPIClient({
				appType: 'private',
				consumerKey: 'RDGDV41TRLQZDFSDX96TKQ2KRJIW4C',
				consumerSecret: 'DJ3CMGDB0DIIA9DNEEJMRLZG0BWE7Y',
				privateKey: privateKey
			}, null, inMemoryOAuth);

			result = await xeroClient.invoices.create(createInvoiceRequest);
		});

		it('the response is defined', () => {
			expect(result).not.toBeNull();
		});

		it('response.Id is a Guid and is actually the Id of the request', () => {
			expect(isUUID(result.Id)).toBeTruthy();
		});

		it('there is more than one invoice', () => {
			expect(result.Invoices.length).toBe(1);
		});

		it('matches the expected response', () => {
			expect(result).toMatchObject(singleInvoice);
		});

		it('called the correct URL', () => {
			inMemoryOAuth.lastCalledThisURL('https://api.xero.com/api.xro/2.0/invoices');
		});
	});
});
