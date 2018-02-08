import { OAuthClient } from './OAuthClient';
import { AccountingResponse } from './interfaces/AccountingResponse';

export interface IXeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKey?: string;
	callbackUrl?: string;
	userAgent?: string;
}

export class XeroAPIClient {
	private oauth: OAuthClient;
	private oauthToken: string;
	private oauthSecret: string;

	constructor(private options: IXeroClientConfiguration) {
		if (!this.options) {
			throw new Error('XeroAPIClient: options must be passed when creating a new instance');
		}
		// TODO: Check options for each app type

		let consumerSecret = this.options.consumerSecret;
		if (this.options.appType == 'private') {
			this.oauthToken = this.options.consumerKey;
			this.oauthSecret = this.options.privateKey;
			consumerSecret = this.options.privateKey;
		}

		this.oauth = new OAuthClient({
			consumerKey: this.options.consumerKey,
			consumerSecret: consumerSecret,
			oauthToken: this.oauthToken,
			oauthSecret: this.oauthSecret
		});
	}

	// tslint:disable-next-line:member-ordering
	public invoice = {
		get: async (args?: any): Promise<AccountingResponse> => {

			let endpoint = 'invoice';
			if (args.Id) {
				endpoint = endpoint + '/' + args.Id;
			}

			return this.oauth.get<AccountingResponse>(endpoint, args);
		}
	};

	// private checkAuthentication() {
	// 	// TODO
	// }
}
