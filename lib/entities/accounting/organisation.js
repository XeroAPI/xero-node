'use strict';

const Entity = require('../entity');
const AddressSchema = require('../shared').AddressSchema;
const PhoneSchema = require('../shared').PhoneSchema;
const ExternalLinkSchema = require('../shared').ExternalLinkSchema;
const PaymentTermSchema = require('../shared').PaymentTermSchema;

const OrganisationSchema = Entity.SchemaObject({
  OrganisationID: { type: String },
  APIKey: { type: String },
  Name: { type: String },
  LegalName: { type: String },
  PaysTax: { type: Boolean },
  Version: { type: String },
  OrganisationType: { type: String },
  BaseCurrency: { type: String },
  CountryCode: { type: String },
  IsDemoCompany: { type: Boolean },
  OrganisationStatus: { type: String },
  RegistrationNumber: { type: String },
  TaxNumber: { type: String },
  FinancialYearEndDay: { type: Number },
  FinancialYearEndMonth: { type: Number },
  SalesTaxBasis: { type: String },
  SalesTaxPeriod: { type: String },
  DefaultSalesTax: { type: String },
  DefaultPurchasesTax: { type: String },
  PeriodLockDate: { type: Date },
  EndOfYearLockDate: { type: Date },
  CreatedDateUTC: { type: Date },
  Timezone: { type: String },
  OrganisationEntityType: { type: String },
  ShortCode: { type: String },
  LineOfBusiness: { type: String },
  Addresses: { type: Array, arrayType: AddressSchema, toObject: 'always' },
  Phones: { type: Array, arrayType: PhoneSchema, toObject: 'always' },
  ExternalLinks: {
    type: Array,
    arrayType: ExternalLinkSchema,
    toObject: 'always',
  },
  PaymentTerms: {
    Bills: PaymentTermSchema,
    Sales: PaymentTermSchema,
  },
});

const Organisation = Entity.extend(OrganisationSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  changes: function(options) {
    return this._super(options);
  },
  _toObject: function(options) {
    return this._super(options);
  },
});

module.exports.Organisation = Organisation;
