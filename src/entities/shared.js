'use strict';

const Entity = require('./entity');

/**
 * ACCOUNTING API SHARED SCHEMAS
 */

module.exports.AddressSchema = Entity.SchemaObject({
  AddressLine1: { type: String, toObject: 'always' },
  AddressLine2: { type: String, toObject: 'always' },
  AddressLine3: { type: String, toObject: 'always' },
  AddressLine4: { type: String, toObject: 'always' },
  City: { type: String, toObject: 'always' },
  Region: { type: String, toObject: 'always' },
  PostalCode: { type: String, toObject: 'always' },
  Country: { type: String, toObject: 'always' },
  AttentionTo: { type: String, toObject: 'always' },
  AddressType: { type: String, toObject: 'always' },
});

module.exports.PhoneSchema = Entity.SchemaObject({
  PhoneNumber: { type: String, toObject: 'always' },
  PhoneAreaCode: { type: String, toObject: 'always' },
  PhoneCountryCode: { type: String, toObject: 'always' },
  PhoneType: { type: String, toObject: 'always' },
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
  IncludeInEmails: { type: Boolean, toObject: 'always' },
});

module.exports.PaymentTermSchema = Entity.SchemaObject({
  Day: { type: Number },
  Type: { type: String },
});

module.exports.BrandingScheme = Entity.SchemaObject({
  BrandingThemeID: { type: String },
  Name: { type: String },
  SortOrder: { type: Number },
  CreatedDateUTC: { type: Date },
});

const InvoiceIDSchema = Entity.SchemaObject({
  InvoiceID: { type: String, toObject: 'hasValue' },
  InvoiceNumber: { type: String, toObject: 'hasValue' },
});

const CreditNoteIDSchema = Entity.SchemaObject({
  CreditNoteID: { type: String, toObject: 'hasValue' },
  CreditNoteNumber: { type: String, toObject: 'hasValue' },
});

const ContactPaymentSchema = Entity.SchemaObject({
  ContactID: { type: String, toObject: 'hasValue' },
  Name: { type: String, toObject: 'hasValue' },
});

const AccountIDorCodeSchema = Entity.SchemaObject({
  AccountID: { type: String, toObject: 'hasValue' },
  Code: { type: String, toObject: 'hasValue' },
});

module.exports.TrackingOptionSchema = Entity.SchemaObject({
  TrackingOptionID: { type: String, toObject: 'always' },
  Name: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'always' },
});

const TrackingOptionsSchema = Entity.SchemaObject({
  TrackingCategoryID: { type: String, toObject: 'hasValue' },
  TrackingOptionID: { type: String, toObject: 'hasValue' },
  Name: { type: String, toObject: 'hasValue' },
  Option: { type: String, toObject: 'hasValue' },
});

const LineItemSchema = Entity.SchemaObject({
  Description: { type: String },
  Quantity: { type: Number },
  UnitAmount: { type: Number },
  ItemCode: { type: String },
  AccountCode: { type: String },
  TaxType: { type: String },
  TaxAmount: { type: Number },
  LineAmount: { type: Number },
  Tracking: {
    type: Array,
    arrayType: TrackingOptionsSchema,
    toObject: 'hasValue',
  },
  DiscountRate: { type: Number },
});

module.exports.ContactTrackingCategory = Entity.SchemaObject({
  TrackingCategoryName: { type: String, toObject: 'hasValue' },
  TrackingOptionName: { type: String, toObject: 'hasValue' },
});

module.exports.AllocationsSchema = Entity.SchemaObject({
  Amount: { type: Number },
  Date: { type: Date },
});

const OverpaymentIDSchema = Entity.SchemaObject({
  OverpaymentID: { type: String, toObject: 'hasValue' },
  CurrencyRate: { type: Number, toObject: 'hasValue' },
  Type: { type: String, toObject: 'hasValue' },
  Contact: { type: ContactPaymentSchema, toObject: 'hasValue' },
  Date: { type: Date, toObject: 'hasValue' },
  Status: { type: String, toObject: 'hasValue' },
  LineAmountTypes: { type: String, toObject: 'hasValue' },
  LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'hasValue' },
  SubTotal: { type: Number, toObject: 'hasValue' },
  TotalTax: { type: Number, toObject: 'hasValue' },
  Total: { type: Number, toObject: 'hasValue' },
  CurrencyCode: { type: String, toObject: 'hasValue' },
});

const PrepaymentIDSchema = Entity.SchemaObject({
  PrepaymentID: { type: String, toObject: 'hasValue' },
  CurrencyRate: { type: Number, toObject: 'hasValue' },
  Type: { type: String, toObject: 'hasValue' },
  Contact: { type: ContactPaymentSchema, toObject: 'hasValue' },
  Date: { type: Date, toObject: 'hasValue' },
  Status: { type: String, toObject: 'hasValue' },
  LineAmountTypes: { type: String, toObject: 'hasValue' },
  LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'hasValue' },
  SubTotal: { type: Number, toObject: 'hasValue' },
  TotalTax: { type: Number, toObject: 'hasValue' },
  Total: { type: Number, toObject: 'hasValue' },
  CurrencyCode: { type: String, toObject: 'hasValue' },
});

module.exports.PaymentSchema = Entity.SchemaObject({
  Invoice: { type: InvoiceIDSchema, toObject: 'always' },
  CreditNote: { type: CreditNoteIDSchema, toObject: 'always' },
  Overpayment: { type: OverpaymentIDSchema, toObject: 'always' },
  Prepayment: { type: PrepaymentIDSchema, toObject: 'always' },
  Account: { type: AccountIDorCodeSchema, toObject: 'always' },
  Date: { type: Date, toObject: 'always' },
  CurrencyRate: { type: Number, toObject: 'hasValue' },
  Amount: { type: Number, toObject: 'hasValue' },
  Reference: { type: String, toObject: 'hasValue' },
  IsReconciled: { type: Boolean, toObject: 'hasValue' },
  Status: { type: String, toObject: 'hasValue' },
  PaymentType: { type: String, toObject: 'hasValue' },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
});

module.exports.LineItemSchema = LineItemSchema;

/**
 * PAYROLL API SHARED SCHEMAS
 */

const EarningsRateSchema = Entity.SchemaObject({
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
  UpdatedDateUTC: { type: Date, toObject: 'never' },
});

const DeductionTypeSchema = Entity.SchemaObject({
  DeductionTypeID: { type: String, toObject: 'always' },
  DeductionCategory: { type: String, toObject: 'always' },
  Name: { type: String, toObject: 'always' },
  AccountCode: { type: String, toObject: 'hasValue' },
  ReducesTax: { type: Boolean, toObject: 'hasValue' },
  ReducesSuper: { type: Boolean, toObject: 'hasValue' },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
});

const ReimbursementTypeSchema = Entity.SchemaObject({
  ReimbursementTypeID: { type: String, toObject: 'always' },
  Name: { type: 'String', toObject: 'always' },
  AccountCode: { type: String, toObject: 'hasValue' },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
});

const LeaveTypeSchema = Entity.SchemaObject({
  LeaveTypeID: { type: String, toObject: 'always' },
  Name: { type: String, toObject: 'always' },
  TypeOfUnits: { type: String, toObject: 'always' },
  NormalEntitlement: { type: String, toObject: 'hasValue' },
  LeaveLoadingRate: { type: String, toObject: 'hasValue' },
  IsPaidLeave: { type: Boolean, toObject: 'always' },
  ShowOnPayslip: { type: Boolean, toObject: 'always' },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
});

const PayItemsSchema = Entity.SchemaObject({
  EarningsRates: [EarningsRateSchema],
  DeductionTypes: [DeductionTypeSchema],
  ReimbursementTypes: [ReimbursementTypeSchema],
  LeaveTypes: [LeaveTypeSchema],
});

module.exports.PayItemsSchema = PayItemsSchema;
module.exports.LeaveTypeSchema = LeaveTypeSchema;
module.exports.ReimbursementTypeSchema = ReimbursementTypeSchema;
module.exports.DeductionTypeSchema = DeductionTypeSchema;
module.exports.EarningsRateSchema = EarningsRateSchema;
