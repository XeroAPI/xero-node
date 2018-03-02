import { IXeroClientConfiguration } from './BaseAPIClient';
import { getStringFromFile } from './utils';
import { IOAuth1Configuration, IOAuth1State } from './OAuth1HttpClient';

export function mapState(xeroConfig: IXeroClientConfiguration): Partial<IOAuth1State> {
	const cert = xeroConfig.PrivateKeyCert ? getStringFromFile(xeroConfig.PrivateKeyCert) : null; // TODO don't read twice

	if (xeroConfig.AppType == 'private' || xeroConfig.AppType == 'partner') {
		return {
			accessToken: {
				oauth_token: xeroConfig.ConsumerKey,
				oauth_token_secret: cert,
			}
		};
	} else {
		return {};
	}
}

export function mapConfig(xeroConfig: IXeroClientConfiguration): IOAuth1Configuration {
	const API_BASE = 'https://api.xero.com';
	const API_BASE_PATH = '/api.xro/2.0/';
	const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
	const OAUTH_ACCESS_TOKEN_PATH = '/oauth/AccessToken';

	const cert = xeroConfig.PrivateKeyCert ? getStringFromFile(xeroConfig.PrivateKeyCert) : null;

	const oauthConfig: IOAuth1Configuration = {
		apiBaseUrl: API_BASE,
		apiBasePath: API_BASE_PATH,
		oauthRequestTokenPath: OAUTH_REQUEST_TOKEN_PATH,
		oauthAccessTokenPath: OAUTH_ACCESS_TOKEN_PATH,
		accept: 'application/json',
		userAgent: 'NodeJS-XeroAPIClient.' + xeroConfig.ConsumerKey, // TODO add package.json version here
		consumerKey: xeroConfig.ConsumerKey,
		consumerSecret: xeroConfig.ConsumerSecret,
		signatureMethod: undefined
	};

	if (xeroConfig.AppType == 'private') {
		oauthConfig.consumerSecret = cert;
		oauthConfig.signatureMethod = 'RSA-SHA1';
	}
	else if (xeroConfig.AppType == 'public') {
		oauthConfig.signatureMethod = 'HMAC-SHA1';
	}
	else if (xeroConfig.AppType == 'partner') {
		oauthConfig.consumerSecret = cert;
		oauthConfig.signatureMethod = 'RSA-SHA1';
	}

	return oauthConfig;
}
