import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/accounts', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('2');
		xero = new AccountingAPIClient(config);
	});

	it('get all', async () => {
		const response = await xero.accounts.get();
		expect(response).toBeTruthy();
		expect(response.Accounts.length).toBeGreaterThan(0);
		expect(response.Accounts.map((account) => account.SystemAccount)).toContainEqual('DEBTORS');
	});
});
