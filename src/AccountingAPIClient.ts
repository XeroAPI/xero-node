import { AccountsResponse, InvoicesResponse, Invoice, ContactGroupsResponse, ContactGroup, CurrenciesResponse, EmployeesResponse, Currency, Employee, ContactsResponse, ReportsResponse, AttachmentsResponse } from './AccountingAPI-types';
import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import { URLSearchParams } from 'url';

export class AccountingAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, _oauth1Client?: IOAuth1HttpClient) {
		super(options, _oauth1Client);
	}

	public accounts = {
		get: async (args?: { AccountID: string }): Promise<AccountsResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
			}

			return this.http.get<AccountsResponse>(endpoint);
		}
	};

	public attachments = {
		get: async (args?: { endpoint: string, id: string }): Promise<AttachmentsResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = `${args.endpoint}/${args.id}/attachments`;

			return this.http.get<AttachmentsResponse>(endpoint);
		}
	};

	public invoices = {
		get: async (args?: { InvoiceID: string }): Promise<InvoicesResponse> => {
			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
			}

			return this.http.get<InvoicesResponse>(endpoint);
		},
		getPDF: async (args?: { InvoiceID: string }): Promise<string> => {
			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			// TODO: Refactor duplication
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
			}

			return this.http.get<string>(endpoint, 'application/pdf');
		}, // TODO: Something about { Invoices: Invoice[] } ??? Maybes
		create: async (invoice: Invoice | { Invoices: Invoice[] }): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'invoices?summarizeErrors=false';

			return this.http.put<InvoicesResponse>(endpoint, invoice);
		},
		update: async (invoice: Invoice, args?: { InvoiceID?: string, InvoiceNumber?: string }): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = `invoices`;

			if (args && args.InvoiceID) {
				endpoint += `/${args.InvoiceID}`;
			}

			if (args && args.InvoiceNumber) {
				endpoint += `/${args.InvoiceNumber}`;
			}

			endpoint += '?summarizeErrors=false';

			return this.http.post<InvoicesResponse>(endpoint, invoice);
		},
		onlineInvoice: {
			get: async (args?: { InvoiceID: string }): Promise<string> => {
				let endpoint = 'invoices';
				if (args && args.InvoiceID) {
					endpoint = endpoint + '/' + args.InvoiceID;
				}

				endpoint += '/onlineinvoice';

				return this.http.get<any>(endpoint);
			}
		}
	};

	public contactgroups = {
		get: async (args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {

			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			return this.http.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroup: ContactGroup): Promise<ContactGroupsResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'contactgroups?summarizeErrors=false';

			return this.http.put<ContactGroupsResponse>(endpoint, contactGroup);
		},
		update: async (contactGroup: ContactGroup, args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			endpoint += '?summarizeErrors=false';

			return this.http.post<ContactGroupsResponse>(endpoint, contactGroup);
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

				return this.http.delete<ContactGroupsResponse>(endpoint);
			}
		}
	};

	public currencies = {
		get: async (): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.http.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			// TODO: Do we need to add summerazieErrors?
			const endpoint = 'currencies';
			return this.http.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public employees = {
		get: async (args?: { EmployeeID: string }): Promise<EmployeesResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'employees';
			if (args && args.EmployeeID) {
				endpoint = endpoint + '/' + args.EmployeeID;
			}
			// TODO: Type
			return this.http.get<any>(endpoint);
		},
		create: async (employee: Employee): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.http.put<any>(endpoint, employee);
		}
	};

	public contacts = {
		get: async (): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.http.get<ContactsResponse>(endpoint);
		}
	};

	public reports = {
		get: async (args?: any): Promise<ReportsResponse> => {
			let endpoint = 'Reports';
			if (args) {
				// TODO: Type this with an interface for args
				const query = new URLSearchParams(args);
				query.delete('ReportID');

				endpoint = endpoint + '/' + args.ReportID + '?' + query.toString();
			}

			return this.http.get<ReportsResponse>(endpoint);
		}
	};

	public purchaseorders = {
		create: async (body?: object): Promise<any> => {
			const endpoint = 'purchaseorders?summarizeErrors=true';
			// TODO: Add interface here
			return this.http.post<any>(endpoint, body);
		}
	};
}
