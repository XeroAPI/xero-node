var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , ContactSchema = require('./contact').ContactSchema
    , Contact = require('./contact')
    , LineItemSchema = require('./shared').LineItemSchema

var BankTransferSchema = new Entity.SchemaObject({
    FromBankAccount: {
        type: {
            AccountID: {type: String, toObject: 'always'}
        },
        toObject: 'always'
    },
    ToBankAccount: {
        type: {
            AccountID: {type: String, toObject: 'always'}
        },
        toObject: 'always'
    },
    Amount: {type: String, toObject: 'always'}
});

/**
<BankTransfers>
  <BankTransfer>
    <FromBankAccount>
      <Code>090</Code>
    </FromBankAccount>
    <ToBankAccount>
      <Code>091</Code>
    </ToBankAccount>
    <Amount>20.00</Amount>
  </BankTransfer>
</BankTransfers>
*/
var BankTransfer = Entity.extend(BankTransferSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('BankTransfer::constructor');
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
        return this;
    },
    toXml: function ()
    {
        var transaction = _.omit(this.toObject());
        transaction.FromBankAccount = this.FromBankAccount.toObject();
        transaction.ToBankAccount = this.ToBankAccount.toObject();
        transaction.Date = this.Date.toObject();
        return this.application.js2xml(transaction, 'BankTransfer');
    },
    save:function(cb)
    {
        var xml = '<BankTransfers>' + this.toXml() + '</BankTransfers>';
        //console.log(xml);
        //cb();
        return this.application.putOrPostEntity('put',  'BankTransfers',  xml, {}, cb);
    }
});

module.exports = BankTransfer;
