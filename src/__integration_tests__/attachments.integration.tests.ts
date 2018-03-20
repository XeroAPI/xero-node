import * as fs from 'fs';
import * as path from 'path';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { createSingleInvoiceRequest } from './request-body/invoice.request.examples';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { InvoicesResponse, Invoice } from '../AccountingAPI-types';

describe('attachments', () => {

	let xero: AccountingAPIClient;

	let invoiceIdsToArchive: string[] = [];

	let anInvoice: Invoice;
	const attachementPath = path.resolve(__dirname, 'helpers', 'image.jpg');
	const tempAttachementPath = path.resolve(__dirname, 'temp-image.jpg');

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);

		const response = await xero.invoices.create(createSingleInvoiceRequest);
		anInvoice = response.Invoices[0];
		collectInvoicesToArchive(response);
	});

	it('can add an attachment', async () => {
		await xero.invoices.attachments.uploadAttachment({
			entityID: anInvoice.InvoiceID,
			mimeType: 'image/jpg',
			fileName: 'anUploadedImage.jpg',
			pathToUpload: attachementPath
		});
	});

	it('can download the same attachment', async () => {
		await xero.invoices.attachments.downloadAttachment({
			entityID: anInvoice.InvoiceID,
			mimeType: 'image/jpg',
			fileName: 'anUploadedImage.jpg',
			pathToSave: tempAttachementPath
		});

		const tempFile = fs.statSync(tempAttachementPath);
		const realFile = fs.statSync(attachementPath);
		expect(tempFile.size).toBe(realFile.size);
	});

	it('get the attachment details', async () => {
		const response = await xero.invoices.attachments.get({
			EntityID: anInvoice.InvoiceID
		});

		expect(response.Attachments.length).toEqual(1);
		expect(response.Attachments[0].FileName).toEqual('anUploadedImage.jpg');
	});

	it('errors like this', async () => {
		// TODO: This test
		// TODO: Also make upload return a response
	});

	afterAll(async () => {
		// delete the file
		fs.unlinkSync(tempAttachementPath);

		// archive the invoices
		const updateRequestBody = invoiceIdsToArchive.map((invoiceId) => ({ InvoiceID: invoiceId, Status: 'DELETED' }));
		await xero.invoices.update(updateRequestBody);
	});

	function collectInvoicesToArchive(response: InvoicesResponse) {
		invoiceIdsToArchive = invoiceIdsToArchive.concat(response.Invoices.map((invoice) => invoice.InvoiceID));
	}
});
