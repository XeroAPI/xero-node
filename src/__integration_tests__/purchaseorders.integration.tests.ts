import * as fs from 'fs';
import * as path from 'path';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getOrCreatePurchaseOrderId } from './helpers/entityId.helpers';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/purchaseorders', () => {
	let xero: AccountingAPIClient;
	const tmpDownloadFile = path.resolve(__dirname, './temp_result_purchaseOrders.pdf');

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('get single as pdf', async () => {
		const response = await xero.purchaseOrders.savePDF({ PurchaseOrderID: await getOrCreatePurchaseOrderId(xero), savePath: tmpDownloadFile });
		expect(response).toBeUndefined();
		const pdfBuffer = fs.readFileSync(tmpDownloadFile);
		expect(pdfBuffer.byteLength).toBeGreaterThan(3000); // Let's hope all PDFs are bigger than 3000B
	});

	it('get all', async () => {
		const response = await xero.purchaseOrders.get();
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.PurchaseOrders).toBeInstanceOf(Array);
	});

	afterAll(async () => {
		// delete the file
		fs.unlinkSync(tmpDownloadFile);
	});
});
