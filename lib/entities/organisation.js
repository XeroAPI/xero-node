var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , AddressSchema = require('./shared').AddressSchema
    , PhoneSchema = require('./shared').PhoneSchema
    , ExternalLinkSchema = require('./shared').ExternalLinkSchema
    , PaymentTermSchema = require('./shared').PaymentTermSchema


var OrganisationSchema = new Entity.SchemaObject({
    APIKey: { type: String },
    Name: {type: String},
    LegalName: {type: String},
    PaysTax: {type: Boolean},
    Version: {type: String},
    OrganisationEntityType: {type: String},
    BaseCurrency: {type: String},
    CountryCode: {type: String},
    IsDemoCompany: {type: Boolean},
    OrganisationStatus: {type: String},
    TaxNumber: {type: String},
    Timezone: {type: String},
    FinancialYearEndDay: {type: Number},
    FinancialYearEndMonth: {type: Number},
    PeriodLockDate: {type:Date},
    EndOfYearLockDate: {type:Date},
    RegistrationNumber: {type: String},
    ShortCode: {type: String},
    LineOfBusiness: {type: String},
    CreatedDateUTC: {type: Date},
    Addresses: {type: Array, arrayType: AddressSchema, toObject:'always'},
    ExternalLinks: [ExternalLinkSchema],
    PaymentTerms: {
        Bills: PaymentTermSchema,
        Sales: PaymentTermSchema
    },
    Phones: {type: Array, arrayType: PhoneSchema, toObject:'always'}
});


var Organisation = Entity.extend(OrganisationSchema, {
    constructor: function (application,data, options)
    {
        logger.debug('Organisation::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    changes: function(options)
    {
        return this._super(options);
    },
    _toObject: function (options)
    {
        return this._super(options);
    },
    fromXmlObj: function(obj)
    {
        var self = this;
        _.extend(self,_.omit(obj,'Addresses','Phones','ExternalLinks'));
        _.each(obj.Addresses.Address, function(address)
        {
            self.Addresses.push(address);
        })
        _.each(obj.Phones.Phone, function(phone)
        {
            self.Phones.push(phone);
        })
        _.each(obj.ExternalLinks.ExternalLink, function(externalLink)
        {
            self.ExternalLinks.push(externalLink);
        })

        return this;
    },
    toXml: function()
    {

    }
});


module.exports = Organisation;

