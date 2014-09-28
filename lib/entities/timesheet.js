var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , AddressSchema = require('./shared').AddressSchema
    , PhoneSchema = require('./shared').PhoneSchema
    , ContactPersonSchema = require('./shared').ContactPerson
    , PaymentTermSchema = require('./shared').PaymentTermSchema
    , dateformat = require('dateformat')

var ContactSchema = new Entity.SchemaObject({
    ContactID: { type: String, toObject: 'never' },
    ContactNumber: {type: String, toObject: 'never'},
    ContactStatus: {type: String},
    Name: {type: String, toObject: 'always', validators: { required: true, maxLength: 500}},
    FirstName: {type: String, toObject: 'always', validators: { maxLength: 255}},
    LastName: {type: String, toObject: 'always', validators: { maxLength: 255}},
    EmailAddress: {type: String},
    SkypeUserName: {type: String},
    ContactPersons: [ContactPersonSchema],
    BankAccountDetails: {type: String},
    TaxNumber: {type: String},
    AccountsReceivableTaxType: {type: String},
    AccountsPayableTaxType: {type: String},
    Addresses: {type: Array, arrayType: AddressSchema, toObject: 'always'},
    Phones: {type: Array, arrayType: PhoneSchema, toObject: 'always'},
    UpdatedDateUTC: {type: Date, toObject: 'never'},
    ContactGroups: {type: String},
    IsSupplier: {type: Boolean},
    IsCustomer: {type: Boolean},
    DefaultCurrency: {type: String},
    Website: {type: String},
    BatchPayments: {type: {
        BankAccountNumber: { type: String},
        BankAccountName: { type: String},
        Details: { type: String}
    }, toObject:'always'
    },
    Discount: {type: String},
    Balances: {type: {
        AccountsReceivable: {
            Outstanding: {type: Number},
            Overdue: {type: Number}
        },
        AccountsPayable: {
            Outstanding: {type: Number},
            Overdue: {type: Number}
        }}, toObject: 'never'
    },
    PaymentTerms: {type: {
        Bills: PaymentTermSchema,
        Sales: PaymentTermSchema
    }, toObject: 'always'
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
        var contact = _.omit(this.toObject(), 'Addresses', 'Phones', 'ContactPersons');
        _.extend(contact, { Addresses: [], Phones: [], ContactPersons: []});
        _.forEach(this.Addresses, function(address)
        {
            contact.Addresses.push({ Address: address.toObject()})
        })
        _.forEach(this.Phones, function(phone)
        {
            contact.Phones.push({ Phone: phone.toObject()})
        })
        _.forEach(this.ContactPersons, function(contactPerson)
        {
            contact.ContactPersons.push({ ContactPerson: contactPerson.toObject()})
        })

        return this.application.js2xml(contact, 'Contact');
    },
    getAttachments:function(options)
    {
        return this.application.core.attachments.getAttachments('Contacts/' + this.ContactID,options)
    },
    getAttachmentContent:function(fileName,options)
    {
        return this.application.core.attachments.getContent('Contacts/' + this.ContactID,fileName,options);
    },
    save:function(options)
    {
        var xml = '<Contacts>' + this.toXml() + '</Contacts>';
        var path, method;
        if (this.ContactID)
        {
            path = 'Contacts/' + this.ContactID;
            method = 'post'
        }
        else
        {
            path = 'Contacts';
            method = 'put'
        }
        return this.application.putOrPostEntity(method,  path,  xml)
    }
});


module.exports = Contact;
module.exports.ContactSchema = ContactSchema;
