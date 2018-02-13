import { OAuth } from 'oauth';

export class InMemoryOAuth {

	private returnGetErr = null;
	private returnGetData = null;
	private returnGetHttpResponse = null;

	public get(
		url: string,
		oauthToken: string,
		oauthSecret: string,
		callback: (err: any, data: string, httpResponse: any) => void) {

		callback(this.returnGetErr, this.returnGetData, this.returnGetHttpResponse);
	}

	public callbackForNextGet(returnGetErr: any, returnGetData: string, returnGetHttpResponse) {
		this.returnGetErr = returnGetErr;
		this.returnGetData = returnGetData;
		this.returnGetHttpResponse = returnGetHttpResponse;
	}
}
