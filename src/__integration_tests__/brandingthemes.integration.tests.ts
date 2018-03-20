import { AccountingAPIClient } from '../AccountingAPIClient';
import { BrandingThemesResponse } from '../AccountingAPI-types';
import { getPrivateConfig, setJestTimeout } from './helpers/integration.helpers';

describe('/brandingthemes', () => {
	let xero: AccountingAPIClient;
	let response: BrandingThemesResponse;

	beforeAll(async () => {
		setJestTimeout();
		const config = getPrivateConfig();
		xero = new AccountingAPIClient(config);
	});

	it('can get all', async () => {
		expect.assertions(1);

		response = await xero.brandingThemes.get();
		expect(response.BrandingThemes[0].Name).toBeDefined();
	});

	it('can get single', async () => {
		expect.assertions(1);

		const newResponse = await xero.brandingThemes.get({ BrandingThemeID: response.BrandingThemes[0].BrandingThemeID});
		expect(newResponse.BrandingThemes[0].Name).toBeDefined();
	});

});
