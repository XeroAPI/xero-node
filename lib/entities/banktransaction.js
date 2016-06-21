var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , ContactSchema = require('./contact').ContactSchema
    , Contact = require('./contact')
    , LineItemSchema = require('./shared').LineItemSchema

var BankTransactionSchema = new Entity.SchemaObject({
    Contact: { type: ContactSchema , toObject: 'always'},
    Date: {type: Date, toObject: 'always'},
    LineAmountTypes: {type: String, toObject: 'always'},
    LineItems: {type: Array, arrayType: LineItemSchema, toObject: 'always'},
    SubTotal: {type: Number},
    TotalTax: {type: Number},
    Total: {type: Number},
    UpdatedDateUTC: {type: Date},
    FullyPaidOnDate: {type: Date},
    BankTransactionID: {type: String},
    IsReconciled: {type: Boolean, toObject: 'always'},
    CurrencyCode: {type: String, toObject: 'always'},
    Url: {type: String, toObject: 'always'},
    Reference: {type: String, toObject: 'always'},
    BankAccount: {
        type: {
            AccountID: {type: String, toObject: 'always'}
        },
        toObject: 'always'},
    Type: {type: String, toObject: 'always'}
});


var BankTransaction = Entity.extend(BankTransactionSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('BankTransaction::constructor');
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
        _.extend(self, _.omit(obj, 'LineItems','Contact'));
        if (obj.LineItems) {
            var lineItems = this.application.asArray(obj.LineItems.LineItem);
            _.each(lineItems, function (lineItem)
            {
                self.LineItems.push(lineItem);
            })
        }
        if (obj.Contact)
            _.extend(self.Contact, new Contact().fromXmlObj(obj.Contact))

        return this;
    },
    toXml: function ()
    {
        var transaction = _.omit(this.toObject(),'Contact','LineItems');
        transaction.BankAccount = this.BankAccount.toObject();
        transaction.Date = this.Date.getFullYear()+'-'+this.Date.getMonth()+'-'+this.Date.getDate();
        transaction.Contact = this.Contact.toObject();
        transaction.LineItems = [];
        this.LineItems.forEach(function (lineItem){
            transaction.LineItems.push({LineItem: lineItem.toObject()});
        });
        return this.application.js2xml(transaction, 'BankTransaction');
    },
    save:function(cb)
    {
        var xml = '<BankTransactions>' + this.toXml() + '</BankTransactions>';
        //console.log(xml);
        //cb();
        return this.application.putOrPostEntity('put',  'BankTransactions',  xml, {}, cb);
    }
});

module.exports = BankTransaction;
