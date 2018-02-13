import { OAuth } from 'oauth';

export class InMemoryOAuth {

	private returnErr = null;
	private returnData = null;
	private returnHttpResponse = null;

	public get(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {

		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public delete(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public put(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		body: string,
		contentType: string,
		callback: (err: any, data: string, httpResponse: any) => void) {
		callback(this.returnErr, this.returnData, this.returnHttpResponse);
	}

	public callbackResultsForNextCall(returnGetErr: any, returnGetData: string, returnGetHttpResponse) {
		this.returnErr = returnGetErr;
		this.returnData = returnGetData;
		this.returnHttpResponse = returnGetHttpResponse;
	}
}
