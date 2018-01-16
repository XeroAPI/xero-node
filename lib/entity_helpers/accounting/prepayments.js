'use strict';

const { clone } = require('lodash');
const EntityHelper = require('../entity_helper');
const Prepayment = require('../../entities/accounting/prepayment').Prepayment;

const Prepayments = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'Prepayments' }, options)
    );
  },
  newPrepayment: function(data, options) {
    return new Prepayment(this.application, data, options);
  },
  getPrepayments: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getPrepayment: function(id) {
    return this.getPrepayments({ id }).then(Prepayments => Prepayments[0]);
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = clone(options || {});
    clonedOptions.entityPath = 'Prepayments';
    clonedOptions.entityConstructor = data => self.newPrepayment(data);
    return clonedOptions;
  },
});

module.exports = Prepayments;
