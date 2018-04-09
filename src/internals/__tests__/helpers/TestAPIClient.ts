import { BaseAPIClient, XeroClientConfiguration } from '../../BaseAPIClient';
import { IOAuth1HttpClient, AccessToken } from '../../OAuth1HttpClient';

export class TestAPIClient extends BaseAPIClient {
	public constructor(xeroConfig: XeroClientConfiguration, authState?: AccessToken, _oauthClient?: IOAuth1HttpClient) {
		super(xeroConfig, authState, {}, _oauthClient);
	}
}
