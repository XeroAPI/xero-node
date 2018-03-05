import { OAuth } from 'oauth';
import { IHttpClient } from './BaseAPIClient';
import * as fs from 'fs';

export interface IToken {
	oauth_token: string;
	oauth_token_secret: string;
}

export interface IOAuth1State {
	requestToken: IToken;
	accessToken: IToken;
}

export interface IOAuth1Configuration {
	consumerKey: string;
	consumerSecret: string;

	apiBaseUrl: string;
	apiBasePath: string;
	oauthRequestTokenPath: string;
	oauthAccessTokenPath: string;

	signatureMethod: string;
	accept: string;
	userAgent: string;
}

export interface IOAuth1Client {
	readonly state: IOAuth1State;
	setState(state: Partial<IOAuth1State>): void;
	getUnauthorisedRequestToken(): Promise<IToken>;
	buildAuthoriseUrl(unauthorisedRequestToken: string): string;
	swapRequestTokenforAccessToken(authedRT: IToken, oauth_verifier: string): Promise<IToken>;
}

export interface IOAuth1HttpClient extends IHttpClient, IOAuth1Client { }

// TODO: Do we call this?
export interface IHttpError {
	statusCode: number;
	body: string;
}

export class OAuth1HttpClient implements IOAuth1HttpClient {

	private _state: IOAuth1State = {
		requestToken: null,
		accessToken: null,
	};

	private oauthLib: typeof OAuth;

	constructor(private config: IOAuth1Configuration, private oauthLibFactory?: any) {
		// tslint:disable-next-line:prefer-conditional-expression
		if (!this.oauthLibFactory) {
			this.oauthLib = this.oAuthFactory(this.config);
		} else {
			this.oauthLib = oauthLibFactory(config);
		}
	}

	private oAuthFactory(config: IOAuth1Configuration): typeof OAuth {
		return new OAuth(
			config.apiBaseUrl + config.oauthRequestTokenPath, 	// requestTokenUrl
			config.apiBaseUrl + config.oauthAccessTokenPath, 	// accessTokenUrl
			config.consumerKey, 								// consumerKey
			config.consumerSecret,								// consumerSecret
			'1.0A',												// version
			null,												// authorize_callback
			config.signatureMethod,								// signatureMethod. Neesds to ve "RSA-SHA1" for Private. "HMAC-SHA1" for public
			null,												// nonceSize
			{													// customHeaders
				'Accept': config.accept,
				'User-Agent': config.userAgent
			}
		);
	}

	public getUnauthorisedRequestToken = async (): Promise<{ oauth_token: string, oauth_token_secret: string }> => {
		return new Promise<{ oauth_token: string, oauth_token_secret: string }>((resolve, reject) => {
			this.oauthLib.getOAuthRequestToken((err: any, oauth_token: string, oauth_token_secret: string, result: any) => {
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

	public buildAuthoriseUrl = (unauthorisedRequestToken: string) => {
		return `https://api.xero.com/oauth/Authorize?oauth_token=${unauthorisedRequestToken}`; // TODO Check for callback URL
	}

	public swapRequestTokenforAccessToken = async (authedRT: IToken, oauth_verifier: string): Promise<IToken> => {
		const token = await new Promise<IToken>((resolve, reject) => {
			this.oauthLib.getOAuthAccessToken(authedRT.oauth_token, authedRT.oauth_token_secret, oauth_verifier, (err: any, oauthToken: string, oauthSecret: string, results: any) => {
				// getOAuthAccessToken = function(oauth_token, oauth_token_secret, oauth_verifier, callback)
				// callback sig  callback(err, results);

				if (err) {
					// TODO: something here
					reject(err);
				} else {
					// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
					const newAccessToken: IToken = {
						oauth_token: oauthToken,
						oauth_token_secret: oauthSecret
					};
					return resolve(newAccessToken);
				}
			});
		});

		this.setState({ accessToken: token });
		return token;
	}

	writeResponseToStream(endpoint: string, mimeType: string, writeStream: fs.WriteStream): Promise<void> {
		throw new Error('Method not implemented.');
	}

	public get = async <T>(endpoint: string, acceptType?: string): Promise<T> => {
		// TODO this.checkAuthentication();
		if (acceptType == 'application/pdf') {
			// Temp for getting PDFs
			const oauthForPdf = this.oAuthFactory({ ...this.config, ...{ accept: acceptType } });

			return new Promise<T>((resolve, reject) => {
				const request = oauthForPdf.get(
					this.config.apiBaseUrl + this.config.apiBasePath + endpoint, // url
					this._state.accessToken.oauth_token,
					this._state.accessToken.oauth_token_secret);

				let allChunks: any = null;

				request.addListener('response', function(response: any) {
					// response.setEncoding('binary');
					response.addListener('data', function(chunk: any) {
						allChunks = allChunks + chunk;
					});
					response.addListener('end', function() {
						resolve(allChunks);
					});
				});
				request.end();
			});
		} else { // TODO avoid duplicate code
			return new Promise<T>((resolve, reject) => {
				this.oauthLib.get(
					this.config.apiBaseUrl + this.config.apiBasePath + endpoint, // url
					this._state.accessToken.oauth_token,
					this._state.accessToken.oauth_token_secret,
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
	}

	public put = async <T>(endpoint: string, body: object): Promise<T> => {
		// this.checkAuthentication();
		return new Promise<T>((resolve, reject) => {
			this.oauthLib.put(
				this.config.apiBaseUrl + this.config.apiBasePath + endpoint, // url
				this._state.accessToken.oauth_token,
				this._state.accessToken.oauth_token_secret,
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

	public post = async <T>(endpoint: string, body: object): Promise<T> => {
		// this.checkAuthentication();
		return new Promise<T>((resolve, reject) => {
			this.oauthLib.post(
				this.config.apiBaseUrl + this.config.apiBasePath + endpoint, // url
				this._state.accessToken.oauth_token,
				this._state.accessToken.oauth_token_secret,
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

	public delete = async <T>(endpoint: string): Promise<T> => {
		// this.checkAuthentication();
		return new Promise<T>((resolve, reject) => {
			this.oauthLib.delete(
				this.config.apiBaseUrl + this.config.apiBasePath + endpoint, // url
				this._state.accessToken.oauth_token,
				this._state.accessToken.oauth_token_secret,
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

	public get state(): IOAuth1State {
		return this._state;
	}

	public setState = (newState: Partial<IOAuth1State>) => {
		this._state = { ...this.state, ...newState };
	}
}
