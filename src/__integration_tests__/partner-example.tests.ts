import { AccountingAPIClient } from '../AccountingAPIClient';
import * as puppeteer from 'puppeteer';
import { getPartnerAppConfig, getLoginConfig, setJestTimeout } from './helpers/integration.helpers';
import { IOAuth1State } from '../internals/OAuth1HttpClient';

setJestTimeout();

describe('Partner Example Tests', () => {
	const USERNAME_SELECTOR = '#email';
	const PASSWORD_SELECTOR = '#password';
	const LOGIN_BUTTON_SELECTOR = '#submitButton';
	const AUTH_BUTTON_SELECTOR = '#submit-button';
	const password_config = getLoginConfig();
	const config = getPartnerAppConfig();
	console.log(config);
	const accounting1 = new AccountingAPIClient(config);
	let authUrl: string;
	let browser: any;
	let page;
	let pin: string;

	// Needs your Xero password so that it can auth an Org


	// password-config must be in this format
	// {
	// 	"userName": "email here",
	// 		"password": "passwordHere"
	// }

	beforeAll(async () => {
		try{
			await accounting1.oauth1.getUnauthorisedRequestToken();
			authUrl = accounting1.oauth1.buildAuthoriseUrl();
		}
		catch(error) {
			console.log('THIS', error)
		}

		console.log('authUrl: ', authUrl)

		browser = await puppeteer.launch({
			headless: true,
		});
		page = await browser.newPage();
		page.setDefaultNavigationTimeout(60000);
		await page.goto(authUrl);
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(password_config.userName);
	
		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(password_config.password);
	
		await page.click(LOGIN_BUTTON_SELECTOR);
		await page.waitForNavigation();
		await page.waitForNavigation();
		await page.click(AUTH_BUTTON_SELECTOR);
	
		await delay(2500);

		pin = await page.evaluate(() => {
			const PIN_SELECTOR = '#pin-input';
			const query = (document.querySelector(PIN_SELECTOR) as any).value;
			return query;
		});
		console.log('pin', pin);
	});

	afterAll(() => {
		browser.close();
	})

	it('it returns the authorised url', async () => {
		expect(authUrl).toContain('xero.com');
	});

	it('it returns a PIN when the user allows access to the app', async () => {
		expect(pin).not.toBeNull();
	});

	it('it can make a successful API call', async () => {
		await accounting1.oauth1.swapRequestTokenforAccessToken(pin);
		const inv1 = await accounting1.invoices.get();
		expect(inv1.Status).toEqual('OK');
	});

	it('it can still make a successfull API call after refreshing the access token', async () => {
		await accounting1.oauth1.refreshAccessToken();
		const inv2 = await accounting1.invoices.get();
		expect(inv2.Status).toEqual('OK');
	});

	describe('OAuth State', () => {
		let state: IOAuth1State;
		let accounting2: AccountingAPIClient;
		it('it allows you to keep copy of the state', async () => {
			state = await accounting1.oauth1.getState();
			expect(state.accessToken).not.toBeNull();
			expect(state.oauth_session_handle).not.toBeNull();
			expect(state.requestToken).not.toBeNull();
		  })
		  
		  it('it allows you to restore a new instance of the client next time your user logs in', async () => {
			accounting2 = new AccountingAPIClient(config);
			accounting2.oauth1.setState(state);
			expect(accounting2.oauth1.getState()).toMatchObject(state);
		  });

		  it('it lets you make API calls using the restored state', async () => {
			const inv3 = await accounting2.invoices.get();
			expect(inv3.Status).toEqual('OK');
		  });
	})

});


function delay(timeout: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}
