import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/taxrates', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	// it('create', async () => {
	// 	expect.assertions(1);

	// 	let response: any;
	// 	try {
	// 		response = await xero.currencies.create({ Code: 'PHP' });
	// 		expect(response.Currencies).toContainEqual({
	// 			Code: 'PHP',
	// 			Description: 'Philippine Peso'
	// 		});
	// 	} catch (err) {
	// 		// you can't re-subscribe to a currency you're already subscribed to
	// 		expect(err.statusCode).toBe(400);
	// 		return;
	// 	}
	// });

	it('get all', async () => {
		const response = await xero.taxRates.get();
		expect(response).not.toBeNull();
		expect(response.TaxRates).toBeInstanceOf(Array);
		expect(response.TaxRates[0]).toHaveProperty('Name');
		expect(response.TaxRates[0]).toHaveProperty('TaxType');
	});
});
