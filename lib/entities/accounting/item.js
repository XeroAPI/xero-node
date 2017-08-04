var _ = require('lodash'),
    Entity = require('../entity')

var ItemDetailSchema = Entity.SchemaObject({
    UnitPrice: { type: Number, toObject: 'hasValue' },
    AccountCode: { type: String, toObject: 'hasValue' },
    COGSAccountCode: { type: String, toObject: 'hasValue' },
    TaxType: { type: String, toObject: 'hasValue' }

});
var ItemSchema = Entity.SchemaObject({
    Code: { type: String, toObject: 'always', validators: { maxLength: 30 } },
    InventoryAssetAccountCode: { type: String, toObject: 'hasValue' },
    Name: { type: String, toObject: 'always' },
    IsSold: { type: Boolean, toObject: 'always' },
    IsPurchased: { type: Boolean, toObject: 'always' },
    Description: { type: String, toObject: 'always' },
    PurchaseDescription: { type: String, toObject: 'always' },
    PurchaseDetails: { type: ItemDetailSchema, toObject: 'always' },
    SalesDetails: { type: ItemDetailSchema, toObject: 'always' },
    IsTrackedAsInventory: { type: Boolean, toObject: 'hasValue' },
    TotalCostPool: { type: String, toObject: 'hasValue' },
    QuantityOnHand: { type: String, toObject: 'hasValue' },
    UpdatedDateUTC: { type: Date, toObject: 'never' },
    ItemID: { type: String, toObject: 'always' }
});

var Item = Entity.extend(ItemSchema, {
    constructor: function(application, data, options) {
        
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    save: function(options) {
        var self = this;
        var path, method;
        if (this.ItemID) {
            path = 'Items/' + this.ItemID;
            method = 'post'
        } else {
            path = 'Items';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, JSON.stringify(self), { entityPath: 'Items', entityConstructor: function(data) { return self.application.core.items.newItem(data) } });
    }
});


module.exports.Item = Item;
module.exports.ItemSchema = ItemSchema;