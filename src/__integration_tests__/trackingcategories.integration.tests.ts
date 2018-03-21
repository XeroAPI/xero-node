import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { TrackingCategoriesResponse } from '../AccountingAPI-types';

describe('/trackingcategories', () => {

	let xero: AccountingAPIClient;
	let createResponse: TrackingCategoriesResponse;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('create single', async () => {
		createResponse = await xero.trackingCategories.create({
			Name: 'Phil Test Category 1'
		});

		if (createResponse.Status == '400') {
			const response = await xero.trackingCategories.get();
			await xero.trackingCategories.delete({TrackingCategoryID: response.TrackingCategories[0].TrackingCategoryID});
		}

		expect(createResponse.TrackingCategories.length).toBe(1);
		expect(createResponse.TrackingCategories[0].Name).toEqual('Phil Test Category 1');
	});

	it('get single', async () => {
		const response = await xero.trackingCategories.get({ TrackingCategoryID: createResponse.TrackingCategories[0].TrackingCategoryID});

		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.TrackingCategories.length).toBe(1);
		expect(response.TrackingCategories[0].TrackingCategoryID).toBeTruthy();
	});

	it('get all', async () => {
		const response = await xero.trackingCategories.get();
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.TrackingCategories.length).toBeGreaterThan(0);
		expect(response.TrackingCategories[0].TrackingCategoryID).toBeTruthy();
	});

	it('delete single' , async () => {
		const response = await xero.trackingCategories.delete({ TrackingCategoryID: createResponse.TrackingCategories[0].TrackingCategoryID});
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.TrackingCategories.length).toBe(1);
		expect(response.TrackingCategories[0].TrackingCategoryID).toBeTruthy();
	});

});
