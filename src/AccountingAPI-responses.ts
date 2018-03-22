import { ExpenseClaim, User, CreditNote, BrandingTheme, Journal, Item, OnlineInvoice, Organisation, OrgCISSetting, Overpayment, Payment, Prepayment, TaxRate, TrackingCategory, BankTransfer, LinkedTransaction, Employee, Currency, Contact, ContactGroup, InvoiceReminder, Invoice, Allocation, BankTransaction, Attachment } from './AccountingAPI-models';

export interface AccountingResponse {
	Id: string;
	Status: string;
	ProviderName: string;
	DateTimeUTC: string;
}

export interface AttachmentsResponse extends AccountingResponse {
	Attachments: Attachment[];
}

export interface BankTransactionsResponse extends AccountingResponse {
	BankTransactions: BankTransaction[];
}

export interface AllocationsResponse extends AccountingResponse {
	BankTransactions: Allocation[];
}

export interface InvoicesResponse extends AccountingResponse {
	Invoices: Invoice[];
}

export interface InvoiceRemindersResponse extends AccountingResponse {
	InvoiceReminders: InvoiceReminder[];
}

export interface ContactGroupsResponse extends AccountingResponse {
	ContactGroups: ContactGroup[];
}

export interface ContactsResponse extends AccountingResponse {
	Contacts: Contact[];
}

export interface ReportsResponse extends AccountingResponse {
	Reports: any[];
}

export interface CurrenciesResponse extends AccountingResponse {
	Currencies: Currency[];
}

export interface EmployeesResponse extends AccountingResponse {
	Employees: Employee[];
}

export interface ExpenseClaimsResponse extends AccountingResponse {
	ExpenseClaims: ExpenseClaim[];
}

export interface UsersResponse extends AccountingResponse {
	Users: User[];
}
export interface AccountsResponse extends AccountingResponse {
	Accounts: any[];
}

export interface CreditNotesResponse extends AccountingResponse {
	CreditNotes: CreditNote[];
}

export interface BrandingThemesResponse extends AccountingResponse {
	BrandingThemes: BrandingTheme[];
}
export interface JournalsResponse extends AccountingResponse {
	Journals: Journal[];
}
export interface ItemsResponse extends AccountingResponse {
	Items: Item[];
}
export interface ItemsResponse extends AccountingResponse {
	Items: Item[];
}
export interface OnlineInvoicesResponse extends AccountingResponse {
	OnlineInvoices: OnlineInvoice[];
}
export interface OrganisationResponse extends AccountingResponse {
	Organisations: Organisation[];
}
export interface OrganisationCISSettingResponse extends AccountingResponse {
	CISSettings: OrgCISSetting[];
}
export interface OverpaymentsResponse extends AccountingResponse {
	Overpayments: Overpayment[];
}
export interface PaymentsResponse extends AccountingResponse {
	Payments: Payment[];
}
export interface PrepaymentsResponse extends AccountingResponse {
	Prepayments: Prepayment[];
}
export interface TaxRatesResponse extends AccountingResponse {
	TaxRates?: TaxRate[];
}

export interface TrackingCategoriesResponse extends AccountingResponse {
	TrackingCategories?: TrackingCategory[];
}

export interface BankTransfersResponse {
	BankTransfers: BankTransfer[];
}

export interface LinkedTransactionsResponse {
	LinkedTransactions: LinkedTransaction[];
}
