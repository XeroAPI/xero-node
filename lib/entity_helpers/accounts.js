var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Account = require('../entities/account'),
    util = require('util'),
    ga = require('../misc/tracking');

var entityName = 'AccountsHelper';
var Accounts = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Account', entityPlural: 'Accounts' }, options));
    },
    newAccount: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Account(this.application, data, options)
    },
    getAccount: function(id, modifiedAfter) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getAccounts({ id: id, modifiedAfter: modifiedAfter })
            .then(function(accounts) {
                return _.first(accounts);
            })
    },
    deleteAccount: function(id) {
        this.trackEvent(entityName, arguments.callee.name);
        var options = {
            id: id
        };
        return this.deleteEntities(options);
    },
    saveAccounts: function(accounts, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.saveEntities(accounts, options)
    },
    getAccounts: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newAccount(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Accounts;