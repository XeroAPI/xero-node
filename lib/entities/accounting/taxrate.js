var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger');

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
    TaxComponents: { type: Array, arrayType: TaxComponentSchema, toObject: 'always' },
    ReportTaxType: { type: String, toObject: 'hasValue' }
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
        return this;
    },
    toXml: function() {
        var taxRate = _.omit(this.toObject(), 'TaxComponents');
        Object.assign(taxRate, { TaxComponents: [] });
        _.forEach(this.TaxComponents, function(taxComponent) {
            taxRate.TaxComponents.push({ TaxComponent: taxComponent })
        })
        return this.application.js2xml(taxRate, 'TaxRate');
    },
    save: function(options) {
        var self = this;
        var xml = '<TaxRates>' + this.toXml() + '</TaxRates>';
        var path = 'TaxRates',
            method;
        if (this.Status) {
            method = 'post'
        } else {
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'TaxRates.TaxRate', entityConstructor: function(data) { return self.application.core.taxrates.newTaxRate(data) } });
    },
    delete: function(options) {
        this.Status = "DELETED";
        return this.save();
    }
});


module.exports = TaxRate;
module.exports.TaxRateSchema = TaxRateSchema;
module.exports.TaxComponentSchema = TaxComponentSchema;