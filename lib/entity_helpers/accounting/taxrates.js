const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var TaxRate = require('../../entities/accounting/taxrate').TaxRate;
var util = require('util');

var TaxRates = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'TaxRates' }, options));
    },
    newTaxRate: function(data, options) {
        return new TaxRate(this.application, data, options);
    },
    getTaxRates: function(options) {
        return this.getEntities(this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityPath = 'TaxRates';
        clonedOptions.entityConstructor = function(data) { return self.newTaxRate(data) };
        return clonedOptions;
    }
})

module.exports = TaxRates;