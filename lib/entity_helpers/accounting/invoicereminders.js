const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var InvoiceReminder = require('../../entities/accounting/invoicereminder').InvoiceReminder;
var util = require('util');

var InvoiceReminders = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'InvoiceReminders' }, options));
    },
    getInvoiceReminders: function(options, callback) {
        var self = this;
        var clonedOptions = clone(options || {});
        //This has been hardcoded as the URL is /InvoiceReminders/Settings
        clonedOptions.id = "Settings";
        clonedOptions.entityConstructor = function(data) { return new InvoiceReminder(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = InvoiceReminders;