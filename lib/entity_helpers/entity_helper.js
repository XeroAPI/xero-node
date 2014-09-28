var logger = require('../logger')
    , extend = require('../misc/extend')
    , _ = require('lodash')
    , promise = require('../misc/promise')
    , util = require('util')
    , qs = require('querystring')

function EntityHelper(application, options)
{
    var self = this;
    logger.debug('EntityHelper::constructor');
    this._application = application;
    this._options = options;
    Object.defineProperties(this, {
        application: {
            get: function() { return self._application; }
        }
    })

}
EntityHelper.extend = extend;

_.extend(EntityHelper.prototype, {
    saveEntities: function(entities,options )
    {
        var entitiesXml = _.map(entities,  function(entitiy)
        {
            return entitiy.toXml();
        }).join('');

        var xml = '<' + this._options.entityPlural + '>' + entitiesXml + '<' + this._options.entityPlural +'>';
        return this.application.putEntities(this._options.entityPlural,xml);
    },
    getEntities: function (options)
    {
        var self = this;
        options = options || {};
        var path = this._options.entityPlural;
        if (options.id)
            path += '/' + options.id;

        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = this._options.entityPlural + '.' + this._options.entityName;
        // clonedOptions.entityConstructor = function(data) { return self.newEntity(data)};
        return this.application.getEntities(path, clonedOptions);
    }

})
module.exports = EntityHelper;


