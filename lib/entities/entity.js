'use strict';

const extend = require('../misc/extend');
const { isFunction, clone, isArray, isUndefined } = require('lodash');
const SchemaObject = require('../schemaobject/schemaobject');

module.exports.SchemaObject = SchemaObject;
module.exports.dateToString = value => value.toISOString();

module.exports.extend = (schema, classProps, staticProps) => {
  schema.extend = extend;
  const Entity = schema.extend({
    constructor: function(application, data, options) {
      this._application = application;
      options = options || {};
      this.options = options;
      schema.call(this, data);
      wrap(this);
      this._schemaToObject = this.toObject;
      this.toObject = this._toObject;
      isFunction(this.initialize) && this.initialize(options);
    },
    _toObject: function(options) {
      return this._schemaToObject(options);
    },
    makeError: function(code, message, data) {
      return { code: code, data: data, message: message };
    },
    changes: function(options) {
      return clone(this.tracking._changes);
    },
    fromXmlObj: function(obj) {
      return Object.assign(this, obj);
    },
    extractArray: function(src, dest) {
      var items = this.asArray(src);
      items.forEach(function(item) {
        dest.push(item);
      });
    },
    asArray: function(obj) {
      if (isArray(obj)) return obj;
      else if (!isUndefined(obj)) return [obj];
    },
  });

  return Entity.extend(Object.assign(classProps, { Entity }), staticProps);
};

function wrap(that) {
  Object.defineProperties(that, {
    application: {
      get: function() {
        return that._application;
      },
    },
  });
}
