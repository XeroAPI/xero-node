'use strict';

const Entity = require('../entity');
const _ = require('lodash');

const AccountSchema = new Entity.SchemaObject({
  Code: { type: String, toObject: 'always' },
  Name: { type: String, toObject: 'always' },
  Type: { type: String, toObject: 'always' },
  BankAccountNumber: { type: String, toObject: 'always' },
  Status: { type: String, toObject: 'never' },
  Description: { type: String, toObject: 'always' },
  BankAccountType: { type: String, toObject: 'hasValue' },
  CurrencyCode: { type: String, toObject: 'never' },
  TaxType: { type: String, toObject: 'always' },
  EnablePaymentsToAccount: { type: Boolean, toObject: 'always' },
  ShowInExpenseClaims: { type: Boolean, toObject: 'always' },
  AccountID: { type: String, toObject: 'always' },
  Class: { type: String, toObject: 'never' },
  SystemAccount: { type: String, toObject: 'never' },
  ReportingCode: { type: String, toObject: 'never' },
  ReportingCodeName: { type: String, toObject: 'never' },
  HasAttachments: { type: Boolean, toObject: 'always' },
  UpdatedDateUTC: { type: String, toObject: 'hasValue' },
});

const Account = Entity.extend(AccountSchema, {
  constructor: (application, data, options) => {
    Entity(...arguments);
  },
  initialize: () => {},
  toXml: () => {
    const account = _.omit(this.toObject());
    return this.application.js2xml(account, 'Account');
  },
  getAttachments: options =>
    this.application.core.attachments.getAttachments(
      `Accounts/${this.AccountID}`,
      options
    ),
  save: () => {
    const self = this;
    const xml = `<Accounts>${this.toXml()}</Accounts>`;
    let path;
    let method;
    if (this.AccountID) {
      path = `Accounts/${this.AccountID}`;
      method = 'post';
    } else {
      path = 'Accounts';
      method = 'put';
    }
    return this.application.putOrPostEntity(method, path, xml, {
      entityPath: 'Accounts.Account',
      entityConstructor: data =>
        self.application.core.accounts.newAccount(data),
    });
  },
});

module.exports = Account;
module.exports.AccountSchema = AccountSchema;
