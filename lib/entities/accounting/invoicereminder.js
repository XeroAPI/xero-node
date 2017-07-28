var _ = require('lodash'),
    Entity = require('../entity')

var InvoiceReminderSchema = Entity.SchemaObject({
    Enabled: { type: Boolean }
});

var InvoiceReminder = Entity.extend(InvoiceReminderSchema, {
    constructor: function(application, data, options) {
        console.log('InvoiceReminder::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports.InvoiceReminder = InvoiceReminder;