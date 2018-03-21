import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { UsersResponse } from '../AccountingAPI-types';

describe('users', () => {

	let xero: AccountingAPIClient;
	let response: UsersResponse;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('get all', async () => {
		response = await xero.users.get();

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.Users.length).toBeGreaterThan(0);
		expect(response.Users[0].UserID).toBeTruthy();
	});

	it('get single', async () => {
		const singleResponse = await xero.users.get({ UserID: response.Users[0].UserID});

		expect(singleResponse).toBeDefined();
		expect(singleResponse.Id).toBeTruthy();
		expect(singleResponse.Users.length).toBe(1);
		expect(singleResponse.Users[0].UserID).toBeTruthy();
	});

});
