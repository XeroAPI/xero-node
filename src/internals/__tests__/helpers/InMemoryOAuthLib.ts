import { IOAuth1Configuration } from '../../OAuth1HttpClient';

export class InMemoryOAuthLibFactoryFactory {

	public inMemoryOAuthLib?: InMemoryOAuthLib;

	public constructor() {
		this.inMemoryOAuthLib = new InMemoryOAuthLib();
	}

	public newFactory(): (config?: IOAuth1Configuration) => InMemoryOAuthLib {
		return (config?: IOAuth1Configuration) => {
			this.inMemoryOAuthLib.setConfig(config);
			return this.inMemoryOAuthLib;
		};
	}
}

export class InMemoryOAuthLib {

	[x: string]: any;
	private err: boolean = null;
	private returnData: any = null;
	private returnHttpResponse: any = null;
	private lastCalledUrl = '';
	private lastCalledMethod = '';
	private return_oauth_token: string = null;
	private return_oauth_secret: string = null;
	private returnAuthorisedToken: string = null;
	private returnAuthorisedSecret: string = null;
	private returnSessionHandle: string = null;
	private lastRequestedBody: string = null;
	private oauth_expires_in: string = null;
	public _headers: any;

	constructor(private config?: IOAuth1Configuration) {
	}

	public setConfig(config?: IOAuth1Configuration) {
		this.config = config;
		(this.config as any)['key'] = 'test';
	}

	public lastCalledThisURL(url: string) {
		expect(this.lastCalledUrl).toBe(url);
	}

	public reset() {
		this.err = undefined;
		this.returnData = null;
		this.returnHttpResponse = null;
		this.lastCalledUrl = '';
		this.lastRequestedBody = null;
		this.lastCalledMethod = '';
		this.return_oauth_token = null;
		this.return_oauth_secret = null;
		this.returnAuthorisedToken = null;
		this.returnAuthorisedSecret = null;
		this.returnSessionHandle = null;
		this.oauth_expires_in = null;
	}

	public lastCalledThisMethod(verb: string) {
		expect(this.lastCalledMethod).toBe(verb);
	}

	public set_SwapRequestTokenforAccessToken(oauth_token: string, oauth_secret: string, oauth_expires_in: string, sessionHandle?: string) {
		this.returnAuthorisedToken = oauth_token;
		this.returnAuthorisedSecret = oauth_secret;
		this.returnSessionHandle = sessionHandle;
		this.oauth_expires_in = oauth_expires_in;
	}

	public lastRequestedHadBody(expectedBody: any) {
		if (expectedBody) {
			expect(this.lastRequestedBody).toMatch(JSON.stringify(expectedBody));
		} else {
			expect(this.lastRequestedBody).toBeNull();
		}
	}

	public lastHadThisHeader(expectedHeader: any) {
		if (expectedHeader) {
			expect(this._headers).toEqual({
				...{
					'Accept': 'application/json',
					'User-Agent': 'NodeJS-XeroAPIClient.RDGDV41TRLQZDFSDX96TKQ2KRJIW4C'
					// tslint:disable-next-line:align
				}, ...expectedHeader
			});
		}
	}

	public async get(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastCalledMethod = 'get';
		callback(this.err, this.returnData, this.returnHttpResponse);
	}

	public async post(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		body: any,
		contentType: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastCalledMethod = 'post';
		this.lastRequestedBody = body;
		callback(this.err, this.returnData, this.returnHttpResponse);
	}

	public async delete(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastCalledMethod = 'delete';
		callback(this.err, this.returnData, this.returnHttpResponse);
	}

	public async put(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		body: string,
		contentType: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastRequestedBody = body;
		this.lastCalledMethod = 'put';
		callback(this.err, this.returnData, this.returnHttpResponse);
	}

	public setResponse(isErr: boolean, returnGetData: string, returnGetHttpResponse: any) {
		this.err = isErr ? { ...returnGetHttpResponse, data: returnGetData } : undefined;
		this.returnData = returnGetData;
		this.returnHttpResponse = returnGetHttpResponse;
	}

	public set_getOAuthRequestToken(oauth_token: string, oauth_secret: string) {
		this.return_oauth_token = oauth_token;
		this.return_oauth_secret = oauth_secret;
	}

	public async getOAuthRequestToken(
		callback: (err: any, oauth_token: string, oauth_token_secret: string, result: any) => any) {
		this.lastCalledMethod = 'getOAuthRequestToken';
		callback(this.err, this.return_oauth_token, this.return_oauth_secret, null);
	}

	public set__performSecureRequest(oauth_token: string, oauth_secret: string, sessionHandle?: string, sessionExpires?: string) {
		this.returnAuthorisedToken = oauth_token;
		this.returnAuthorisedSecret = oauth_secret;
		this.returnSessionHandle = sessionHandle;
		this.oauth_expires_in = sessionExpires;
	}

	public async _performSecureRequest(
		oauth_token: string,
		oauth_token_secret: string,
		verb: string,
		oauthAccessTokenPath: string,
		extraParams: any,
		something: any,
		something2: any,
		callback: (err: any, response: any) => any) {
		this.lastCalledMethod = '_performSecureRequest';
		callback(this.err, `oauth_session_handle=${this.returnSessionHandle}&oauth_token_secret=${this.returnAuthorisedSecret}&oauth_token=${this.returnAuthorisedToken}&oauth_expires_in=${this.oauth_expires_in}`);
	}

	public async getOAuthAccessToken(
		authedToken: string,
		authedSecret: string,
		oauthVerifier: any,
		callback: (err: any, oauth_token: string, oauth_token_secret: string, result: any) => any) {
		this.lastCalledMethod = 'getOAuthAccessToken';
		callback(this.err,
			this.returnAuthorisedToken,
			this.returnAuthorisedSecret,
			{ oauth_session_handle: this.returnSessionHandle, oauth_expires_in: this.oauth_expires_in }
		);
	}
}
