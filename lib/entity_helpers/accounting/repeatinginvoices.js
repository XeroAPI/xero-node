'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const RepeatingInvoice = require('../../entities/accounting/repeatinginvoice').RepeatingInvoice;

const RepeatingInvoices = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'RepeatingInvoices' }, options)
    );
  },
  getRepeatingInvoices: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityConstructor = data => new RepeatingInvoice(data);
    return this.getEntities(clonedOptions);
  },
  getRepeatingInvoice: function(id) {
    return this.getRepeatingInvoices({ id }).then(repeatingInvoices =>
      _.first(repeatingInvoices)
    );
  },
});

module.exports = RepeatingInvoices;
