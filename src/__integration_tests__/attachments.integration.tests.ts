import * as fs from 'fs';
import * as path from 'path';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { getOrCreateInvoiceId } from './helpers/entityId.helpers';

describe('attachments', () => {

	let xero: AccountingAPIClient;

	let entityId: string;
	const attachmentPath = path.resolve(__dirname, 'helpers', 'image.jpg');
	const tempAttachmentPath = path.resolve(__dirname, 'temp-image.jpg');

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);

		entityId = await getOrCreateInvoiceId(xero);
	});

	it('can add an attachment', async () => {
		await xero.invoices.attachments.uploadAttachment({
			entityId: entityId,
			mimeType: 'image/jpg',
			fileName: 'anUploadedImage.jpg',
			pathToUpload: attachmentPath
		});
	});

	it('can download the same attachment', async () => {
		await xero.invoices.attachments.downloadAttachment({
			entityId: entityId,
			mimeType: 'image/jpg',
			fileName: 'anUploadedImage.jpg',
			pathToSave: tempAttachmentPath
		});

		const tempFile = fs.statSync(tempAttachmentPath);
		const realFile = fs.statSync(attachmentPath);
		expect(tempFile.size).toBe(realFile.size);
	});

	it('get the attachment details', async () => {
		const response = await xero.invoices.attachments.get({
			entityId: entityId
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
		fs.unlinkSync(tempAttachmentPath);
	});
});
