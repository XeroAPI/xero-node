export interface InvoicesResponse extends AccountingResponse {
	Invoices: Invoice[];
}

export interface ContactGroupsResponse extends AccountingResponse {
	ContactGroups: ContactGroup[];
}

export interface ContactsResponse extends AccountingResponse {
	Contacts: Contact[];
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
	Overpayments?: any[];
	CISDeduction?: number;
	AmountDue?: number;
	AmountPaid?: number;
	AmountCredited?: number;
	SentToContact?: boolean;
	HasErrors?: boolean;
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
