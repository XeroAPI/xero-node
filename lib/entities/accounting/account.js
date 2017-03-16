var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger')

var AccountSchema = new Entity.SchemaObject({
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
    UpdatedDateUTC: { type: String, toObject: 'hasValue' }
});


var Account = Entity.extend(AccountSchema, {
    constructor: function(application, data, options) {
        logger.debug('Account::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    toXml: function() {
        var account = _.omit(this.toObject());
        return this.application.js2xml(account, 'Account');
    },
    getAttachments: function(options) {
        return this.application.core.attachments.getAttachments('Accounts/' + this.AccountID, options)
    },
    getAttachmentContent: function(fileName, options) {
        return this.application.core.attachments.getContent('Accounts/' + this.AccountID, fileName, options);
    },
    save: function(options) {
        var self = this;
        var xml = '<Accounts>' + this.toXml() + '</Accounts>';
        var path, method;
        if (this.AccountID) {
            path = 'Accounts/' + this.AccountID;
            method = 'post'
        } else {
            path = 'Accounts';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'Accounts.Account', entityConstructor: function(data) { return self.application.core.accounts.newAccount(data) } })
    }
});


module.exports = Account;
module.exports.AccountSchema = AccountSchema;