'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const Receipt = require('../../entities/accounting/receipt').Receipt;

const Receipts = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'Receipts' }, options)
    );
  },
  newReceipt: function(data, options) {
    return new Receipt(this.application, data, options);
  },
  getReceipts: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getReceipt: function(id) {
    return this.getReceipts({ id }).then(Receipts => _.first(Receipts));
  },
  saveReceipts: function(Receipts, options) {
    return this.saveEntities(Receipts, this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'Receipts';
    clonedOptions.entityConstructor = data => self.newReceipt(data);
    return clonedOptions;
  },
});

module.exports = Receipts;
