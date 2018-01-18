var _ = require('lodash'),
    Entity = require('../entity'),
    TrackingOptionSchema = require('../shared').TrackingOptionSchema;

var TrackingCategorySchema = Entity.SchemaObject({
    TrackingCategoryID: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    Status: { type: String, toObject: 'always' },
    Options: { type: Array, arrayType: TrackingOptionSchema, toObject: 'always' }
});

var TrackingCategory = Entity.extend(TrackingCategorySchema, {
    constructor: function(application, data, options) {

        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    save: function(options) {
        var self = this;
        var path, method;
        if (this.TrackingCategoryID) {
            path = 'TrackingCategories/' + this.TrackingCategoryID;
            method = 'post'
        } else {
            path = 'TrackingCategories';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, JSON.stringify(self), { entityPath: 'TrackingCategories', entityConstructor: function(data) { return self.application.core.trackingCategories.newTrackingCategory(data) } });
    },
    saveTrackingOptions: function(trackingOptions, trackingOptionID) {
        var self = this;
        var path, method;
        if (trackingOptionID) {
            path = 'TrackingCategories/' + this.TrackingCategoryID + "/Options/" + trackingOptionID;
            method = 'post'
        } else {
            path = 'TrackingCategories/' + this.TrackingCategoryID + "/Options";
            method = 'put'
        }

        if (!_.isArray(trackingOptions))
            trackingOptions = [trackingOptions];

        var payload = {
            Options: trackingOptions
        };

        return this.application.putOrPostEntity(method, path, JSON.stringify(payload), { entityPath: 'Options', entityConstructor: function(data) { return self.application.core.trackingCategories.newTrackingOption(data) } });
    },
    deleteTrackingOption: function(trackingOptionID) {
        return this.deleteEntities({ id: trackingOptionID });
    }
});


module.exports.TrackingCategory = TrackingCategory;
module.exports.TrackingCategorySchema = TrackingCategorySchema;
