'use strict';

const Entity = require('../entity');
const TrackingCategory = require('./trackingcategory');

const ManualJournalLineSchema = new Entity.SchemaObject({
  LineAmount: {
    type: Number,
    toObject: 'hasValue',
  },
  AccountCode: {
    type: String,
    toObject: 'hasValue',
  },
  Description: {
    type: String,
    toObject: 'hasValue',
  },
  TaxType: {
    type: String,
    toObject: 'hasValue',
  },
  Tracking: [TrackingCategory.TrackingCategorySchema],
});

const ManualJournalSchema = new Entity.SchemaObject({
  Narration: {
    type: String,
    toObject: 'hasValue',
  },
  Date: {
    type: Date,
    toObject: 'hasValue',
  },
  LineAmountTypes: {
    type: String,
    toObject: 'hasValue',
  },
  Status: {
    type: String,
    toObject: 'hasValue',
  },
  Url: {
    type: String,
    toObject: 'hasValue',
  },
  ShowOnCashBasisReports: {
    type: Boolean,
    toObject: 'hasValue',
  },
  JournalLines: {
    type: Array,
    arrayType: ManualJournalLineSchema,
    toObject: 'hasValue',
  },
});

const ManualJournal = Entity.extend(ManualJournalSchema, {
  constructor: function(application, data, options) {
    this.Entity.apply(this, arguments);
  },
  initialize: function(data, options) {},
  save: function() {
    const self = this;
    let path;
    let method;
    if (this.JournalID) {
      path = `ManualJournals/${this.JournalID}`;
      method = 'post';
    } else {
      path = 'ManualJournals';
      method = 'put';
    }

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'ManualJournals',
        entityConstructor: data =>
          self.application.core.manualjournals.newManualJournal(data),
      }
    );
  },
});

module.exports = ManualJournal;
