
import * as fs from 'fs';
import { XeroClientConfiguration, BaseAPIClient } from './internals/BaseAPIClient';
import { IOAuth1HttpClient, AccessToken } from './internals/OAuth1HttpClient';
import { generateQueryString } from './internals/utils';
import { AccountsResponse, BankTransactionsResponse, InvoicesResponse, CreditNotesResponse, AllocationsResponse, ContactGroupsResponse, CurrenciesResponse, EmployeesResponse, ContactsResponse, ReportsResponse, AttachmentsResponse, OrganisationResponse, UsersResponse, BrandingThemesResponse, BankTransfersResponse, TrackingCategoriesResponse, TaxRatesResponse, ExpenseClaimsResponse, ItemsResponse, InvoiceRemindersResponse, JournalsResponse, PaymentsResponse, PrepaymentsResponse, OverpaymentsResponse, LinkedTransactionsResponse, ReceiptsResponse, ManualJournalsResponse, RepeatingInvoicesResponse, PurchaseOrdersResponse } from './AccountingAPI-responses';
import { BankTransaction, BankTransfer, ContactGroup, Contact, CreditNote, Allocation, Currency, Employee, ExpenseClaim, Invoice, Item, LinkedTransaction, Payment, TaxRate, TrackingCategory, TrackingOption, Receipt, ManualJournal, PurchaseOrder } from './AccountingAPI-models';

export interface QueryArgs {
	where?: string;
	order?: string;
}

export interface PagingArgs {
	page?: number;
}

export interface UnitDecimalPlacesArgs {
	unitdp?: number;
}

export interface HeaderArgs {
	'If-Modified-Since'?: string;
}

/** @private */
export interface AttachmentsEndpoint {
	get(args: { entityId: string }): Promise<AttachmentsResponse>;
	downloadAttachment(args: { entityId: string, mimeType: string, fileName: string, pathToSave: string }): Promise<void>;
	uploadAttachment(args: { entityId: string, mimeType: string, fileName: string, pathToUpload: string, includeOnline?: boolean }): Promise<AttachmentsResponse>;
}

export class AccountingAPIClient extends BaseAPIClient {

	private accountingBasePath = '/api.xro/2.0/';

	public constructor(options: XeroClientConfiguration, authState?: AccessToken, _oAuth1HttpClient?: IOAuth1HttpClient) {
		super(options, authState, {}, _oAuth1HttpClient);
	}

	private generateAttachmentsEndpoint(path: string): AttachmentsEndpoint {
		return {
			get: async (args: { entityId: string }): Promise<AttachmentsResponse> => {
				const endpoint = `${this.accountingBasePath}${path}/${args.entityId}/attachments`;
				return this.oauth1Client.get<AttachmentsResponse>(endpoint);
			},
			downloadAttachment: async (args: { entityId: string, mimeType: string, fileName: string, pathToSave: string }) => {
				const endpoint = `${this.accountingBasePath}${path}/${args.entityId}/attachments/${args.fileName}`;
				const writeStream = fs.createWriteStream(args.pathToSave);

				await this.oauth1Client.writeBinaryResponseToStream(endpoint, args.mimeType, writeStream);
			},
			uploadAttachment: async (args: { entityId: string, mimeType: string, fileName: string, pathToUpload: string, includeOnline?: boolean }) => {
				const endpoint = `${this.accountingBasePath}${path}/${args.entityId}/attachments/${args.fileName}` + generateQueryString({ IncludeOnline: args.includeOnline });
				const readStream = fs.createReadStream(args.pathToUpload);

				const fileSize = fs.statSync(args.pathToUpload).size;

				return this.oauth1Client.readStreamToRequest(endpoint, args.mimeType, fileSize, readStream);
			},
		};
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
			let endpoint = this.accountingBasePath + 'accounts';
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
			const endpoint = this.accountingBasePath + 'accounts';
			return this.oauth1Client.put<AccountsResponse>(endpoint, account);
		},
		update: async (account: any, args?: { AccountID?: string }): Promise<AccountsResponse> => {
			// from docs: You can only update accounts one at a time (i.e. you’ll need to do multiple API calls to update many accounts)
			let endpoint = this.accountingBasePath + 'accounts';
			if (args && args.AccountID) {
				endpoint = endpoint + '/' + args.AccountID;
				delete args.AccountID; // remove from query string
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.post<AccountsResponse>(endpoint, account);
		},
		delete: async (args: { AccountID: string }): Promise<AccountsResponse> => {
			// from docs: If an account is not able to be deleted (e.g. ssystem accounts and accounts used on transactions) you can update the status to ARCHIVED.
			const endpoint = this.accountingBasePath + 'accounts/' + args.AccountID;
			return this.oauth1Client.delete<AccountsResponse>(endpoint);
		},
		attachments: this.generateAttachmentsEndpoint('accounts')
	};

	public bankTransactions = {
		get: async (args?: { BankTransactionID?: string } & QueryArgs & PagingArgs & UnitDecimalPlacesArgs & HeaderArgs): Promise<BankTransactionsResponse> => {
			let endpoint = this.accountingBasePath + 'banktransactions';
			if (args && args.BankTransactionID) {
				endpoint = endpoint + '/' + args.BankTransactionID;
				delete args.BankTransactionID; // remove from query string
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<BankTransactionsResponse>(endpoint, header);
		},
		create: async (bankTransaction: BankTransaction | { BankTransactions: BankTransaction[] }, args?: { summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<BankTransactionsResponse> => {
			const endpoint = this.accountingBasePath + 'banktransactions' + generateQueryString(args, true);
			return this.oauth1Client.put<BankTransactionsResponse>(endpoint, bankTransaction);
		},
		update: async (bankTransaction: BankTransaction | { BankTransactions: BankTransaction[] }, args?: { summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<BankTransactionsResponse> => {
			const endpoint = this.accountingBasePath + 'banktransactions' + generateQueryString(args, true);
			return this.oauth1Client.post<BankTransactionsResponse>(endpoint, bankTransaction);
		},
		attachments: this.generateAttachmentsEndpoint('banktransactions')
	};

	public bankTransfers = {
		get: async (args?: { BankTransferID?: string } & HeaderArgs & QueryArgs): Promise<BankTransfersResponse> => {
			let endpoint = this.accountingBasePath + 'banktransfers';
			if (args && args.BankTransferID) {
				endpoint = endpoint + '/' + args.BankTransferID;
				delete args.BankTransferID;
			}
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<BankTransfersResponse>(endpoint, this.generateHeader(args));
		},
		create: async (bankTransfers: BankTransfer | { BankTransfers: BankTransfer[] }, args?: { summarizeErrors: boolean }): Promise<BankTransfersResponse> => {
			let endpoint = this.accountingBasePath + 'banktransfers';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.put<BankTransfersResponse>(endpoint, bankTransfers);
		},
		attachments: this.generateAttachmentsEndpoint('banktransfers')
	};

	public brandingThemes = {
		get: async (args?: { BrandingThemeID?: string }): Promise<BrandingThemesResponse> => {
			let endpoint = this.accountingBasePath + 'brandingthemes';
			if (args && args.BrandingThemeID) {
				endpoint = endpoint + '/' + args.BrandingThemeID;
				delete args.BrandingThemeID;
			}

			return this.oauth1Client.get<BrandingThemesResponse>(endpoint);
		}
	};

	public contactGroups = {
		get: async (args?: { ContactGroupID?: string } & QueryArgs): Promise<ContactGroupsResponse> => {

			let endpoint = this.accountingBasePath + 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ContactGroupsResponse>(endpoint);
		},
		create: async (contactGroups: ContactGroup | { ContactGroups: ContactGroup[] }, args?: { summarizeErrors?: boolean }): Promise<ContactGroupsResponse> => {
			const endpoint = this.accountingBasePath + 'contactgroups' + generateQueryString(args, true);

			return this.oauth1Client.put<ContactGroupsResponse>(endpoint, contactGroups);
		},
		update: async (contactGroups: ContactGroup | { ContactGroups: ContactGroup[] }, args?: { ContactGroupID: string, summarizeErrors?: boolean }): Promise<ContactGroupsResponse> => {
			let endpoint = this.accountingBasePath + 'contactgroups';
			if (args && args.ContactGroupID) {
				endpoint = endpoint + '/' + args.ContactGroupID;
				delete args.ContactGroupID;
			}
			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<ContactGroupsResponse>(endpoint, contactGroups);
		},
		contacts: {
			delete: async (args: { ContactGroupID: string, ContactID?: string }): Promise<ContactsResponse> => {
				let endpoint = this.accountingBasePath + 'contactgroups';
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
				let endpoint = this.accountingBasePath + 'contactgroups';
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
		get: async (args?: { ContactID?: string, includeArchived?: boolean, IDs?: string } & HeaderArgs & PagingArgs & QueryArgs): Promise<ContactsResponse> => {
			let endpoint = this.accountingBasePath + 'contacts';

			if (args && args.ContactID) {
				endpoint = endpoint + '/' + args.ContactID;
				delete args.ContactID;
			}

			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<ContactsResponse>(endpoint, header);
		},
		create: async (body: Contact | { Contacts: Contact[] }, args?: { summarizeErrors: boolean }): Promise<ContactsResponse> => {
			let endpoint = this.accountingBasePath + 'contacts';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.put<ContactsResponse>(endpoint, body);
		},
		update: async (body?: Contact | { Contacts: Contact[] }, args?: { ContactID: string, summarizeErrors: boolean }): Promise<ContactsResponse> => {
			let endpoint = this.accountingBasePath + 'contacts';

			if (args && args.ContactID) {
				endpoint = endpoint + '/' + args.ContactID;
				delete args.ContactID;
			}

			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ContactsResponse>(endpoint, body);
		},
		CISsettings: {
			get: async (args?: { ContactID: string }): Promise<string> => {
				let endpoint = this.accountingBasePath + 'contacts';
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

	public creditNotes = {
		get: async (args?: { CreditNoteID?: string } & QueryArgs & PagingArgs & UnitDecimalPlacesArgs & HeaderArgs): Promise<CreditNotesResponse> => {
			let endpoint = this.accountingBasePath + 'creditnotes';
			if (args && args.CreditNoteID) {
				endpoint = endpoint + '/' + args.CreditNoteID;
				delete args.CreditNoteID; // remove from query string
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<CreditNotesResponse>(endpoint, header);
		},
		savePDF: async (args?: { CreditNoteID: string, savePath: string }): Promise<void> => {
			let endpoint = this.accountingBasePath + 'creditnotes';
			if (args && args.CreditNoteID) {
				endpoint = endpoint + '/' + args.CreditNoteID;
				delete args.CreditNoteID;
			}
			endpoint += generateQueryString(args);

			const writeStream = fs.createWriteStream(args.savePath);

			return this.oauth1Client.writeUTF8ResponseToStream(endpoint, 'application/pdf', writeStream);
		},
		create: async (creditNote: CreditNote | { CreditNotes: CreditNote[] }, args?: {summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<CreditNotesResponse> => {
			const endpoint = this.accountingBasePath + 'creditnotes' + generateQueryString(args, true);
			return this.oauth1Client.put<CreditNotesResponse>(endpoint, creditNote);
		},
		update: async (creditNote: CreditNote | { CreditNotes: CreditNote[] }, args?: { summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<CreditNotesResponse> => {
			const endpoint = this.accountingBasePath + 'creditnotes' + generateQueryString(args, true);
			return this.oauth1Client.post<CreditNotesResponse>(endpoint, creditNote);
		},
		allocations: {
			create: async (allocation: Allocation, args?: { CreditNoteID?: string }): Promise<AllocationsResponse> => {
				let endpoint = this.accountingBasePath + 'creditnotes';
				if (args && args.CreditNoteID) {
					endpoint = endpoint + '/' + args.CreditNoteID;
					delete args.CreditNoteID; // remove from query string
				}
				endpoint += '/allocations';
				endpoint += generateQueryString(args);

				return this.oauth1Client.put<AllocationsResponse>(endpoint, allocation);
			},
		},
		attachments: this.generateAttachmentsEndpoint('creditnotes')
	};

	public currencies = {
		get: async (args?: QueryArgs): Promise<CurrenciesResponse> => {
			const endpoint = this.accountingBasePath + 'currencies' + generateQueryString(args);

			return this.oauth1Client.get<CurrenciesResponse>(endpoint);
		},
		create: async (currency: Currency): Promise<CurrenciesResponse> => {
			const endpoint = this.accountingBasePath + 'currencies';
			return this.oauth1Client.put<CurrenciesResponse>(endpoint, currency);
		}
	};

	public employees = {
		get: async (args?: { EmployeeID?: string } & QueryArgs & HeaderArgs): Promise<EmployeesResponse> => {
			let endpoint = this.accountingBasePath + 'employees';
			if (args && args.EmployeeID) {
				endpoint = endpoint + '/' + args.EmployeeID;
				delete args.EmployeeID;
			}
			const header = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<EmployeesResponse>(endpoint, header);
		},
		create: async (employees: Employee | { Employees: Employee[] }): Promise<EmployeesResponse> => {
			const endpoint = this.accountingBasePath + 'employees';
			return this.oauth1Client.put<EmployeesResponse>(endpoint, employees);
		},
		update: async (employees: Employee | { Employees: Employee[] }): Promise<EmployeesResponse> => {
			const endpoint = this.accountingBasePath + 'employees';
			return this.oauth1Client.post<EmployeesResponse>(endpoint, employees);
		}
	};

	public expenseClaims = {
		get: async (args?: { ExpenseClaimID?: string } & QueryArgs & HeaderArgs): Promise<ExpenseClaimsResponse> => {
			let endpoint = this.accountingBasePath + 'expenseclaims';
			if (args && args.ExpenseClaimID) {
				endpoint = endpoint + '/' + args.ExpenseClaimID;
				delete args.ExpenseClaimID;
			}
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<ExpenseClaimsResponse>(endpoint);
		},
		create: async (expenseClaims: ExpenseClaim | { ExpenseClaims: ExpenseClaim[] }, args?: { summarizeErrors?: boolean }): Promise<ExpenseClaimsResponse> => {
			const endpoint = this.accountingBasePath + 'expenseclaims' + generateQueryString(args, true);
			return this.oauth1Client.put<ExpenseClaimsResponse>(endpoint, expenseClaims);
		},
		update: async (expenseClaims: ExpenseClaim | { ExpenseClaims: ExpenseClaim[] }, args?: { ExpenseClaimID?: string, summarizeErrors?: boolean }): Promise<ExpenseClaimsResponse> => {
			let endpoint = this.accountingBasePath + 'expenseclaims';
			if (args && args.ExpenseClaimID) {
				endpoint = endpoint + '/' + args.ExpenseClaimID;
				delete args.ExpenseClaimID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ExpenseClaimsResponse>(endpoint, expenseClaims);
		}
	};

	public invoiceReminders = {
		get: async (): Promise<InvoiceRemindersResponse> => {
			const endpoint = this.accountingBasePath + 'invoicereminders/settings';
			return this.oauth1Client.get<InvoiceRemindersResponse>(endpoint);
		}
	};

	public invoices = {
		get: async (args?: { InvoiceID?: string, InvoiceNumber?: string, createdByMyApp?: boolean } & HeaderArgs & PagingArgs & UnitDecimalPlacesArgs & QueryArgs): Promise<InvoicesResponse> => {
			let endpoint = this.accountingBasePath + 'invoices';
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
			let endpoint = this.accountingBasePath + 'invoices';
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
		create: async (invoice: Invoice | { Invoices: Invoice[] }, args?: { summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<InvoicesResponse> => {
			const endpoint = this.accountingBasePath + 'invoices' + generateQueryString(args, true);

			return this.oauth1Client.put<InvoicesResponse>(endpoint, invoice);
		},
		update: async (invoices: Invoice | { Invoices: Invoice[] }, args?: { InvoiceID?: string, InvoiceNumber?: string, where?: string, summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<InvoicesResponse> => {
			let endpoint = this.accountingBasePath + `invoices`;

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
				let endpoint = this.accountingBasePath + 'invoices';
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

	public repeatingInvoices = {
		get: async (args?: { RepeatingInvoiceID?: string} & QueryArgs): Promise<RepeatingInvoicesResponse> => {
			let endpoint = this.accountingBasePath + 'repeatinginvoices';
			if (args && args.RepeatingInvoiceID) {
				endpoint = endpoint + '/' + args.RepeatingInvoiceID;
				delete args.RepeatingInvoiceID;
			}
			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<RepeatingInvoicesResponse>(endpoint, headers);
		},
		attachments: this.generateAttachmentsEndpoint('repeatinginvoices')
	};

	public items = {
		get: async (args?: { ItemID?: string, Code?: string } & QueryArgs & HeaderArgs): Promise<ItemsResponse> => {
			let endpoint = this.accountingBasePath + 'items';
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
		create: async (items: Item | { Items: Item[] }, args?: { summarizeErrors?: boolean }): Promise<ItemsResponse> => {
			const endpoint = this.accountingBasePath + 'items' + generateQueryString(args, true);
			return this.oauth1Client.put<ItemsResponse>(endpoint, items);
		},
		update: async (items: Item | { Items: Item[] }, args?: { ItemID?: string, summarizeErrors?: boolean }): Promise<ItemsResponse> => {
			let endpoint = this.accountingBasePath + 'items';
			if (args && args.ItemID) {
				endpoint = endpoint + '/' + args.ItemID;
				delete args.ItemID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ItemsResponse>(endpoint, items);
		},
		delete: async (args: { ItemID: string }): Promise<ItemsResponse> => {
			const endpoint = this.accountingBasePath + 'items' + '/' + args.ItemID;
			return this.oauth1Client.delete<ItemsResponse>(endpoint);
		}
	};

	public journals = {
		get: async (args?: { Recordfilter?: string, offset?: string, paymentsOnly?: boolean } & HeaderArgs): Promise<JournalsResponse> => {
			let endpoint = this.accountingBasePath + 'journals';
			if (args && args.Recordfilter) {
				endpoint = endpoint + '/' + args.Recordfilter;
				delete args.Recordfilter;
			}

			const headers = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<JournalsResponse>(endpoint, headers);
		}
	};

	public linkedTransactions = {
		get: async (args?: { LinkedTransactionID?: string } & QueryArgs & UnitDecimalPlacesArgs & HeaderArgs): Promise<LinkedTransactionsResponse> => {
			let endpoint = this.accountingBasePath + 'linkedtransactions';
			if (args && args.LinkedTransactionID) {
				endpoint = endpoint + '/' + args.LinkedTransactionID;
				delete args.LinkedTransactionID; // remove from query string
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<LinkedTransactionsResponse>(endpoint, header);
		},
		create: async (linkedTransaction: LinkedTransaction | { LinkedTransactions: LinkedTransaction[] }, args?: {summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<LinkedTransactionsResponse> => {
			const endpoint = this.accountingBasePath + 'linkedtransactions' + generateQueryString(args, true);
			return this.oauth1Client.put<LinkedTransactionsResponse>(endpoint, linkedTransaction);
		},
		update: async (linkedTransaction: LinkedTransaction | { LinkedTransactions: LinkedTransaction[] }, args?: { LinkedTransactionID?: string, summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<LinkedTransactionsResponse> => {
			let endpoint = this.accountingBasePath + 'linkedtransactions';
			if (args && args.LinkedTransactionID) {
				endpoint = endpoint + '/' + args.LinkedTransactionID;
				delete args.LinkedTransactionID; // remove from query string
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<LinkedTransactionsResponse>(endpoint, linkedTransaction);
		},
		delete: async (args?: { LinkedTransactionID?: string }): Promise<void> => {
			let endpoint = this.accountingBasePath + 'linkedtransactions';
			if (args && args.LinkedTransactionID) {
				endpoint = endpoint + '/' + args.LinkedTransactionID;
				delete args.LinkedTransactionID; // remove from query string
			}
			endpoint += generateQueryString(args, false);
			return this.oauth1Client.delete<void>(endpoint);
		},
	};

	public manualJournals = {
		get: async (args?: { ManualJournalID?: string } & QueryArgs & PagingArgs & HeaderArgs): Promise<ManualJournalsResponse> => {
			let endpoint = this.accountingBasePath + 'manualjournals';
			if (args && args.ManualJournalID) {
				endpoint += '/' + args.ManualJournalID;
				delete args.ManualJournalID;
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<ManualJournalsResponse>(endpoint, header);
		},
		create: async (manualJournals?: ManualJournal | { ManualJournals: ManualJournal[] }, args?: { summarizeErrors?: boolean }): Promise<ManualJournalsResponse> => {
			const endpoint = this.accountingBasePath + 'manualjournals' + generateQueryString(args, true);
			return this.oauth1Client.put<ManualJournalsResponse>(endpoint, manualJournals);
		},
		update: async (manualJournals?: ManualJournal | { ManualJournals: ManualJournal[] }, args?: { ManualJournalID?: string, summarizeErrors?: boolean }): Promise<ManualJournalsResponse> => {
			let endpoint = this.accountingBasePath + 'manualjournals';
			if (args && args.ManualJournalID) {
				endpoint += '/' + args.ManualJournalID;
				delete args.ManualJournalID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ManualJournalsResponse>(endpoint, manualJournals);
		},
		attachments: this.generateAttachmentsEndpoint('manualjournals')
	};

	public organisations = {
		get: async (): Promise<OrganisationResponse> => {
			const endpoint = this.accountingBasePath + 'organisations';
			return this.oauth1Client.get<OrganisationResponse>(endpoint);
		},
		CISSettings: {
			get: async (args: { OrganisationID: string, where?: string }): Promise<OrganisationResponse> => {
				let endpoint = this.accountingBasePath + 'organisations';
				if (args && args.OrganisationID) {
					endpoint = endpoint + '/' + args.OrganisationID + '/CISSettings';
					delete args.OrganisationID;
				}
				endpoint += generateQueryString(args);

				return this.oauth1Client.get<OrganisationResponse>(endpoint);
			}
		}
	};

	public overpayments = {
		get: async (args?: { OverpaymentID?: string } & QueryArgs & PagingArgs & UnitDecimalPlacesArgs & HeaderArgs): Promise<OverpaymentsResponse> => {
			let endpoint = this.accountingBasePath + 'overpayments';
			if (args && args.OverpaymentID) {
				endpoint += '/' + args.OverpaymentID;
				delete args.OverpaymentID;
			}
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<OverpaymentsResponse>(endpoint);
		},
		allocations: {
			create: async (body: Allocation[], args: { OverpaymentID: string }): Promise<OverpaymentsResponse> => {
				const endpoint = this.accountingBasePath + `overpayments/${args.OverpaymentID}/allocations`;
				return this.oauth1Client.put<OverpaymentsResponse>(endpoint, body);
			}
		}
	};

	public payments = {
		get: async (args?: { PaymentID: string } & QueryArgs & HeaderArgs): Promise<PaymentsResponse> => {
			let endpoint = this.accountingBasePath + 'payments';
			if (args && args.PaymentID) {
				endpoint = endpoint + '/' + args.PaymentID;
				delete args.PaymentID;
			}
			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<PaymentsResponse>(endpoint, headers);
		},
		create: async (payments: Payment | { Payments: Payment[] }, args?: { summarizeErrors?: boolean }): Promise<PaymentsResponse> => {
			const endpoint = this.accountingBasePath + 'payments' + generateQueryString(args, true);
			return this.oauth1Client.put<PaymentsResponse>(endpoint, payments);
		},
		update: async (payments: Payment | { Payments: Payment[] }, args?: { PaymentID: string, summarizeErrors?: boolean }): Promise<PaymentsResponse> => {
			let endpoint = this.accountingBasePath + 'payments';
			if (args && args.PaymentID) {
				endpoint = endpoint + '/' + args.PaymentID;
				delete args.PaymentID;
			}
			endpoint += generateQueryString(args, true);

			return this.oauth1Client.post<PaymentsResponse>(endpoint, payments);
		}
	};

	public prepayments = {
		get: async (args?: { PrepaymentID: string } & QueryArgs & PagingArgs & UnitDecimalPlacesArgs & HeaderArgs): Promise<PrepaymentsResponse> => {
			let endpoint = this.accountingBasePath + 'prepayments';
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
				const endpoint = this.accountingBasePath + `prepayments/${args.PrepaymentID}/allocations`;
				delete args.PrepaymentID;

				return this.oauth1Client.put<PrepaymentsResponse>(endpoint, allocations);
			}
		},
		attachments: this.generateAttachmentsEndpoint('prepayments')
	};

	public purchaseOrders = {
		get: async (args?: { PurchaseOrderID?: string, PurchasOrderNumber?: string, Status?: string, DateFrom?: string, DateTo?: string } & QueryArgs & HeaderArgs): Promise<PurchaseOrdersResponse> => {
			let endpoint = this.accountingBasePath + 'purchaseorders';
			if (args && args.PurchaseOrderID) {
				endpoint = endpoint + '/' + args.PurchaseOrderID;
				delete args.PurchaseOrderID;
			} else if (args && args.PurchasOrderNumber) {
				endpoint = endpoint + '/' + args.PurchasOrderNumber;
				delete args.PurchasOrderNumber;
			}
			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<PurchaseOrdersResponse>(endpoint, headers);
		},
		create: async (purchaseOrders?: PurchaseOrder | { PurchaseOrders: PurchaseOrder[] }, args?: { summarizeErrors: boolean }): Promise<PurchaseOrdersResponse> => {
			let endpoint = this.accountingBasePath + 'purchaseorders';
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.put<PurchaseOrdersResponse>(endpoint, purchaseOrders);
		},
		update: async (purchaseOrders?: PurchaseOrder | { PurchaseOrders: PurchaseOrder[] }, args?: { PurchaseOrderID?: string, summarizeErrors?: boolean }): Promise<PurchaseOrdersResponse> => {
			let endpoint = this.accountingBasePath + 'purchaseorders';
			if (args && args.PurchaseOrderID) {
				endpoint = endpoint + '/' + args.PurchaseOrderID;
				delete args.PurchaseOrderID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<PurchaseOrdersResponse>(endpoint, purchaseOrders);
		}
	};

	public receipts = {
		get: async (args?: { ReceiptID?: string } & QueryArgs & UnitDecimalPlacesArgs & HeaderArgs): Promise<ReceiptsResponse> => {
			let endpoint = this.accountingBasePath + 'receipts';
			if (args && args.ReceiptID) {
				endpoint += '/' + args.ReceiptID;
				delete args.ReceiptID;
			}
			const header = this.generateHeader(args);
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<ReceiptsResponse>(endpoint, header);
		},
		create: async (receipts?: Receipt | { Receipts: Receipt[] }, args?: { summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<ReceiptsResponse> => {
			const endpoint = this.accountingBasePath + 'receipts' + generateQueryString(args, true);
			return this.oauth1Client.put<ReceiptsResponse>(endpoint, receipts);
		},
		update: async (receipts?: Receipt | { Receipts: Receipt[] }, args?: { ReceiptID?: string, summarizeErrors?: boolean } & UnitDecimalPlacesArgs): Promise<ReceiptsResponse> => {
			let endpoint = this.accountingBasePath + 'receipts';
			if (args && args.ReceiptID) {
				endpoint += '/' + args.ReceiptID;
				delete args.ReceiptID;
			}
			endpoint += generateQueryString(args, true);
			return this.oauth1Client.post<ReceiptsResponse>(endpoint, receipts);
		},
		attachments: this.generateAttachmentsEndpoint('receipts')
	};

	public reports = {
		get: async (args?: { ReportID: string }): Promise<ReportsResponse> => {
			let endpoint = this.accountingBasePath + 'reports';
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
			let endpoint = this.accountingBasePath + 'taxrates';
			if (args && args.TaxType) {
				endpoint += '/' + args.TaxType;
				delete args.TaxType;
			}
			endpoint += generateQueryString(args);
			return this.oauth1Client.get<TaxRatesResponse>(endpoint);
		},
		create: async (body?: TaxRate): Promise<TaxRatesResponse> => {
			const endpoint = this.accountingBasePath + 'taxrates';
			return this.oauth1Client.put<TaxRatesResponse>(endpoint, body);
		},
		update: async (body?: TaxRate): Promise<TaxRatesResponse> => {
			const endpoint = this.accountingBasePath + 'taxrates';
			return this.oauth1Client.post<TaxRatesResponse>(endpoint, body);
		}
	};

	public trackingCategories = {
		get: async (args?: { TrackingCategoryID?: string, includeArchived?: boolean } & HeaderArgs & QueryArgs): Promise<TrackingCategoriesResponse> => {
			// TODO: Support for where arg
			let endpoint = this.accountingBasePath + 'trackingcategories';
			if (args && args.TrackingCategoryID) {
				endpoint = endpoint + '/' + args.TrackingCategoryID;
			}

			const headers = this.generateHeader(args);
			endpoint += generateQueryString(args);

			return this.oauth1Client.get<TrackingCategoriesResponse>(endpoint, headers);
		},
		create: async (trackingCategory: TrackingCategory | { TrackingCategorys: TrackingCategory[] }): Promise<TrackingCategoriesResponse> => {
			const endpoint = this.accountingBasePath + 'trackingcategories';
			return this.oauth1Client.put<TrackingCategoriesResponse>(endpoint, trackingCategory);
		},
		update: async (trackingCategory: TrackingCategory | { TrackingCategorys: TrackingCategory[] }, args?: { TrackingCategoryID: string }): Promise<TrackingCategoriesResponse> => {
			let endpoint = this.accountingBasePath + 'trackingcategories';
			if (args && args.TrackingCategoryID) {
				endpoint = endpoint + '/' + args.TrackingCategoryID;
				delete args.TrackingCategoryID;
			}

			return this.oauth1Client.post<TrackingCategoriesResponse>(endpoint, trackingCategory);
		},
		delete: async (args: { TrackingCategoryID: string }): Promise<any> => {
			const endpoint = this.accountingBasePath + 'trackingcategories/' + args.TrackingCategoryID;
			return this.oauth1Client.delete<any>(endpoint);
		},
		trackingOptions: {
			create: async (trackingOption: TrackingOption | { TrackingOptions: TrackingOption[] }, args?: { TrackingCategoryID: string }): Promise<TrackingCategoriesResponse> => {
				let endpoint = this.accountingBasePath + 'trackingcategories';
				if (args && args.TrackingCategoryID) {
					endpoint = endpoint + '/' + args.TrackingCategoryID + '/Options';
					delete args.TrackingCategoryID;
				}

				return this.oauth1Client.put<TrackingCategoriesResponse>(endpoint, trackingOption);
			},
			update: async (trackingOption: TrackingOption | { TrackingOptions: TrackingOption[] }, args?: { TrackingCategoryID: string, TrackingOptionID: string }): Promise<TrackingCategoriesResponse> => {
				let endpoint = this.accountingBasePath + 'trackingcategories';
				if (args && args.TrackingCategoryID && args.TrackingOptionID) {
					endpoint = endpoint + '/' + args.TrackingCategoryID + '/Options/' + args.TrackingOptionID;
					delete args.TrackingCategoryID;
					delete args.TrackingOptionID;
				}

				return this.oauth1Client.post<TrackingCategoriesResponse>(endpoint, trackingOption);
			},
			delete: async (args: { TrackingCategoryID: string, TrackingOptionID: string }): Promise<any> => {
				const endpoint = this.accountingBasePath + 'trackingcategories/' + args.TrackingCategoryID + '/Options/' + args.TrackingOptionID;
				return this.oauth1Client.delete<any>(endpoint);
			},
		}
	};

	public users = {
		get: async (args?: { UserID?: string } & HeaderArgs & QueryArgs): Promise<UsersResponse> => {
			let endpoint = this.accountingBasePath + 'users';
			if (args && args.UserID) {
				endpoint = endpoint + '/' + args.UserID;
				delete args.UserID;
			}

			const headers = this.generateHeader(args);

			endpoint += generateQueryString(args);

			return this.oauth1Client.get<UsersResponse>(endpoint, headers);
		}
	};
}
