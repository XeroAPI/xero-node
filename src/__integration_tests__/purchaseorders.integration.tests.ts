import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/purchaseorders', () => {
	let xero: AccountingAPIClient;

	beforeAll(() => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('get all', async () => {
		const response = await xero.purchaseOrders.get();
		expect(response).toBeDefined();
		expect(response.Id).toBeTruthy();
		expect(response.PurchaseOrders).toBeInstanceOf(Array);
	});

	// example of creating a purchase order

	// it('create', async () => {
	// 	contactsResponse = await xero.contacts.get();
	// 	purchaseOrderResponse = await xero.purchaseOrders.create({
	// 		Contact: { ContactID: contactsResponse.Contacts[0].ContactID },
	// 		Date: '2015-11-30',
	// 		DeliveryDate: '2015-12-20',
	// 		LineAmountTypes: 'Exclusive',
	// 		LineItems: [
	// 			{
	// 				Description: 'Office Chairs',
	// 				Quantity: 5.0000,
	// 				UnitAmount: 120.00
	// 			}
	// 		]
	// 	});
	// 	console.log(purchaseOrderResponse);
	// });

});
