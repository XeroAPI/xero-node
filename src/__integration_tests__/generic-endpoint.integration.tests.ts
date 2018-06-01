import { UsersResponse } from '../AccountingAPI-responses';
import { AccountingAPIClient } from '../AccountingAPIClient';
import { BaseAPIClient } from '../internals/BaseAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('Generic accounting endpoint tests', () => {

	let xero: AccountingAPIClient;
	let existingId: string;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('get all', async () => {
		const response = await xero.oauth1Client.get('users');

		expect(response).toBeDefined();
		expect((response as UsersResponse).Id).toBeTruthy();
		expect((response as UsersResponse).Users.length).toBeGreaterThan(0);
		expect((response as UsersResponse).Users[0].UserID).toBeTruthy();

		existingId = (response as UsersResponse).Users[0].UserID;
	});

	it('get single', async () => {
		const response = await xero.oauth1Client.get('users?UserID=' + existingId);

		expect((response as UsersResponse)).toBeDefined();
		expect((response as UsersResponse).Id).toBeTruthy();
		expect((response as UsersResponse).Users.length).toBe(1);
		expect((response as UsersResponse).Users[0].UserID).toBeTruthy();
	});

});

describe('Generic endpoint tests', () => {

	let xero: BaseAPIClient;
	let existingId: string;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new BaseAPIClient(config);
	});

	it('get all', async () => {
		const response = await xero.oauth1Client.get('/api.xro/2.0/users');

		expect(response).toBeDefined();
		expect((response as UsersResponse).Id).toBeTruthy();
		expect((response as UsersResponse).Users.length).toBeGreaterThan(0);
		expect((response as UsersResponse).Users[0].UserID).toBeTruthy();

		existingId = (response as UsersResponse).Users[0].UserID;
	});

	it('get single', async () => {
		const response = await xero.oauth1Client.get('/api.xro/2.0/users?UserID=' + existingId);

		expect((response as UsersResponse)).toBeDefined();
		expect((response as UsersResponse).Id).toBeTruthy();
		expect((response as UsersResponse).Users.length).toBe(1);
		expect((response as UsersResponse).Users[0].UserID).toBeTruthy();
	});

});
