var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger');

var TaxRateSchema = new Entity.SchemaObject({

});

var TaxRate = Entity.extend(TaxRateSchema, {
    constructor: function(application, data, options) {
        logger.debug('TaxRate::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    toXml: function() {
        var taxRate = _.omit(this.toObject());
        return this.application.js2xml(taxRate, 'TaxRate');
    },
    save: function(options) {
        var self = this;
        var xml = '<TaxRates>' + this.toXml() + '</TaxRates>';
        var path, method;
        if (this.TaxRateID) {
            path = 'Items/' + this.ItemID;
            method = 'post'
        } else {
            path = 'Items';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'Items.Item', entityConstructor: function(data) { return self.application.core.items.newItem(data) } });
    }
});


module.exports = TaxRate;
module.exports.TaxRateSchema = TaxRateSchema;