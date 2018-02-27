export interface InvoicesResponse extends AccountingResponse {
	Invoices: Invoice[];
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

export interface EmployeesResponse extends Employee {
	Employees: Employee[];
}

export interface AccountsResponse extends AccountingResponse {
	Accounts: Account[];
}

interface AccountingResponse {
	Id: string;
	Status: string;
	ProviderName: string;
	DateTimeUTC: string;
}

export interface Invoice {
	Type: string;
	InvoiceID?: string;
	InvoiceNumber?: string;
	Reference?: string;
	Prepayments?: any[];
	Payments?: any[];
	CreditNotes?: any[];
	Overpayments?: any[];
	CISDeduction?: number;
	AmountDue?: number;
	AmountPaid?: number;
	AmountCredited?: number;
	SentToContact?: boolean;
	IsDiscounted?: boolean;
	HasAttachments?: boolean;
	Attachments?: any[];
	Contact?: Contact;
	DateString?: string;
	Date?: string;
	DueDateString?: string;
	DueDate?: string;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: number;
	TotalTax?: number;
	Total?: number;
	UpdatedDateUTC?: string;
	CurrencyCode?: string;
	StatusAttributeString?: string; // Have asked Arr about this
	ValidationErrors?: ValidationError[];
	HasErrors?: boolean;
}

// TODO: Are last two common therefore we can put on common interface?

export interface ValidationError {
	message: string;
}

export interface Contact {
	ContactID?: string;
	ContactStatus?: string;
	Name?: string;
	FirstName?: string;
	LastName?: string;
	EmailAddress?: string;
	DefaultCurrency?: string;
	BankAccountDetails?: string;
	Addresses?: Address[];
	Phones?: Phone[];
	UpdatedDateUTC?: string;
	Balances?: any; // TODO: something here
	ContactGroups?: any[];
	IsSupplier?: boolean;
	IsCustomer?: boolean;
	SalesTrackingCategories?: any[];
	PurchasesTrackingCategories?: any[];
	ContactPersons?: any[];
	HasAttachments?: boolean;
	AccountsReceivableTaxType?: string;
	AccountsPayableTaxType?: string;
	TaxNumber?: string;
	Attachments?: any; // TODO: something here
	SkypeUserName?: string;
	HasValidationErrors?: boolean;
}

export interface ContactGroup {
	ContactGroupID?: string;
	Name?: string;
	Status?: string;
	Contacts?: Contact[];
	HasValidationErrors?: boolean;
}

export interface Currency {
	Code?: string;
	Description?: string;
}

export interface Address {
	AddressType?: string;
	AddressLine1?: string;
	AddressLine2?: string;
	AddressLine3?: string;
	AddressLine4?: string;
	City?: string;
	Region?: string;
	PostalCode?: string;
	Country?: string;
	AttentionTo?: string;
}
export interface Phone {
	PhoneType?: string;
	PhoneNumber?: string;
	PhoneAreaCode?: string;
	PhoneCountryCode?: string;
}
export interface LineItem {
	Description?: string;
	UnitAmount?: number;
	TaxType?: string;
	TaxAmount?: number;
	LineAmount?: number;
	AccountCode?: string;
	Tracking?: Tracking[];
	Quantity?: number;
	LineItemID?: string;
	ValidationErrors?: any[];
}
export interface Tracking {
	Name?: string;
	Option?: string;
	TrackingCategoryID?: string;
	TrackingOptionID?: string;
}

export interface Employee {
	Status?: 'Active' | 'Archive';
	FirstName: string;
	LastName: string;
	ExternalLink?: any;
}

export interface Report {
	ReportID: string;
	ReportName: string;
	ReportType: string;
	ReportTitles?: string[];
	ReportDate: string;
	UpdatedDateUTC: string;
	Attributes?: {
		Name: string;
		Description: string;
		Value: string;
	}[];
	Fields?: Field[];
	Rows: Row[];
}
export interface Field {
	FieldID: string;
	Description: string;
	Value: string;
}
export interface Row {
	RowType: string;
	Cells: Cell[];
}
export interface Cell
{
	Value?: string;
	Attibutes?: {
		Value: string;
		Id: string;
	}[];
}
