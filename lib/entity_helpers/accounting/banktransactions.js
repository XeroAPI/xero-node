var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    BankTransaction = require('../../entities/accounting/banktransaction').BankTransaction,
    util = require('util')

var BankTransactions = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'BankTransactions' }, options));
    },
    newBankTransaction: function(data, options) {
        return new BankTransaction(this.application, data, options)
    },
    newBankTransactions: function(data) {
        var that = this;
        return _.map(data, function(item) {
            return new BankTransaction(that.application, item, {});
        });
    },
    getBankTransaction: function(id, modifiedAfter) {
        return this.getBankTransactions({ id: id, modifiedAfter: modifiedAfter })
            .then(function(bankTransactions) {
                return _.first(bankTransactions);
            })
    },
    getBankTransactions: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newBankTransaction(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = BankTransactions;