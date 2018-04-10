import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('users', () => {

	let xero: AccountingAPIClient;
	let existingId: string;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('get all', async () => {
		const response = await xero.users.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Users.length).toBeGreaterThan(0);
		expect(response.Users[0].UserID).toBeTruthy();

		existingId = response.Users[0].UserID;
	});

	it('get single', async () => {
		const response = await xero.users.get({ UserID: existingId });

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Users.length).toBe(1);
		expect(response.Users[0].UserID).toBeTruthy();
	});

});
