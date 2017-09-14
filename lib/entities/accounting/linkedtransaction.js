'use strict';

const Entity = require('../entity');

const LinkedTransactionSchema = Entity.SchemaObject({
  LinkedTransactionID: { type: String, toObject: 'hasValue' },
  SourceTransactionID: { type: String, toObject: 'hasValue' },
  SourceLineItemID: { type: String, toObject: 'hasValue' },
  ContactID: { type: String, toObject: 'hasValue' },
  TargetTransactionID: { type: String, toObject: 'hasValue' },
  TargetLineItemID: { type: String, toObject: 'hasValue' },
  Status: { type: String, toObject: 'always' },
  Type: { type: String, toObject: 'hasValue' },
  UpdatedDateUTC: { type: Date, toObject: 'hasValue' },
  SourceTransactionTypeCode: { type: String, toObject: 'hasValue' },
});

const LinkedTransaction = Entity.extend(LinkedTransactionSchema, {
  constructor: function(application, data, options) {
    this.Entity.apply(this, arguments);
  },
  initialize: function(data, options) {},
  save: function(options) {
    const self = this;
    let path;
    let method;
    if (this.LinkedTransactionID) {
      path = `LinkedTransactions/${this.LinkedTransactionID}`;
      method = 'post';
    } else {
      path = 'LinkedTransactions';
      method = 'put';
    }

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'LinkedTransactions',
        entityConstructor(data) {
          return self.application.core.linkedTransactions.newLinkedTransaction(
            data
          );
        },
      }
    );
  }
});


module.exports.LinkedTransaction = LinkedTransaction;
module.exports.LinkedTransactionSchema = LinkedTransactionSchema;
