import { OAuthClient, IOAuthClient, IOAuthClientConfiguration } from './OAuthClient';
import { getStringFromFile } from './utils';

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

const API_BASE = 'https://api.xero.com';
const API_BASE_PATH = '/api.xro/2.0/';
const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
const OAUTH_ACCESS_TOKEN_PATH = '/oauth/AccessToken';

export class XeroAPIClient {

	// TODO make IState and can this be the same as options? Private might stuff that up
	private _state: any = {};

	// TODO: should an option be OAuthVersion ??? Either make it mandatory now - or later
	protected constructor(private options: IXeroClientConfiguration, private _oauthClient?: IOAuthClient, private _oauthLib?: any) {
		if (!this.options) {
			throw new Error('XeroAPIClient: options must be passed when creating a new instance');
		}
		// TODO: Check options for each app type

		const cert = options.PrivateKeyCert ? getStringFromFile(options.PrivateKeyCert) : null ;

		this._state = {
			consumerKey: this.options.ConsumerKey,
			consumerSecret: this.options.ConsumerSecret,
			oauthToken: null,
			oauthSecret: null
		};

		if (this.options.AppType == 'private') {
			this._state.oauthToken = this.options.ConsumerKey;
			this._state.oauthSecret = cert;
			this._state.consumerSecret = cert;
			this._state.signatureMethod = 'RSA-SHA1';
		}
		else if (this.options.AppType == 'public') {
			this._state.signatureMethod = 'HMAC-SHA1';
		}
		else if (this.options.AppType == 'partner') {
			this._state.oauthToken = this.options.ConsumerKey;
			this._state.oauthSecret = cert;
			this._state.consumerSecret = cert;
			this._state.signatureMethod = 'RSA-SHA1';
		}

		if (!this._oauthClient) {
			this._oauthClient = this.OAuthClientFactory();
		}
	}

	public get state(): any {
		return this._state;
	}

	// TODO? Rename to credentialState? Or credential.state like PyXero?
	public set state(newState: any) {
		this._state = { ...this.state, ...newState };
		this._oauthClient = this.OAuthClientFactory();
	}

	private OAuthClientFactory() {
		const defaultState: Partial<IOAuthClientConfiguration> = {
			apiBaseUrl: API_BASE,
			apiBasePath: API_BASE_PATH,
			oauthRequestTokenPath: OAUTH_REQUEST_TOKEN_PATH,
			oauthAccessTokenPath: OAUTH_ACCESS_TOKEN_PATH,
			accept: 'application/json',
			userAgent: 'NodeJS-XeroAPIClient.' + this._state.consumerKey // TODO add package.json version here
		};

		return this._oauthClient = new OAuthClient({ ...this._state, ...defaultState }, this._oauthLib);
	}

	// TODO: Rename methods have them update state etc
	// TODO: think about if the top two could be the same method
	// TODO: think about the method names. Will these be the same for OAuth2. Will we need seperate methods? That's
	// why at the moment I have kept them on tha oauth10a object.
	public oauth10a = {
		getUnauthorisedRequestToken: async () => this._oauthClient.getUnauthorisedRequestToken(),
		buildAuthoriseUrl: (unauthorisedRequestToken: string) => `https://api.xero.com/oauth/Authorize?oauth_token=${unauthorisedRequestToken}`, // TODO Check for callback URL
		getAccessToken: async (authorisedRequestToken: { oauth_token: string, oauth_token_secret: string }, oauth_verifier: string): Promise<{ oauth_token: string, oauth_token_secret: string }> => {
			const token = await this._oauthClient.SwapRequestTokenforAccessToken(authorisedRequestToken, oauth_verifier);
			this.state = { oauthToken: token.oauth_token, oauthSecret: token.oauth_token_secret };
			return token;
		}
	};

	// TODO protected checkAuthentication() { }

	protected get<T>(endpoint: string, acceptType?: string): Promise<T> {
		return this._oauthClient.get<T>(endpoint, acceptType);
	}

	protected post<T>(endpoint: string, body?: object): Promise<T> {
		return this._oauthClient.post<T>(endpoint, body);
	}

	protected put<T>(endpoint: string, body?: object): Promise<T> {
		return this._oauthClient.put<T>(endpoint, body);
	}

	protected delete<T>(endpoint: string): Promise<T> {
		return this._oauthClient.delete<T>(endpoint);
	}
}
