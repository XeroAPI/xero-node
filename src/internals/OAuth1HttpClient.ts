/** @internalapi */
/** This second comment is required for typedoc to recognise the WHOLE FILE as @internalapi */

import { OAuth } from 'oauth';
import { IHttpClient } from './BaseAPIClient';
import * as fs from 'fs';
import * as querystring from 'querystring';

export interface IToken {
	oauth_token: string;
	oauth_token_secret: string;
}

export interface IOAuth1State {
	requestToken: IToken;
	accessToken: IToken;
	oauth_session_handle: string;
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
	getUnauthorisedRequestToken(): Promise<void>;
	buildAuthoriseUrl(): string;
	swapRequestTokenforAccessToken(oauth_verifier: string): Promise<void>;
	refreshAccessToken(): Promise<void>;
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
		oauth_session_handle: null
	};

	private oauthLib: typeof OAuth;

	constructor(private config: IOAuth1Configuration, private oAuthLibFactory?: (config: IOAuth1Configuration) => typeof OAuth) {
		if (!this.oAuthLibFactory) {
			this.oAuthLibFactory = function(passedInConfig: IOAuth1Configuration) {
				return new OAuth(
					passedInConfig.apiBaseUrl + passedInConfig.oauthRequestTokenPath, 	// requestTokenUrl
					passedInConfig.apiBaseUrl + passedInConfig.oauthAccessTokenPath, 	// accessTokenUrl
					passedInConfig.consumerKey, 										// consumerKey
					passedInConfig.consumerSecret,										// consumerSecret
					'1.0A',																// version
					null,																// authorize_callback
					passedInConfig.signatureMethod,										// signatureMethod. Neesds to ve "RSA-SHA1" for Private. "HMAC-SHA1" for public
					null,																// nonceSize
					{																	// customHeaders
						'Accept': passedInConfig.accept,
						'User-Agent': passedInConfig.userAgent
					}
				);
			};
		}

		this.oauthLib = this.oAuthLibFactory(this.config);
	}

	public getUnauthorisedRequestToken = async (): Promise<void> => {
		const requestTokenResult = await new Promise<{ oauth_token: string, oauth_token_secret: string }>((resolve, reject) => {
			this.oauthLib.getOAuthRequestToken((err: any, oauth_token: string, oauth_token_secret: string, result: any) => {
				// Callback sig:    callback(null, oauth_token, oauth_token_secret,  results );
				if (err) {
					// TODO: some better err here
					reject(err as any);
				} else {
					return resolve({ oauth_token, oauth_token_secret });
				}
			});
		});
		this.setState({ requestToken: requestTokenResult });
	}

	public buildAuthoriseUrl = () => {
		return `https://api.xero.com/oauth/Authorize?oauth_token=${this.state.requestToken.oauth_token}`; // TODO Check for callback URL
	}

	public swapRequestTokenforAccessToken = async (oauth_verifier: string) => {
		const swapResult = await new Promise<{ token: IToken, oAuthSessionHandle: string }>((resolve, reject) => {
			this.oauthLib.getOAuthAccessToken(this.state.requestToken.oauth_token, this.state.requestToken.oauth_token_secret, oauth_verifier, (err: any, oauthToken: string, oauthSecret: string, results: any) => {
				// results are : {oauth_expires_in: "1800", oauth_session_handle: "QVRNIFVKZO994AEQQLHN", oauth_authorization_expires_in: "315360000", xero_org_muid: "zfI4JWUAyKgcyGT4zOMyf0"}

				if (err) {
					// TODO: somet better err here
					reject(err);
				} else {
					// toReturn.httpResponse = httpResponse; // We could add http data - do we want to?
					const newAccessToken: IToken = {
						oauth_token: oauthToken,
						oauth_token_secret: oauthSecret
					};
					return resolve({ token: newAccessToken, oAuthSessionHandle: results.oauth_session_handle });
				}
			});
		});

		this.setState({ accessToken: swapResult.token, oauth_session_handle: swapResult.oAuthSessionHandle });
	}

	public refreshAccessToken = async () => {
		const refreshResult = await new Promise<{ token: IToken, oAuthSessionHandle: string }>((resolve, reject) => {
			console.log('this.state.accessToken.oauth_token: ', this.state.accessToken.oauth_token);

			// We're accessing this "private" method as the lib does not allow refresh with oauth_session_handle.
			this.oauthLib._performSecureRequest(this.state.accessToken.oauth_token,
				this.state.accessToken.oauth_token_secret, 'POST', this.config.apiBaseUrl + this.config.oauthAccessTokenPath, { oauth_session_handle: this.state.oauth_session_handle }, null, null,
				(err: any, response: string) => {

					const results = querystring.parse(response);
					if (err) {
						// TODO: better error here
						reject(err);
					} else {
						const newAccessToken: IToken = {
							oauth_token: results.oauth_token as string,
							oauth_token_secret: results.oauth_token_secret as string
						};
						return resolve({ token: newAccessToken, oAuthSessionHandle: results.oauth_session_handle as string });
					}
				});
		});

		this.setState({ accessToken: refreshResult.token, oauth_session_handle: refreshResult.oAuthSessionHandle });
	}

	public writeResponseToStream = (endpoint: string, mimeType: string, writeStream: fs.WriteStream): Promise<void> => {
		const oauthForPdf = this.oAuthLibFactory({ ...this.config, ...{ accept: mimeType } });

		return new Promise<void>((resolve, reject) => {
			const request = oauthForPdf.get(
				this.config.apiBaseUrl + this.config.apiBasePath + endpoint,
				this._state.accessToken.oauth_token,
				this._state.accessToken.oauth_token_secret);

			request.addListener('response', function(response: any) {
				response.addListener('data', function(chunk: any) {
					writeStream.write(chunk);
				});
				response.addListener('end', function() {
					writeStream.end();
					writeStream.close();
					resolve();
				});
			});
			request.end();
		});
	}

	public get = async <T>(endpoint: string, acceptType?: string): Promise<T> => {
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

	public setState(newState: Partial<IOAuth1State>) {
		this._state = { ...this.state, ...newState };
	}
}
