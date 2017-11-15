'use strict';

const _ = require('lodash');
const EntityHelper = require('../entity_helper');
const Account = require('../../entities/accounting/account').Account;
const util = require('util');

const Accounts = EntityHelper.extend({
  constructor: function(application, options) {
    EntityHelper.call(
      this,
      application,
      Object.assign({ entityPlural: 'Accounts' }, options)
    );
  },
  newAccount: function(data, options) {
    return new Account(this.application, data, options);
  },
  getAccount: function(id, modifiedAfter) {
    return this.getAccounts({ id, modifiedAfter }).then(accounts =>
      _.first(accounts)
    );
  },
  deleteAccount: function(id) {
    const options = {
      id,
    };
    return this.deleteEntities(options);
  },
  saveAccounts: function(accounts, options) {
    return this.saveEntities(accounts, options);
  },
  getAccounts: function(options) {
    const self = this;
    const clonedOptions = _.clone(options || {});
    clonedOptions.entityConstructor = function(data) {
      return self.newAccount(data);
    };
    return this.getEntities(clonedOptions);
  },
});

module.exports = Accounts;
