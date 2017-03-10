var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Invoice = require('../entities/invoice'),
    util = require('util')

var entityName = 'InvoicesHelper';
var Invoices = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Invoice', entityPlural: 'Invoices' }, options));
    },
    newInvoice: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Invoice(this.application, data, options)
    },
    streamInvoice: function(id, format, stream) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.streamEntity({ id: id, stream: stream, format: 'pdf' });
    },
    getInvoice: function(id, modifiedAfter, where, order) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getInvoices({ id: id, modifiedAfter: modifiedAfter, where: where, order: order })
            .then(function(invoices) {
                return _.first(invoices);
            })
    },
    getInvoices: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newInvoice(data) };
        return this.getEntities(clonedOptions)
    },
    saveInvoices: function(invoices, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.saveEntities(invoices, this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Invoices.Invoice';
        clonedOptions.entityConstructor = function(data) { return self.newInvoice(data) };
        return clonedOptions;
    }
})

module.exports = Invoices;