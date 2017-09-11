'use strict';

const Entity = require('../entity');
const UserSchema = require('./user').UserSchema;
const ReceiptSchema = require('../shared').ReceiptSchema;
const PaymentSchema = require('../shared').PaymentSchema;

const ExpenseClaimSchema = Entity.SchemaObject({
  ExpenseClaimID: { type: String, toObject: 'always' },
  User: { type: UserSchema, toObject: 'always' },
  Receipts: { type: Array, arrayType: ReceiptSchema, toObject: 'always' },
  Payments: { type: Array, arrayType: PaymentSchema, toObject: 'always' },
  Status: { type: String, toObject: 'always' },
  PaymentDueDate: { type: Date, toObject: 'always' },
  ReportingDate: { type: Date, toObject: 'always' },
  AmountDue: { type: String, toObject: 'always' },
  AmountPaid: { type: String, toObject: 'always' },
  Total: { type: String, toObject: 'always' },
});

const ExpenseClaim = Entity.extend(ExpenseClaimSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  save: function() {
    const self = this;
    let path = '';
    let method = '';

    if (this.ExpenseClaimID) {
      path = `ExpenseClaims/${this.ExpenseClaimID}`;
      method = 'post';
    } else {
      path = 'ExpenseClaims';
      method = 'put';
    }

    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'ExpenseClaims',
        entityConstructor: data =>
          self.application.core.expenseClaims.newExpenseClaim(data),
      }
    );
  },
});

module.exports.ExpenseClaim = ExpenseClaim;
module.exports.ExpenseClaimSchema = ExpenseClaimSchema;
