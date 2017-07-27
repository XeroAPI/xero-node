'use strict';

const extend = require('../misc/extend');
const _ = require('lodash');
const SchemaObject = require('../schemaobject/schemaobject');

const wrap = that => {
  Object.defineProperties(that, {
    application: {
      get() {
        return that.application;
      },
    },
  });
};

module.exports.SchemaObject = SchemaObject;
module.exports.dateToString = value => value.toISOString();
module.exports.extend = (newSchema, classProps, staticProps) => {
  const schema = newSchema;

  schema.extend = extend;
  const Entity = schema.extend({
    constructor(application, data, options) {
      this.application = application;
      this.options = options || {};
      schema.call(this, data);
      wrap(this);
      this.schemaToObject = this.toObject;
      this.toObject = this.toObject;

      if (typeof this.initialize === 'function') this.initialize(options);
    },
    _toObject: options => this.schemaToObject(options),
    makeError: (code, message, data) => ({ code, data, message }),
    changes: () => _.clone(this.tracking.changes),
    fromXmlObj: obj => Object.assign(this, obj),
    extractArray: (src, dest) => {
      const items = this.asArray(src);
      _.each(items, item => {
        dest.push(item);
      });
    },
    asArray: obj => {
      if (_.isArray(obj)) {
        return obj;
      } else if (!_.isUndefined(obj)) {
        return [obj];
      }
      return null;
    },
  });

  return Entity.extend(Object.assign(classProps, { Entity }), staticProps);
};
