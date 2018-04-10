import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/overpayments', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('get all', async () => {
		const response = await xero.overpayments.get();
		expect(response).not.toBeNull();
		expect(response.Overpayments).toBeInstanceOf(Array);
		expect(response.Overpayments[0]).toHaveProperty('Contact');
	});

});
