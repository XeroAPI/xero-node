import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/linkedtransactions', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const res = await xero.linkedTransactions.get();
		expect(res.LinkedTransactions).toBeDefined(); // This one takes too much work to set up. PRs welcome...
	});

});
