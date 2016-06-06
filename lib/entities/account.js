var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')

var AccountSchema = new Entity.SchemaObject({
    AccountID: { type: String, toObject: 'always' },
    Code: {type: String, toObject: 'always'},
    Name: {type: String, toObject: 'always'},
    Type: {type: String,toObject:'always'},
    Description: {type: String,toObject:'always'},
    TaxType: {type: String,toObject:'always'},
    EnablePaymentsToAccount: {type: Boolean,toObject:'always'},
    ShowInExpenseClaims: {type: Boolean,toObject:'always'},
    Class: {type: String,toObject:'never'},
    ReportingCode: {type: String,toObject:'never'},
    Status: {type: String,toObject:'never'},
    SystemAccount: {type: String,toObject:'never'},
    BankAccountNumber: {type: String,toObject:'never'},
    CurrencyCode: {type: String,toObject:'never'},
    ReportingCode: {type: String,toObject:'never'},
    ReportingCodeName: {type: String,toObject:'never'}
});


var Account = Entity.extend(AccountSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Account::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    toXml: function ()
    {
        var account = _.omit(this.toObject());
        return this.application.js2xml(account, 'Account');
    },
    getAttachments:function(options)
    {
        return this.application.core.attachments.getAttachments('Accounts/' + this.AccountID,options)
    },
    getAttachmentContent:function(fileName,options)
    {
        return this.application.core.attachments.getContent('Accounts/' + this.AccountID,fileName,options);
    },
    save:function(options)
    {
        var xml = '<Accounts>' + this.toXml() + '</Accounts>';
        var path, method;
        if (this.AccountID)
        {
            path = 'Accounts/' + this.AccountID;
            method = 'post'
        }
        else
        {
            path = 'Accounts';
            method = 'put'
        }
        return this.application.putOrPostEntity(method,  path,  xml)
    }
});


module.exports = Account;
module.exports.AccountSchema = AccountSchema;
var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')

var AccountSchema = new Entity.SchemaObject({
    AccountID: { type: String, toObject: 'never' },
    Code: {type: String, toObject: 'always'},
    Type: {type: String,toObject:'always'},
    Description: {type: String,toObject:'always'},
    TaxType: {type: String,toObject:'always'},
    EnablePaymentsToAccount: {type: Boolean,toObject:'always'},
    ShowInExpenseClaims: {type: Boolean,toObject:'always'},
    Class: {type: String,toObject:'never'},
    ReportingCode: {type: String,toObject:'never'},
    Status: {type: String,toObject:'never'},
    SystemAccount: {type: String,toObject:'never'},
    BankAccountNumber: {type: String,toObject:'never'},
    CurrencyCode: {type: String,toObject:'never'},
    ReportingCode: {type: String,toObject:'never'},
    ReportingCodeName: {type: String,toObject:'never'}
});


var Account = Entity.extend(AccountSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Account::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    toXml: function ()
    {
        var account = _.omit(this.toObject());
        return this.application.js2xml(account, 'Account');
    },
    getAttachments:function(options)
    {
        return this.application.core.attachments.getAttachments('Accounts/' + this.AccountID,options)
    },
    getAttachmentContent:function(fileName,options)
    {
        return this.application.core.attachments.getContent('Accounts/' + this.AccountID,fileName,options);
    },
    save:function(options)
    {
        var xml = '<Accounts>' + this.toXml() + '</Accounts>';
        var path, method;
        if (this.AccountID)
        {
            path = 'Accounts/' + this.AccountID;
            method = 'post'
        }
        else
        {
            path = 'Accounts';
            method = 'put'
        }
        return this.application.putOrPostEntity(method,  path,  xml)
    }
});


module.exports = Account;
module.exports.AccountSchema = AccountSchema;
