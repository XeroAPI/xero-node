import * as puppeteer from 'puppeteer';
import * as querystring from 'querystring';

import { getLoginConfig } from './integration.helpers';
import { takeScreenshot as tryTakeScreenshot } from './puppeteer.helpers';

function getSecurityAnswer(config: { securityQuestions: Array<{ q: string, a: string }> }, question: string): string {
	for (const pair of config.securityQuestions) {
		if (question.indexOf(pair.q) >= 0) {
			return pair.a;
		}
	}
}

export async function loginToXero(authUrl: string, hasCallbackUrl: boolean): Promise<string> {
	const USERNAME_SELECTOR = '#email';
	const PASSWORD_SELECTOR = '#password';
	const LOGIN_BUTTON_SELECTOR = '#submitButton';
	const AUTH_BUTTON_SELECTOR = '#submit-button';
	const PIN_SELECTOR = '#pin-input';
	const login_config = getLoginConfig();

	// Direct user to the authorise URL
	const browser = await puppeteer.launch({
		headless: true
	});
	let page: puppeteer.Page;
	try {
		page = await browser.newPage();
		await page.goto(authUrl);

		// /user logs into Xero and Auths your app
		await page.click(USERNAME_SELECTOR);
		await page.keyboard.type(login_config.userName);
		await page.click(PASSWORD_SELECTOR);
		await page.keyboard.type(login_config.password);

		await page.click(LOGIN_BUTTON_SELECTOR);

		await doTwoStepAuthIfRequired(page, login_config);

		await page.waitForSelector(AUTH_BUTTON_SELECTOR);
		await page.click(AUTH_BUTTON_SELECTOR);
		await tryTakeScreenshot(page, 'auth');

		let oauth_verifier: string;
		if (hasCallbackUrl) {
			// Here is where your customer will be redirected back to your callbackUrl.
			// From that you can get the oauth_verifier.
			// Below is an example of the query parameters on the callbackUrl
			// ?oauth_token=IAIXWWYYCGG0JA6VE9B4CSV7YOKFUY&oauth_verifier=2896958&org=zfI4JWUAyKgcyGT4zOMyf0
			await page.waitForNavigation();
			const pageUrl = page.url(); // This is the URL that your customer gets redirected back to
			const querystrings = querystring.parse(pageUrl);
			oauth_verifier = querystrings.oauth_verifier as string;
		} else {
			// The pin is usually sent to your callback url, in this example,
			// callback url is set to null
			oauth_verifier = await page.$eval(PIN_SELECTOR, (node) => (node as any).value);
		}
		return oauth_verifier;
	} catch (err) {
		await tryTakeScreenshot(page, 'login');
		throw err;
	} finally {
		browser.close();
	}
}

async function doTwoStepAuthIfRequired(page: puppeteer.Page, login_config: any) {
	const TWOSTEPAUTH_OTHERMETHOD_BUTTON_SELECTOR = '[data-automationid="auth-othermethodbutton"]';
	const TWOSTEPAUTH_SECURITYQUESTIONS_BUTTON_SELECTOR = '[data-automationid="auth-authwithsecurityquestionsbutton"]';
	const TWOSTEPAUTH_FIRSTQUESTION_PGH_SELECTOR = '.auth-firstquestion';
	const TWOSTEPAUTH_FIRSTANSWER_INPUT_SELECTOR = '[data-automationid="auth-firstanswer--input"]';
	const TWOSTEPAUTH_SECONDQUESTION_PGH_SELECTOR = '.auth-secondquestion';
	const TWOSTEPAUTH_SECONDANSWER_INPUT_SELECTOR = '[data-automationid="auth-secondanswer--input"]';

	const TWOSTEPAUTH_SUBMIT_BUTTON_SELECTOR = '[data-automationid="auth-submitanswersbutton"]';

	try {
		await page.waitForSelector(TWOSTEPAUTH_OTHERMETHOD_BUTTON_SELECTOR, {
			timeout: 1000 // only wait 1 second here, because if 2SA is not required we want to bail asap
		});
	} catch (err) {
		console.log('Skipping two step auth because', err.message);
		return; // premature exit
	}

	await page.click(TWOSTEPAUTH_OTHERMETHOD_BUTTON_SELECTOR);

	await page.click(TWOSTEPAUTH_SECURITYQUESTIONS_BUTTON_SELECTOR);

	const firstQuestion = await page.$eval(TWOSTEPAUTH_FIRSTQUESTION_PGH_SELECTOR, (node) => (node as any).innerText);
	await page.click(TWOSTEPAUTH_FIRSTANSWER_INPUT_SELECTOR);
	await page.keyboard.type(getSecurityAnswer(login_config, firstQuestion));

	const secondQuestion = await page.$eval(TWOSTEPAUTH_SECONDQUESTION_PGH_SELECTOR, (node) => (node as any).innerText);
	await page.click(TWOSTEPAUTH_SECONDANSWER_INPUT_SELECTOR);
	await page.keyboard.type(getSecurityAnswer(login_config, secondQuestion));

	await page.click(TWOSTEPAUTH_SUBMIT_BUTTON_SELECTOR);
}
