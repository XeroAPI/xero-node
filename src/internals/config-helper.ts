/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import { ApiConfiguration, XeroClientConfiguration } from './BaseAPIClient';
import { AccessToken, OAuth1Configuration } from './OAuth1HttpClient';
import { getStringFromFile } from './utils';
const version = require('../../package.json').version;

/** @private */
export function mapState(xeroConfig: XeroClientConfiguration): AccessToken {
	let cert = xeroConfig.privateKeyPath ? getStringFromFile(xeroConfig.privateKeyPath) : null; // TODO don't read twice

	if (xeroConfig.privateKeyString) {
		cert = xeroConfig.privateKeyString;
	}

	if (xeroConfig.appType == 'private') {
		return {
			oauth_token: xeroConfig.consumerKey,
			oauth_token_secret: cert
		};
	} else if (xeroConfig.appType == 'public') {
		return null;
	} else if (xeroConfig.appType == 'partner') {
		return null;
	} else {
		throw new Error(`Unrecognised app type: ${xeroConfig.appType} (expected private|public|partner)`);
	}
}

/** @private */
export function mapConfig(xeroConfig: XeroClientConfiguration, apiConfig: ApiConfiguration): OAuth1Configuration {

	// the logic for API_BASE can be used for testing against a mock server
	const API_BASE = process.env.XERO_API_BASE ? process.env.XERO_API_BASE : 'https://api.xero.com';
	const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
	const OAUTH_ACCESS_TOKEN_PATH = '/oauth/AccessToken';

	let cert = xeroConfig.privateKeyPath ? getStringFromFile(xeroConfig.privateKeyPath) : null;

	let userAgentString = 'NodeJS-XeroAPIClient';
	if (xeroConfig.userAgent){
		userAgentString = userAgentString + '.' + xeroConfig.userAgent;
	}

	userAgentString = userAgentString + '.' + version + '.' + xeroConfig.consumerKey;

	if (xeroConfig.privateKeyString) {
		cert = xeroConfig.privateKeyString;
	}

	const oauthConfig: OAuth1Configuration = {
		apiBaseUrl: API_BASE,
		apiBasePath: apiConfig.apiBasePath || '',
		oauthRequestTokenPath: OAUTH_REQUEST_TOKEN_PATH,
		oauthAccessTokenPath: OAUTH_ACCESS_TOKEN_PATH,
		accept: 'application/json',
		userAgent: userAgentString,
		consumerKey: xeroConfig.consumerKey,
		consumerSecret: xeroConfig.consumerSecret,
		tenantType: apiConfig.tenantType || null,
		signatureMethod: undefined,
		callbackUrl: xeroConfig.callbackUrl ? xeroConfig.callbackUrl : null
	};

	if (xeroConfig.appType == 'private') {
		oauthConfig.consumerSecret = cert;
		oauthConfig.signatureMethod = 'RSA-SHA1';
	}
	else if (xeroConfig.appType == 'public') {
		oauthConfig.signatureMethod = 'HMAC-SHA1';
	}
	else if (xeroConfig.appType == 'partner') {
		oauthConfig.consumerSecret = cert;
		oauthConfig.signatureMethod = 'RSA-SHA1';
	} else {
		throw new Error(`Unrecognised app type: ${xeroConfig.appType} (expected private|public|partner)`);
	}

	return oauthConfig;
}
