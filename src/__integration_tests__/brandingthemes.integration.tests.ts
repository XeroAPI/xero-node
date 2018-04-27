import { AccountingAPIClient } from '../AccountingAPIClient';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/brandingthemes', () => {
	let xero: AccountingAPIClient;
	let existingId: string;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		const response = await xero.brandingThemes.get();
		expect(response.BrandingThemes[0].Name).toBeDefined();

		existingId = response.BrandingThemes[0].BrandingThemeID;
	});

	it('can get single', async () => {
		const newResponse = await xero.brandingThemes.get({ BrandingThemeID: existingId });
		expect(newResponse.BrandingThemes[0].Name).toBeDefined();
	});

});
