import { OAuth } from 'oauth';

export interface IOAuthClientConfiguration {
	consumerKey: string;
	consumerSecret: string;
	oauthToken: string;
	oauthSecret: string;

	apiBaseUrl: string;
	apiBasePath: string;
	oauthRequestTokenPath: string;
	oauthAccessTokenPath: string;

	signatureMethod: string;
	accept: string;
	userAgent: string;
}

export interface IOAuthClient {
	get<T>(endpoint: string, args?: any): Promise<T>;
	delete<T>(endpoint: string, args?: any): Promise<T>;
	put<T>(endpoint: string, body: object, args?: any): Promise<T>;
	post<T>(endpoint: string, body: object, args?: any): Promise<T>;
	getUnauthorisedRequestToken(): Promise<{ oauth_token: string, oauth_token_secret: string }>;
	SwapRequestTokenforAccessToken(authedRT: { oauth_token: string, oauth_token_secret: string }, oauth_verifier: string): Promise<{ oauth_token: string, oauth_token_secret: string }>;
}

// TODO: Do we call this?
export interface IHttpError {
	statusCode: number;
	body: string;
}

export class OAuthClient implements IOAuthClient {

	constructor(private options: IOAuthClientConfiguration, private oauth?: typeof OAuth) {
		if (!this.oauth) {
			this.oauth = this.oAuthFactory(this.options);
		}
	}

	private oAuthFactory(options: IOAuthClientConfiguration) {
		return new OAuth(
			options.apiBaseUrl + options.oauthRequestTokenPath, 	// requestTokenUrl
			options.apiBaseUrl + options.oauthAccessTokenPath, 	// accessTokenUrl
			options.consumerKey, 				// consumerKey
			options.consumerSecret,							// consumerSecret
			'1.0A',									// version
			null,									// authorize_callback
			options.signatureMethod,								// signatureMethod. Neesds to ve "RSA-SHA1" for Private. "HMAC-SHA1" for public
			null,									// nonceSize
			{										// customHeaders
				'Accept': options.accept,
				'User-Agent': options.userAgent
			}
		);
	}

	public async getUnauthorisedRequestToken(): Promise<{ oauth_token: string, oauth_token_secret: string }> {
		return new Promise<{ oauth_token: string, oauth_token_secret: string }>((resolve, reject) => {
			this.oauth.getOAuthRequestToken((err: any, oauth_token: string, oauth_token_secret: string, result: any) => {
				// Callback sig:    callback(null, oauth_token, oauth_token_secret,  results );
				if (err) {
					// TODO: something here F
					reject(err as any);
				} else {
					// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
					return resolve({ oauth_token, oauth_token_secret });
				}
			});
		});
	}

	public async SwapRequestTokenforAccessToken(authedRT: { oauth_token: string, oauth_token_secret: string }, oauth_verifier: string): Promise<{ oauth_token: string, oauth_token_secret: string }> {
		return new Promise<{ oauth_token: string, oauth_token_secret: string }>((resolve, reject) => {
			this.oauth.getOAuthAccessToken(authedRT.oauth_token, authedRT.oauth_token_secret, oauth_verifier, (err: any, oauth_token: string, oauth_token_secret: string, result: any) => {
				// getOAuthAccessToken = function(oauth_token, oauth_token_secret, oauth_verifier, callback)
				// callback sig  callback(err, results);

				if (err) {
					// TODO: something here
					reject(err);
				} else {
					// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
					return resolve({ oauth_token, oauth_token_secret });
				}
			});
		});
	}

	public async get<T>(endpoint: string, args?: any): Promise<T> {
		// this.checkAuthentication();
		// TODO make this Accept Accept: application/json

		if (args && args.Accept) {
			// Temp for getting PDFs
			const oauth = this.oAuthFactory({ ...this.options, ...{ accept: args.Accept } });

			return new Promise<T>((resolve, reject) => {
				const request = oauth.get(
					this.options.apiBaseUrl + this.options.apiBasePath + endpoint, // url
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
				this.options.apiBaseUrl + this.options.apiBasePath + endpoint, // url
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
				this.options.apiBaseUrl + this.options.apiBasePath + endpoint, // url
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

	public async post<T>(endpoint: string, body: object, args?: any): Promise<T> {
		// this.checkAuthentication();
		return new Promise<T>((resolve, reject) => {
			this.oauth.post(
				this.options.apiBaseUrl + this.options.apiBasePath + endpoint, // url
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
				this.options.apiBaseUrl + this.options.apiBasePath + endpoint, // url
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
