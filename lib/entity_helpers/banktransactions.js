var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    BankTransaction = require('../entities/banktransaction'),
    util = require('util'),
    ga = require('../misc/tracking');

var entityName = 'BankTransactionsHelper';
var BankTransactions = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'BankTransaction', entityPlural: 'BankTransactions' }, options));
    },
    newBankTransaction: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new BankTransaction(this.application, data, options)
    },
    newBankTransactions: function(data) {
        this.trackEvent(entityName, arguments.callee.name);
        var that = this;
        return _.map(data, function(item) {
            return new BankTransaction(that.application, item, {});
        });
    },
    getBankTransaction: function(id, modifiedAfter) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getBankTransactions({ id: id, modifiedAfter: modifiedAfter })
            .then(function(bankTransactions) {
                return _.first(bankTransactions);
            })
    },
    getBankTransactions: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newBankTransaction(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = BankTransactions;