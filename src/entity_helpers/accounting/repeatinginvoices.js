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
  newRepeatingInvoice: function(data, options) {
    return new RepeatingInvoice(this.application, data, options);
  },
  getRepeatingInvoice: function(id, modifiedAfter) {
    return this.getRepeatingInvoices({
      id: id,
      modifiedAfter: modifiedAfter
    }).then(function(manualJournals) {
      return _.first(manualJournals);
    });
  },
  getRepeatingInvoices: function(options) {
    return this.getEntities(this.setUpOptions(options));
  },
  setUpOptions: function(options) {
    var self = this;
    var clonedOptions = _.clone(options || {});
    clonedOptions.entityPath = 'RepeatingInvoices';
    clonedOptions.entityConstructor = function(data) {
      return self.application.core.repeatinginvoices.newRepeatingInvoice(data);
    };
    return clonedOptions;
  },
});

module.exports = RepeatingInvoices;
