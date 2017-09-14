'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const LinkedTransaction = require('../../entities/accounting/linkedtransaction')
  .LinkedTransaction;

const LinkedTransactions = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'LinkedTransactions' }, options)
    );
  },
  newLinkedTransaction: function(data, options) {
    return new LinkedTransaction(this.application, data, options);
  },
  getLinkedTransaction: function(id, modifiedAfter) {
    return this.getLinkedTransactions({ id: id, modifiedAfter: modifiedAfter })
      .then(function(linkedTransactions) {
        return _.first(linkedTransactions);
      });
  },
  getLinkedTransactions: function(options) {
    var self = this;
    var clonedOptions = _.clone(options || {});
    clonedOptions.entityConstructor = function(data) { return self.newLinkedTransaction(data) };
    return this.getEntities(clonedOptions)
  },
  deleteLinkedTransaction: function(id) {
    var options = {
        id: id
    };
    return this.deleteEntities(options);
  },
  saveLinkedTransactions: function(linkedTransactions, options) {
    return this.saveEntities(linkedTransactions, this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    var self = this;
    var clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'LinkedTransactions';
    clonedOptions.entityConstructor = function(data) { return self.newLinkedTransaction(data) };
    return clonedOptions;
  }
});

module.exports = LinkedTransactions;
