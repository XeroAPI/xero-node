var Entity = require('./entity')

/**
 * ACCOUNTING API SHARED SCHEMAS
 */

var AddressDetailsSchema = Entity.SchemaObject({
    AddressLine1: { type: String, toObject: 'always' },
    AddressLine2: { type: String, toObject: 'always' },
    AddressLine3: { type: String, toObject: 'always' },
    AddressLine4: { type: String, toObject: 'always' },
    City: { type: String, toObject: 'always' },
    Region: { type: String, toObject: 'always' },
    PostalCode: { type: String, toObject: 'always' },
    Country: { type: String, toObject: 'always' },
    AttentionTo: { type: String, toObject: 'always' },
    AddressType: { type: String, toObject: 'always' }
})

module.exports.AddressSchema = AddressDetailsSchema;

module.exports.PhoneSchema = Entity.SchemaObject({
    PhoneNumber: { type: String, toObject: 'always' },
    PhoneAreaCode: { type: String, toObject: 'always' },
    PhoneCountryCode: { type: String, toObject: 'always' },
    PhoneType: { type: String, toObject: 'always' }
});

const ExternalLinkDetailsSchema = Entity.SchemaObject({
  LinkType: { type: String, toObject: 'always' },
  Url: { type: String, toObject: 'always' },
});

module.exports.ExternalLinkSchema = Entity.SchemaObject({
  ExternalLink: { type: ExternalLinkDetailsSchema, toObject: 'always' },
});

module.exports.ContactPerson = new Entity.SchemaObject({
    FirstName: { type: String, toObject: 'always' },
    LastName: { type: String, toObject: 'always' },
    EmailAddress: { type: String, toObject: 'always' },
    IncludeInEmails: { type: Boolean, toObject: 'always' }
});

module.exports.PaymentTermSchema = Entity.SchemaObject({
    Day: { type: Number },
    Type: { type: String }
});

module.exports.BrandingScheme = Entity.SchemaObject({
    BrandingThemeID: { type: String },
    Name: { type: String },
    SortOrder: { type: Number },
    CreatedDateUTC: { type: Date }
});

var InvoiceIDSchema = Entity.SchemaObject({
    InvoiceID: { type: String, toObject: 'hasValue' },
    InvoiceNumber: { type: String, toObject: 'hasValue' }
});

var CreditNoteIDSchema = Entity.SchemaObject({
    CreditNoteID: { type: String, toObject: 'hasValue' },
    CreditNoteNumber: { type: String, toObject: 'hasValue' }
});

var AccountIDorCodeSchema = Entity.SchemaObject({
    AccountID: { type: String, toObject: 'hasValue' },
    Code: { type: String, toObject: 'hasValue' }
});

module.exports.PaymentSchema = Entity.SchemaObject({
    Invoice: { type: InvoiceIDSchema, toObject: 'always' },
    CreditNote: { type: CreditNoteIDSchema, toObject: 'always' },
    Account: { type: AccountIDorCodeSchema, toObject: 'always' },
    Date: { type: Date, toObject: 'always' },
    CurrencyRate: { type: Number, toObject: 'hasValue' },
    Amount: { type: Number, toObject: 'hasValue' },
    Reference: { type: String, toObject: 'hasValue' },
    IsReconciled: { type: Boolean, toObject: 'hasValue' },
    Status: { type: String, toObject: 'hasValue' },
    PaymentType: { type: String, toObject: 'hasValue' },
    UpdatedDateUTC: { type: Date, toObject: 'never' }
});

module.exports.TrackingOptionSchema = Entity.SchemaObject({
    TrackingOptionID: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    Status: { type: String, toObject: 'always' }
});

var TrackingCategoryOptionsSchema = Entity.SchemaObject({
    TrackingCategoryID: { type: String, toObject: 'hasValue' },
    Name: { type: String, toObject: 'hasValue' },
    Option: { type: String, toObject: 'hasValue' }
});

var TrackingCategorySchema = Entity.SchemaObject({
    TrackingCategory: { type: TrackingCategoryOptionsSchema, toObject: 'hasValue' }
});

module.exports.LineItemSchema = Entity.SchemaObject({
    Description: { type: String },
    Quantity: { type: Number },
    UnitAmount: { type: Number },
    ItemCode: { type: String },
    AccountCode: { type: String },
    TaxType: { type: String },
    TaxAmount: { type: Number },
    LineAmount: { type: Number },
    Tracking: { type: Array, arrayType: TrackingCategorySchema, toObject: 'hasValue' },
    DiscountRate: { type: Number }
});

/**
 * PAYROLL API SHARED SCHEMAS
 */

var EarningsRateSchema = Entity.SchemaObject({
    EarningsRateID: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    AccountCode: { type: String, toObject: 'always' },
    TypeOfUnits: { type: String, toObject: 'always' },
    IsExemptFromTax: { type: Boolean, toObject: 'always' },
    IsExemptFromSuper: { type: Boolean, toObject: 'always' },
    EarningsType: { type: String, toObject: 'always' },
    RateType: { type: String, toObject: 'always' },
    RatePerUnit: { type: String, toObject: 'hasValue' },
    Multiplier: { type: Number, toObject: 'hasValue' },
    AccrueLeave: { type: Boolean, toObject: 'hasValue' },
    Amount: { type: Number, toObject: 'always' },
    UpdatedDateUTC: { type: Date, toObject: 'never' }
});

var DeductionTypeSchema = Entity.SchemaObject({
    DeductionTypeID: { type: String, toObject: 'always' },
    DeductionCategory: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    AccountCode: { type: String, toObject: 'hasValue' },
    ReducesTax: { type: Boolean, toObject: 'hasValue' },
    ReducesSuper: { type: Boolean, toObject: 'hasValue' },
    UpdatedDateUTC: { type: Date, toObject: 'never' }
});

var ReimbursementTypeSchema = Entity.SchemaObject({
    ReimbursementTypeID: { type: String, toObject: 'always' },
    Name: { type: 'String', toObject: 'always' },
    AccountCode: { type: String, toObject: 'hasValue' },
    UpdatedDateUTC: { type: Date, toObject: 'never' }
});

var LeaveTypeSchema = Entity.SchemaObject({
    LeaveTypeID: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    TypeOfUnits: { type: String, toObject: 'always' },
    NormalEntitlement: { type: String, toObject: 'hasValue' },
    LeaveLoadingRate: { type: String, toObject: 'hasValue' },
    IsPaidLeave: { type: Boolean, toObject: 'always' },
    ShowOnPayslip: { type: Boolean, toObject: 'always' },
    UpdatedDateUTC: { type: Date, toObject: 'never' }
});

var PayItemsSchema = Entity.SchemaObject({
    EarningsRates: [EarningsRateSchema],
    DeductionTypes: [DeductionTypeSchema],
    ReimbursementTypes: [ReimbursementTypeSchema],
    LeaveTypes: [LeaveTypeSchema]
});

module.exports.PayItemsSchema = PayItemsSchema
module.exports.LeaveTypeSchema = LeaveTypeSchema
module.exports.ReimbursementTypeSchema = ReimbursementTypeSchema
module.exports.DeductionTypeSchema = DeductionTypeSchema
module.exports.EarningsRateSchema = EarningsRateSchema
