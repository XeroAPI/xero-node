// export interface AccountingResponse {
// 	Id: string;
// 	Status: string;
// 	ProviderName: string;
// 	DateTimeUTC: string;
// 	Invoice?: (Invoice)[] | null;
// }

export interface AccountingResponse<T> {
	Id: string;
	Status: string;
	ProviderName: string;
	DateTimeUTC: string;
	Invoices?: T[];
	Contacts?: T[];
	ContactGroups?: T[];
	// All other types
}

export interface Invoice {
	Type: string;
	InvoiceID: string;
	InvoiceNumber: string;
	Reference: string;
	Prepayments?: (null)[] | null;
	Overpayments?: (null)[] | null;
	CISDeduction: number;
	AmountDue: number;
	AmountPaid: number;
	AmountCredited: number;
	SentToContact: boolean;
	HasErrors: boolean;
	IsDiscounted: boolean;
	HasAttachments: boolean;
	Attachments?: (null)[] | null;
	Contact: Contact;
	DateString: string;
	Date: string;
	DueDateString: string;
	DueDate: string;
	Status: string;
	LineAmountTypes: string;
	LineItems?: (LineItem)[] | null;
	SubTotal: number;
	TotalTax: number;
	Total: number;
	UpdatedDateUTC: string;
	CurrencyCode: string;
}
export interface Contact {
	ContactID: string;
	ContactStatus: string;
	Name: string;
	FirstName: string;
	LastName: string;
	EmailAddress: string;
	BankAccountDetails: string;
	Addresses?: (Address)[] | null;
	Phones?: (Phone)[] | null;
	UpdatedDateUTC: string;
	ContactGroups?: (null)[] | null;
	IsSupplier: boolean;
	IsCustomer: boolean;
	SalesTrackingCategories?: (null)[] | null;
	PurchasesTrackingCategories?: (null)[] | null;
	ContactPersons?: (null)[] | null;
	HasValidationErrors?: boolean;
}

export interface ContactGroup {
	ContactGroupID?: string;
	Name?: string;
	Status?: string;
	Contacts?: (Contact)[] | null;
	HasValidationErrors?: boolean;
}

export interface Address {
	AddressType: string;
	AddressLine1: string;
	AddressLine2: string;
	AddressLine3: string;
	AddressLine4: string;
	City: string;
	Region: string;
	PostalCode: string;
	Country: string;
	AttentionTo: string;
}
export interface Phone {
	PhoneType: string;
	PhoneNumber: string;
	PhoneAreaCode: string;
	PhoneCountryCode: string;
}
export interface LineItem {
	Description: string;
	UnitAmount: number;
	TaxType: string;
	TaxAmount: number;
	LineAmount: number;
	AccountCode: string;
	Tracking?: (Tracking)[] | null;
	Quantity: number;
	LineItemID: string;
	ValidationErrors?: (null)[] | null;
}
export interface Tracking {
	Name: string;
	Option: string;
	TrackingCategoryID: string;
	TrackingOptionID: string;
}
