import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient } from './internals/OAuth1HttpClient';

export class PracticeAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(
			options,
			{
				tenantType: 'PRACTICE'
			},
			_oAuth1HttpClient
		);
	}

}
