import { AccountsResponse, InvoicesResponse, Invoice, ContactGroupsResponse, ContactGroup, CurrenciesResponse, EmployeesResponse, Currency, Employee, ContactsResponse, ReportsResponse, AttachmentsResponse, OrganisationResponse, Contact, UsersResponse } from './AccountingAPI-types';
import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import * as fs from 'fs';
import * as querystring from 'querystring';
import { generateQueryString } from './internals/utils';

export class AccountingAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, {}, _oAuth1HttpClient);
	}

	public accounts = {
		get: async (args?: { AccountID?: string, where?: string, order?: string }): Promise<AccountsResponse> => {
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
				delete args.AccountID; // remove from query string
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<AccountsResponse>(endpoint);
		}
	};

	public invoices = {
		get: async (args?: { InvoiceID?: string, InvoiceNumber?: string, page?: number, order?: string, where?: string, createdByMyApp?: boolean, headers?: { [key: string]: string } }): Promise<InvoicesResponse> => {
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}

			let headers;
			if (args && args.headers) {
				// TODO: Support Modified After header
				headers = args.headers;
				delete args.headers; // remove from query string
			}

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<InvoicesResponse>(endpoint, headers);
		},
		savePDF: async (args?: { InvoiceID: string, InvoiceNumber?: string, savePath: string }): Promise<void> => {
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}
			endpoint += generateQueryString(args);

			const writeStream = fs.createWriteStream(args.savePath);

			return this.oauth1Client.writeResponseToStream(endpoint, 'application/pdf', writeStream);
		},
		create: async (invoice: Invoice | { Invoices: Invoice[] }): Promise<InvoicesResponse> => {
			const endpoint = 'invoices?summarizeErrors=false';

			return this.oauth1Client.put<InvoicesResponse>(endpoint, invoice);
		},
		update: async (invoice: Invoice, args?: { InvoiceID?: string, InvoiceNumber?: string, summarizeErrors?: boolean }): Promise<InvoicesResponse> => {
			let endpoint = `invoices`;

			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}

			args = { summarizeErrors: false, ...args };
			endpoint += generateQueryString(args);

			return this.oauth1Client.post<InvoicesResponse>(endpoint, invoice);
		},
		updateMultiple: async (invoices: Invoice[], args?: { where?: string, summarizeErrors?: boolean }): Promise<InvoicesResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			let endpoint = `invoices`;

			args = { summarizeErrors: false, ...args };
			endpoint += generateQueryString(args);

			return this.oauth1Client.post<InvoicesResponse>(endpoint, invoices);
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
			downloadAttachment: async (args?: { entityID: string, mimeType: string, fileName: string, pathToSave: string }) => {
				const endpoint = `${path}/${args.entityID}/attachments/${args.fileName}`;
				const writeStream = fs.createWriteStream(args.pathToSave);

				await this.oauth1Client.writeResponseToStream(endpoint, args.mimeType, writeStream);
			},
			uploadAttachment: async (args?: { entityID: string, mimeType: string, fileName: string, pathToUpload: string }) => {
				const endpoint = `${path}/${args.entityID}/attachments/${args.fileName}`;
				const readStream = fs.createReadStream(args.pathToUpload);

				const fileSize = fs.statSync(args.pathToUpload).size;

				return this.oauth1Client.readStreamToRequest(endpoint, args.mimeType, fileSize, readStream);
			},
		};
	}

	public contactgroups = {
		get: async (args?: { ContactGroupID?: string, where?: string, order?: string }): Promise<ContactGroupsResponse> => {

			// TODO: Support for where arg
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroup: ContactGroup, args?: { summarizeErrors: boolean }): Promise<ContactGroupsResponse> => {
			// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
			let endpoint = 'contactgroups?summarizeErrors=false';
			endpoint += generateQueryString(args);

			return this.oauth1Client.put<ContactGroupsResponse>(endpoint, contactGroup);
		},
		update: async (contactGroup: ContactGroup, args?: { ContactGroupID: string }): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
			}
			endpoint += generateQueryString({ summarizeErrors: false });

			return this.oauth1Client.post<ContactGroupsResponse>(endpoint, contactGroup);
		},
		contacts: {
			delete: async (args: { ContactGroupID: string, ContactID?: string }): Promise<ContactsResponse> => {
				// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
					delete args.ContactGroupID;
					if (args.ContactID) {
						endpoint = endpoint + '/' + args.ContactID;
						delete args.ContactID;
					}
				}
				endpoint += generateQueryString(args);

				return this.oauth1Client.delete<ContactsResponse>(endpoint);
			},
			create: async (contact: Contact, args: { ContactGroupID: string }): Promise<ContactsResponse> => {
				// To add contacts to a contact group use the following url /ContactGroups/ContactGroupID/Contacts
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
					delete args.ContactGroupID;
				}
				endpoint += generateQueryString(args);

				return this.oauth1Client.put<ContactsResponse>(endpoint, contact);
			}
		}
	};

	public currencies = {
		get: async (args?: { where?: string, order?: string }): Promise<CurrenciesResponse> => {
			let endpoint = 'currencies';

			if (args) {
				const queryObj: any = {};

				if (args.where) {
					queryObj.where = args.where;
				}

				if (args.order) {
					queryObj.order = args.order;
				}

				if (Object.keys(queryObj).length > 0) {
					endpoint += '?' + querystring.stringify(queryObj);
				}

			}

			return this.oauth1Client.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.oauth1Client.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public employees = {
		get: async (args?: { EmployeeID?: string, where?: string, order?: string, headers?: { [key: string]: string } }): Promise<EmployeesResponse> => {
			// TODO: Support for where arg
			let endpoint = 'employees';
			if (args && args.EmployeeID) {
				endpoint = endpoint + '/' + args.EmployeeID;
			}

			if (args) {
				const queryObj: any = {};

				if (args.where) {
					queryObj.where = args.where;
				}

				if (args.order) {
					queryObj.order = args.order;
				}

				if (Object.keys(queryObj).length > 0) {
					endpoint += '?' + querystring.stringify(queryObj);
				}

			}

			// TODO: Type
			return this.oauth1Client.get<any>(endpoint, (args && args.headers) ? args.headers : null);
		},
		create: async (employee: Employee | { Employees: Employee[] }): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.put<any>(endpoint, employee);
		},
		update: async (employee: Employee | { Employees: Employee[] }): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.post<any>(endpoint, employee);
		}
	};

	public users = {
		get: async (args?: { UserID?: string, where?: string, order?: string, headers?: { [key: string]: string } }): Promise<UsersResponse> => {
			// TODO: Support Modified After header
			let endpoint = 'users';
			if (args && args.UserID) {
				endpoint = endpoint + '/' + args.UserID;
			}

			if (args) {
				const queryObj: any = {};

				if (args.where) {
					queryObj.where = args.where;
				}

				if (args.order) {
					queryObj.order = args.order;
				}

				if (Object.keys(queryObj).length > 0) {
					endpoint += '?' + querystring.stringify(queryObj);
				}

			}

			return this.oauth1Client.get<UsersResponse>(endpoint, (args && args.headers) ? args.headers : null);
		}
	};

	public organisation = {
		get: async (): Promise<OrganisationResponse> => {
			const endpoint = 'organisation';
			return this.oauth1Client.get<OrganisationResponse>(endpoint);
		},
		CISSettings: {
			get: async (args: { OrganisationID: string }): Promise<OrganisationResponse> => {
				// TODO: Support for where arg
				let endpoint = 'organisation';
				if (args && args.OrganisationID) {
					endpoint = endpoint + '/' + args.OrganisationID + '/CISSettings';
				}
				// TODO: Type
				return this.oauth1Client.get<OrganisationResponse>(endpoint);
			}
		}
	};

	public contacts = {
		get: async (): Promise<ContactsResponse> => {
			const endpoint = 'contacts';
			return this.oauth1Client.get<ContactsResponse>(endpoint);
		},
		create: async (body?: object): Promise<ContactsResponse> => {
			const endpoint = 'contacts?summarizeErrors=true';
			return this.oauth1Client.post<ContactsResponse>(endpoint, body);
		},
		attachments: this.generateAttachmentsEndpoint('contacts')
	};

	public reports = {
		get: async (args?: { ReportID: string }): Promise<ReportsResponse> => {
			let endpoint = 'reports';
			if (args) {
				const reportId = args.ReportID;

				delete args.ReportID; // we don't want the ReportID in the querystring
				const query = querystring.stringify(args);

				endpoint = endpoint + '/' + reportId + (query ? '?' + query.toString() : '');
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
