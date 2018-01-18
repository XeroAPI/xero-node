var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Item = require('../../entities/accounting/item').Item,
    util = require('util')

var Items = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Items' }, options));
    },
    newItem: function(data, options) {
        return new Item(this.application, data, options)
    },
    getItem: function(id, modifiedAfter) {
        return this.getItems({ id: id, modifiedAfter: modifiedAfter })
            .then(function(items) {
                return _.first(items);
            })
    },
    getItems: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newItem(data) };
        return this.getEntities(clonedOptions)
    },
    deleteItem: function(id) {
        var options = {
            id: id
        };
        return this.deleteEntities(options);
    },
    saveItems: function(items, options) {
        return this.saveEntities(items, this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Items';
        clonedOptions.entityConstructor = function(data) { return self.newItem(data) };
        return clonedOptions;
    }
})

module.exports = Items;