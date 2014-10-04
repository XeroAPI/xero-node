var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Invoice = require('../entities/invoice')
    , p = require('../misc/promise')
    , util = require('util')

var Invoices = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'Invoice', entityPlural:'Invoices'}, options));
    },
    newInvoice: function (data, options)
    {
        return new Invoice(this.application, data, options)
    },
    streamInvoice: function(id,format,stream)
    {
        return this.streamEntity({id: id, stream: stream, format: 'pdf'});
    },
    getInvoice: function (id, modifiedAfter,where, order)
    {
        return this.getInvoices({ id: id, modifiedAfter: modifiedAfter, where: where, order: order})
            .then(function (invoices)
            {
                return _.first(invoices);
            })
    },
    saveInvoices: function (invoices, options)
    {
        return this.saveEntities(invoices, options)
    },
    getInvoices: function (options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newInvoice(data)};
        return this.getEntities(clonedOptions)
    },
    deleteInvoice: function(id)
    {

    }
})

module.exports = Invoices;

