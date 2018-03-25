import { ExpenseClaim, User, CreditNote, BrandingTheme, Journal, Item, OnlineInvoice, Organisation, OrgCISSetting, Overpayment, Payment, Prepayment, TaxRate, TrackingCategory, BankTransfer, LinkedTransaction, Employee, Currency, Contact, ContactGroup, InvoiceReminder, Invoice, Allocation, BankTransaction, Attachment, Receipt, RepeatingInvoice, ManualJournal } from './AccountingAPI-models';

export interface AccountingAPIResponse {
	Id: string;
	Status: string;
	ProviderName: string;
	DateTimeUTC: string;
}
export interface SummariseErrors {
	StatusAttributeString?: string;
	HasErrors?: boolean;
	HasValidationErrors?: boolean;
	ValidationErrors?: ValidationError[];
	Warnings?: Warning[];
}

export interface ValidationError {
	Message?: string;
	Description?: string;
}

export interface Warning {
	Message: string;
}

export interface AccountsResponse extends AccountingAPIResponse {
	Accounts: Array<any & SummariseErrors>;
}

export interface AllocationsResponse extends AccountingAPIResponse {
	Allocations: Array<Allocation & SummariseErrors>;
}

export interface AttachmentsResponse extends AccountingAPIResponse {
	Attachments: Array<Attachment & SummariseErrors>;
}

export interface BankTransactionsResponse extends AccountingAPIResponse {
	BankTransactions: Array<BankTransaction & SummariseErrors>;
}

export interface BankTransfersResponse {
	BankTransfers: Array<BankTransfer & SummariseErrors>;
}

export interface BrandingThemesResponse extends AccountingAPIResponse {
	BrandingThemes: Array<BrandingTheme & SummariseErrors>;
}

export interface ContactGroupsResponse extends AccountingAPIResponse {
	ContactGroups: Array<ContactGroup & SummariseErrors>;
}

export interface ContactsResponse extends AccountingAPIResponse {
	Contacts: Array<Contact & SummariseErrors>;
}

export interface CreditNotesResponse extends AccountingAPIResponse {
	CreditNotes: Array<CreditNote & SummariseErrors>;
}

export interface CurrenciesResponse extends AccountingAPIResponse {
	Currencies: Array<Currency & SummariseErrors>;
}

export interface EmployeesResponse extends AccountingAPIResponse {
	Employees: Array<Employee & SummariseErrors>;
}

export interface ExpenseClaimsResponse extends AccountingAPIResponse {
	ExpenseClaims: Array<ExpenseClaim & SummariseErrors>;
}

export interface InvoiceRemindersResponse extends AccountingAPIResponse {
	InvoiceReminders: Array<InvoiceReminder & SummariseErrors>;
}

export interface InvoicesResponse extends AccountingAPIResponse {
	Invoices: Array<Invoice & SummariseErrors>;
}

export interface ItemsResponse extends AccountingAPIResponse {
	Items: Array<Item & SummariseErrors>;
}

export interface JournalsResponse extends AccountingAPIResponse {
	Journals: Array<Journal & SummariseErrors>;
}

export interface LinkedTransactionsResponse extends AccountingAPIResponse {
	LinkedTransactions: Array<LinkedTransaction & SummariseErrors>;
}

export interface ManualJournalsResponse extends AccountingAPIResponse {
	ManualJournals: Array<ManualJournal & SummariseErrors>;
}

export interface OnlineInvoicesResponse extends AccountingAPIResponse {
	OnlineInvoices: Array<OnlineInvoice & SummariseErrors>;
}

export interface OrganisationResponse extends AccountingAPIResponse {
	Organisations: Array<Organisation & SummariseErrors>;
}

export interface OrganisationCISSettingResponse extends AccountingAPIResponse {
	CISSettings: OrgCISSetting[];
}

export interface OverpaymentsResponse extends AccountingAPIResponse {
	Overpayments: Overpayment[];
}

export interface PaymentsResponse extends AccountingAPIResponse {
	Payments: Array<Payment & SummariseErrors>;
}

export interface PrepaymentsResponse extends AccountingAPIResponse {
	Prepayments: Prepayment[];
}

// TODO purchase orders

export interface ReceiptsResponse extends AccountingAPIResponse {
	Receipts: Array<Receipt & SummariseErrors>;
}

export interface RepeatingInvoicesResponse extends AccountingAPIResponse {
	RepeatingInvoices: RepeatingInvoice[];
}

export interface ReportsResponse extends AccountingAPIResponse {
	Reports: any[];
}

export interface TaxRatesResponse extends AccountingAPIResponse {
	TaxRates?: Array<TaxRate & SummariseErrors>;
}

export interface TrackingCategoriesResponse extends AccountingAPIResponse {
	TrackingCategories?: Array<TrackingCategory & SummariseErrors>;
}

export interface UsersResponse extends AccountingAPIResponse {
	Users: User[];
}
