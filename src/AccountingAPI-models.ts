export interface Attachment {
	AttachmentID: string;
	FileName: string;
	Url: string;
	MimeType: string;
	ContentLength: string;
}

export interface OnlineInvoice {
	OnlineInvoiceUrl: string;
}

export interface LinkedTransaction {
	LinkedTransactionID?: string;
	SourceTransactionID?: string;
	SourceLineItemID?: string;
	ContactID?: string;
	TargetTransactionID?: string;
	TargetLineItemID?: string;
	Status?: string;
	Type?: string;
	UpdatedDateUTC?: string;
	SourceTransactionTypeCode?: string;
}

export interface BankTransaction {
	BankTransactionID?: string;
	Contact?: Contact;
	DateString?: string;
	Date?: string;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: number;
	TotalTax?: number;
	Total?: number;
	UpdatedDateUTC?: string;
	CurrencyCode?: string;
	CurrencyRate?: number;
	BankAccount?: BankAccount;
	Type?: string;
	Reference?: string;
	IsReconciled?: boolean;
	Url?: string;
	PrepaymentID?: string;
	OverpaymentID?: string;
	HasAttachments?: boolean;
	History?: HistoryRecord[];
}

export interface BankAccount {
	AccountID?: string;
	Code?: string;
	Name?: string;
}

export interface BankTransfer {
	BankTransferID?: string;
	CreatedDateUTCString?: string;
	CreatedDateUTC?: string;
	DateString?: string;
	Date?: string;
	FromBankAccount?: {
		AccountID?: string;
		Name?: string;
	};
	ToBankAccount?: {
		AccountID?: string;
		Name?: string;
	};
	Amount?: number;
	FromBankTransactionID?: string;
	ToBankTransactionID?: string;
	History?: HistoryRecord[];
}

export interface Payment {
	PaymentID?: string;
	Date?: string;
	Amount?: number;
	BankAmount?: number;
	Reference?: string;
	CurrencyRate?: number;
	IsReconciled?: boolean;
	Status?: string;
	PaymentType?: string;
	HasAccount?: boolean;
	Account?: any;
	Invoice?: Invoice;
	CreditNote?: CreditNote;
	Prepayment?: Prepayment;
	Overpayment?: Overpayment;
	UpdatedDateUTC?: string;
	History?: HistoryRecord[];
}

export interface BrandingTheme {
	BrandingThemeID: string;
	Name: string;
	SortOrder: number;
	CreatedDateUTC: string;
}

export interface Overpayment {
	OverpaymentID?: string;
	Type?: string;
	Contact?: Contact;
	Date?: string;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: number;
	TotalTax?: number;
	Total?: number;
	UpdatedDateUTC?: string;
	CurrencyCode?: string;
	CurrencyRate?: number;
	RemainingCredit?: number;
	Allocations?: Allocation[];
	Payments?: Payment[];
	HasAttachments?: boolean;
	History?: HistoryRecord[];
}

export interface Prepayment {
	PrepaymentID?: string;
	Type?: string;
	Contact?: Contact;
	Date?: string;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: number;
	TotalTax?: number;
	Total?: number;
	UpdatedDateUTC?: string;
	CurrencyCode?: string;
	CurrencyRate?: number;
	RemainingCredit?: number;
	Allocations?: Allocation[];
	Reference?: string;
	HasAttachments?: boolean;
	History?: HistoryRecord[];
}

export interface Allocation {
	AppliedAmount?: number;
	Date?: string;
	Invoice?: Invoice;
}

export interface CreditNote {
	Contact?: Contact;
	DateString?: string;
	Date?: string;
	DueDate?: string;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: number;
	TotalTax?: number;
	Total?: number;
	UpdatedDateUTC?: string;
	CurrencyCode?: string;
	FullyPaidOnDate?: string;
	Type?: string;
	RemainingCredit?: number;
	Allocations?: Allocation[];
	HasAttachments?: boolean;
	CreditNoteID?: string;
	CreditNoteNumber?: string;
	History?: HistoryRecord[];
}

export interface Invoice {
	Type?: string;
	InvoiceID?: string;
	InvoiceNumber?: string;
	Reference?: string;
	Url?: string;
	Prepayments?: Prepayment[];
	Payments?: Payment[];
	CreditNotes?: CreditNote[];
	Overpayments?: Overpayment[];
	CISDeduction?: number;
	AmountDue?: number;
	AmountPaid?: number;
	AmountCredited?: number;
	SentToContact?: boolean;
	IsDiscounted?: boolean;
	HasAttachments?: boolean;
	FullyPaidOnDate?: string;
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
	History?: HistoryRecord[];
}

export interface InvoiceReminder {
	Enabled?: boolean;
}

export interface RepeatingInvoice {
	Schedule?: Schedule;
	RepeatingInvoiceID?: string;
	Type?: string;
	Reference?: string;
	HasAttachments?: boolean;
	ID?: string;
	Contact?: Contact;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: string;
	TotalTax?: string;
	Total?: string;
	CurrencyCode?: string;
	History?: HistoryRecord[];
}

export interface Schedule {
	Period?: string;
	Unit?: string;
	DueDate?: string;
	DueDateType?: string;
	StartDate?: string;
	NextScheduleDate?: string;
}

export interface HistoryRecord {
	Changes?: string;
	DateUTCString?: string;
	DateUTC?: string;
	User?: String;
	Details?: String;
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
	Balances?: any;
	ContactGroups?: ContactGroup[];
	IsSupplier?: boolean;
	IsCustomer?: boolean;
	SalesTrackingCategories?: Tracking[];
	PurchasesTrackingCategories?: Tracking[];
	ContactPersons?: any[];
	HasAttachments?: boolean;
	AccountsReceivableTaxType?: string;
	AccountsPayableTaxType?: string;
	TaxNumber?: string;
	SkypeUserName?: string;
	History?: HistoryRecord[];
}

export interface ContactGroup {
	ContactGroupID?: string;
	Name?: string;
	Status?: string;
	Contacts?: Contact[];
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
export interface Journal {
	JournalID?: string;
	JournalDate?: string;
	JournalNumber?: string;
	CreatedDateUTC?: string;
	SourceID?: string;
	SourceType?: string;
	JournalLines?: JournalLine[];
}
export interface JournalLine {
	JournalLineID?: string;
	AccountID?: string;
	AccountCode?: string;
	AccountType?: string;
	AccountName?: string;
	NetAmount?: number;
	GrossAmount?: number;
	TaxAmount?: number;
	TaxType?: string;
	Tracking?: Tracking[];
	Description?: string;
	LineAmount?: number;
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
}
export interface ManualJournal {
	ManualJournalID?: string;
	Date?: string;
	LineAmountTypes?: string;
	Status?: string;
	Narration?: string;
	JournalLines?: JournalLine[];
	Url?: string;
	ShowOnCashBasisReports?: boolean;
	HasAttachments?: boolean;
	UpdatedDateUTC?: string;
}
export interface Organisation {
	APIKey: string;
	Name: string;
	LegalName: string;
	PaysTax: boolean;
	Version: string;
	OrganisationType: string;
	BaseCurrency: string;
	CountryCode: string;
	IsDemoCompany: boolean;
	OrganisationStatus: string;
	FinancialYearEndDay: string;
	FinancialYearEndMonth: string;
	SalesTaxBasis: string;
	DefaultSalesTax: string;
	DefaultPurchases: string;
	CreatedDateUTC: string;
	OrganisationEntityType: string;
	Timezone: string;
	ShortCode: string;
	OrganisationID: string;
	LineOfBusiness: string;
}
export interface OrgCISSetting {
	CISContractorEnabled: boolean;
	CISSubContractorEnabled: boolean;
}

export interface Item {
	ItemID?: string;
	Code?: string;
	Name?: string;
	QuantityOnHand?: number;
	TotalCostPool?: number;
	IsSold?: boolean;
	Description?: string;
	SalesDetails?: PurchaseAndSalesDetails;
	IsPurchased?: boolean;
	PurchaseDescription?: string;
	PurchaseDetails?: PurchaseAndSalesDetails;
	IsTrackedAsInventory?: boolean;
	InventoryAssetAccountCode?: string;
	UpdatedDateUTC?: string;
	History?: HistoryRecord[];
}

export interface PurchaseAndSalesDetails {
	UnitPrice: number;
	AccountCode: string;
	COGSAccountCode?: string;
	TaxType?: string;
}

export interface PurchaseOrder {
	PurchaseOrderID?: string;
	PurchaseOrderNumber?: string;
	DateString?: string;
	Date?: string;
	DeliveryDateString?: string;
	DeliveryDate?: string;
	DeliveryAddress?: string;
	AttentionTo?: string;
	Telephone?: string;
	DeliveryInstructions?: string;
	IsDiscounted?: boolean;
	Reference?: string;
	Type?: string;
	CurrencyRate?: string;
	CurrencyCode?: string;
	Contact?: Contact;
	BrandingThemeID?: string;
	Status?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: string;
	TotalTax?: string;
	Total?: string;
	UpdatedDateUTC?: string;
	HasAttachments?: boolean;
	History?: HistoryRecord[];
}

export interface Tracking {
	Name?: string;
	Option?: string;
	TrackingCategoryID?: string;
	TrackingOptionID?: string;
}

export interface Employee {
	EmployeeID?: string;
	Status?: string;
	FirstName?: string;
	LastName?: string;
	ExternalLink?: any;
}

export interface ExpenseClaim {
	ExpenseClaimID?: string;
	Status?: string;
	UpdatedDateUTC?: string;
	User?: User;
	Receipts?: Receipt[];
	Payments?: Payment[];
	Total?: number;
	AmountDue?: number;
	AmountPaid?: number;
	PaymentDueDate?: string;
	ReportingDate?: string;
	History?: HistoryRecord[];
}

export interface User {
	UserID?: string;
	EmailAddress?: string;
	FirstName?: string;
	LastName?: string;
	UpdatedDateUTC?: string;
	IsSubscriber?: boolean;
	OrganisationRole?: string;
}

export interface Receipt {
	ReceiptID?: string;
	ReceiptNumber?: number;
	Status?: string;
	User?: User;
	Reference?: string;
	Contact?: Contact;
	Date?: string;
	UpdatedDateUTC?: string;
	LineAmountTypes?: string;
	LineItems?: LineItem[];
	SubTotal?: number;
	TotalTax?: number;
	Total?: number;
	Url?: string;
	HasAttachments?: boolean;
	History?: HistoryRecord[];
}

export interface Report {
	ReportID: string;
	ReportName: string;
	ReportType: string;
	ReportTitles?: string[];
	ReportDate: string;
	UpdatedDateUTC: string;
	Attributes?: Array<{
		Name: string;
		Description: string;
		Value: string;
	}>;
	Fields?: Field[];
	Rows: Row[];
}
/** @private */
export interface Field {
	FieldID: string;
	Description: string;
	Value: string;
}
/** @private */
export interface Row {
	RowType: string;
	Cells: Cell[];
}
/** @private */
export interface Cell {
	Value?: string;
	Attributes?: Array<{
		Value: string;
		Id: string;
	}>;
}

export interface TaxComponent {
	Name?: string;
	Rate?: number;
	IsCompound?: boolean;
	IsNonRecoverable?: boolean;
}

export interface TaxRate {
	Name?: string;
	TaxType?: string;
	ReportTaxType?: string;
	CanApplyToAssets?: boolean;
	CanApplyToEquity?: boolean;
	CanApplyToExpenses?: boolean;
	CanApplyToLiabilities?: boolean;
	CanApplyToRevenue?: boolean;
	DisplayTaxRate?: number;
	EffectiveRate?: number;
	Status?: string;
	TaxComponents?: TaxComponent[];
}

export interface TrackingCategory {
	Name?: string;
	Status?: string;
	TrackingCategoryID?: string;
	Options?: TrackingOption[];
}

export interface TrackingOption {
	TrackingOptionID?: string;
	Name?: string;
	Status?: string;
}
