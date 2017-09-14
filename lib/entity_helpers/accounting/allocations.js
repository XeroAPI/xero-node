'use strict';

const EntityHelper = require('../entity_helper');
const Allocation = require('../../entities/accounting/allocation').Allocation;

const Allocations = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'Allocations' }, options)
    );
  },
  newAllocation: function(data, options) {
    return new Allocation(this.application, data, options);
  },
});

module.exports = Allocations;
