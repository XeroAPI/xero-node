import { BaseAPIClient, IXeroClientConfiguration } from '../../BaseAPIClient';
import { IOAuth1HttpClient, IOAuth1State } from '../../OAuth1HttpClient';

export class TestAPIClient extends BaseAPIClient {
	public constructor(xeroConfig: IXeroClientConfiguration, authState?: IOAuth1State, _oauthClient?: IOAuth1HttpClient) {
		super(xeroConfig, authState, {}, _oauthClient);
	}
}
