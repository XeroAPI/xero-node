import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/repeatinginvoices', () => {
	let xero: AccountingAPIClient;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	// only checks that the response returns an array of repeating invoice
	it('get all', async () => {
		const response = await xero.repeatingInvoices.get();
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Status).toBe('OK');
		expect(response.RepeatingInvoices).toBeInstanceOf(Array);
	});

	// it('get history', async () => {
	// 	const repInv = await xero.repeatingInvoices.get();
	// 	const response = await xero.repeatingInvoices.history.get({ RepeatingInvoiceID: repInv.RepeatingInvoices[0].RepeatingInvoiceID });
	// 	expect(response.HistoryRecords[0]).toBeDefined();
	// });
});
