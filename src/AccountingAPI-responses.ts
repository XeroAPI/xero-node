import { ExpenseClaim, User, CreditNote, BrandingTheme, Journal, Item, OnlineInvoice, Organisation, OrgCISSetting, Overpayment, Payment, Prepayment, TaxRate, TrackingCategory, BankTransfer, LinkedTransaction, Employee, Currency, HistoryRecord, Contact, ContactGroup, InvoiceReminder, Invoice, Allocation, BankTransaction, Attachment, Receipt, RepeatingInvoice, ManualJournal, PurchaseOrder, PaymentService } from './AccountingAPI-models';

/** @private */
export interface AccountingAPIResponse {
	Id: string;
	Status: string;
	ProviderName: string;
	DateTimeUTC: string;
}

/** @private */
export interface SummariseErrors {
	StatusAttributeString?: string;
	HasErrors?: boolean;
	HasValidationErrors?: boolean;
	ValidationErrors?: ValidationError[];
	Warnings?: Warning[];
}

/** @private */
export interface ValidationError {
	Message?: string;
	Description?: string;
}

/** @private */
export interface Warning {
	Message: string;
}

/** @private */
export interface AccountsResponse extends AccountingAPIResponse {
	Accounts: Array<any & SummariseErrors>;
}

/** @private */
export interface AllocationsResponse extends AccountingAPIResponse {
	Allocations: Array<Allocation & SummariseErrors>;
}

/** @private */
export interface AttachmentsResponse extends AccountingAPIResponse {
	Attachments: Array<Attachment & SummariseErrors>;
}

/** @private */
export interface BankTransactionsResponse extends AccountingAPIResponse {
	BankTransactions: Array<BankTransaction & SummariseErrors>;
}

/** @private */
export interface BankTransfersResponse {
	BankTransfers: Array<BankTransfer & SummariseErrors>;
}

/** @private */
export interface BrandingThemesResponse extends AccountingAPIResponse {
	BrandingThemes: Array<BrandingTheme & SummariseErrors>;
}

/** @private */
export interface ContactGroupsResponse extends AccountingAPIResponse {
	ContactGroups: Array<ContactGroup & SummariseErrors>;
}

/** @private */
export interface ContactsResponse extends AccountingAPIResponse {
	Contacts: Array<Contact & SummariseErrors>;
}

/** @private */
export interface HistoryResponse extends AccountingAPIResponse {
	HistoryRecords: Array<HistoryRecord & SummariseErrors>;
}

/** @private */
export interface CreditNotesResponse extends AccountingAPIResponse {
	CreditNotes: Array<CreditNote & SummariseErrors>;
}

/** @private */
export interface CurrenciesResponse extends AccountingAPIResponse {
	Currencies: Array<Currency & SummariseErrors>;
}

/** @private */
export interface EmployeesResponse extends AccountingAPIResponse {
	Employees: Array<Employee & SummariseErrors>;
}

/** @private */
export interface ExpenseClaimsResponse extends AccountingAPIResponse {
	ExpenseClaims: Array<ExpenseClaim & SummariseErrors>;
}

/** @private */
export interface InvoiceRemindersResponse extends AccountingAPIResponse {
	InvoiceReminders: Array<InvoiceReminder & SummariseErrors>;
}

/** @private */
export interface InvoicesResponse extends AccountingAPIResponse {
	Invoices: Array<Invoice & SummariseErrors>;
}

/** @private */
export interface ItemsResponse extends AccountingAPIResponse {
	Items: Array<Item & SummariseErrors>;
}

/** @private */
export interface JournalsResponse extends AccountingAPIResponse {
	Journals: Array<Journal & SummariseErrors>;
}

/** @private */
export interface LinkedTransactionsResponse extends AccountingAPIResponse {
	LinkedTransactions: Array<LinkedTransaction & SummariseErrors>;
}

/** @private */
export interface ManualJournalsResponse extends AccountingAPIResponse {
	ManualJournals: Array<ManualJournal & SummariseErrors>;
}

/** @private */
export interface OnlineInvoicesResponse extends AccountingAPIResponse {
	OnlineInvoices: Array<OnlineInvoice & SummariseErrors>;
}

/** @private */
export interface OrganisationResponse extends AccountingAPIResponse {
	Organisations: Array<Organisation & SummariseErrors>;
}

/** @private */
export interface OrganisationCISSettingResponse extends AccountingAPIResponse {
	CISSettings: OrgCISSetting[];
}

/** @private */
export interface OverpaymentsResponse extends AccountingAPIResponse {
	Overpayments: Overpayment[];
}

/** @private */
export interface PaymentsResponse extends AccountingAPIResponse {
	Payments: Array<Payment & SummariseErrors>;
}

/** @private */
export interface PaymentServicesResponse extends AccountingAPIResponse {
	PaymentServices: PaymentService[];
}

/** @private */
export interface PrepaymentsResponse extends AccountingAPIResponse {
	Prepayments: Prepayment[];
}

/** @private */
export interface PurchaseOrdersResponse extends AccountingAPIResponse {
	PurchaseOrders: PurchaseOrder[];
}

/** @private */
export interface ReceiptsResponse extends AccountingAPIResponse {
	Receipts: Array<Receipt & SummariseErrors>;
}

/** @private */
export interface RepeatingInvoicesResponse extends AccountingAPIResponse {
	RepeatingInvoices: RepeatingInvoice[];
}

/** @private */
export interface ReportsResponse extends AccountingAPIResponse {
	Reports: any[];
}

/** @private */
export interface TaxRatesResponse extends AccountingAPIResponse {
	TaxRates?: Array<TaxRate & SummariseErrors>;
}

/** @private */
export interface TrackingCategoriesResponse extends AccountingAPIResponse {
	TrackingCategories?: Array<TrackingCategory & SummariseErrors>;
}

/** @private */
export interface UsersResponse extends AccountingAPIResponse {
	Users: User[];
}

/** @private */
export interface PaginatedResponse extends AccountingAPIResponse {
	pagination?: {
		page: number,
		pageSize: number,
		pageCount: number,
		itemCount: number
	};
}
