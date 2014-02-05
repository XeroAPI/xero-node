var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , BankTransaction = require('../entities/banktransaction')
    , p = require('../misc/promise')
    , util = require('util')

var BankTransactions = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.apply(this, arguments);
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
        options = options || {};
        var self = this;
        var path = 'BankTransactions';
        if (options.id)
            path += '/' + options.id;

        var clonedOptions = _.clone(options || {});
        options.entityPath = 'BankTransactions.BankTransaction';
        options.entityConstructor = function(data) { return self.newBankTransaction(data)};
        return this.application.getEntities(path, options);
    }
})

module.exports = BankTransactions;

