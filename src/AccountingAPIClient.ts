
import * as fs from 'fs';
import { IXeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient } from './internals/OAuth1HttpClient';
import { generateQueryString } from './internals/utils';
import {
	AccountsResponse,
	InvoicesResponse, Invoice,
	ContactGroupsResponse, ContactGroup,
	CurrenciesResponse, Currency,
	EmployeesResponse, Employee,
	ContactsResponse, Contact,
	ReportsResponse,
	AttachmentsResponse,
	OrganisationResponse,
	UsersResponse,
	BrandingThemesResponse,
	BankTransfersResponse, BankTransfer,
	TrackingCategoriesResponse, TrackingCategory, TrackingOption,
	TaxRatesResponse, TaxRate,
	ExpenseClaimsResponse, ExpenseClaim,
	ItemsResponse, Item,
	InvoiceRemindersResponse,
	JournalsResponse,
	PaymentsResponse, Payment,
	PrepaymentsResponse, Allocation
} from './AccountingAPI-types';

export interface QueryArgs {
	where?: string;
	order?: string;
}

export interface PagingArgs {
	page?: number;
}

export interface HeaderArgs {
	'If-Modified-Since'?: string;
}

export class AccountingAPIClient extends BaseAPIClient {

	public constructor(options: IXeroClientConfiguration, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, {}, _oAuth1HttpClient);
	}

	private generateHeader(args: HeaderArgs) {
		if (args && args['If-Modified-Since']) {
			const toReturn = {
				'If-Modified-Since': args['If-Modified-Since']
			};

			delete args['If-Modified-Since'];
			return toReturn;
		}
	}

	public accounts = {
		get: async (args?: { AccountID?: string } & QueryArgs & HeaderArgs): Promise<AccountsResponse> => {
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
				delete args.AccountID; // remove from query string
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<AccountsResponse>(endpoint, header);
		},
		create: async (account: any): Promise<AccountsResponse> => {
			// from docs: You can only add accounts one at a time (i.e. you'll need to do multiple API calls to add many accounts)
			const endpoint = 'accounts';
			return this.oauth1Client.put<AccountsResponse>(endpoint, account);
		},
		update: async (account: any, args?: { AccountID?: string }): Promise<AccountsResponse> => {
			// from docs: You can only update accounts one at a time (i.e. you’ll need to do multiple API calls to update many accounts)
			let endpoint = 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
				delete args.AccountID; // remove from query string
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.post<AccountsResponse>(endpoint, account);
		},
		delete: async (args: { AccountID: string }): Promise<AccountsResponse> => {
			// from docs: If an account is not able to be deleted (e.g. ssystem accounts and accounts used on transactions) you can update the status to ARCHIVED.
			const endpoint = 'accounts/' + args.AccountID;
			return this.oauth1Client.delete<AccountsResponse>(endpoint);
		},
		attachments: this.generateAttachmentsEndpoint('accounts')
	};

	public invoices = {
		get: async (args?: { InvoiceID?: string, InvoiceNumber?: string, page?: number, createdByMyApp?: boolean } & HeaderArgs & QueryArgs): Promise<InvoicesResponse> => {
			let endpoint = 'invoices';
			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}

			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<InvoicesResponse>(endpoint, header);
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

			return this.oauth1Client.writeUTF8ResponseToStream(endpoint, 'application/pdf', writeStream);
		},
		create: async (invoice: Invoice | { Invoices: Invoice[] }, args?: { summarizeErrors?: boolean }): Promise<InvoicesResponse> => {
			const endpoint = 'invoices' + generateQueryString(args, true);

			return this.oauth1Client.put<InvoicesResponse>(endpoint, invoice);
		},
		update: async (invoices: Invoice | Invoice[], args?: { InvoiceID?: string, InvoiceNumber?: string, where?: string, summarizeErrors?: boolean }): Promise<InvoicesResponse> => {
			let endpoint = `invoices`;

			if (args && args.InvoiceID) {
				endpoint = endpoint + '/' + args.InvoiceID;
				delete args.InvoiceID;
			} else if (args && args.InvoiceNumber) {
				endpoint = endpoint + '/' + args.InvoiceNumber;
				delete args.InvoiceNumber;
			}

			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<InvoicesResponse>(endpoint, invoices);
		},
		onlineInvoice: {
			get: async (args?: { InvoiceID: string }): Promise<string> => {
				let endpoint = 'invoices';
				if (args && args.InvoiceID) {
					endpoint = endpoint + '/' + args.InvoiceID;
					delete args.InvoiceID;
				}

				endpoint += '/onlineinvoice';

				return this.oauth1Client.get<any>(endpoint);
			}
		},
		attachments: this.generateAttachmentsEndpoint('invoices')
	};

	public invoiceReminders = {
		get: async (): Promise<InvoiceRemindersResponse> => {
			const endpoint = 'invoicereminders/settings';
			return this.oauth1Client.get<InvoiceRemindersResponse>(endpoint);
		}
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

				await this.oauth1Client.writeBinaryResponseToStream(endpoint, args.mimeType, writeStream);
			},
			uploadAttachment: async (args?: { entityID: string, mimeType: string, fileName: string, pathToUpload: string }) => {
				const endpoint = `${path}/${args.entityID}/attachments/${args.fileName}`;
				const readStream = fs.createReadStream(args.pathToUpload);

				const fileSize = fs.statSync(args.pathToUpload).size;

				return this.oauth1Client.readStreamToRequest(endpoint, args.mimeType, fileSize, readStream);
			},
		};
	}

	public banktransactions = {
		create: async (bankTransactions: any): Promise<any> => {
			return null; // TODO
		}
	};

	public contactgroups = {
		get: async (args?: { ContactGroupID?: string } & QueryArgs): Promise<ContactGroupsResponse> => {

			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroups: ContactGroup | ContactGroup[], args?: { summarizeErrors?: boolean }): Promise<ContactGroupsResponse> => {
			const endpoint = 'contactgroups' + generateQueryString(args, true);

			return this.oauth1Client.put<ContactGroupsResponse>(endpoint, contactGroups);
		},
		update: async (contactGroups: ContactGroup | ContactGroup[], args?: { ContactGroupID: string, summarizeErrors?: boolean }): Promise<ContactGroupsResponse> => {
			let endpoint = 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}
			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<ContactGroupsResponse>(endpoint, contactGroups);
		},
		contacts: {
			delete: async (args: { ContactGroupID: string, ContactID?: string }): Promise<ContactsResponse> => {
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
					delete args.ContactGroupID;
					if (args.ContactID) {
						endpoint = endpoint + '/' + args.ContactID;
						delete args.ContactID;
					}
				}
				endpoint += generateQueryString(args, true);

				return this.oauth1Client.delete<ContactsResponse>(endpoint);
			},
			create: async (contact: Contact, args: { ContactGroupID: string }): Promise<ContactsResponse> => {
				let endpoint = 'contactgroups';
				if (args && args.ContactGroupID) {
					endpoint = endpoint + '/' + args.ContactGroupID + '/contacts';
					delete args.ContactGroupID;
				}
				endpoint += generateQueryString(args, true);

				return this.oauth1Client.put<ContactsResponse>(endpoint, contact);
			}
		}
	};

	public contacts = {
		get: async (args?: { ContactID?: string, includeArchived?: boolean, IDs?: string } & HeaderArgs & QueryArgs): Promise<ContactsResponse> => {
			let endpoint = 'contacts';

			if (args && args.ContactID) {
				endpoint = endpoint + '/' + args.ContactID;
				delete args.ContactID;
			}

			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ContactsResponse>(endpoint, header);
		},
		create: async (body: Contact | { Contacts: Contact[] }, args?: { summarizeErrors: boolean }): Promise<ContactsResponse> => {
			let endpoint = 'contacts';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.put<ContactsResponse>(endpoint, body);
		},
		update: async (body?: Contact | Contact[], args?: { ContactID: string, summarizeErrors: boolean }): Promise<ContactsResponse> => {
			let endpoint = 'contacts';

			if (args && args.ContactID) {
				endpoint = endpoint + '/' + args.ContactID;
				delete args.ContactID;
			}

			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ContactsResponse>(endpoint, body);
		},
		CISsettings: {
			get: async (args?: { ContactID: string }): Promise<string> => {
				let endpoint = 'contacts';
				if (args && args.ContactID) {
					endpoint = endpoint + '/' + args.ContactID;
					delete args.ContactID;
				}

				endpoint += '/cissettings';

				return this.oauth1Client.get<any>(endpoint);
			}
		},
		attachments: this.generateAttachmentsEndpoint('contacts')
	};

	public currencies = {
		get: async (args?: QueryArgs): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies' + generateQueryString(args);

			return this.oauth1Client.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			const endpoint = 'currencies';
			return this.oauth1Client.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public employees = {
		get: async (args?: { EmployeeID?: string } & QueryArgs & HeaderArgs): Promise<EmployeesResponse> => {
			let endpoint = 'employees';
			if (args && args.EmployeeID) {
				endpoint = endpoint + '/' + args.EmployeeID;
				delete args.EmployeeID;
			}
			const header = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<EmployeesResponse>(endpoint, header);
		},
		create: async (employees: Employee | Employee[]): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.put<EmployeesResponse>(endpoint, employees);
		},
		update: async (employees: Employee | Employee[]): Promise<EmployeesResponse> => {
			const endpoint = 'employees';
			return this.oauth1Client.post<EmployeesResponse>(endpoint, employees);
		}
	};

	public expenseclaims = {
		get: async (args?: { ExpenseClaimID?: string } & QueryArgs & HeaderArgs): Promise<ExpenseClaimsResponse> => {
			let endpoint = 'expenseclaims';
			if (args && args.ExpenseClaimID) {
				endpoint = endpoint + '/' + args.ExpenseClaimID;
				delete args.ExpenseClaimID;
			}
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<ExpenseClaimsResponse>(endpoint);
		},
		create: async (expenseClaims: ExpenseClaim | ExpenseClaim[], args?: { summarizeErrors?: boolean }): Promise<ExpenseClaimsResponse> => {
			const endpoint = 'expenseclaims' + generateQueryString(args, true);
			return this.oauth1Client.put<ExpenseClaimsResponse>(endpoint, expenseClaims);
		},
		update: async (expenseClaims: ExpenseClaim | ExpenseClaim[], args?: { ExpenseClaimID?: string, summarizeErrors?: boolean }): Promise<ExpenseClaimsResponse> => {
			let endpoint = 'expenseclaims';
			if (args && args.ExpenseClaimID) {
				endpoint = endpoint + '/' + args.ExpenseClaimID;
				delete args.ExpenseClaimID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ExpenseClaimsResponse>(endpoint, expenseClaims);
		}
	};

	public items = {
		get: async (args?: { ItemID?: string, Code?: string } & QueryArgs & HeaderArgs): Promise<ItemsResponse> => {
			let endpoint = 'items';
			if (args && args.ItemID) {
				endpoint = endpoint + '/' + args.ItemID;
				delete args.ItemID;
			} else if (args && args.Code) {
				endpoint = endpoint + '/' + args.Code;
				delete args.Code;
			}
			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ItemsResponse>(endpoint, headers);
		},
		create: async (items: Item | Item[], args?: { summarizeErrors?: boolean }): Promise<ItemsResponse> => {
			const endpoint = 'items' + generateQueryString(args, true);
			return this.oauth1Client.put<ItemsResponse>(endpoint, items);
		},
		update: async (items: Item | Item[], args?: { ItemID?: string, summarizeErrors?: boolean }): Promise<ItemsResponse> => {
			let endpoint = 'items';
			if (args && args.ItemID) {
				endpoint = endpoint + '/' + args.ItemID;
				delete args.ItemID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ItemsResponse>(endpoint, items);
		},
		delete: async (args: { ItemID: string }): Promise<ItemsResponse> => {
			const endpoint = 'items' + '/' + args.ItemID;
			return this.oauth1Client.delete<ItemsResponse>(endpoint);
		}
	};

	public trackingCategories = {
		get: async (args?: { TrackingCategoryID?: string, includeArchived?: boolean } & HeaderArgs & QueryArgs): Promise<TrackingCategoriesResponse> => {
			// TODO: Support for where arg
			let endpoint = 'trackingcategories';
			if (args && args.TrackingCategoryID) {
				endpoint = endpoint + '/' + args.TrackingCategoryID;
			}

			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<TrackingCategoriesResponse>(endpoint, headers);
		},
		create: async (trackingCategory: TrackingCategory | TrackingCategory[]): Promise<TrackingCategoriesResponse> => {
			const endpoint = 'trackingcategories';
			return this.oauth1Client.put<TrackingCategoriesResponse>(endpoint, trackingCategory);
		},
		update: async (trackingCategory: TrackingCategory | TrackingCategory[], args?: { TrackingCategoryID: string }): Promise<TrackingCategoriesResponse> => {
			let endpoint = 'trackingcategories';
			if (args && args.TrackingCategoryID) {
				endpoint = endpoint + '/' + args.TrackingCategoryID;
				delete args.TrackingCategoryID;
			}

			return this.oauth1Client.post<TrackingCategoriesResponse>(endpoint, trackingCategory);
		},
		delete: async (args: { TrackingCategoryID: string }): Promise<any> => {
			const endpoint = 'trackingcategories/' + args.TrackingCategoryID;
			return this.oauth1Client.delete<any>(endpoint);
		},
		trackingOptions: {
			create: async (trackingOption: TrackingOption | TrackingOption[], args?: { TrackingCategoryID: string }): Promise<TrackingCategoriesResponse> => {
				let endpoint = 'trackingcategories';
				if (args && args.TrackingCategoryID) {
					endpoint = endpoint + '/' + args.TrackingCategoryID + '/Options';
					delete args.TrackingCategoryID;
				}

				return this.oauth1Client.put<TrackingCategoriesResponse>(endpoint, trackingOption);
			},
			update: async (trackingOption: TrackingOption | TrackingOption[], args?: { TrackingCategoryID: string, TrackingOptionID: string }): Promise<TrackingCategoriesResponse> => {
				let endpoint = 'trackingcategories';
				if (args && args.TrackingCategoryID && args.TrackingOptionID) {
					endpoint = endpoint + '/' + args.TrackingCategoryID + '/Options/' + args.TrackingOptionID;
					delete args.TrackingCategoryID;
					delete args.TrackingOptionID;
				}

				return this.oauth1Client.post<TrackingCategoriesResponse>(endpoint, trackingOption);
			},
			delete: async (args: { TrackingCategoryID: string, TrackingOptionID: string }): Promise<any> => {
				const endpoint = 'trackingcategories/' + args.TrackingCategoryID + '/Options/' + args.TrackingOptionID;
				return this.oauth1Client.delete<any>(endpoint);
			},
		}
	};

	public users = {
		get: async (args?: { UserID?: string } & HeaderArgs & QueryArgs): Promise<UsersResponse> => {
			let endpoint = 'users';
			if (args && args.UserID) {
				endpoint = endpoint + '/' + args.UserID;
				delete args.UserID;
			}

			const headers = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<UsersResponse>(endpoint, headers);
		}
	};

	public journals = {
		get: async (args?: { Recordfilter?: string, offset?: string, paymentsOnly?: boolean } & HeaderArgs): Promise<JournalsResponse> => {
			let endpoint = 'journals';
			if (args && args.Recordfilter) {
				endpoint = endpoint + '/' + args.Recordfilter;
				delete args.Recordfilter;
			}

			const headers = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<JournalsResponse>(endpoint, headers);
		}
	};

	public brandingThemes = {
		get: async (args?: { BrandingThemeID?: string }): Promise<BrandingThemesResponse> => {
			let endpoint = 'brandingthemes';
			if (args && args.BrandingThemeID) {
				endpoint = endpoint + '/' + args.BrandingThemeID;
				delete args.BrandingThemeID;
			}

			return this.oauth1Client.get<BrandingThemesResponse>(endpoint);
		}
	};

	public bankTransfers = {
		get: async (args?: { BankTransferID?: string } & HeaderArgs & QueryArgs): Promise<BankTransfersResponse> => {
			let endpoint = 'banktransfers';
			if (args && args.BankTransferID) {
				endpoint = endpoint + '/' + args.BankTransferID;
				delete args.BankTransferID;
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<BankTransfersResponse>(endpoint, this.generateHeader(args));
		},
		create: async (bankTransfers: BankTransfer | BankTransfer[], args?: { summarizeErrors: boolean }): Promise<BankTransfersResponse> => {
			let endpoint = 'banktransfers';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.put<BankTransfersResponse>(endpoint, bankTransfers);
		},
		attachments: this.generateAttachmentsEndpoint('banktransfers')
	};

	public organisation = {
		get: async (): Promise<OrganisationResponse> => {
			const endpoint = 'organisation';
			return this.oauth1Client.get<OrganisationResponse>(endpoint);
		},
		CISSettings: {
			get: async (args: { OrganisationID: string, where?: string }): Promise<OrganisationResponse> => {
				let endpoint = 'organisation';
				if (args && args.OrganisationID) {
					endpoint = endpoint + '/' + args.OrganisationID + '/CISSettings';
					delete args.OrganisationID;
				}
				endpoint += generateQueryString(args);

				return this.oauth1Client.get<OrganisationResponse>(endpoint);
			}
		}
	};

	public payments = {
		get: async (args?: { PaymentID: string } & QueryArgs & HeaderArgs): Promise<PaymentsResponse> => {
			let endpoint = 'payments';
			if (args && args.PaymentID) {
				endpoint = endpoint + '/' + args.PaymentID;
				delete args.PaymentID;
			}
			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<PaymentsResponse>(endpoint, headers);
		},
		create: async (payments: Payment | Payment[], args?: { summarizeErrors?: boolean }): Promise<PaymentsResponse> => {
			const endpoint = 'payments' + generateQueryString(args, true);
			return this.oauth1Client.put<PaymentsResponse>(endpoint, payments);
		},
		update: async (payments: Payment | Payment[], args?: { PaymentID: string, summarizeErrors?: boolean }): Promise<PaymentsResponse> => {
			let endpoint = 'payments';
			if (args && args.PaymentID) {
				endpoint = endpoint + '/' + args.PaymentID;
				delete args.PaymentID;
			}
			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<PaymentsResponse>(endpoint, payments);
		}
	};

	public prepayments = {
		get: async (args?: { PrepaymentID: string } & QueryArgs & PagingArgs & HeaderArgs): Promise<PrepaymentsResponse> => {
			let endpoint = 'prepayments';
			if (args && args.PrepaymentID) {
				endpoint = endpoint + '/' + args.PrepaymentID;
				delete args.PrepaymentID;
			}
			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<PrepaymentsResponse>(endpoint, headers);
		},
		allocations: {
			create: async (allocations: Allocation | { Allocations: Allocation[] }, args: { PrepaymentID: string }): Promise<PrepaymentsResponse> => {
				const endpoint = `prepayments/${args.PrepaymentID}/allocations`;
				delete args.PrepaymentID;

				return this.oauth1Client.put<PrepaymentsResponse>(endpoint, allocations);
			}
		},
		attachments: this.generateAttachmentsEndpoint('prepayments')
	};

	public reports = {
		get: async (args?: { ReportID: string }): Promise<ReportsResponse> => {
			let endpoint = 'reports';
			if (args) {
				const reportId = args.ReportID;
				delete args.ReportID; // remove from querystring

				endpoint = endpoint + '/' + reportId + generateQueryString(args);
			}

			return this.oauth1Client.get<ReportsResponse>(endpoint);
		}
	};

	public taxRates = {
		get: async (args?: { TaxType?: string } & QueryArgs): Promise<TaxRatesResponse> => {
			let endpoint = 'taxrates';
			if (args && args.TaxType) {
				endpoint += '/' + args.TaxType;
				delete args.TaxType;
			}
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<TaxRatesResponse>(endpoint);
		},
		create: async (body?: TaxRate): Promise<TaxRatesResponse> => {
			const endpoint = 'taxrates';
			return this.oauth1Client.put<TaxRatesResponse>(endpoint, body);
		},
		update: async (body?: TaxRate): Promise<TaxRatesResponse> => {
			const endpoint = 'taxrates';
			return this.oauth1Client.post<TaxRatesResponse>(endpoint, body);
		}
	};

	public purchaseorders = {
		create: async (body?: object, args?: { summarizeErrors: boolean }): Promise<any> => {
			let endpoint = 'purchaseorders';
			endpoint += generateQueryString(args, true);
			// TODO: Add interface here
			return this.oauth1Client.post<any>(endpoint, body);
		}
	};
}
