var logger = require('../logger'),
    extend = require('../misc/extend'),
    _ = require('lodash'),
    q = require('q'),
    util = require('util'),
    qs = require('querystring'),
    SchemaObject = require('../schemaobject/schemaobject'),
    dateformat = require('dateformat'),
    ga = require('../misc/tracking');

module.exports.SchemaObject = SchemaObject;
module.exports.dateToString = function(value) {
    return value && dateformat(value, 'isoDateTime');
};
module.exports.extend = function(schema, classProps, staticProps) {
    schema.extend = extend;
    var Entity = schema.extend({
        constructor: function(application, data, options) {
            this._application = application;
            options = options || {};
            this.options = options;
            schema.call(this, data);
            wrap(this);
            this._schemaToObject = this.toObject;
            this.toObject = this._toObject;
            _.isFunction(this.initialize) && this.initialize(options);
        },
        _toObject: function(options) {
            return this._schemaToObject(options);
        },
        makeError: function(code, message, data) {
            return { code: code, data: data, message: message };
        },
        changes: function(options) {
            return _.clone(this.tracking._changes);
        },
        fromXmlObj: function(obj) {
            return Object.assign(this, obj);
        },
        extractArray: function(src, dest) {
            var items = this.application.asArray(src);
            _.each(items, function(item) {
                dest.push(item);
            })

        },
        trackEvent: function(entity, method) {
            if (this.application && this.application.options && this.application.options.ga_tracking_cid) {
                ga.trackEvent(this.application.options.ga_tracking_cid, entity, method);
            }
        }
    })

    return Entity.extend(Object.assign(classProps, { Entity: Entity }), staticProps);

}

function wrap(that) {
    Object.defineProperties(that, {
        application: {
            get: function() {
                return that._application;
            }
        }
    })
}