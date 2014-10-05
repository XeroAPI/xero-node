var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')

var ItemDetailSchema = new Entity.SchemaObject({
    UnitPrice: {type: Number},
    AccountCode: {type: String},
    TaxType: {type: String}
});
var ItemSchema = new Entity.SchemaObject({
    ItemID: { type: String, toObject: 'never' },
    Code: {type: String, toObject: 'always'},
    Description: {type: String,toObject:'always'},
    PurchaseDetails: {type: ItemDetailSchema},
    SalesDetails: {type: ItemDetailSchema},
});


var Item = Entity.extend(ItemSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Item::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    toXml: function ()
    {
        var item = _.omit(this.toObject());
        return this.application.js2xml(account, 'Item');
    },
    save:function(options)
    {
        var xml = '<Items>' + this.toXml() + '</Items>';
        var path, method;
        if (this.ItemID)
        {
            path = 'Items/' + this.ItemID;
            method = 'post'
        }
        else
        {
            path = 'Items';
            method = 'put'
        }
        return this.application.putOrPostEntity(method,  path,  xml,{ entityPath: 'Items.Item',entityConstructor: function(data) { return self.application.core.items.newItem(data)}});
    }
});


module.exports = Item;
module.exports.ItemSchema = ItemSchema;
