var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    TaxRate = require('../entities/taxrate'),
    util = require('util')

var entityName = 'TaxRatesHelper';
var TaxRates = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'TaxRate', entityPlural: 'TaxRates' }, options));
    },
    newTaxRate: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new TaxRate(this.application, data, options);
    },
    getTaxRates: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getEntities(this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'TaxRates.TaxRate';
        clonedOptions.entityConstructor = function(data) { return self.newTaxRate(data) };
        return clonedOptions;
    }
})

module.exports = TaxRates;