
import * as fs from 'fs';
import * as path from 'path';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { createSingleInvoiceRequest, createMultipleInvoiceRequest } from './request-body/invoice.request.examples';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { InvoicesResponse } from '../AccountingAPI-responses';
import { getOrCreateInvoiceId } from './helpers/entityId.helpers';

describe('/invoices', () => {

	let xero: AccountingAPIClient;

	let invoiceIdsToArchive: string[] = [];
	const tmpDownloadFile = path.resolve(__dirname, './temp_result.pdf');

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('create single', async () => {
		const response = await xero.invoices.create(createSingleInvoiceRequest);

		collectInvoicesToArchive(response);

		expect(response.Invoices.length).toBe(1);
		expect(response.Invoices[0].InvoiceID).toBeTruthy();
	});

	it('create multiple', async () => {
		const response = await xero.invoices.create(createMultipleInvoiceRequest);

		collectInvoicesToArchive(response);

		expect(response.Invoices.length).toBe(createMultipleInvoiceRequest.Invoices.length);
		expect(response.Invoices[0].InvoiceID).toBeTruthy();
		expect(response.Invoices[1].InvoiceID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.invoices.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Invoices.length).toBeGreaterThanOrEqual(invoiceIdsToArchive.length);
		expect(response.Invoices[0].InvoiceID).toBeTruthy();
	});

	it('get single', async () => {
		const invoiceId = await getOrCreateInvoiceId(xero);
		const response = await xero.invoices.get({ InvoiceID: invoiceId });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Invoices).toHaveLength(1);
		expect(response.Invoices[0].InvoiceID).toBe(invoiceId);
	});

	it('get single as pdf', async () => {
		const response = await xero.invoices.savePDF({ InvoiceID: await getOrCreateInvoiceId(xero), savePath: tmpDownloadFile });

		expect(response).toBeUndefined();
		const invoiceBuffer = fs.readFileSync(tmpDownloadFile);
		expect(invoiceBuffer.byteLength).toBeGreaterThan(3000); // Let's hope all PDFs are bigger than 3000B
	});

	it('get history', async () => {
		const invoiceId = await getOrCreateInvoiceId(xero);
		const response = await xero.invoices.history.get({ InvoiceID: invoiceId });		
		expect(response.HistoryRecords[0]).toBeDefined();
	});


	describe('Invalid requests', () => {
		it('creating an invalid invoice', async () => {
			const createInvalidInvoiceRequest = { ...createSingleInvoiceRequest, ...{ Type: 'ImNotARealType' } };

			const response = await xero.invoices.create(createInvalidInvoiceRequest);

			collectInvoicesToArchive(response);

			expect(response.Invoices).toHaveLength(1);
			expect(response.Invoices[0].HasErrors).toBeTruthy();
			expect(response.Invoices[0].ValidationErrors.length).toBeGreaterThanOrEqual(1);
		});
	});

	afterAll(async () => {
		// delete the file
		fs.unlinkSync(tmpDownloadFile);

		// archive the invoices
		const updateRequestBody = invoiceIdsToArchive.map((invoiceId) => ({ InvoiceID: invoiceId, Status: 'DELETED' }));
		await xero.invoices.update({ Invoices: updateRequestBody });
	});

	function collectInvoicesToArchive(response: InvoicesResponse) {
		invoiceIdsToArchive = invoiceIdsToArchive.concat(response.Invoices.map((invoice) => invoice.InvoiceID));
	}
});
