import { IHttpClient, IOAuth1Client, IOAuth1HttpClient, OAuth1HttpClient, IOAuth1Configuration } from './OAuth1HttpClient';
import { mapConfig, mapState } from './config-helper';

/**
 * TODO: Add support for the following keys:
 *
 * - PrivateKeyPassword
 * - CallbackPath
 */

export interface IXeroClientConfiguration {
	AppType: 'public' | 'private' | 'partner';
	ConsumerKey: string;
	ConsumerSecret: string;
	PrivateKeyCert?: string;
	PrivateKeyPassword?: string;
	CallbackBaseUrl?: string;
	CallbackPath?: string;
}

export abstract class BaseAPIClient {

	public readonly http: IHttpClient;
	public readonly oauth1: IOAuth1Client;

	public constructor(xeroConfig: IXeroClientConfiguration, private _oauth1httpClient?: IOAuth1HttpClient) {
		if (!xeroConfig) {
			throw new Error('Config must be passed in when creating a new instance');
		}

		if (!this._oauth1httpClient) {
			const oauthConfig: IOAuth1Configuration = mapConfig(xeroConfig);
			this._oauth1httpClient = new OAuth1HttpClient(oauthConfig);
			this._oauth1httpClient.setState(mapState(xeroConfig)); // only affects private and partner apps
		}

		this.http = {
			get: this._oauth1httpClient.get,
			put: this._oauth1httpClient.put,
			post: this._oauth1httpClient.post,
			delete: this._oauth1httpClient.delete
		};

		this.oauth1 = {
			state: this._oauth1httpClient.state,
			setState: this._oauth1httpClient.setState,
			getUnauthorisedRequestToken: this._oauth1httpClient.getUnauthorisedRequestToken,
			buildAuthoriseUrl: this._oauth1httpClient.buildAuthoriseUrl,
			swapRequestTokenforAccessToken: this._oauth1httpClient.swapRequestTokenforAccessToken
		};
	}
}
