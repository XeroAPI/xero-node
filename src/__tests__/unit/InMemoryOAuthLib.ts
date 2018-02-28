
export class InMemoryOAuthLib {

	[x: string]: any;
	private returnErr: any = null;
	private returnData: any = null;
	private returnHttpResponse: any = null;
	private lastCalledUrl = '';
	private lastCalledVerb = '';
	private returnOauthToken: string = null;
	private returnOauthSecret: string = null;
	private returnAuthorisedToken: string = null;
	private returnAuthorisedSecret: string = null;
	private lastRequestedBody: string = null;

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
		this.returnOauthToken = null;
		this.returnOauthSecret = null;
		this.returnAuthorisedToken = null;
		this.returnAuthorisedSecret = null;
	}

	public lastCalledThisVerb(verb: string) {
		expect(this.lastCalledVerb).toBe(verb);
	}

	public setTokenSecret(oauth_token: string, oauth_secret: string) {
		this.returnOauthToken = oauth_token;
		this.returnOauthSecret = oauth_secret;
	}

	public swapToAuthTokenSecret(oauth_token: string, oauth_secret: string) {
		this.returnAuthorisedToken = oauth_token;
		this.returnAuthorisedSecret = oauth_secret;
	}

	public lastRequestedHadBody(expectedBody: any) {
		expect(this.lastRequestedBody).toMatch(expectedBody);
	}

	public lastRequestHadNoBody() {
		expect(this.lastRequestedBody).toBeNull();
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

	public getOAuthRequestToken(
		callback: (err: any, oauth_token: string, oauth_token_secret: string, result: any) => any) {
		callback(null, this.returnOauthToken, this.returnOauthSecret, null);
	}

	public getOAuthAccessToken(
		authedToken: string,
		authedSecret: string,
		oauthVerifier: any,
		callback: (err: any, oauth_token: string, oauth_token_secret: string, result: any) => any) {
		callback(null, this.returnAuthorisedToken, this.returnAuthorisedSecret, null);
	}
}
