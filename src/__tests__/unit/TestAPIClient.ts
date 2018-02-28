import { XeroAPIClient, IXeroClientConfiguration } from '../../XeroAPIClient';
import { IOAuthClient } from '../../OAuthClient';

export class TestAPIClient extends XeroAPIClient {
	public constructor(options: IXeroClientConfiguration, _oauthClient?: IOAuthClient, _oauthLib?: any) {
		super(options, _oauthClient, _oauthLib);
	}
}
