'use strict';

const _ = require('lodash');
const Entity = require('../entity');
const ContactSchema = require('./contact').ContactSchema;
const LineItemSchema = require('../shared').LineItemSchema;

const BankTransactionSchema = Entity.SchemaObject({
  Type: { type: String, toObject: 'always' },
  Contact: { type: ContactSchema, toObject: 'always' },
  LineItems: { type: Array, arrayType: LineItemSchema, toObject: 'always' },
  BankAccount: {
    type: {
      AccountID: { type: String, toObject: 'always' },
    },
    toObject: 'always',
  },
  IsReconciled: { type: Boolean, toObject: 'always' },
  Date: { type: Date, toObject: 'always' },
  Reference: { type: String, toObject: 'always' },
  CurrencyCode: { type: String, toObject: 'always' },
  CurrencyRate: { type: String, toObject: 'hasValue' },
  Url: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'always' },
  LineAmountTypes: { type: String, toObject: 'always' },
  SubTotal: { type: Number },
  TotalTax: { type: Number },
  Total: { type: Number },
  BankTransactionID: { type: String },
  PrepaymentID: { type: String },
  OverpaymentID: { type: String },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
  HasAttachments: { type: Boolean, toObject: 'always' },
  FullyPaidOnDate: { type: Date },
});

const BankTransaction = Entity.extend(BankTransactionSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `BankTransactions/${this.BankTransactionID}`,
      options
    );
  },
  save: function() {
    const self = this;
    let path = '';
    let method = '';
    if (this.BankTransactionID) {
      path = `BankTransactions/${this.BankTransactionID}`;
      method = 'post';
    } else {
      path = 'BankTransactions';
      method = 'put';
    }
    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'BankTransactions',
        entityConstructor: data =>
          self.application.core.bankTransactions.newBankTransaction(data),
      }
    );
  },
});

module.exports.BankTransaction = BankTransaction;
