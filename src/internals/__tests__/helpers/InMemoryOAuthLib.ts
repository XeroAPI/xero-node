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
	private returnErr: any = null;
	private returnData: any = null;
	private returnHttpResponse: any = null;
	private lastCalledUrl = '';
	private lastCalledVerb = '';
	private return_oauth_token: string = null;
	private return_oauth_secret: string = null;
	private returnAuthorisedToken: string = null;
	private returnAuthorisedSecret: string = null;
	private returnSessionHandle: string = null;
	private lastRequestedBody: string = null;

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
		this.returnErr = null;
		this.returnData = null;
		this.returnHttpResponse = null;
		this.lastCalledUrl = '';
		this.lastRequestedBody = null;
		this.lastCalledVerb = '';
		this.return_oauth_token = null;
		this.return_oauth_secret = null;
		this.returnAuthorisedToken = null;
		this.returnAuthorisedSecret = null;
		this.returnSessionHandle = null;
	}

	public lastCalledThisVerb(verb: string) {
		expect(this.lastCalledVerb).toBe(verb);
	}

	public set_SwapRequestTokenforAccessToken(oauth_token: string, oauth_secret: string, sessionHandle?: string) {
		this.returnAuthorisedToken = oauth_token;
		this.returnAuthorisedSecret = oauth_secret;
		this.returnSessionHandle = sessionHandle;
	}

	public lastRequestedHadBody(expectedBody: any) {
		if (expectedBody) {
			expect(this.lastRequestedBody).toMatch(JSON.stringify(expectedBody));
		} else {
			expect(this.lastRequestedBody).toBeNull();
		}
	}

	public get(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastCalledVerb = 'get';
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public post(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		body: any,
		contentType: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastCalledVerb = 'post';
		this.lastRequestedBody = body;
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public delete(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastCalledVerb = 'delete';
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public put(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		body: string,
		contentType: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
		this.lastRequestedBody = body;
		this.lastCalledVerb = 'put';
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public callbackResultsForNextCall(returnGetErr: any, returnGetData: string, returnGetHttpResponse: any) {
		this.returnErr = returnGetErr;
		this.returnData = returnGetData;
		this.returnHttpResponse = returnGetHttpResponse;
	}

	public set_getOAuthRequestToken(oauth_token: string, oauth_secret: string) {
		this.return_oauth_token = oauth_token;
		this.return_oauth_secret = oauth_secret;
	}

	public getOAuthRequestToken(
		callback: (err: any, oauth_token: string, oauth_token_secret: string, result: any) => any) {
		callback(null, this.return_oauth_token, this.return_oauth_secret, null);
	}

	public set__performSecureRequest(oauth_token: string, oauth_secret: string, sessionHandle?: string) {
		this.returnAuthorisedToken = oauth_token;
		this.returnAuthorisedSecret = oauth_secret;
		this.returnSessionHandle = sessionHandle;
	}

	public _performSecureRequest(
		oauth_token: string,
		oauth_token_secret: string,
		verb: string,
		oauthAccessTokenPath: string,
		extraParams: any,
		something: any,
		something2: any,
		callback: (err: any, response: any) => any) {
		callback(null, `oauth_session_handle=${this.returnSessionHandle}&oauth_token_secret=${this.returnAuthorisedSecret}&oauth_token=${this.returnAuthorisedToken}`);
	}

	public getOAuthAccessToken(
		authedToken: string,
		authedSecret: string,
		oauthVerifier: any,
		callback: (err: any, oauth_token: string, oauth_token_secret: string, result: any) => any) {
		callback(null, this.returnAuthorisedToken, this.returnAuthorisedSecret, { oauth_session_handle: this.returnSessionHandle });
	}
}
