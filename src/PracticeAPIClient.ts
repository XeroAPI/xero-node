import { XeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient, AccessToken } from './internals/OAuth1HttpClient';

export class PracticeAPIClient extends BaseAPIClient {

	public constructor(options: XeroClientConfiguration, authState?: AccessToken, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(
			options,
			authState,
			{
				tenantType: 'PRACTICE'
			},
			_oAuth1HttpClient
		);
	}

}
