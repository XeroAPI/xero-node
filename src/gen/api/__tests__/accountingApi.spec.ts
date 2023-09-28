import { AccountingApi } from '../accountingApi';
import { Invoice } from '../../model/accounting/invoice';
import {restoreAndMockEmptyResponse} from "../../../test/utils/mockRequest";

jest.mock('request');

const localVarRequest = require('request');
const accountingAPI = new AccountingApi();
const testInvoices = {
	invoices: [
		{
			type: Invoice.TypeEnum.ACCREC,
			contact: {
				contactID: 'test-contactId',
			},
			lineItems: [
				{
					description: 'Acme Tires',
					quantity: 2.0,
					unitAmount: 20.0,
					accountCode: '500',
					taxType: 'NONE',
					lineAmount: 40.0,
				},
			],
			date: '2019-03-11',
			dueDate: '2018-12-10',
			reference: 'Website Design',
			status: Invoice.StatusEnum.AUTHORISED,
		},
	],
};
describe('gen.api.accountingApi', () => {
	describe('updateOrCreateInvoices function', () => {
		it('header will contain Idempotency-Key if call this with idempotencyKey params', async () => {
			restoreAndMockEmptyResponse(localVarRequest);
			await accountingAPI.updateOrCreateInvoices('test-xeroTenantId', testInvoices, 'test-idempotencyKey');
			expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(true);
		});
		it('header will not contain Idempotency-Key if call this without idempotencyKey params', async () => {
			restoreAndMockEmptyResponse(localVarRequest);
			await accountingAPI.updateOrCreateInvoices('test-xeroTenantId', testInvoices, null);
			expect(localVarRequest.mock.calls[0][0].headers.hasOwnProperty('Idempotency-Key')).toBe(false);
		});
	});
});
