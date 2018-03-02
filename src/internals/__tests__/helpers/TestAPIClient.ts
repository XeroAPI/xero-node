import { BaseAPIClient, IXeroClientConfiguration } from '../../BaseAPIClient';
import { IOAuth1HttpClient } from '../../OAuth1HttpClient';

export class TestAPIClient extends BaseAPIClient {
	public constructor(xeroConfig: IXeroClientConfiguration, _oauthClient?: IOAuth1HttpClient) {
		super(xeroConfig, _oauthClient);
	}
}
