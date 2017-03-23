var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger');

var InvoiceReminderSchema = new Entity.SchemaObject({
    Enabled: { type: Boolean }
});

var InvoiceReminder = Entity.extend(InvoiceReminderSchema, {
    constructor: function(application, data, options) {
        logger.debug('InvoiceReminder::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports = InvoiceReminder;