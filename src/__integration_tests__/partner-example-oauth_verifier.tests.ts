import { AccountingAPIClient } from '../AccountingAPIClient';
import { AccessToken, RequestToken } from '../internals/OAuth1HttpClient';
import { getPartnerAppConfig, setJestTimeout } from './helpers/integration.helpers';
import { loginToXero } from './helpers/login';

// We cannot run this and the other example in parallel as one de-auths the other
describe.skip('Partner Example Tests using oauth_verifier', () => {
	const config = getPartnerAppConfig();
	const accounting1 = new AccountingAPIClient(config);
	let authUrl: string;
	let requestToken: RequestToken;
	let authState: AccessToken;
	let oauth_verifier: string;

	beforeAll(async () => {
		setJestTimeout();
		requestToken = await accounting1.oauth1Client.getRequestToken();
		authUrl = accounting1.oauth1Client.buildAuthoriseUrl(requestToken);
		oauth_verifier = await loginToXero(authUrl, false);
	});

	it('it gets a request token', async () => {
		expect(requestToken).toBeTruthy();
	});

	it('it returns the authorised url', async () => {
		expect(authUrl).toContain('xero.com');
	});

	it('it returns a PIN when the user allows access to the app', async () => {
		expect(oauth_verifier).toBeTruthy();
	});

	it('it can make a successful API call', async () => {
		authState = await accounting1.oauth1Client.swapRequestTokenforAccessToken(requestToken, oauth_verifier);
		const inv1 = await accounting1.organisations.get();
		expect(inv1.Status).toEqual('OK');
	});

	it('it can still make a successfull API call after refreshing the access token', async () => {
		authState = await accounting1.oauth1Client.refreshAccessToken();
		const inv2 = await accounting1.organisations.get();
		expect(inv2.Status).toEqual('OK');
	});

	describe('OAuth State', () => {
		let accounting2: AccountingAPIClient;
		it('it allows you to keep copy of the state in your own datastore', async () => {
			// Saves your state to your datastore
			expect(authState).toBeTruthy();
			expect(authState.oauth_session_handle).toBeTruthy();
			expect(requestToken).toBeTruthy();

			// This is how you can check when you have to refresh your Access Token
			expect(typeof authState.oauth_expires_at.getDate).toBe('function');
		});

		it('it allows you to restore a new instance of the client next time your user logs in', async () => {
			accounting2 = new AccountingAPIClient(config, authState);
		});

		it('it lets you make API calls using the restored state', async () => {
			const inv3 = await accounting2.organisations.get();
			expect(inv3.Status).toEqual('OK');
		});
	});
});
