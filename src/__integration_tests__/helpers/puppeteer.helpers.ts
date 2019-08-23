import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

export async function tryTakeScreenshot(page: puppeteer.Page, tag: string) {
	try {
		// Step 1: create destination directory, if it doesn't already exist.
		try {
			// This 'artifacts' directory is referenced in .circleci/config.yml.
			fs.mkdirSync('artifacts');
		} catch (err) {
			// Re-throw all exceptions except the EEXIST error which means "directory already exists"
			if (err.code !== 'EEXIST') {
				throw err;
			}
		}

		// Step 2: save the screenshot.
		await page.screenshot({
			path: `artifacts/screenshot-${tag}-${Date.now()}.png`,
			fullPage: true
		});
	} catch (err) {
		// log then ignore
		console.warn('Failed to capture screenshot', err);
	}
}
