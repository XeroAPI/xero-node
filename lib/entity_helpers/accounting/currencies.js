var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Currency = require('../../entities/accounting/currency').Currency,
    util = require('util')

var Currencies = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Currencies' }, options));
    },
    getCurrencies: function(options, callback) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new Currency(data) };
        return this.getEntities(clonedOptions)
    }
})

module.exports = Currencies;