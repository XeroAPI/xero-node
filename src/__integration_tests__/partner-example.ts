import { AccountingAPIClient } from '../AccountingAPIClient';
import * as puppeteer from 'puppeteer';

// TODO: Turn this into a Jest test
// TODO: Have it run in CI

(async function main() {
	const config = require('../partner-config.json');
	// Needs your Xero password so that it can auth an Org
	const password_config = require('./password-config.json');

	// password-config must be in this format
	// {
	// 	"userName": "email here",
	// 		"password": "passwordHere"
	// }

	const accounting1 = new AccountingAPIClient(config);

	try {
		await accounting1.oauth1.getUnauthorisedRequestToken();
		const url = await accounting1.oauth1.buildAuthoriseUrl();

		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();
		await page.goto(url);

		const USERNAME_SELECTOR = '#email';
		const PASSWORD_SELECTOR = '#password';
		const LOGIN_BUTTON_SELECTOR = '#submitButton';
		const AUTH_BUTTON_SELECTOR = '#submit-button';

		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(password_config.userName);

		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(password_config.password);

		await page.click(LOGIN_BUTTON_SELECTOR);
		await page.waitForNavigation();
		await page.waitForNavigation();

		await page.click(AUTH_BUTTON_SELECTOR);
		await page.waitForNavigation();

		await delay(2500);

		const pin = await page.evaluate(() => {
			const PIN_SELECTOR = '#pin-input';
			const query = (document.querySelector(PIN_SELECTOR) as any).value;
			return query;
		});

		await accounting1.oauth1.swapRequestTokenforAccessToken(pin);
		const inv1 = await accounting1.invoices.get();
		console.log('Number of invoices (1): ', inv1.Invoices.length);

		await accounting1.oauth1.refreshAccessToken();
		const inv2 = await accounting1.invoices.get();
		console.log('Number of invoices (2): ', inv2.Invoices.length);

		// Save state into your datastore
		const state = await accounting1.oauth1.state;
		// Restore a new instance of the Client next time your user logs in

		const accounting2 = new AccountingAPIClient(config);
		accounting2.oauth1.setState(state);

		// Now we can make the same request
		const inv3 = await accounting1.invoices.get();
		console.log('Number of invoices (3): ', inv3.Invoices.length);

		await accounting1.oauth1.refreshAccessToken();
		// Now we can make the same request
		const inv4 = await accounting1.invoices.get();
		console.log('Number of invoices (4): ', inv4.Invoices.length);
		browser.close();
	} catch (error) {
		console.log('ERROR: ', error);
	}
})();

function delay(timeout: number) {
	return new Promise((resolve) => {
		setTimeout(resolve, timeout);
	});
}
