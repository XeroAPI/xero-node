import { OAuthClient, IOAuthClient } from './OAuthClient';
import { AccountingResponse, Invoice, ContactGroup } from './interfaces/AccountingResponse';

export interface IXeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKey?: string;
	callbackUrl?: string;
	userAgent?: string;
}

export class XeroAPIClient {
	private oauthToken: string;
	private oauthSecret: string;

	constructor(private options: IXeroClientConfiguration, private _oauthClient?: IOAuthClient) {
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

		if (!this._oauthClient) {
			this._oauthClient = new OAuthClient({
				consumerKey: this.options.consumerKey,
				consumerSecret: consumerSecret,
				oauthToken: this.oauthToken,
				oauthSecret: this.oauthSecret
			});
		}
	}

	public invoices = {
		get: async (args?: any): Promise<AccountingResponse<Invoice>> => {

			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'invoices';
			if (args && args.InvoiceId) {
				endpoint = endpoint + '/' + args.InvoiceId;
			}

			// TODO: I think we want to not return the oauth.get HTTP object incase we change oauth lib
			return this._oauthClient.get<AccountingResponse<Invoice>>(endpoint, args);
		}
	};

	public contactgroups = {
		get: async (args?: any): Promise<AccountingResponse<ContactGroup>> => {

			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupId) {
				endpoint = endpoint + '/' + args.ContactGroupId;
			}

			return this._oauthClient.get<AccountingResponse<ContactGroup>>(endpoint, args);
		},
		create: async (contactGroup: ContactGroup, args?: any): Promise<AccountingResponse<ContactGroup>> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupId) {
				endpoint = endpoint + '/' + args.ContactGroupId;
			}

			return this._oauthClient.put<AccountingResponse<ContactGroup>>(endpoint, args);
		}
	};

	// private checkAuthentication() {
	// 	// TODO
	// }
}
