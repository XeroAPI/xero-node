import * as puppeteer from 'puppeteer';
import { getPartnerAppConfig, getLoginConfig, setJestTimeout } from './helpers/integration.helpers';
import * as querystring from 'querystring';
import { AccessToken, RequestToken } from '../internals/OAuth1HttpClient';
import { BaseAPIClient } from '../internals/BaseAPIClient';

setJestTimeout();

// We cannot run this and the other example in parallel as one de-auths the other

// This example shows how to make generic API calls as a partner app. If you're making generic calls
// please consider sending a PR with the new endpoint you are using. Thanks

describe('Partner Example Tests with callbackUrl', () => {
	const USERNAME_SELECTOR = '#email';
	const PASSWORD_SELECTOR = '#password';
	const LOGIN_BUTTON_SELECTOR = '#submitButton';
	const AUTH_BUTTON_SELECTOR = '#submit-button';
	const password_config = getLoginConfig();
	const config = getPartnerAppConfig();
	config.callbackUrl = 'https://developer.xero.com/xero-node-test/callbackurl'; // Note you MUST add localhost as a callback domain in https://developer.xero.com/myapps
	const accounting1 = new BaseAPIClient(config);
	let authUrl: string;
	let requestToken: RequestToken;
	let authState: AccessToken;
	let page: any;
	let oauth_verifier: string;

	beforeAll(async () => {
		requestToken = await accounting1.oauth1Client.getRequestToken();
		authUrl = accounting1.oauth1Client.buildAuthoriseUrl(requestToken);

		// Direct user to the authorise URL
		const browser = await puppeteer.launch({
			headless: true,
		});
		page = await browser.newPage();
		await page.goto(authUrl);

		// /user logs into Xero and Auths your app
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(password_config.userName);
		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(password_config.password);

		await page.click(LOGIN_BUTTON_SELECTOR);
		await page.waitForNavigation();
		await page.waitForNavigation();
		await page.click(AUTH_BUTTON_SELECTOR);

		await delay(2500);

		// Here is where your cutomer will be redirected back to your callbackUrl. From that you can get the oauth_verifier.
		// Below is an example of the query parameters on the callbackUrl
		// ?oauth_token=IAIXWWYYCGG0JA6VE9B4CSV7YOKFUY&oauth_verifier=2896958&org=zfI4JWUAyKgcyGT4zOMyf0

		const pageUrl = page.url(); // This is the URL that your customer gets redirected back to

		const querystrings = querystring.parse(pageUrl);
		oauth_verifier = querystrings.oauth_verifier as string;

		browser.close();
	});

	describe('Partner Example Tests with callbackUrl', async () => {
		it('it returns the authorised url', async () => {
			expect(authUrl).toContain('xero.com');
		});

		it('it returns a PIN when the user allows access to the app', async () => {
			expect(oauth_verifier).not.toBeNull();
		});

		it('it can make a successful API call', async () => {
			authState = await accounting1.oauth1Client.swapRequestTokenforAccessToken(requestToken, oauth_verifier);
			const inv1 = await accounting1.oauth1Client.get('/api.xro/2.0/Organisation') as any;
			expect(inv1.Status).toEqual('OK');
		});

		it('it can still make a successfull API call after refreshing the access token', async () => {
			await accounting1.oauth1Client.refreshAccessToken();
			const inv2 = await accounting1.oauth1Client.get('/api.xro/2.0/Organisation') as any;
			expect(inv2.Status).toEqual('OK');
		});

		describe('OAuth State', () => {
			let accounting2_callback: BaseAPIClient;
			it('it allows you to keep copy of the state in your own dadtastore', async () => {
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
				const inv3 = await accounting1.oauth1Client.get('/api.xro/2.0/Organisation') as any;
				expect(inv3.Status).toEqual('OK');
			});
		});
	});
});

export function delay(timeout: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}
