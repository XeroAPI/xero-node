var _ = require('lodash'),
    Entity = require('../entity')

var CurrencySchema = new Entity.SchemaObject({
    Code: { type: String },
    Description: { type: String }
});

var Currency = Entity.extend(CurrencySchema, {
    constructor: function(application, data, options) {
        console.log('Currency::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports = Currency;