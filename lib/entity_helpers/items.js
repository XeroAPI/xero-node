var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Item = require('../entities/item')
    , p = require('../misc/promise')
    , util = require('util')

var Items = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'Item', entityPlural:'Items'}, options));
    },
    newItem: function (data, options)
    {
        return new Item(this.application, data, options)
    },
    getItem: function (id, modifiedAfter)
    {
        return this.getItems({ id: id, modifiedAfter: modifiedAfter})
            .then(function (items)
            {
                return _.first(items);
            })
    },
    saveItems: function (items, options)
    {
        return this.saveEntities(items, options)
    },
    getItems: function (options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newItem(data)};
        return this.getEntities(clonedOptions)
    }
})

module.exports = Items;
