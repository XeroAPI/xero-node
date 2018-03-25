/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import * as path from 'path';
import * as fs from 'fs';
import * as querystring from 'querystring';

export function getStringFromFile(location: string) {
	const privateKeyFile = path.resolve(location);
	const privateKey = fs.readFileSync(privateKeyFile, 'utf8');
	return privateKey;
}

export function generateQueryString(args: { [key: string]: any }, addSummarizeErrorsParam: boolean = false): string {
	const argsToUse = { ...args };
	if (addSummarizeErrorsParam && argsToUse.summarizeErrors == undefined) {
		argsToUse.summarizeErrors = false;
	}
	for (const key of Object.keys(argsToUse)) {
		if (argsToUse[key] == undefined) {
			delete argsToUse[key];
		}
	}
	if (argsToUse && Object.keys(argsToUse).length > 0) {
		return '?' + querystring.stringify(argsToUse);
	} else {
		return '';
	}
}
