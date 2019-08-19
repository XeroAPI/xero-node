import { BaseAPIClient } from '../internals/BaseAPIClient';
import { AccessToken, RequestToken } from '../internals/OAuth1HttpClient';
import { getPartnerAppConfig, setJestTimeout } from './helpers/integration.helpers';
import { loginToXero } from './helpers/login';
import { Invoice } from '../AccountingAPI-models';

// We cannot run this and the other example in parallel as one de-auths the other

// This example shows how to make generic API calls as a partner app. If you're making generic calls
// please consider sending a PR with the new endpoint you are using. Thanks

describe('Partner Example Tests with callbackUrl', () => {
	const config = getPartnerAppConfig();
	config.callbackUrl = 'http://localhost'; // Note you MUST add localhost as a callback domain in https://developer.xero.com/myapps
	const accounting1 = new BaseAPIClient(config);
	let authUrl: string;
	let requestToken: RequestToken;
	let authState: AccessToken;
	let oauth_verifier: string;

	beforeAll(async (done) => {
		setJestTimeout();
		requestToken = await accounting1.oauth1Client.getRequestToken();
		authUrl = accounting1.oauth1Client.buildAuthoriseUrl(requestToken);
		oauth_verifier = await loginToXero(authUrl, true);
		done();
	});

	it('it gets a request token', async () => {
		expect(requestToken).toBeTruthy();
	});

	it('it returns the authorised url', async () => {
		expect(authUrl).toContain('xero.com');
	});

	it('it returns a PIN when the user allows access to the app', async () => {
		expect(oauth_verifier).not.toBeNull();
	});

	it('it can make a successful API call', async () => {
		authState = await accounting1.oauth1Client.swapRequestTokenforAccessToken(
			requestToken,
			oauth_verifier
		);
		const inv1 = (await accounting1.oauth1Client.get(
			'/api.xro/2.0/Organisation'
		)) as any;
		expect(inv1.Status).toEqual('OK');
	});

	it('it can still make a successfull API call after refreshing the access token', async () => {
		authState = await accounting1.oauth1Client.refreshAccessToken();
		const inv2 = await accounting1.oauth1Client.get<Invoice>(
			'/api.xro/2.0/Organisation'
		);
		expect(inv2.Status).toEqual('OK');
	});

	describe('OAuth State', () => {
		let accounting2_callback: BaseAPIClient;
		it('it allows you to keep copy of the state in your own datastore', async () => {
			// Saves your state to your datastore
			expect(authState).not.toBeNull();
			expect(authState.oauth_session_handle).not.toBeNull();
			expect(requestToken).not.toBeNull();

			// This is how you can check when you have to refresh your Access Token
			expect(typeof authState.oauth_expires_at.getDate).toBe('function');
		});

		it('it allows you to restore a new instance of the client next time your user logs in', async () => {
			accounting2_callback = new BaseAPIClient(config, authState);
		});

		it('it lets you make API calls using the restored state', async () => {
			const inv3 = (await accounting2_callback.oauth1Client.get(
				'/api.xro/2.0/Organisation'
			)) as any;
			expect(inv3.Status).toEqual('OK');
		});
	});
});
