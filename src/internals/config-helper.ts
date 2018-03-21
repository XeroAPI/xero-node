/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import { IXeroClientConfiguration, IApiConfiguration } from './BaseAPIClient';
import { getStringFromFile } from './utils';
import { IOAuth1Configuration, IOAuth1State } from './OAuth1HttpClient';

export function mapState(xeroConfig: IXeroClientConfiguration): IOAuth1State {
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

export function mapConfig(xeroConfig: IXeroClientConfiguration, apiConfig: IApiConfiguration): IOAuth1Configuration {

	// the logic for API_BASE can be used for testing against a mock server
	const API_BASE = process.env.XERO_API_BASE ? process.env.XERO_API_BASE : 'https://api.xero.com';
	const API_BASE_PATH = '/api.xro/2.0/';
	const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
	const OAUTH_ACCESS_TOKEN_PATH = '/oauth/AccessToken';

	let cert = xeroConfig.privateKeyPath ? getStringFromFile(xeroConfig.privateKeyPath) : null;

	if (xeroConfig.privateKeyString) {
		cert = xeroConfig.privateKeyString;
	}

	const oauthConfig: IOAuth1Configuration = {
		apiBaseUrl: API_BASE,
		apiBasePath: API_BASE_PATH,
		oauthRequestTokenPath: OAUTH_REQUEST_TOKEN_PATH,
		oauthAccessTokenPath: OAUTH_ACCESS_TOKEN_PATH,
		accept: 'application/json',
		userAgent: 'NodeJS-XeroAPIClient.' + xeroConfig.consumerKey, // TODO add package.json version here
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
