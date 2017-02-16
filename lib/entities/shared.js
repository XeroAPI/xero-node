var Entity = require('./entity')

module.exports.AddressSchema = new Entity.SchemaObject({
    AddressLine1: { type: String, toObject: 'always' },
    AddressLine2: { type: String, toObject: 'always' },
    City: { type: String, toObject: 'always' },
    PostalCode: { type: String, toObject: 'always' },
    Country: { type: String, toObject: 'always' },
    AttentionTo: { type: String, toObject: 'always' },
    AddressType: { type: String, toObject: 'always' }
});

module.exports.PhoneSchema = new Entity.SchemaObject({
    PhoneNumber: { type: String, toObject: 'always' },
    PhoneAreaCode: { type: String, toObject: 'always' },
    PhoneType: { type: String, toObject: 'always' }
});

module.exports.ExternalLinkSchema = new Entity.SchemaObject({
    LinkType: { type: String },
    Url: { type: String }
});

module.exports.ContactPerson = new Entity.SchemaObject({
    FirstName: { type: String },
    LastName: { type: String },
    EmailAddress: { type: String },
    IncludeInEmails: { type: Boolean }
});

module.exports.PaymentTermSchema = new Entity.SchemaObject({
    Day: { type: Number },
    Type: { type: String }
});

module.exports.BrandingScheme = new Entity.SchemaObject({
    BrandingThemeID: { type: String },
    Name: { type: String },
    SortOrder: { type: Number },
    CreatedDateUTC: { type: Date }
});

module.exports.LineItemSchema = new Entity.SchemaObject({
    Description: { type: String },
    Quantity: { type: Number },
    UnitAmount: { type: Number },
    AccountCode: { type: String },
    ItemCode: { type: String },
    TaxType: { type: String },
    LineAmount: { type: Number },
    Tracking: { type: String }

});

var InvoiceIDSchema = new Entity.SchemaObject({
    InvoiceID: { type: String, toObject: 'hasValue' },
    InvoiceNumber: { type: String, toObject: 'hasValue' }
});

var CreditNoteIDSchema = new Entity.SchemaObject({
    CreditNoteID: { type: String, toObject: 'hasValue' },
    CreditNoteNumber: { type: String, toObject: 'hasValue' }
});

var AccountIDorCodeSchema = new Entity.SchemaObject({
    AccountID: { type: String, toObject: 'hasValue' },
    Code: { type: String, toObject: 'hasValue' }
});

module.exports.PaymentSchema = new Entity.SchemaObject({
    Invoice: { type: InvoiceIDSchema, toObject: 'always' },
    CreditNote: { type: CreditNoteIDSchema, toObject: 'always' },
    Account: { type: AccountIDorCodeSchema, toObject: 'always' },
    Date: { type: String, toObject: 'always' },
    CurrencyRate: { type: Number, toObject: 'hasValue' },
    Amount: { type: Number, toObject: 'hasValue' },
    Reference: { type: String, toObject: 'hasValue' },
    IsReconciled: { type: Boolean, toObject: 'hasValue' },
    Status: { type: String, toObject: 'hasValue' },
    PaymentType: { type: String, toObject: 'hasValue' },
    UpdatedDateUTC: { type: Date, toObject: 'hasValue' }
});