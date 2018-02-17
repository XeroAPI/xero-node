
import { XeroAPIClient } from '../../XeroAPIClient';
import * as path from 'path';
import * as fs from 'fs';
import { AccountingResponse, Invoice } from '../../interfaces/AccountingResponse';
import { isUUID } from '../test-helpers';
import { createInvoiceRequest } from '../unit/request-examples/invoice.request.examples';

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
			describe('a single invoice as PDF', () => {
				let result: string;
				const invoiceLocation = (__dirname + '/invoice-result.pdf');

				beforeAll(async () => {
					const invoice = await xero.invoices.create(createInvoiceRequest);
					result = await xero.invoices.getPDF({ InvoiceId: invoice.Invoices[0].InvoiceID });
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
});
