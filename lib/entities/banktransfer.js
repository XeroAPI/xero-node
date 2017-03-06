var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    ContactSchema = require('./contact').ContactSchema,
    Contact = require('./contact'),
    LineItemSchema = require('./shared').LineItemSchema

var BankTransferSchema = new Entity.SchemaObject({
    FromBankAccount: {
        type: {
            AccountID: { type: String, toObject: 'always' },
            Code: { type: String, toObject: 'always' },
            Name: { type: String, toObject: 'always' }
        },
        toObject: 'always'
    },
    ToBankAccount: {
        type: {
            AccountID: { type: String, toObject: 'always' },
            Code: { type: String, toObject: 'always' },
            Name: { type: String, toObject: 'always' }
        },
        toObject: 'always'
    },
    Date: { type: String, toObject: 'always' },
    Amount: { type: String, toObject: 'always' },
    BankTransferID: { type: String, toObject: 'hasValue' },
    CurrencyRate: { type: String, toObject: 'hasValue' },
    FromBankTransactionID: { type: String, toObject: 'hasValue' },
    ToBankTransactionID: { type: String, toObject: 'hasValue' },
    HasAttachments: { type: Boolean, toObject: 'hasValue' },
    CreatedDateUTC: { type: String, toObject: 'hasValue' }
});

var BankTransfer = Entity.extend(BankTransferSchema, {
    constructor: function(application, data, options) {
        logger.debug('BankTransfer::constructor');
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
        _.extend(this, obj);
        return this;
    },
    toXml: function() {
        var transaction = _.omit(this.toObject());
        transaction.FromBankAccount = this.FromBankAccount.toObject();
        transaction.ToBankAccount = this.ToBankAccount.toObject();
        return this.application.js2xml(transaction, 'BankTransfer');
    },
    save: function() {
        var self = this;
        var xml = '<BankTransfers>' + this.toXml() + '</BankTransfers>';
        //JWalsh 22 February 2017
        //Only PUT is supported (beta), no POST..
        return this.application.putOrPostEntity('put', 'BankTransfers', xml, { entityPath: 'BankTransfers.BankTransfer', entityConstructor: function(data) { return self.application.core.bankTransfers.newBankTransfer(data) } });
    }
});

module.exports = BankTransfer;