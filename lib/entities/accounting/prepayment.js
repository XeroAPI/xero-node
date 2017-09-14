'use strict';

const Entity = require('../entity');
const AllocationsSchema = require('../shared').AllocationsSchema;

const PrepaymentSchema = Entity.SchemaObject({
  Date: { type: Date, toObject: 'hasValue' },
  Allocations: {
    type: Array,
    arrayType: AllocationsSchema,
    toObject: 'hasValue',
  },
});

const Prepayment = Entity.extend(PrepaymentSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `Prepayments/${this.PrepaymentID}`,
      options
    );
  },
  saveAllocations: function(allocations) {
    const self = this;
    const path = `Prepayments/${this.PrepaymentID}/Allocations`;
    const method = 'put';

    const payload = {
      Allocations: allocations,
    };

    const options = {};

    // Adding other options for saving purposes
    options.entityPath = 'Allocations';
    options.entityConstructor = function(data) {
      return self.application.core.allocations.newAllocation(data);
    };

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(payload),
      options
    );
  },
});

module.exports.Prepayment = Prepayment;
module.exports.PrepaymentSchema = PrepaymentSchema;
