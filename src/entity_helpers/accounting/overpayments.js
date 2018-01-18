'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const Overpayment = require('../../entities/accounting/overpayment')
  .Overpayment;

const Overpayments = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'Overpayments' }, options)
    );
  },
  newOverpayment: function(data, options) {
    return new Overpayment(this.application, data, options);
  },
  getOverpayments: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  getOverpayment: function(id) {
    return this.getOverpayments({ id }).then(Overpayments => _.first(Overpayments));
  },
  setUpOptions: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'Overpayments';
    clonedOptions.entityConstructor = data => self.newOverpayment(data);
    return clonedOptions;
  },
});

module.exports = Overpayments;
