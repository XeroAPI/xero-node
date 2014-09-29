var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')

var TrackingOptionSchema = new Entity.SchemaObject({
    TrackingOptionID: {type: String},
    Name: {type: String},
    Status: {type: String}
});

var TrackingCategorySchema = new Entity.SchemaObject({
    TrackingCategoryID: {type: String},
    Name: {type: String},
    Status: {type: String},
    Options: {type: Array, arrayType: TrackingOptionSchema, toObject: 'always'}
});


var TrackingCategory = Entity.extend(TrackingCategorySchema, {
    constructor: function (application, data, options)
    {
        logger.debug('TrackingCategory::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    changes: function (options)
    {
        return this._super(options);
    },
    _toObject: function (options)
    {
        return this._super(options);
    },
    fromXmlObj: function (obj)
    {
        var self = this;
        _.extend(self, _.omit(obj, 'Options'));
        if (obj.Options) {
            _.each(this.application.asArray(obj.Options.Option), function (option)
            {
                self.Options.push(option);
            })
        }

        return this;
    },
    toXml: function ()
    {
        var trackingCategory = _.omit(this.toObject(), 'Options');
        _.extend(trackingCategory, { Options: []});
        _.forEach(this.Options, function(option)
        {
            trackingCategory.Options.push({ Option: option.toObject()})
        })

        return this.application.js2xml(trackingCategory, 'TrackingCategory');
    }
});


module.exports = TrackingCategory;
module.exports.TrackingCategorySchema = TrackingCategorySchema;
