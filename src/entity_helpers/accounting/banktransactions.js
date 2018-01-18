'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const BankTransaction = require('../../entities/accounting/banktransaction')
  .BankTransaction;

const BankTransactions = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'BankTransactions' }, options)
    );
  },
  newBankTransaction: function(data, options) {
    return new BankTransaction(this.application, data, options);
  },
  saveBankTransactions: function(bankTransactions, options) {
    return this.saveEntities(bankTransactions, this.setUpOptions(options));
  },
  getBankTransaction: function(id, modifiedAfter) {
    return this.getBankTransactions({ id: id, modifiedAfter: modifiedAfter })
      .then(function(bankTransactions) {
        return _.first(bankTransactions);
      });
  },
  getBankTransactions: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    var self = this;
    var clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'BankTransactions';
    clonedOptions.entityConstructor = function(data) { return self.newBankTransaction(data) };
    return clonedOptions;
  },
});

module.exports = BankTransactions;
