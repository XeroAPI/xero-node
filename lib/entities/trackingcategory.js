var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    TrackingOptionSchema = require('./shared').TrackingOptionSchema;

var TrackingCategorySchema = new Entity.SchemaObject({
    TrackingCategoryID: { type: String, toObject: 'always' },
    Name: { type: String, toObject: 'always' },
    Status: { type: String, toObject: 'always' },
    Options: { type: Array, arrayType: TrackingOptionSchema, toObject: 'always', readOnly: 'true' }
});

var TrackingCategory = Entity.extend(TrackingCategorySchema, {
    constructor: function(application, data, options) {
        logger.debug('TrackingCategory::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    changes: function(options) {
        return this._super(options);
    },
    _toObject: function(options) {
        return this._super(options);
    },
    fromXmlObj: function(obj) {
        var self = this;
        Object.assign(self, _.omit(obj, 'Options'));
        if (obj.Options) {
            _.each(this.application.asArray(obj.Options.Option), function(option) {
                self.Options.push(option);
            })
        }

        return this;
    },
    toXml: function() {
        var trackingCategory = _.omit(this.toObject(), 'Options');
        // Options cannot be saved using this endpoint, they must use the specific /options endpoint
        // Object.assign(trackingCategory, { Options: [] });
        // _.forEach(this.Options, function(option) {
        //     trackingCategory.Options.push({ Option: option.toObject() })
        // })

        return this.application.js2xml(trackingCategory, 'TrackingCategory');
    },
    save: function(options) {
        var self = this;
        var xml = '<TrackingCategories>' + this.toXml() + '</TrackingCategories>';
        var path, method;
        if (this.TrackingCategoryID) {
            path = 'TrackingCategories/' + this.TrackingCategoryID;
            method = 'post'
        } else {
            path = 'TrackingCategories';
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'TrackingCategories.TrackingCategory', entityConstructor: function(data) { return self.application.core.trackingCategories.newTrackingCategory(data) } });
    },
    saveTrackingOptions: function(trackingOptions, trackingOptionID) {
        var self = this;
        var xml = '<Options>';

        if (_.isArray(trackingOptions)) {
            _.each(trackingOptions, function(option) {
                xml += "<Option>";
                if (option.Name)
                    xml += "<Name>" + option.Name + "</Name>";
                if (option.Status)
                    xml += "<Status>" + option.Status + "</Status>";
                xml += "</Option>";
            });
        } else if (trackingOptions.Name != undefined) {
            xml += "<Option>";
            xml += "<Name>" + trackingOptions.Name + "</Name>";
            if (trackingOptions.Status)
                xml += "<Status>" + trackingOptions.Status + "</Status>";
            xml += "</Option>";
        }

        xml += "</Options>";

        var path, method;
        if (trackingOptionID) {
            path = 'TrackingCategories/' + this.TrackingCategoryID + "/Options/" + trackingOptionID;
            method = 'post'
        } else {
            path = 'TrackingCategories/' + this.TrackingCategoryID + "/Options";
            method = 'put'
        }
        return this.application.putOrPostEntity(method, path, xml, { entityPath: 'Options.Option', entityConstructor: function(data) { return self.application.core.trackingCategories.newTrackingOption(data) } });
    },
    deleteTrackingOption: function(trackingOptionID) {
        return this.deleteEntities({ id: trackingOptionID });
    }
});


module.exports = TrackingCategory;
module.exports.TrackingCategorySchema = TrackingCategorySchema;