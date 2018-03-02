import { IXeroClientConfiguration } from '../../XeroAPIClient';
import { IOAuth1HttpClient } from '../../OAuth1HttpClient';
import { BaseAPIClient } from '../../BaseAPIClient';

export class TestAPIClient extends BaseAPIClient {
	public constructor(xeroConfig: IXeroClientConfiguration, _oauthClient?: IOAuth1HttpClient) {
		super(xeroConfig, _oauthClient);
	}
}
