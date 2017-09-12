'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const ExpenseClaim = require('../../entities/accounting/expenseclaim')
  .ExpenseClaim;

const ExpenseClaims = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'ExpenseClaims' }, options)
    );
  },
  newExpenseClaim: function(data, options) {
    return new ExpenseClaim(this.application, data, options);
  },
  getExpenseClaims: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getExpenseClaim: function(id) {
    return this.getExpenseClaims({ id }).then(expenseClaims =>
      _.first(expenseClaims)
    );
  },
  saveExpenseClaims: function(expenseClaims, options) {
    return this.saveEntities(expenseClaims, this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'ExpenseClaims';
    clonedOptions.entityConstructor = data => self.newExpenseClaim(data);
    return clonedOptions;
  },
});

module.exports = ExpenseClaims;
