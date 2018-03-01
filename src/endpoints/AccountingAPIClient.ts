import { AccountsResponse, InvoicesResponse, Invoice, ContactGroupsResponse, ContactGroup, CurrenciesResponse, EmployeesResponse, Currency, Employee, ContactsResponse, ReportsResponse } from '../interfaces/AccountingAPI';
import { XeroAPIClient, IXeroClientConfiguration } from '../XeroAPIClient';
import { IOAuthClient } from '../OAuthClient';
import { URLSearchParams } from 'url';

export class AccountingAPIClient extends XeroAPIClient {

	public constructor(options: IXeroClientConfiguration, _oauthClient?: IOAuthClient, _oauthLib?: any) {
		super(options, _oauthClient, _oauthLib);
	}

	public accounts = {
		get: async (args?: { AccountID: string }): Promise<AccountsResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
			}

			return this.get<AccountsResponse>(endpoint);
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

			return this.get<InvoicesResponse>(endpoint);
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

			return this.get<string>(endpoint, 'application/pdf');
		}, // TODO: Something about { Invoices: Invoice[] } ??? Maybes
		create: async (invoice: Invoice | { Invoices: Invoice[] }): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'invoices?summarizeErrors=false';

			return this.put<InvoicesResponse>(endpoint, invoice);
		},
		update: async (invoice: Invoice, args: { InvoiceID: string }): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = `invoices`;

			if (args && args.InvoiceID) {
				endpoint += `/${args.InvoiceID}`;
			}

			endpoint += '?summarizeErrors=false';

			return this.post<InvoicesResponse>(endpoint, invoice);
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

			return this.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroup: ContactGroup): Promise<ContactGroupsResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'contactgroups?summarizeErrors=false';

			return this.put<ContactGroupsResponse>(endpoint, contactGroup);
		},
		update: async (contactGroup: ContactGroup, args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			endpoint += '?summarizeErrors=false';

			return this.post<ContactGroupsResponse>(endpoint, contactGroup);
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

				return this.delete<ContactGroupsResponse>(endpoint);
			}
		}
	};

	public currencies = {
		get: async (): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			// TODO: Do we need to add summerazieErrors?
			const endpoint = 'currencies';
			return this.put<CurrenciesResponse>(endpoint, currency);
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
			return this.get<any>(endpoint);
		},
		create: async (employee: Employee): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.put<any>(endpoint, employee);
		}
	};

	public contacts = {
		get: async (): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.get<ContactsResponse>(endpoint);
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

			return this.get<ReportsResponse>(endpoint);
		}
	};

	public purchaseorders = {
		create: async (body?: object): Promise<any> => {
			const endpoint = 'purchaseorders?summarizeErrors=true';
			// TODO: Add interface here
			return this.post<any>(endpoint, body);
		}
	};
}
