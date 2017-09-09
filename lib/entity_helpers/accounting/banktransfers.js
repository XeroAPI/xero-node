'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const BankTransfer = require('../../entities/accounting/banktransfer').BankTransfer;

const BankTransfers = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'BankTransfers' }, options)
    );
  },
  newBankTransfer: function(data, options) {
    return new BankTransfer(this.application, data, options);
  },
  saveBankTransfers: function(bankTransfers, options) {
    return this.saveEntities(bankTransfers, this.setUpOptions(options));
  },
  getBankTransfer: function(id, modifiedAfter) {
    return this.getBankTransfers({
      id: id,
      modifiedAfter: modifiedAfter
    }).then(bankTransfers => _.first(bankTransfers));
  },
  getBankTransfers: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    var self = this;
    var clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'BankTransfers';
    clonedOptions.entityConstructor = function(data) { return self.newBankTransfer(data) };
    return clonedOptions;
  },
});

module.exports = BankTransfers;
