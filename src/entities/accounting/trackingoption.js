var _ = require('lodash'),
    Entity = require('../entity'),
    TrackingOptionSchema = require('../shared').TrackingOptionSchema;

var TrackingOption = Entity.extend(TrackingOptionSchema, {
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
    delete: function() {
        return this.deleteEntities({ id: this.TrackingOptionID });
    }
});

module.exports.TrackingOption = TrackingOption;