var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , BankTransaction = require('../entities/banktransaction')
    , p = require('../misc/promise')
    , util = require('util')

var BankTransactions = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'BankTransaction', entityPlural:'BankTransactions'}, options));
    },
    newBankTransaction: function (data, options)
    {
        return new BankTransaction(this.application, data, options)
    },
    getBankTransaction: function (id, modifiedAfter)
    {
        return this.getBankTransactions({ id: id, modifiedAfter: modifiedAfter})
            .then(function (bankTransactions)
            {
                return _.first(bankTransactions);
            })
    },
    createBankTransactions: function (bankTransactions, options)
    {

    },
    getBankTransactions: function (options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newBankTransaction(data)};
        return this.getEntities(clonedOptions)
    }
})

module.exports = BankTransactions;

