var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    AddressSchema = require('./shared').AddressSchema,
    PhoneSchema = require('./shared').PhoneSchema,
    ContactPersonSchema = require('./shared').ContactPerson,
    PaymentTermSchema = require('./shared').PaymentTermSchema,
    dateformat = require('dateformat')

var BatchPaymentSchema = new Entity.SchemaObject({
    BankAccountNumber: { type: String },
    BankAccountName: { type: String },
    Details: { type: String }
});

var ContactSchema = new Entity.SchemaObject({
    ContactID: { type: String, toObject: 'hasValue' },
    ContactNumber: { type: String, toObject: 'hasValue', validators: { maxLength: 50 } },
    AccountNumber: { type: String, toObject: 'hasValue', validators: { maxLength: 50 } },
    ContactStatus: { type: String },
    Name: { type: String, toObject: 'always', validators: { required: true, maxLength: 255 } },
    FirstName: { type: String, toObject: 'always', validators: { maxLength: 255 } },
    LastName: { type: String, toObject: 'always', validators: { maxLength: 255 } },
    EmailAddress: { type: String },
    SkypeUserName: { type: String },
    ContactPersons: [ContactPersonSchema],
    BankAccountDetails: { type: String },
    TaxNumber: { type: String, validators: { maxLength: 50 } },
    AccountsReceivableTaxType: { type: String },
    AccountsPayableTaxType: { type: String },
    Addresses: { type: Array, arrayType: AddressSchema, toObject: 'always' },
    Phones: { type: Array, arrayType: PhoneSchema, toObject: 'always' },
    UpdatedDateUTC: { type: Date, toObject: 'never' },
    IsSupplier: { type: Boolean },
    IsCustomer: { type: Boolean },
    DefaultCurrency: { type: String },
    XeroNetworkKey: { type: String, toObject: 'never' },
    SalesDefaultAccountCode: { type: String, toObject: 'never' },
    PurchasesDefaultAccountCode: { type: String, toObject: 'never' },
    //The following properties are only retrieved on GET requests for specific contacts or with pagination
    ContactGroups: { type: String },
    Website: { type: String },
    BatchPayments: { type: BatchPaymentSchema, toObject: 'hasValue', readOnly: 'true' },
    Discount: { type: String },
    Balances: {
        type: {
            AccountsReceivable: {
                Outstanding: { type: Number },
                Overdue: { type: Number }
            },
            AccountsPayable: {
                Outstanding: { type: Number },
                Overdue: { type: Number }
            }
        },
        toObject: 'hasValue'
    },
    PaymentTerms: {
        type: {
            Bills: PaymentTermSchema,
            Sales: PaymentTermSchema
        },
        toObject: 'hasValue'
    }
});


var Contact = Entity.extend(ContactSchema, {
    constructor: function(application, data, options) {
        logger.debug('Contact::constructor');
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
        Object.assign(self, _.omit(obj, 'Contact', 'LineItems', 'CreditNotes'));
        if (obj.Addresses) {
            this.extractArray(obj.Addresses.Address, this.Addresses);
        }
        if (obj.Phones) {
            this.extractArray(obj.Phones.Phone, this.Phones);
        }
        if (obj.ContactPersons) {
            this.extractArray(obj.ContactPersons.ContactPerson, this.ContactPersons);
        }

        return this;
    },
    toXml: function() {
        var contact = _.omit(this.toObject(), 'Addresses', 'Phones', 'ContactPersons', 'BatchPayments', 'PaymentTerms');

        /**
         * JWalsh 21-02-2017
         * Updated to remove the lodash isEmpty function as the BatchPayments object was being populated with a bunch
         * of data during construction and the object was never Empty.  This meant that the toXML function was entering an infinite
         * loop and causing the SDK to crash.
         * 
         * Instead, I'm now just testing the individual elements within the object to see if they are populated.
         */
        if (this.BatchPayments && (this.BatchPayments.BankAccountNumber || this.BatchPayments.BankAccountName || this.BatchPayments.Details))
            contact.BatchPayments = this.BatchPayments;

        if (this.PaymentTerms &&
            (this.PaymentTerms.Bills && (this.PaymentTerms.Bills.Day || this.PaymentTerms.Bills.Type)) ||
            (this.PaymentTerms.Sales && (this.PaymentTerms.Sales.Day || this.PaymentTerms.Sales.Type))
        ) {
            contact.PaymentTerms = this.PaymentTerms;
        }

        if (!_.isEmpty(this.Addresses)) {
            contact.Addresses = [];
            _.forEach(this.Addresses, function(address) {
                contact.Addresses.push({ Address: address.toObject() })
            })
        }
        if (!_.isEmpty(this.Phones)) {
            contact.Phones = [];
            _.forEach(this.Phones, function(phone) {
                contact.Phones.push({ Phone: phone.toObject() })
            })
        }
        if (!_.isEmpty(this.ContactPersons)) {
            contact.ContactPersons = [];
            _.forEach(this.ContactPersons, function(contactPerson) {
                contact.ContactPersons.push({ ContactPerson: contactPerson.toObject() })
            })
        }

        return this.application.js2xml(contact, 'Contact');
    },
    getAttachments: function(options) {
        return this.application.core.attachments.getAttachments('Contacts/' + this.ContactID, options)
    },
    getAttachmentContent: function(fileName, options) {
        return this.application.core.attachments.getContent('Contacts/' + this.ContactID, fileName, options);
    },
    save: function() {
        var self = this;
        var xml = '<Contacts>' + this.toXml() + '</Contacts>';
        var path, method;
        if (this.ContactID) {
            path = 'Contacts/' + this.ContactID;
            method = 'post'
        } else {
            path = 'Contacts';
            method = 'put'
        }

        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'Contacts.Contact', entityConstructor: function(data) { return self.application.core.contacts.newContact(data) } })
    }
});


module.exports = Contact;
module.exports.ContactSchema = ContactSchema;