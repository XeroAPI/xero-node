var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Account = require('../../entities/accounting/account').Account,
    util = require('util')

var Accounts = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Accounts' }, options));
    },
    newAccount: function(data, options) {
        return new Account(this.application, data, options)
    },
    getAccount: function(id, modifiedAfter) {
        return this.getAccounts({ id: id, modifiedAfter: modifiedAfter })
            .then(function(accounts) {
                return _.first(accounts);
            })
    },
    deleteAccount: function(id) {
        var options = {
            id: id
        };
        return this.deleteEntities(options);
    },
    saveAccounts: function(accounts, options) {
        return this.saveEntities(accounts, options)
    },
    getAccounts: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newAccount(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Accounts;
