var extend = require('../misc/extend'),
    _ = require('lodash'),
    util = require('util'),
    qs = require('querystring')

function EntityHelper(application, options) {
    var self = this;
    
    this._application = application;
    this._options = options || {};
    Object.defineProperties(this, {
        application: {
            get: function() { return self._application; }
        }
    })

}
EntityHelper.extend = extend;

Object.assign(EntityHelper.prototype, {
    saveEntities: function(entities, options) {
        
        options = options || {};

        var payload = {};

        if (!_.isArray(entities)) {
            entities = [entities];
        }

        payload[this._options.entityPlural] = entities;

        return this.application.putOrPostPostEntities(options.method || 'put', this._options.entityPlural, JSON.stringify(payload), options);
    },
    getEntities: function(options) {
        
        var self = this;
        options = options || {};
        var path = options.path || this._options.path || this._options.entityPlural;
        if (options.id)
            path += '/' + options.id;

        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = this._options.entityPlural;
        if (this._options.entityName)
            clonedOptions.entityPath += '.' + this._options.entityName;

        if (options.deleteEntity) {
            
            return this.application.deleteEntities(path, clonedOptions);
        } else {
            
            return this.application.getEntities(path, clonedOptions);
        }

    },
    deleteEntities: function(options) {
        
        options = options || {};
        options.deleteEntity = true;
        return this.getEntities(options);
    },
    streamEntity: function(options) {
        options = options || {};
        var path = options.path || this._options.entityPlural;
        path += '/' + options.id;

        return this.application.get(path, options);
    }

})
module.exports = EntityHelper;