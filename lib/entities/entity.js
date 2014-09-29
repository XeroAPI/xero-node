var logger = require('../logger')
    , extend = require('../misc/extend')
    , _ = require('lodash')
    , q = require('q')
    , util = require('util')
    , qs = require('querystring')
    , SchemaObject = require('node-schema-object')
    , dateformat = require('dateformat')

module.exports.SchemaObject = SchemaObject;
module.exports.dateToString = function(value)
{
    return value && dateformat(value,'isoDateTime');
}
module.exports.extend = function(schema, classProps, staticProps)
{
    schema.extend = extend;
    var Entity = schema.extend(
        {
            constructor: function (application,data, options)
            {
                this._application = application;
                options = options || {};
                this.options = options;
                schema.call(this, data);
                wrap(this);
                this._schemaToObject = this.toObject;
                this.toObject = this._toObject;
                _.isFunction(this.initialize) && this.initialize(options);
            },
            _toObject: function (options)
            {
                return this._schemaToObject(options);
            },
            makeError: function (code,message, data)
            {
                return { code: code, data: data, message: message };
            },
            changes: function (options)
            {
                return _.clone(this.tracking._changes);
            },
            fromXmlObj:function(obj)
            {
                return _.extend(this, obj);
            },
            extractArray: function(src, dest)
            {
                var items = this.application.asArray(src);
                _.each(items, function (item)
                {
                    dest.push(item);
                })

            }
        })

    return Entity.extend(_.extend(classProps, { Entity: Entity }), staticProps);

}

function wrap(that)
{
    Object.defineProperties(that, {
        application: {
            get: function ()
            {
                return that._application;
            }
        }
    })
}
