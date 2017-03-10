var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    TrackingOptionSchema = require('./shared').TrackingOptionSchema;

var entityName = 'TrackingOption';
var TrackingOption = Entity.extend(TrackingOptionSchema, {
    constructor: function(application, data, options) {
        logger.debug('TrackingOption::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this._super(options);
    },
    _toObject: function(options) {
        this.trackEvent(entityName, arguments.callee.name);
        return this._super(options);
    },
    delete: function() {
        this.trackEvent(entityName, arguments.callee.name);
        return this.deleteEntities({ id: this.TrackingOptionID });
    }
});

module.exports = TrackingOption;