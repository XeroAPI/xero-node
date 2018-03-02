
import * as fs from 'fs';
import { getConfig } from './integration.helpers';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { createSingleInvoiceRequest, createMultipleInvoiceRequest } from './request-body/invoice.request.examples';
import { InvoicesResponse } from '../AccountingAPI-types';
import { isUUID } from './helpers/integration-test-helpers';

const data = getConfig();
const xero = new AccountingAPIClient(data);

describe('/invoices integration tests', () => {
	describe('and GETing', () => {
		describe('a single invoice as PDF', () => {
			let result: string;
			const invoiceLocation = (__dirname + '/invoice-result.pdf');

			beforeAll(async () => {
				const invoice = await xero.invoices.create(createSingleInvoiceRequest);
				result = await xero.invoices.getPDF({ InvoiceID: invoice.Invoices[0].InvoiceID });
				fs.writeFileSync(invoiceLocation, result, 'binary');
			});

			it('the invoice is defined', () => {
				expect(result).not.toBeNull();
			});

			it('invoice can be saved as local file', async () => {
				const invoiceBuffer = fs.readFileSync(invoiceLocation);
				expect(invoiceBuffer.byteLength).toBeGreaterThan(5000); // Lets hopw all PDFs a bigger than 5000
			});

			it('invoice is then deleted', () => {
				fs.unlinkSync(invoiceLocation);
			});
		});

		describe('a single invoices', () => {
			let result: InvoicesResponse;

			beforeAll(async () => {
				const invoice = await xero.invoices.create(createSingleInvoiceRequest);

				result = await xero.invoices.get({ InvoiceID: invoice.Invoices[0].InvoiceID });
			});

			// TODO: Make these tests generic and paramatised so that we can reuse across multiple endpoints
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
			let result: InvoicesResponse;

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

	describe('and creating', () => {
		describe('multiple invoices', () => {
			let multipleResult: InvoicesResponse = null;

			beforeAll(async () => {
				multipleResult = await xero.invoices.create(createMultipleInvoiceRequest);
			});

			it('successfully creates multiple at the sametime', () => {
				expect(multipleResult.Invoices.length).toBe(2);
				expect(isUUID(multipleResult.Invoices[0].InvoiceID)).toBeTruthy();
				expect(isUUID(multipleResult.Invoices[1].InvoiceID)).toBeTruthy();
			});
		});

	});

	// describe('and validation errors', async () => {
	// 	const invalidInvoice = createInvoiceRequest;
	// 	invalidInvoice.Type = 'ImNotARealType';

	// 	expect.assertions(1);

	// 	try {
	// 		await xero.invoices.create(invalidInvoice);

	// 	} catch (error) {
	// 		expect(error).toMatchObject({});
	// 	}
	// });

});
