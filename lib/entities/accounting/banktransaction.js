var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger'),
    ContactSchema = require('./contact').ContactSchema,
    Contact = require('./contact'),
    LineItemSchema = require('../shared').LineItemSchema

var BankTransactionSchema = new Entity.SchemaObject({
    Type: { type: String, toObject: 'always' },
    Contact: { type: ContactSchema, toObject: 'always' },
    LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'always' },
    BankAccount: {
        type: {
            AccountID: { type: String, toObject: 'always' }
        },
        toObject: 'always'
    },
    IsReconciled: { type: Boolean, toObject: 'always' },
    Date: { type: String, toObject: 'always' },
    Reference: { type: String, toObject: 'always' },
    CurrencyCode: { type: String, toObject: 'always' },
    CurrencyRate: { type: String, toObject: 'hasValue' },
    Url: { type: String, toObject: 'always' },
    Status: { type: String, toObject: 'always' },
    LineAmountTypes: { type: String, toObject: 'always' },
    SubTotal: { type: Number },
    TotalTax: { type: Number },
    Total: { type: Number },
    BankTransactionID: { type: String },
    PrepaymentID: { type: String },
    OverpaymentID: { type: String },
    UpdatedDateUTC: { type: Date, toObject: 'never' },
    HasAttachments: { type: Boolean, toObject: 'always' },
    FullyPaidOnDate: { type: Date }
});

var BankTransaction = Entity.extend(BankTransactionSchema, {
    constructor: function(application, data, options) {
        logger.debug('BankTransaction::constructor');
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
        Object.assign(self, _.omit(obj, 'LineItems', 'Contact'));
        if (obj.LineItems) {
            this.extractArray(obj.LineItems.LineItem, this.LineItems);
        }
        if (obj.Contact)
            Object.assign(self.Contact, new Contact(self.application).fromXmlObj(obj.Contact))

        return this;
    },
    toXml: function() {
        var transaction = _.omit(this.toObject(), 'Contact', 'LineItems');
        transaction.BankAccount = this.BankAccount.toObject();
        transaction.Contact = this.Contact.toObject();
        transaction.LineItems = [];
        this.LineItems.forEach(function(lineItem) {
            transaction.LineItems.push({ LineItem: lineItem.toObject() });
        });
        return this.application.js2xml(transaction, 'BankTransaction');
    },
    save: function() {
        var self = this;
        var xml = '<BankTransactions>' + this.toXml() + '</BankTransactions>';
        var path, method;
        if (this.BankTransactionID) {
            path = 'BankTransactions/' + this.BankTransactionID;
            method = 'post'
        } else {
            path = 'BankTransactions';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'BankTransactions.BankTransaction', entityConstructor: function(data) { return self.application.core.bankTransactions.newBankTransaction(data) } })
    }
});

module.exports = BankTransaction;