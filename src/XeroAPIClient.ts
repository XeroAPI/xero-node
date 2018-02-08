
import { OAuth } from 'oauth';
import { AccountingResponse } from './interfaces/AccountingResponse';

const API_BASE = 'https://api.xero.com';
const API_BASE_PATH = '/api.xro/2.0/';
const OAUTH_BASE = 'https://api.xero.com';
const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
const OAUTH_ACCESS_TOKEN_PATH = '/oauth/Authorize';

export interface IOAuthClientConfiguration {
	consumerKey: string;
	consumerSecret: string;
	oauthToken: string;
	oauthSecret: string;
}

export class OAuthClient {
	private oauth: typeof OAuth;

	constructor(private options: IOAuthClientConfiguration) {
		this.oauth = new OAuth(
			OAUTH_BASE + OAUTH_REQUEST_TOKEN_PATH, 	// requestTokenUrl
			OAUTH_BASE + OAUTH_ACCESS_TOKEN_PATH, 	// accessTokenUrl
			this.options.consumerKey, 				// consumerKey
			this.options.consumerSecret,							// consumerSecret
			'1.0A',									// version
			null,									// authorize_callback
			'RSA-SHA1',								// signatureMethod
			null,									// nonceSize
			{										// customHeaders
				'Accept': 'application/json',
				'User-Agent': 'NodeJS-XeroAPIClient'
			}
		);
	}

	public async get(endpoint: string, args?: any) {
		// this.checkAuthentication();

		return new Promise<AccountingResponse>((resolve, reject) => {
			this.oauth.get(
				API_BASE + API_BASE_PATH + endpoint,	// url
				this.options.oauthToken,						// oauth_token
				this.options.oauthSecret,						// oauth_token_secret
				(err: any, data: string, httpResponse: any) => {

					if (err) {
						console.log(`There was an err <${httpResponse.statusCode}>`);
						reject(err);
					} else {
						const toReturn = JSON.parse(data) as AccountingResponse;
						// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
						return resolve(toReturn);
					}
				}
			);

		});

	}
}

export interface IXeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKey?: string;
	callbackUrl?: string;
	userAgent?: string;
}

export class XeroAPIClient {
	private oauth: any;
	private oauthToken: string;
	private oauthSecret: string;

	constructor(private options: IXeroClientConfiguration) {
		if (!this.options) {
			throw new Error('XeroAPIClient: options must be passed when creating a new instance');
		}
		// TODO: Check options for each app type

		let consumerSecret = this.options.consumerSecret;
		if (this.options.appType == 'private') {
			this.oauthToken = this.options.consumerKey;
			this.oauthSecret = this.options.privateKey;
			consumerSecret = this.options.privateKey;
		}

		this.oauth = new OAuthClient({
			consumerKey: this.options.consumerKey,
			consumerSecret: consumerSecret,
			oauthToken: this.oauthToken,
			oauthSecret: this.oauthSecret
		});
	}

	// tslint:disable-next-line:member-ordering
	public invoice = {
		get: async (args?: any) => {

			let endpoint = 'invoice';
			if (args.Id) {
				endpoint = endpoint + '/' + args.Id;
			}

			return this.oauth.get(endpoint, args);
		}
	};

	// private checkAuthentication() {
	// 	// TODO
	// }
}
