var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger');

var TaxRateSchema = new Entity.SchemaObject({
    Name: { type: String, toObject: 'always' },
    TaxType: { type: String, toObject: 'always' },
    CanApplyToAssets: { type: Boolean, toObject: 'always' },
    CanApplyToEquity: { type: Boolean, toObject: 'always' },
    CanApplyToExpenses: { type: Boolean, toObject: 'always' },
    CanApplyToLiabilities: { type: Boolean, toObject: 'always' },
    CanApplyToRevenue: { type: Boolean, toObject: 'always' },
    DisplayTaxRate: { type: Number, toObject: 'always' },
    EffectiveRate: { type: Number, toObject: 'always' },
    Status: { type: String, toObject: 'always' },
    TaxComponents: { type: Array, arrayType: TaxComponentSchema, toObject: 'always' }
});

var TaxComponentSchema = new Entity.SchemaObject({
    Name: { type: String, toObject: 'always' },
    Rate: { type: String, toObject: 'always' },
    //Hacked to string as the framework doesn't recursively translate nested objects
    IsCompound: { type: String }
});

var TaxRate = Entity.extend(TaxRateSchema, {
    constructor: function(application, data, options) {
        logger.debug('TaxRate::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    fromXmlObj: function(obj) {
        var self = this;
        _.extend(self, _.omit(obj, 'TaxComponents'));
        if (obj.TaxComponents) {
            this.extractArray(obj.TaxComponents.TaxComponent, this.TaxComponents);
        }
        console.log(this.TaxComponents.TaxComponent);
        return this;
    },
    toXml: function() {
        var taxrate = _.omit(this.toObject());
        return this.application.js2xml(taxrate, 'TaxRate');
    }
});


module.exports = TaxRate;
module.exports.TaxRateSchema = TaxRateSchema;
module.exports.TaxComponentSchema = TaxComponentSchema;