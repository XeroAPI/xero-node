const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var Currency = require('../../entities/accounting/currency').Currency;
var util = require('util');

var Currencies = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Currencies' }, options));
    },
    getCurrencies: function(options, callback) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new Currency(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Currencies;