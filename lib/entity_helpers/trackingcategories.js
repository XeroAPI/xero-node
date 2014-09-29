var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , TrackingCategory = require('../entities/trackingcategory')
    , p = require('../misc/promise')
    , util = require('util')

var TrackingCategorys = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'TrackingCategory', entityPlural:'TrackingCategories'}, options));
    },
    newTrackingCategory: function (data, options)
    {
        return new TrackingCategory(this.application, data, options)
    },
    getTrackingCategory: function (id, where, order, includeArchived)
    {
        return this.getTrackingCategories({id: id, other: {includeArchived: includeArchived}, where: where, order: order})
            .then(function (timesheets)
            {
                return _.first(timesheets);
            })
    },
    getTrackingCategories: function (options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newTrackingCategory(data)};
        return this.getEntities(clonedOptions)
    }
})

module.exports = TrackingCategorys;

