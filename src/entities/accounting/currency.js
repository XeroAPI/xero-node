var _ = require('lodash'),
    Entity = require('../entity')

var CurrencySchema = Entity.SchemaObject({
    Code: { type: String },
    Description: { type: String }
});

var Currency = Entity.extend(CurrencySchema, {
    constructor: function(application, data, options) {
        
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {}
});


module.exports.Currency = Currency;