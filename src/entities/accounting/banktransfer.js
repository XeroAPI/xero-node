var _ = require('lodash'),
    Entity = require('../entity'),
    ContactSchema = require('./contact').ContactSchema,
    Contact = require('./contact'),
    LineItemSchema = require('../shared').LineItemSchema

var BankTransferSchema = Entity.SchemaObject({
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
    Date: { type: Date, toObject: 'always' },
    Amount: { type: String, toObject: 'always' },
    BankTransferID: { type: String, toObject: 'hasValue' },
    CurrencyRate: { type: String, toObject: 'hasValue' },
    FromBankTransactionID: { type: String, toObject: 'hasValue' },
    ToBankTransactionID: { type: String, toObject: 'hasValue' },
    HasAttachments: { type: Boolean, toObject: 'hasValue' },
    CreatedDateUTC: { type: Date, toObject: 'hasValue' }
});

var BankTransfer = Entity.extend(BankTransferSchema, {
    constructor: function(application, data, options) {
        
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
        return this.application.core.attachments.getAttachments('BankTransfers/' + this.BankTransferID, options)
    },
    save: function() {
        var self = this;
        //JWalsh 22 February 2017
        //Only PUT is supported (beta), no POST..
        return this.application.putOrPostEntity('put', 'BankTransfers', JSON.stringify(self), { entityPath: 'BankTransfers', entityConstructor: function(data) { return self.application.core.bankTransfers.newBankTransfer(data) } });
    }
});

module.exports.BankTransfer = BankTransfer;