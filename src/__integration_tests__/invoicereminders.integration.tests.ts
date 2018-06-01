import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/brandingthemes', () => {
	let xero: AccountingAPIClient;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig('1');
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const response = await xero.invoiceReminders.get();
		expect(response.InvoiceReminders[0].Enabled).toBeDefined();

	});

});
