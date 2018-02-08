
import { OAuth } from 'oauth';

export interface IXeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKey?: string;
	callbackUrl?: string;
	userAgent?: string;
}

const API_BASE = 'https://api.xero.com';
const API_BASE_PATH = '/api.xro/2.0/';
const OAUTH_BASE = 'https://api.xero.com';
const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
const OAUTH_ACCESS_TOKEN_PATH = '/oauth/Authorize';

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

		this.oauth = new OAuth(
			OAUTH_BASE + OAUTH_REQUEST_TOKEN_PATH, 	// requestTokenUrl
			OAUTH_BASE + OAUTH_ACCESS_TOKEN_PATH, 	// accessTokenUrl
			this.options.consumerKey, 				// consumerKey
			consumerSecret,							// consumerSecret
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

	// tslint:disable-next-line:member-ordering
	public invoice = {
		get: async (args?: any) => {

			let endpoint = 'invoice';
			if (args.Id){
				endpoint = endpoint + '/' + args.Id;
			}

			return this.xero_get(endpoint, args);
		}
	};

	private async xero_get(endpoint: string, args?: any) {
		this.checkAuthentication();

		return new Promise<any>((resolve, reject) => {
			this.oauth.get(
				API_BASE + API_BASE_PATH + endpoint,	// url
				this.oauthToken,						// oauth_token
				this.oauthSecret,						// oauth_token_secret
				(err: any, data: string, httpResponse: any) => {

					if (err) {
						console.log(`There was an err <${httpResponse.statusCode}>`);
						reject(err);
					} else {
						const toReturn = JSON.parse(data);
						toReturn.httpResponse = httpResponse;
						return resolve(toReturn);
					}
				}
			);

		});

	}

	private checkAuthentication() {
		// TODO
	}
}
