import { AccountingAPIClient } from '../AccountingAPIClient';
import * as puppeteer from 'puppeteer';
import { getPartnerAppConfig, getLoginConfig, setJestTimeout } from './helpers/integration.helpers';
import * as querystring from 'querystring';
import { IOAuth1State } from '../internals/OAuth1HttpClient';

setJestTimeout();

describe('Partner Example Tests with callbackUrl', () => {
	const USERNAME_SELECTOR = '#email';
	const PASSWORD_SELECTOR = '#password';
	const LOGIN_BUTTON_SELECTOR = '#submitButton';
	const AUTH_BUTTON_SELECTOR = '#submit-button';
	const password_config = getLoginConfig();
	const config = getPartnerAppConfig();
	config.callbackUrl = 'http://localhost/oauth/callbackurl'; // Note you MUST add localhost as a callback domain in https://developer.xero.com/myapps
	const accounting1 = new AccountingAPIClient(config);
	let authUrl: string;
	let browser: any;
	let page: any;
	let oauth_verifier: string;

	beforeAll(async () => {
		await accounting1.oauth1Client.getUnauthorisedRequestToken();
		authUrl = accounting1.oauth1Client.buildAuthoriseUrl();

		// Direct user to the authorise URL
		browser = await puppeteer.launch({
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
			await accounting1.oauth1Client.swapRequestTokenforAccessToken(oauth_verifier);
			const inv1 = await accounting1.invoices.get();
			expect(inv1.Status).toEqual('OK');
		});

		it('it can still make a successfull API call after refreshing the access token', async () => {
			await accounting1.oauth1Client.refreshAccessToken();
			const inv2 = await accounting1.invoices.get();
			expect(inv2.Status).toEqual('OK');
		});

		describe('OAuth State', () => {
			let state: IOAuth1State;
			let accounting2: AccountingAPIClient;
			it('it allows you to keep copy of the state in your own dadtastore', async () => {
				// Saves your state to your datastore
				state = await accounting1.oauth1Client.getState();
				expect(state.accessToken).not.toBeNull();
				expect(state.oauth_session_handle).not.toBeNull();
				expect(state.requestToken).not.toBeNull();

				// This is how you can check when you have to refresh your Access Token
				expect(typeof state.oauth_expires_at.getDate).toBe('function');
			});

			it('it allows you to restore a new instance of the client next time your user logs in', async () => {
				accounting2 = new AccountingAPIClient(config);
				// Get state from your data store
				accounting2.oauth1Client.setState(state);
				expect(accounting2.oauth1Client.getState()).toMatchObject(state);
			});

			it('it lets you make API calls using the restored state', async () => {
				const inv3 = await accounting2.invoices.get();
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
