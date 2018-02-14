'use strict';

const Entity = require('../entity');

const AccountSchema = Entity.SchemaObject({
  Code: { type: String, toObject: 'always' },
  Name: { type: String, toObject: 'always' },
  Type: { type: String, toObject: 'always' },
  BankAccountNumber: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'never' },
  Description: { type: String, toObject: 'always' },
  BankAccountType: { type: String, toObject: 'hasValue' },
  CurrencyCode: { type: String, toObject: 'hasValue' },
  TaxType: { type: String, toObject: 'always' },
  EnablePaymentsToAccount: { type: Boolean, toObject: 'always' },
  ShowInExpenseClaims: { type: Boolean, toObject: 'always' },
  AccountID: { type: String, toObject: 'always' },
  Class: { type: String, toObject: 'never' },
  SystemAccount: { type: String, toObject: 'never' },
  ReportingCode: { type: String, toObject: 'never' },
  ReportingCodeName: { type: String, toObject: 'never' },
  HasAttachments: { type: Boolean, toObject: 'always' },
  UpdatedDateUTC: { type: Date, toObject: 'never' },
});

const Account = Entity.extend(AccountSchema, {
  constructor: function(...args) {
    this.Entity.apply(this, args);
  },
  initialize: function(data, options) {},
  getAttachments: function(options) {
    return this.application.core.attachments.getAttachments(
      `Accounts/${this.AccountID}`,
      options
    );
  },
  save: function(options) {
    var self = this;
    var path, method;
    if (this.AccountID) {
      path = 'Accounts/' + this.AccountID;
      method = 'post';
    } else {
      path = 'Accounts';
      method = 'put';
    }
    return this.application.putOrPostEntity(
      method,
      path,
      JSON.stringify(self),
      {
        entityPath: 'Accounts',
        entityConstructor: function(data) {
          return self.application.core.accounts.newAccount(data);
        },
      }
    );
  },
});

module.exports.Account = Account;
module.exports.AccountSchema = AccountSchema;
