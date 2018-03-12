import { AccountingAPIClient } from '../AccountingAPIClient';
import * as puppeteer from 'puppeteer';

// TODO: Turn this into a Jest test
// TODO: Have it run in CI

describe('Partner Example Tests', () => {
	const USERNAME_SELECTOR = '#email';
	const PASSWORD_SELECTOR = '#password';
	const LOGIN_BUTTON_SELECTOR = '#submitButton';
	// const AUTH_BUTTON_SELECTOR = '#submit-button';
	const password_config = require('./password-config.json');
	const config = require('./partner-config-example.json');
	const accounting1 = new AccountingAPIClient(config);
	let authUrl: string;
	let browser;
	let page;

	// Needs your Xero password so that it can auth an Org


	// password-config must be in this format
	// {
	// 	"userName": "email here",
	// 		"password": "passwordHere"
	// }

	/* TODO: find out why when getting the state of the request token returns
      a null, but still able to build the authorise url properly */
	it('it returns the authorised url', async () => {
		await accounting1.oauth1.getUnauthorisedRequestToken();
		authUrl = await accounting1.oauth1.buildAuthoriseUrl();
		expect(authUrl).not.toBeNull();
	});

	it('it shows the Authorise App screen when accessing the Authorise Url', async () => {
		console.log(authUrl);
		browser = await puppeteer.launch({ headless: false });
		page = await browser.newPage();
		await page.goto(authUrl);
	
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(password_config.userName);
	
		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(password_config.password);
	
		await page.click(LOGIN_BUTTON_SELECTOR);
		await page.waitForNavigation();
		await page.waitForNavigation();
	});
		// await page.click(AUTH_BUTTON_SELECTOR);
		// await page.waitForNavigation();
	
		// await delay(2500);

});


	



	// const pin = await page.evaluate(() => {
	// 	const PIN_SELECTOR = '#pin-input';
	// 	const query = (document.querySelector(PIN_SELECTOR) as any).value;
	// 	return query;
	// });

	// await accounting1.oauth1.swapRequestTokenforAccessToken(pin);
	// const inv1 = await accounting1.invoices.get();
	// console.log('Number of invoices (1): ', inv1.Invoices.length);

	// await accounting1.oauth1.refreshAccessToken();
	// const inv2 = await accounting1.invoices.get();
	// console.log('Number of invoices (2): ', inv2.Invoices.length);

	// // Save state into your datastore
	// const state = await accounting1.oauth1.state;
	// // Restore a new instance of the Client next time your user logs in

	// const accounting2 = new AccountingAPIClient(config);
	// accounting2.oauth1.setState(state);

	// // Now we can make the same request
	// const inv3 = await accounting1.invoices.get();
	// console.log('Number of invoices (3): ', inv3.Invoices.length);

	// await accounting1.oauth1.refreshAccessToken();
	// // Now we can make the same request
	// const inv4 = await accounting1.invoices.get();
	// console.log('Number of invoices (4): ', inv4.Invoices.length);


// function delay(timeout: number) {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, timeout);
// 	});
// }
