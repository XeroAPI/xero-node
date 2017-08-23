'use strict';

const Entity = require('../entity');

const ScheduleSchema = Entity.SchemaObject({
  StartDate: { type: Date, toObject: 'hasValue' },
  NextScheduledDate: { type: Date, toObject: 'hasValue' },
});

const RepeatingInvoiceSchema = Entity.SchemaObject({
  Schedule: { type: ScheduleSchema, toObject: 'always' },
});

const RepeatingInvoice = Entity.extend(RepeatingInvoiceSchema, {});

module.exports.RepeatingInvoice = RepeatingInvoice;
