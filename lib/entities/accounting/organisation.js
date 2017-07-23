var _ = require('lodash'),
    Entity = require('../entity'),
    AddressSchema = require('../shared').AddressSchema,
    PhoneSchema = require('../shared').PhoneSchema,
    ExternalLinkSchema = require('../shared').ExternalLinkSchema,
    PaymentTermSchema = require('../shared').PaymentTermSchema

var OrganisationSchema = new Entity.SchemaObject({
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
    ExternalLinks: [ExternalLinkSchema],
    PaymentTerms: {
        Bills: PaymentTermSchema,
        Sales: PaymentTermSchema
    }
});


var Organisation = Entity.extend(OrganisationSchema, {
    constructor: function(application, data, options) {
        console.log('Organisation::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    fromXmlObj: function(obj) {
        var self = this;
        Object.assign(self, _.omit(obj, 'Addresses', 'Phones', 'ExternalLinks'));
        if (obj.Addresses) {
            _.each(obj.Addresses.Address, function(address) {
                self.Addresses.push(address);
            })
        }
        if (obj.Phones) {
            _.each(obj.Phones.Phone, function(phone) {
                self.Phones.push(phone);
            })
        }
        if (obj.ExternalLinks) {
            _.each(obj.ExternalLinks.ExternalLink, function(externalLink) {
                self.ExternalLinks.push(externalLink);
            })
        }

        return this;
    }
});


module.exports = Organisation;