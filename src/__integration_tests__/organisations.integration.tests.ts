import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/organisations', () => {

	let xero: AccountingAPIClient;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('get current organisation', async () => {
		const response = await xero.organisations.get();

		expect(response.Organisations.length).toBe(1);
		expect(response.Organisations[0].Name).toBeTruthy();
	});
});
