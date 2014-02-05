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
})
module.exports = EntityHelper;


