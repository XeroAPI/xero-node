'use strict';

const Entity = require('../entity');
const AllocationSchema = require('../shared').AllocationsSchema;

const Allocation = Entity.extend(AllocationSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
});

module.exports.Allocation = Allocation;
