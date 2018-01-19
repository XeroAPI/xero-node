var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Invoice = require('../../entities/accounting/invoice').Invoice,
    util = require('util')

var Invoices = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Invoices' }, options));
    },
    newInvoice: function(data, options) {
        return new Invoice(this.application, data, options)
    },
    streamInvoice: function(id, format, stream) {
        return this.streamEntity({ id: id, stream: stream, format: 'pdf' });
    },
    
    getInvoice: function(id, modifiedAfter, where, order, unitdp, format) {
        return this.getInvoices({ id: id, modifiedAfter: modifiedAfter, where: where, order: order, unitdp: unitdp, format: (format) ? format : "json" })
            .then(function(invoices) {
                return _.first(invoices);
            })
    },
    getInvoices: function(options) {
        return this.getEntities(this.setUpOptions(options))
    },
    saveInvoices: function(invoices, options) {
        return this.saveEntities(invoices, this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Invoices';
        clonedOptions.entityConstructor = function(data) { return self.newInvoice(data) };
        return clonedOptions;
    }
})

module.exports = Invoices;