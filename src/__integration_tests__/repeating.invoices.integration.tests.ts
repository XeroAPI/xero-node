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
		console.log(response);
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Status).toBe('OK');
		expect(response.RepeatingInvoices).toBeInstanceOf(Array);
	});
});
