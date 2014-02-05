var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , AddressSchema = require('./shared').AddressSchema
    , PhoneSchema = require('./shared').PhoneSchema
    , ContactPersonSchema = require('./shared').ContactPerson
    , PaymentTermSchema = require('./shared').PaymentTermSchema

var ContactSchema = new Entity.SchemaObject({
    ContactID: { type: String },
    ContactNumber: {type: String},
    ContactStatus: {type: String},
    Name: {type: String},
    FirstName: {type: String},
    LastName: {type: String},
    EmailAddress: {type: String},
    SkypeUserName: {type: String},
    ContactPersons: [ContactPersonSchema],
    BankAccountDetails: {type: String},
    TaxNumber: {type: String},
    AccountsReceivableTaxType: {type: String},
    AccountsPayableTaxType: {type: String},
    Addresses: {type: Array, arrayType: AddressSchema, toObject: 'always'},
    Phones: {type: Array, arrayType: PhoneSchema, toObject: 'always'},
    UpdatedDateUTC: {type: Date},
    ContactGroups: {type: String},
    IsSupplier: {type: Boolean},
    IsCustomer: {type: Boolean},
    DefaultCurrency: {type: String},
    Website: {type: String},
    BatchPayments: {
        BankAccountNumber: { type: String},
        BankAccountName: { type: String},
        Details: { type: String}
    },
    Discount: {type: String},
    Balances: {
        AccountsReceivable: {
            Outstanding: {type: Number},
            Overdue: {type: Number}
        },
        AccountsPayable: {
            Outstanding: {type: Number},
            Overdue: {type: Number}
        }
    },
    PaymentTerms: {
        Bills: PaymentTermSchema,
        Sales: PaymentTermSchema
    }
});


var Contact = Entity.extend(ContactSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Contact::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    changes: function (options)
    {
        return this._super(options);
    },
    _toObject: function (options)
    {
        return this._super(options);
    },
    fromXmlObj: function (obj)
    {
        var self = this;
        _.extend(self, _.omit(obj, 'Addresses', 'Phones', 'ContactPersons'));
        if (obj.Addresses) {
            var addresses = this.application.asArray(obj.Addresses.Address);
            _.each(addresses, function (address)
            {
                self.Addresses.push(address);
            })
        }
        if (obj.Phones) {
            var phones = this.application.asArray(obj.Phones.Phone);
            _.each(phones, function (phone)
            {
                self.Phones.push(phone);
            })
        }
        if (obj.ContactPersons) {
            var contactPersons = this.application.asArray(obj.ContactPersons.ContactPerson);
            _.each(contactPersons, function (contactPerson)
            {
                self.ContactPersons.push(contactPerson);
            })
        }

        return this;
    },
    toXml: function ()
    {

    }
});


module.exports = Contact;
module.exports.ContactSchema = ContactSchema;
