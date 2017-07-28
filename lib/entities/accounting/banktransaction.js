var _ = require('lodash'),
    Entity = require('../entity'),
    ContactSchema = require('./contact').ContactSchema,
    Contact = require('./contact').Contact,
    LineItemSchema = require('../shared').LineItemSchema

var BankTransactionSchema = Entity.SchemaObject({
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
    Date: { type: Date, toObject: 'always' },
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
        console.log('BankTransaction::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    getAttachments: function(options) {
        return this.application.core.attachments.getAttachments('BankTransactions/' + this.BankTransactionID, options)
    },
    save: function() {
        var self = this;
        var path, method;
        if (this.BankTransactionID) {
            path = 'BankTransactions/' + this.BankTransactionID;
            method = 'post'
        } else {
            path = 'BankTransactions';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, JSON.stringify(self), { entityPath: 'BankTransactions', entityConstructor: function(data) { return self.application.core.bankTransactions.newBankTransaction(data) } })
    }
});

module.exports.BankTransaction = BankTransaction;