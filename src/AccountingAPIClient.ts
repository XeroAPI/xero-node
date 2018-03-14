import { AccountsResponse, InvoicesResponse, Invoice, ContactGroupsResponse, ContactGroup, CurrenciesResponse, EmployeesResponse, Currency, Employee, ContactsResponse, ReportsResponse, AttachmentsResponse } from './AccountingAPI-types';
import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import { URLSearchParams } from 'url';
import * as fs from 'fs';
import * as querystring from 'querystring';

export class AccountingAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, _oAuth1HttpClient);
	}

	public accounts = {
		get: async (args?: { AccountID: string }): Promise<AccountsResponse> => {
			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
			}

			return this.oauth1Client.get<AccountsResponse>(endpoint);
		}
	};

	public invoices = {
		get: async (args?: { InvoiceID?: string, page?: number, order?: string, where?: string, InvoiceNumber?: string, createdByMyApp?: boolean, queryParams?: string }): Promise<InvoicesResponse> => {
			// TODO: Support Modified After header
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
			}

			if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
			}

			if (args) {
				let queryObj: any = {};

				if (args.createdByMyApp) {
					queryObj.createdByMyApp = true;
				}

				if (args.where) {
					queryObj.where = args.where;
				}

				if (args.order) {
					queryObj.order = args.order;
				}

				if (args.page) {
					queryObj.page = args.page;
				}

				if (args.queryParams) {
					queryObj = { ...queryObj, ...querystring.parse(args.queryParams) };
				}

				if (Object.keys(queryObj).length > 0) {
					endpoint += '?' + querystring.stringify(queryObj);
				}
			}

			return this.oauth1Client.get<InvoicesResponse>(endpoint);
		},
		savePDF: async (args?: { InvoiceID: string, savePath: string }): Promise<void> => {
			// TODO: Support invoice number
			// TODO: Support for where arg
			// TODO: Summerize errors?
			// TODO: Refactor duplication
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
			}

			const writeStream = fs.createWriteStream(args.savePath);

			return this.oauth1Client.writeResponseToStream(endpoint, 'application/pdf', writeStream);
		}, // TODO: Something about { Invoices: Invoice[] } ??? Maybes
		create: async (invoice: Invoice | { Invoices: Invoice[] }): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'invoices?summarizeErrors=false';

			return this.oauth1Client.put<InvoicesResponse>(endpoint, invoice);
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

			return this.oauth1Client.post<InvoicesResponse>(endpoint, invoice);
		},
		onlineInvoice: {
			get: async (args?: { InvoiceID: string }): Promise<string> => {
				let endpoint = 'invoices';
				if (args && args.InvoiceID) {
					endpoint = endpoint + '/' + args.InvoiceID;
				}

				endpoint += '/onlineinvoice';

				return this.oauth1Client.get<any>(endpoint);
			}
		},
		attachments: this.generateAttachmentsEndpoint('invoices')
	};

	private generateAttachmentsEndpoint(path: string) {
		return {
			get: async (args?: { EntityID: string }): Promise<AttachmentsResponse> => {
				const endpoint = `${path}/${args.EntityID}/attachments`;
				return this.oauth1Client.get<AttachmentsResponse>(endpoint);
			},
			saveAttachment: async (args?: { entityID: string, mimeType: string, fileName: string, pathToSave: string }) => {
				const endpoint = `${path}/${args.entityID}/attachments/${args.fileName}`;
				const writeStream = fs.createWriteStream(args.pathToSave);

				await this.oauth1Client.writeResponseToStream(endpoint, args.mimeType, writeStream);
			},
		};
	}

	public contactgroups = {
		get: async (args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {

			// TODO: Support for where arg
			// TODO: Summerize errors?
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			return this.oauth1Client.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroup: ContactGroup): Promise<ContactGroupsResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			// TODO: Support for where arg
			// TODO: Summerize errors?
			const endpoint = 'contactgroups?summarizeErrors=false';

			return this.oauth1Client.put<ContactGroupsResponse>(endpoint, contactGroup);
		},
		update: async (contactGroup: ContactGroup, args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}

			endpoint += '?summarizeErrors=false';

			return this.oauth1Client.post<ContactGroupsResponse>(endpoint, contactGroup);
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

				return this.oauth1Client.delete<ContactGroupsResponse>(endpoint);
			}
		}
	};

	public currencies = {
		get: async (): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.oauth1Client.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			// TODO: Do we need to add summerazieErrors?
			const endpoint = 'currencies';
			return this.oauth1Client.put<CurrenciesResponse>(endpoint, currency);
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
			return this.oauth1Client.get<any>(endpoint);
		},
		create: async (employee: Employee): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.put<any>(endpoint, employee);
		}
	};

	public contacts = {
		get: async (): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.oauth1Client.get<ContactsResponse>(endpoint);
		},
		attachments: this.generateAttachmentsEndpoint('contacts')
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

			return this.oauth1Client.get<ReportsResponse>(endpoint);
		}
	};

	public purchaseorders = {
		create: async (body?: object): Promise<any> => {
			const endpoint = 'purchaseorders?summarizeErrors=true';
			// TODO: Add interface here
			return this.oauth1Client.post<any>(endpoint, body);
		}
	};
}
