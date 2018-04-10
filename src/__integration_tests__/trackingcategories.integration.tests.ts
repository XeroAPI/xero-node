import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/trackingcategories', () => {

	let xero: AccountingAPIClient;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	// commented out some of the tests for now.

	// it('create single', async () => {
	// 	try {
	// 		createResponse = await xero.trackingCategories.create({
	// 			Name: 'Phil Test Category 1'
	// 		});
	// 	} catch (error) {
	// 		const response = await xero.trackingCategories.get();
	// 		await xero.trackingCategories.delete({TrackingCategoryID: response.TrackingCategories[0].TrackingCategoryID});
	// 		createResponse = await xero.trackingCategories.create({
	// 			Name: 'Phil Test Category 1'
	// 		});
	// 	}

	// 	expect(createResponse.TrackingCategories.length).toBe(1);
	// 	expect(createResponse.TrackingCategories[0].Name).toEqual('Phil Test Category 1');
	// });

	// it('get single', async () => {
	// 	const response = await xero.trackingCategories.get({ TrackingCategoryID: createResponse.TrackingCategories[0].TrackingCategoryID});

	// 	expect(response).toBeDefined();
	// 	expect(response.Id).toBeTruthy();
	// 	expect(response.TrackingCategories.length).toBe(1);
	// 	expect(response.TrackingCategories[0].TrackingCategoryID).toBeTruthy();
	// });

	it('get all', async () => {
		const response = await xero.trackingCategories.get();
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.TrackingCategories.length).toBeGreaterThan(0);
		expect(response.TrackingCategories[0].TrackingCategoryID).toBeTruthy();
	});

	// it('delete single' , async () => {
	// 	const response = await xero.trackingCategories.delete({ TrackingCategoryID: createResponse.TrackingCategories[0].TrackingCategoryID});
	// 	expect(response).toBeDefined();
	// 	expect(response.Id).toBeTruthy();
	// 	expect(response.TrackingCategories.length).toBe(1);
	// 	expect(response.TrackingCategories[0].TrackingCategoryID).toBeTruthy();
	// });

});
