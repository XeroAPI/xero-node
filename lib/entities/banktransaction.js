var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , ContactSchema = require('./contact').ContactSchema
    , Contact = require('./contact')
    , LineItemSchema = require('./shared').LineItemSchema


var BankTransactionSchema = new Entity.SchemaObject({
    Contact: { type: ContactSchema },
    Date: {type: Date},
    LineAmountTypes: {type: String},
    LineItems: {type: Array, arrayType: LineItemSchema, toObject: 'always'},
    SubTotal: {type: Number},
    TotalTax: {type: Number},
    Total: {type: Number},
    UpdatedDateUTC: {type: Date},
    FullyPaidOnDate: {type: Date},
    BankTransactionID: {type: String},
    IsReconciled: {type: Boolean},
    BankAccount: {
        AccountID: { type: String},
        Code: { type: String}
    },
    Type: {type: String}
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

    }
});


module.exports = BankTransaction;

