import { IHttpClient, IOAuth1Client, IOAuth1HttpClient, OAuth1HttpClient, IOAuth1Configuration } from './OAuth1HttpClient';
import { IXeroClientConfiguration } from './XeroAPIClient';
import { mapConfig, mapState } from './config-helper';

export abstract class BaseAPIClient {

	public constructor(xeroConfig: IXeroClientConfiguration, private _oauth1httpClient?: IOAuth1HttpClient) {
		if (!xeroConfig) {
			throw new Error('Config must be passed in when creating a new instance');
		}
		// tslint:disable-next-line:no-debugger
		debugger;

		if (!this._oauth1httpClient) {
			const oauthConfig: IOAuth1Configuration = mapConfig(xeroConfig);
			this._oauth1httpClient = new OAuth1HttpClient(oauthConfig);
			this._oauth1httpClient.setState(mapState(xeroConfig)); // only affects private and partner apps
		}
	}

	public readonly http: IHttpClient = {
		get: this._oauth1httpClient.get,
		put: this._oauth1httpClient.put,
		post: this._oauth1httpClient.post,
		delete: this._oauth1httpClient.delete
	};

	public readonly oauth1: IOAuth1Client = {
		state: this._oauth1httpClient.state,
		setState: this._oauth1httpClient.setState,
		getUnauthorisedRequestToken: this._oauth1httpClient.getUnauthorisedRequestToken,
		buildAuthoriseUrl: this._oauth1httpClient.buildAuthoriseUrl,
		swapRequestTokenforAccessToken: this._oauth1httpClient.swapRequestTokenforAccessToken
	};

}
