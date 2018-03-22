import { ExpenseClaim, User, CreditNote, BrandingTheme, Journal, Item, OnlineInvoice, Organisation, OrgCISSetting, Overpayment, Payment, Prepayment, TaxRate, TrackingCategory, BankTransfer, LinkedTransaction, Employee, Currency, Contact, ContactGroup, InvoiceReminder, Invoice, Allocation, BankTransaction, Attachment, Receipt, RepeatingInvoice } from './AccountingAPI-models';

export interface AccountingAPIResponse {
	Id: string;
	Status: string;
	ProviderName: string;
	DateTimeUTC: string;
}

export interface AccountsResponse extends AccountingAPIResponse {
	Accounts: any[];
}

export interface AllocationsResponse extends AccountingAPIResponse {
	BankTransactions: Allocation[];
}

export interface AttachmentsResponse extends AccountingAPIResponse {
	Attachments: Attachment[];
}

export interface BankTransactionsResponse extends AccountingAPIResponse {
	BankTransactions: BankTransaction[];
}

export interface BankTransfersResponse {
	BankTransfers: BankTransfer[];
}

export interface BrandingThemesResponse extends AccountingAPIResponse {
	BrandingThemes: BrandingTheme[];
}

export interface ContactGroupsResponse extends AccountingAPIResponse {
	ContactGroups: ContactGroup[];
}

export interface ContactsResponse extends AccountingAPIResponse {
	Contacts: Contact[];
}

export interface CreditNotesResponse extends AccountingAPIResponse {
	CreditNotes: CreditNote[];
}

export interface CurrenciesResponse extends AccountingAPIResponse {
	Currencies: Currency[];
}

export interface EmployeesResponse extends AccountingAPIResponse {
	Employees: Employee[];
}

export interface ExpenseClaimsResponse extends AccountingAPIResponse {
	ExpenseClaims: ExpenseClaim[];
}

export interface InvoiceRemindersResponse extends AccountingAPIResponse {
	InvoiceReminders: InvoiceReminder[];
}

export interface InvoicesResponse extends AccountingAPIResponse {
	Invoices: Invoice[];
}

export interface ItemsResponse extends AccountingAPIResponse {
	Items: Item[];
}

export interface JournalsResponse extends AccountingAPIResponse {
	Journals: Journal[];
}

export interface LinkedTransactionsResponse {
	LinkedTransactions: LinkedTransaction[];
}

// TODO manual journals

export interface OnlineInvoicesResponse extends AccountingAPIResponse {
	OnlineInvoices: OnlineInvoice[];
}

export interface OrganisationResponse extends AccountingAPIResponse {
	Organisations: Organisation[];
}

export interface OrganisationCISSettingResponse extends AccountingAPIResponse {
	CISSettings: OrgCISSetting[];
}

export interface OverpaymentsResponse extends AccountingAPIResponse {
	Overpayments: Overpayment[];
}

export interface PaymentsResponse extends AccountingAPIResponse {
	Payments: Payment[];
}

export interface PrepaymentsResponse extends AccountingAPIResponse {
	Prepayments: Prepayment[];
}

// TODO purchase orders

export interface ReceiptsResponse extends AccountingAPIResponse {
	Receipts: Receipt[];
}

export interface RepeatingInvoicesResponse extends AccountingAPIResponse {
	RepeatingInvoices: RepeatingInvoice[];
}

export interface ReportsResponse extends AccountingAPIResponse {
	Reports: any[];
}

export interface TaxRatesResponse extends AccountingAPIResponse {
	TaxRates?: TaxRate[];
}

export interface TrackingCategoriesResponse extends AccountingAPIResponse {
	TrackingCategories?: TrackingCategory[];
}

export interface UsersResponse extends AccountingAPIResponse {
	Users: User[];
}
