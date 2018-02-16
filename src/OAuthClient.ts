import { OAuth } from 'oauth';

// TODO: Move this to XeroAPIClient
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

export interface IOAuthClient {
	get<T>(endpoint: string, args?: any): Promise<T>;
	delete<T>(endpoint: string, args?: any): Promise<T>;
	put<T>(endpoint: string, body: object, args?: any): Promise<T>;
}

// TODO: Do we call this?
export interface IHttpError {
	statusCode: number;
	body: string;
}

export class OAuthClient implements IOAuthClient {

	constructor(private options: IOAuthClientConfiguration, private oauth?: typeof OAuth) {
		if (!this.oauth) {
			this.oauth = this.oAuthFactory();
		}

	}

	private oAuthFactory() {
		return new OAuth(
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

	public async get<T>(endpoint: string, args?: any): Promise<T> {
		// this.checkAuthentication();
		// TODO: Refactor
		if (args && args.Accept) {
			const oauth = new OAuth(
				OAUTH_BASE + OAUTH_REQUEST_TOKEN_PATH, 	// requestTokenUrl
				OAUTH_BASE + OAUTH_ACCESS_TOKEN_PATH, 	// accessTokenUrl
				this.options.consumerKey, 				// consumerKey
				this.options.consumerSecret,							// consumerSecret
				'1.0A',									// version
				null,									// authorize_callback
				'RSA-SHA1',								// signatureMethod
				null,									// nonceSize
				{										// customHeaders
					'Accept': args.Accept,
					'User-Agent': 'NodeJS-XeroAPIClient'
				}
			);

			return new Promise<T>((resolve, reject) => {
				const request = oauth.get(
					API_BASE + API_BASE_PATH + endpoint,	// url
					this.options.oauthToken,						// oauth_token
					this.options.oauthSecret);

				let allChunks: any = null;

				request.addListener('response', function(response: any) {
					response.setEncoding('binary');
					response.addListener('data', function(chunk: any) {
						allChunks = allChunks + chunk;
					});
					response.addListener('end', function() {
						resolve(allChunks);
					});
				});
				request.end();
			});
		}

		return new Promise<T>((resolve, reject) => {
			this.oauth.get(
				API_BASE + API_BASE_PATH + endpoint,	// url
				this.options.oauthToken,						// oauth_token
				this.options.oauthSecret,						// oauth_token_secret
				(err: object, data: string, httpResponse: any) => {
					// data is the body of the response

					if (err) {
						const toReturn: IHttpError = {
							statusCode: httpResponse.statusCode,
							body: data
						};
						reject(toReturn);
					} else {
						const toReturn = JSON.parse(data) as T;
						// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
						return resolve(toReturn);
					}
				}
			);

		});
	}

	public async put<T>(endpoint: string, body: object, args?: any): Promise<T> {
		// this.checkAuthentication();
		return new Promise<T>((resolve, reject) => {
			this.oauth.put(
				API_BASE + API_BASE_PATH + endpoint,	// url
				this.options.oauthToken,				// oauth_token
				this.options.oauthSecret,				// oauth_token_secret
				JSON.stringify(body), 		// Had to do this not sure if there is another way
				'application/json',
				(err: any, data: string, httpResponse: any) => {
					// data is the body of the response

					if (err) {
						const toReturn: IHttpError = {
							statusCode: httpResponse.statusCode,
							body: data
						};
						reject(toReturn);
					} else {
						const toReturn = JSON.parse(data) as T;
						// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
						return resolve(toReturn);
					}
				}
			);

		});
	}

	public async delete<T>(endpoint: string, args?: any): Promise<T> {
		// this.checkAuthentication();
		return new Promise<T>((resolve, reject) => {
			this.oauth.delete(
				API_BASE + API_BASE_PATH + endpoint,	// url
				this.options.oauthToken,				// oauth_token
				this.options.oauthSecret,				// oauth_token_secret
				(err: any, data: string, httpResponse: any) => {
					// data is the body of the response

					if (err) {
						const toReturn: IHttpError = {
							statusCode: httpResponse.statusCode,
							body: data
						};
						reject(toReturn);
					} else {
						let toReturn: T = null;
						if (data) {
							toReturn = JSON.parse(data) as T;
						}

						// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
						return resolve(toReturn);
					}
				}
			);

		});
	}
}
