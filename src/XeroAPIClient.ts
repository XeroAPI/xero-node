import { OAuthClient, IOAuthClient } from './OAuthClient';
import { Invoice, ContactGroup, ContactGroupsResponse, InvoicesResponse, CurrenciesResponse, Currency, ContactsResponse, AccountsResponse } from './interfaces/AccountingResponse';

export interface IXeroClientConfiguration {
	appType: 'public' | 'private' | 'partner';
	consumerKey: string;
	consumerSecret: string;
	privateKey?: string;
	callbackUrl?: string;
	userAgent?: string;
}

const API_BASE = 'https://api.xero.com';
const API_BASE_PATH = '/api.xro/2.0/';
const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
const OAUTH_ACCESS_TOKEN_PATH = '/oauth/AccessToken';

export class XeroAPIClient {
	private oauthToken: string;
	private oauthSecret: string;

	// TODO make IState
	private _state: any;

	constructor(private options: IXeroClientConfiguration, private _oauthClient?: IOAuthClient, private _oauth?: any) {
		if (!this.options) {
			throw new Error('XeroAPIClient: options must be passed when creating a new instance');
		}
		// TODO: Check options for each app type
		this._state = {
			consumerKey: this.options.consumerKey,
			consumerSecret: this.options.consumerSecret,
			oauthToken: this.oauthToken,
			oauthSecret: this.oauthSecret,
			apiBaseUrl: API_BASE,
			apiBasePath: API_BASE_PATH,
			oauthRequestTokenPath: OAUTH_REQUEST_TOKEN_PATH,
			oauthAccessTokenPath: OAUTH_ACCESS_TOKEN_PATH,
			accept: 'application/json'
		};

		// TODO: Can we remove signatureMethod from state? Could also remove the URLs from state

		if (this.options.appType == 'private') {
			this._state.oauthToken = this.options.consumerKey;
			this._state.oauthSecret = this.options.privateKey;
			this._state.consumerSecret = this.options.privateKey;
			this._state.signatureMethod =	'RSA-SHA1';
		}
		else if (this.options.appType == 'public') {
			this._state.signatureMethod = 'HMAC-SHA1';
		}

		if (!this._oauthClient) {
			this._oauthClient = new OAuthClient(this._state, this._oauth);
		}
	}

	public get state(): any {
		return this._state;
	}

	public set state(state: any) {
		this._state = state;
	}

	// TODO: Rename methods have them update state etc
	public oauth10a = {
		getUnauthorisedRequestToken: async () => this._oauthClient.getUnauthorisedRequestToken(),
		buildAuthorizeUrl: (unauthorisedRequestToken: string) => `https://api.xero.com/oauth/Authorize?oauth_token=${unauthorisedRequestToken}`,
		getAccessToken: (authedRT: { oauth_token: string, oauth_token_secret: string }, oauth_verifier: string): Promise<{ oauth_token: string, oauth_token_secret: string }> => {
			const token = this._oauthClient.SwapRequestTokenforAccessToken(authedRT, oauth_verifier);
			// Set token store
			return token;
		}
	};

	private get<T>(endpoint: string, args?: any): Promise<T> {
		return this._oauthClient.get<T>(endpoint, args);
	}

	private post<T>(endpoint: string, body?: object, args?: any): Promise<T> {
		return this._oauthClient.post<T>(endpoint, body, args);
	}

	private put<T>(endpoint: string, body?: object, args?: any): Promise<T> {
		return this._oauthClient.put<T>(endpoint, body, args);
	}

	private delete<T>(endpoint: string, body?: object, args?: any): Promise<T> {
		return this._oauthClient.delete<T>(endpoint, args);
	}

	public accounts = {
		get: async (args?: any): Promise<AccountsResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
			}

			// TODO: I think we want to not return the oauth.get HTTP object incase we change oauth lib
			return this.get<AccountsResponse>(endpoint, args);
		}
	};

	public invoices = {
		get: async (args?: any): Promise<InvoicesResponse> => {
			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'invoices';
			if (args && args.InvoiceId) {
				endpoint = endpoint + '/' + args.InvoiceId;
			}

			// TODO: I think we want to not return the oauth.get HTTP object incase we change oauth lib
			return this.get<InvoicesResponse>(endpoint, args);
		},
		getPDF: async (args?: any): Promise<string> => {
			// is a string when args.accept = application/pdf
			args.Accept = 'application/pdf';

			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			// TODO: Refactor duplication
			let endpoint = 'invoices';
			if (args && args.InvoiceId) {
				endpoint = endpoint + '/' + args.InvoiceId;
			}

			// TODO: I think we want to not return the oauth.get HTTP object incase we change oauth lib
			return this.get<string>(endpoint, args);
		}, // TODO: Something about { Invoices: Invoice[] } ??? Maybes
		create: async (invoice: Invoice | { Invoices: Invoice[] }, args?: any): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'invoices?summarizeErrors=false';

			return this.put<InvoicesResponse>(endpoint, invoice, args);
		},
	};

	public contactgroups = {
		get: async (args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {

			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			return this.get<ContactGroupsResponse>(endpoint, args);
		},
		create: async (contactGroup: ContactGroup, args?: any): Promise<ContactGroupsResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupId;
			}

			endpoint += '?summarizeErrors=false';

			return this.put<ContactGroupsResponse>(endpoint, contactGroup, args);
		},
		update: async (contactGroup: ContactGroup, args?: any): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			endpoint += '?summarizeErrors=false';

			return this.post<ContactGroupsResponse>(endpoint, contactGroup, args);
		},
		contacts: {
			delete: async (args: { ContactGroupID: string, ContactID?: string }): Promise<ContactGroupsResponse> => {
				// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
				// TODO: Support for where arg
				// TODO: Summerize errors?
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
				}
				if (args && args.ContactGroupID && args.ContactID) {
					endpoint = endpoint + '/' + args.ContactID;
				}

				return this.delete<ContactGroupsResponse>(endpoint, args);
			}
		}
	};

	public currencies = {
		get: async (args?: any): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.get<CurrenciesResponse>(endpoint, args);
		},
		create: async (currency: Currency, args?: any): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public contacts = {
		get: async (args?: any): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.get<ContactsResponse>(endpoint, args);
		}
	};

	public reports = {
		get: async (args?: any): Promise<any> => {
			let endpoint = 'Reports';
			if (args) {
				if ((args.ReportID == 'AgedPayablesByContact' || args.ReportID == 'AgedReceivablesByContact') && !args.ContactID) {
					throw Error('required args for AgedPayablesByContact report: ContactID');
				}
				if (args.ReportID == 'BankStatement' && !args.bankAccountID) {
					throw Error('required args for BankStatement report: bankAccountID');
				}

				// TODO construct query string in a shared function
				const query = Object.keys(args).map((key: string) => {
					if (key != 'ReportID' && key != 'Accept') {
						return key + '=' + args[key];
					}
				}).filter((x) => x).join('&');

				endpoint = endpoint + '/' + args.ReportID + '?' + query;
			}

			// TODO: Add interface here
			return this.get<any>(endpoint, args);
		}
	};

	public purchaseorders = {
		post: async (body?: object, args?: any): Promise<any> => {
			const endpoint = 'purchaseorders?summarizeErrors=true';
			// TODO: Add interface here
			return this.post<any>(endpoint, body, args);
		}
	};
}
