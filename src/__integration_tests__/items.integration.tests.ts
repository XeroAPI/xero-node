import { ItemsResponse } from '../AccountingAPI-responses';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { getOrCreateItemId } from './helpers/entityId.helpers';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/items', () => {
	let xero: AccountingAPIClient;
	let idsToArchive: string[] = [];

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('create single', async () => {
		const response = await xero.items.create({
			Code: 'DevX-was-here'
		});

		collectIdsToArchive(response);

		expect(response.Items.length).toBe(1);
		expect(response.Items[0].Code).toEqual('DevX-was-here');
	});

	it('get single', async () => {
		const response = await xero.items.get({ ItemID: await getOrCreateItemId(xero) });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Items.length).toBe(1);
		expect(response.Items[0].ItemID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.items.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Items.length).toBeGreaterThan(0);
		expect(response.Items[0].ItemID).toBeTruthy();
	});

	// it('get history', async () => {
	// 	const response = await xero.items.history.get({ ItemID: await getOrCreateItemId(xero)});
	// 	expect(response.HistoryRecords[0]).toBeDefined();
	// });

	it('update', async () => {
		const response = await xero.items.update({
			ItemID: await getOrCreateItemId(xero),
			Code: 'Another-code'
		});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Items.length).toBe(1);
		expect(response.Items[0].ItemID).toBeTruthy();
		expect(response.Items[0].Code).toEqual('Another-code');
	});

	afterAll(async () => {
		await Promise.all(idsToArchive.map((id) => xero.items.delete({ ItemID: id })));
	});

	function collectIdsToArchive(response: ItemsResponse) {
		idsToArchive = idsToArchive.concat(response.Items.map((item) => item.ItemID));
	}
});
