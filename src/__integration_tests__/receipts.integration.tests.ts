import { ReceiptsResponse } from '../AccountingAPI-responses';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getOrCreateContactId, getOrCreateReceiptId, getOrCreateUserId } from './helpers/entityId.helpers';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/receipts', () => {
	let xero: AccountingAPIClient;
	let idsToArchive: string[] = [];

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	// skip: Bug in API-Accounting prevents creating receipts
	it.skip('create single', async () => {
		const response = await xero.receipts.create({
			Date: '2018-03-22',
			Contact: { ContactID: await getOrCreateContactId(xero) },
			LineItems: [
				{
					Description: 'Coffee with client to discuss support contract',
					UnitAmount: 13.80,
					AccountCode: '420'
				}
			],
			User: { UserID: await getOrCreateUserId(xero) }
		});

		collectIdsToArchive(response);

		expect(response.Receipts.length).toBe(1);
		expect(response.Receipts[0].Total).toEqual(13.80);
		expect(response.Receipts[0].ValidationErrors).toBeFalsy();
	});

	it('get single', async () => {
		const response = await xero.receipts.get({ ReceiptID: await getOrCreateReceiptId(xero) });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Receipts.length).toBe(1);
		expect(response.Receipts[0].ReceiptID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.receipts.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Receipts.length).toBeGreaterThan(0);
		expect(response.Receipts[0].ReceiptID).toBeTruthy();
	});

	// it('get history', async () => {
	// 	const response = await xero.receipts.history.get({ ReceiptID: await getOrCreateReceiptId(xero) });

	// 	expect(response.HistoryRecords[0]).toBeDefined();
	// })

	it('update', async () => {
		const response = await xero.receipts.update({
			ReceiptID: await getOrCreateReceiptId(xero),
			Reference: 'xero-node sdk'
		});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Receipts.length).toBe(1);
		expect(response.Receipts[0].ReceiptID).toBeTruthy();
		expect(response.Receipts[0].Reference).toEqual('xero-node sdk');
	});

	afterAll(async () => {
		await xero.receipts.update({
			Receipts: idsToArchive.map((id) => ({
				ReceiptID: id,
				Status: 'VOIDED'
			}))
		});
	});

	function collectIdsToArchive(response: ReceiptsResponse) {
		idsToArchive = idsToArchive.concat(response.Receipts.map((receipt) => receipt.ReceiptID));
	}
});
