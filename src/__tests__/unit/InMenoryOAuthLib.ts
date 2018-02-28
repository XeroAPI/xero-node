
export class InMemoryOAuthLib {

	[x: string]: any;
	private returnErr: any = null;
	private returnData: any = null;
	private returnHttpResponse: any = null;
	private lastCalledUrl = '';
	private returnOauthToken: string = null;
	private returnOauthSecret: string = null;

	public lastCalledThisURL(url: string) {
		expect(this.lastCalledUrl).toBe(url);
	}

	public setTokenSecret(oauth_token: string, oauth_secret: string){
		this.returnOauthToken = oauth_token;
		this.returnOauthSecret = oauth_secret;
	}

	public get(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
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
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public delete(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		this.lastCalledUrl = url;
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
}
