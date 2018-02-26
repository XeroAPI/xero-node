import { OAuth } from 'oauth';

export class InMemoryOAuth {

	[x: string]: any;
	private returnErr = null;
	private returnData = null;
	private returnHttpResponse = null;
	private lastCalledUrl = '';

	public lastCalledThisURL(url: string) {
		expect(this.lastCalledUrl).toBe(url);
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

	public callbackResultsForNextCall(returnGetErr: any, returnGetData: string, returnGetHttpResponse) {
		this.returnErr = returnGetErr;
		this.returnData = returnGetData;
		this.returnHttpResponse = returnGetHttpResponse;
	}
}
