var logger = require('../logger'),
    extend = require('../misc/extend'),
    _ = require('lodash'),
    promise = require('../misc/promise'),
    util = require('util'),
    qs = require('querystring')

function EntityHelper(application, options) {
    var self = this;
    logger.debug('EntityHelper::constructor');
    this._application = application;
    this._options = options || {};
    Object.defineProperties(this, {
        application: {
            get: function() { return self._application; }
        }
    })

}
EntityHelper.extend = extend;

_.extend(EntityHelper.prototype, {
    saveEntities: function(entities, options) {
        logger.debug('EntityHelper::saveEntities');
        options = options || {};
        if (!_.isArray(entities))
            entities = [entities];

        var entitiesXml = _.map(entities, function(entity) {
            return entity.toXml();
        }).join('');

        var xml = '<' + this._options.entityPlural + '>' + entitiesXml + '</' + this._options.entityPlural + '>';
        return this.application.putOrPostPostEntities(options.method || 'put', this._options.entityPlural, xml, options);
    },
    getEntities: function(options) {
        logger.debug('EntityHelper::getEntities');
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
            logger.debug('EntityHelper::getEntities - deleting entites from: ' + path);
            return this.application.deleteEntities(path, clonedOptions);
        } else {
            logger.debug('EntityHelper::getEntities - retrieving entites from: ' + path);
            return this.application.getEntities(path, clonedOptions);
        }

    },
    deleteEntities: function(options) {
        logger.debug('EntityHelper::deleteEntities - deleting entites');
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