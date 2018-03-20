import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';
import { TaxRate } from '../AccountingAPI-types';

describe('/taxrates', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('create', async () => {
		const rate: TaxRate = {
			Name: 'Node Tax',
			TaxType: 'INPUT',
			ReportTaxType: 'INPUT',
			TaxComponents: [{
				Name: 'Tech Debt Tax',
				Rate: 17.5,
				IsCompound: false,
				IsNonRecoverable: false
			}]
		};
		const response = await xero.taxRates.update(rate);
		expect(response.TaxRates).toBeInstanceOf(Array);
		expect(response.TaxRates[0]).toHaveProperty('Name', 'Node Tax');
	});

	it('get all', async () => {
		const response = await xero.taxRates.get();
		expect(response).not.toBeNull();
		expect(response.TaxRates).toBeInstanceOf(Array);
		expect(response.TaxRates[0]).toHaveProperty('Name');
		expect(response.TaxRates[0]).toHaveProperty('TaxType');
	});
});
