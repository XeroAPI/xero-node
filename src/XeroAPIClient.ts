import { URLSearchParams } from 'url';
import { OAuthClient, IOAuthClient, IOAuthClientConfiguration } from './OAuthClient';
import { Invoice, ContactGroup, ContactGroupsResponse, InvoicesResponse, CurrenciesResponse, Currency, ContactsResponse, AccountsResponse, Employee, EmployeesResponse, ReportsResponse } from './interfaces/AccountingResponse';

/**
 * TODO: Add support for the following keys:
 *
 * - PrivateKeyPassword
 * - CallbackPath
 */

export interface IXeroClientConfiguration {
	AppType: 'public' | 'private' | 'partner';
	ConsumerKey: string;
	ConsumerSecret: string;
	PrivateKeyCert?: string;
	PrivateKeyPassword?: string;
	CallbackBaseUrl?: string;
	CallbackPath?: string;
	UserAgent?: string;
}

const API_BASE = 'https://api.xero.com';
const API_BASE_PATH = '/api.xro/2.0/';
const OAUTH_REQUEST_TOKEN_PATH = '/oauth/RequestToken';
const OAUTH_ACCESS_TOKEN_PATH = '/oauth/AccessToken';

export class XeroAPIClient {

	// TODO make IState and can this be the same as options? Private might stuff that up
	private _state: any = {};

	// TODO: should an option be OAuthVersion ??? Either make it mandatory now - or later
	constructor(private options: IXeroClientConfiguration, private _oauthClient?: IOAuthClient, private _oauthLib?: any) {
		if (!this.options) {
			throw new Error('XeroAPIClient: options must be passed when creating a new instance');
		}
		// TODO: Check options for each app type

		this._state = {
			consumerKey: this.options.ConsumerKey,
			consumerSecret: this.options.ConsumerSecret,
			oauthToken: null,
			oauthSecret: null
		};

		if (this.options.AppType == 'private') {
			this._state.oauthToken = this.options.ConsumerKey;
			this._state.oauthSecret = this.options.PrivateKeyCert;
			this._state.consumerSecret = this.options.PrivateKeyCert;
			this._state.signatureMethod = 'RSA-SHA1';
		}
		else if (this.options.AppType == 'public') {
			this._state.signatureMethod = 'HMAC-SHA1';
		}
		else if (this.options.AppType == 'partner') {
			this._state.oauthToken = this.options.ConsumerKey;
			this._state.oauthSecret = this.options.PrivateKeyCert;
			this._state.consumerSecret = this.options.PrivateKeyCert;
			this._state.signatureMethod = 'RSA-SHA1';
		}

		if (!this._oauthClient) {
			this._oauthClient = this.OAuthClientFactory();
		}
	}

	public get state(): any {
		return this._state;
	}

	// TODO? Rename to credentialState? Or credential.state like PyXero?
	public set state(newState: any) {
		this._state = { ...this.state, ...newState };
		this._oauthClient = this.OAuthClientFactory();
	}

	private OAuthClientFactory() {
		const defaultState: Partial<IOAuthClientConfiguration> = {
			apiBaseUrl: API_BASE,
			apiBasePath: API_BASE_PATH,
			oauthRequestTokenPath: OAUTH_REQUEST_TOKEN_PATH,
			oauthAccessTokenPath: OAUTH_ACCESS_TOKEN_PATH,
			accept: 'application/json',
			userAgent: 'NodeJS-XeroAPIClient.' + this._state.consumerKey // TODO add package.json version here
		};

		return this._oauthClient = new OAuthClient({ ...this._state, ...defaultState }, this._oauthLib);
	}

	// TODO: Rename methods have them update state etc
	// TODO: think about if the top two could be the same method
	// TODO: think about the method names. Will these be the same for OAuth2. Will we need seperate methods? That's
	// why at the moment I have kept them on tha oauth10a object.
	public oauth10a = {
		getUnauthorisedRequestToken: async () => this._oauthClient.getUnauthorisedRequestToken(),
		buildAuthorizeUrl: (unauthorisedRequestToken: string) => `https://api.xero.com/oauth/Authorize?oauth_token=${unauthorisedRequestToken}`, // TODO Check for callback URL
		getAccessToken: async (authedRT: { oauth_token: string, oauth_token_secret: string }, oauth_verifier: string): Promise<{ oauth_token: string, oauth_token_secret: string }> => {
			const token = await this._oauthClient.SwapRequestTokenforAccessToken(authedRT, oauth_verifier);
			// Set this instate
			this.state = { oauthToken: token.oauth_token, oauthSecret: token.oauth_token_secret };
			return token;
		}
	};

	private get<T>(endpoint: string, acceptType?: string): Promise<T> {
		return this._oauthClient.get<T>(endpoint, acceptType);
	}

	private post<T>(endpoint: string, body?: object): Promise<T> {
		return this._oauthClient.post<T>(endpoint, body);
	}

	private put<T>(endpoint: string, body?: object): Promise<T> {
		return this._oauthClient.put<T>(endpoint, body);
	}

	private delete<T>(endpoint: string): Promise<T> {
		return this._oauthClient.delete<T>(endpoint);
	}

	// TODO all these endoints could be moved the their own folders.
	public accounts = {
		get: async (args?: any): Promise<AccountsResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
			}

			// TODO: I think we want to not return the oauth.get HTTP object incase we change oauth lib
			return this.get<AccountsResponse>(endpoint);
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
			return this.get<InvoicesResponse>(endpoint);
		},
		getPDF: async (args?: any): Promise<string> => {
			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			// TODO: Refactor duplication
			let endpoint = 'invoices';
			if (args && args.InvoiceId) {
				endpoint = endpoint + '/' + args.InvoiceId;
			}

			return this.get<string>(endpoint, 'application/pdf');
		}, // TODO: Something about { Invoices: Invoice[] } ??? Maybes
		create: async (invoice: Invoice | { Invoices: Invoice[] }, args?: any): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'invoices?summarizeErrors=false';

			return this.put<InvoicesResponse>(endpoint, invoice);
		},
	};

	public contactgroups = {
		get: async (args?: { ContactGroupID: string, Accept?: string }): Promise<ContactGroupsResponse> => {

			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			return this.get<ContactGroupsResponse>(endpoint);
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

			return this.put<ContactGroupsResponse>(endpoint, contactGroup);
		},
		update: async (contactGroup: ContactGroup, args?: any): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			endpoint += '?summarizeErrors=false';

			return this.post<ContactGroupsResponse>(endpoint, contactGroup);
		},
		contacts: {
			delete: async (args: { ContactGroupID: string, ContactID?: string, Accept?: string }): Promise<ContactGroupsResponse> => {
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

				return this.delete<ContactGroupsResponse>(endpoint);
			}
		}
	};

	public currencies = {
		get: async (args?: any): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency, args?: any): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public employees = {
		get: async (args?: any): Promise<EmployeesResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'employees';
			if (args && args.EmployeeID){
				endpoint = endpoint  + '/' + args.EmployeeID;
			}
			return this.get<any>(endpoint);
		},
		create: async (employee: Employee, args?: any): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this._oauthClient.put<any>(endpoint, employee);
		}
	};
	// private checkAuthentication() {
	// 	// TODO
	// }
	public contacts = {
		get: async (args?: any): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.get<ContactsResponse>(endpoint);
		}
	};

	public reports = {
		get: async (args?: any): Promise<ReportsResponse> => {
			let endpoint = 'Reports';
			if (args) {
				const query = new URLSearchParams(args);
				query.delete('Accept');
				query.delete('ReportID');

				endpoint = endpoint + '/' + args.ReportID + '?' + query.toString();
			}

			return this.get<ReportsResponse>(endpoint);
		}
	};

	public purchaseorders = {
		post: async (body?: object, args?: any): Promise<any> => {
			const endpoint = 'purchaseorders?summarizeErrors=true';
			// TODO: Add interface here
			return this.post<any>(endpoint, body);
		}
	};
}
