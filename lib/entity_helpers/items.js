var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Item = require('../entities/item'),
    util = require('util')

var entityName = 'ItemsHelper';
var Items = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Item', entityPlural: 'Items' }, options));
    },
    newItem: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Item(this.application, data, options)
    },
    getItem: function(id, modifiedAfter) {
        this.trackEvent(entityName, arguments.callee.name);
        return this.getItems({ id: id, modifiedAfter: modifiedAfter })
            .then(function(items) {
                return _.first(items);
            })
    },
    getItems: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newItem(data) };
        return this.getEntities(clonedOptions)
    },
    deleteItem: function(id) {
        this.trackEvent(entityName, arguments.callee.name);
        var options = {
            id: id
        };
        return this.deleteEntities(options);
    }
})

module.exports = Items;