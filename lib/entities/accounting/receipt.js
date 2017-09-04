'use strict';

const Entity = require('../entity');
const ContactSchema = require('./contact').ContactSchema;
const UserSchema = require('./user').UserSchema;
const LineItemSchema = require('../shared').LineItemSchema;

const ReceiptSchema = Entity.SchemaObject({
  ReceiptID: { type: String, toObject: 'always' },
  Date: { type: Date, toObject: 'always' },
  Contact: { type: ContactSchema, toObject: 'always' },
  User: { type: UserSchema, toObject: 'always' },
  LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'always' },
  Reference: { type: String, toObject: 'always' },
  LineAmountTypes: { type: String, toObject: 'always' },
  SubTotal: { type: String, toObject: 'always' },
  TotalTax: { type: String, toObject: 'always' },
  Total: { type: String, toObject: 'always' },
});

const Receipt = Entity.extend(ReceiptSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `Receipts/${this.ReceiptID}`,
      options
    );
  },
  save: function() {
    const self = this;
    let path = '';
    let method = '';

    if (this.ReceiptID) {
      path = `Receipts/${this.ReceiptID}`;
      method = 'post';
    } else {
      path = 'Receipts';
      method = 'put';
    }

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'Receipts',
        entityConstructor: data =>
          self.application.core.receipts.newReceipt(data),
      }
    );
  },
});

module.exports.Receipt = Receipt;
module.exports.ReceiptSchema = ReceiptSchema;
