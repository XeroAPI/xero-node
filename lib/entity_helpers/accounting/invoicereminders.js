var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    InvoiceReminder = require('../../entities/accounting/invoicereminder').InvoiceReminder,
    util = require('util')

var InvoiceReminders = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'InvoiceReminders' }, options));
    },
    getInvoiceReminders: function(options, callback) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        //This has been hardcoded as the URL is /InvoiceReminders/Settings
        clonedOptions.id = "Settings";
        clonedOptions.entityConstructor = function(data) { return new InvoiceReminder(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = InvoiceReminders;