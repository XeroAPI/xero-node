var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger')

var ItemDetailSchema = new Entity.SchemaObject({
    UnitPrice: { type: Number, toObject: 'hasValue' },
    AccountCode: { type: String, toObject: 'hasValue' },
    COGSAccountCode: { type: String, toObject: 'hasValue' },
    TaxType: { type: String, toObject: 'hasValue' }

});
var ItemSchema = new Entity.SchemaObject({
    Code: { type: String, toObject: 'always', validators: { maxLength: 30 } },
    InventoryAssetAccountCode: { type: String, toObject: 'hasValue' },
    Name: { type: String, toObject: 'always' },
    IsSold: { type: Boolean, toObject: 'always' },
    IsPurchased: { type: Boolean, toObject: 'always' },
    Description: { type: String, toObject: 'always' },
    PurchaseDescription: { type: String, toObject: 'always' },
    ItemID: { type: String, toObject: 'never' },
    PurchaseDetails: { type: ItemDetailSchema, toObject: 'always' },
    SalesDetails: { type: ItemDetailSchema, toObject: 'always' },
    IsTrackedAsInventory: { type: Boolean, toObject: 'hasValue' },
    TotalCostPool: { type: String, toObject: 'hasValue' },
    QuantityOnHand: { type: String, toObject: 'hasValue' },
    UpdatedDateUTC: { type: String, toObject: 'hasValue' }
});


var Item = Entity.extend(ItemSchema, {
    constructor: function(application, data, options) {
        logger.debug('Item::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    toXml: function() {
        var item = _.omit(this.toObject());
        return this.application.js2xml(item, 'Item');
    },
    save: function(options) {
        var self = this;
        var xml = '<Items>' + this.toXml() + '</Items>';
        var path, method;
        if (this.ItemID) {
            path = 'Items/' + this.ItemID;
            method = 'post'
        } else {
            path = 'Items';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'Items.Item', entityConstructor: function(data) { return self.application.core.items.newItem(data) } });
    }
});


module.exports = Item;
module.exports.ItemSchema = ItemSchema;