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
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `ManualJournals/${this.ManualJournalID}`,
      options
    );
  },
  save: function(opts) {
    const self = this;
    let path;
    let method;
    if (this.ManualJournalID) {
      path = `ManualJournals/${this.ManualJournalID}`;
      method = 'post';
    } else {
      path = 'ManualJournals';
      method = 'put';
    }

    const options = opts || {};
    options.entityPath = 'ManualJournals';
    options.entityConstructor = function(data) {
      return self.application.core.manualjournals.newManualJournal(data);
    };

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      options
    );
  },
});

module.exports = ManualJournal;
