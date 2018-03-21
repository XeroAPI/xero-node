import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient, IOAuth1State } from './internals/OAuth1HttpClient';

export class PracticeAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, authState?: IOAuth1State, _oAuth1HttpClient?: IOAuth1HttpClient) {
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
