var _ = require('lodash'),
    logger = require('./logger')

module.exports.PrivateApplication = require('./application').PrivateApplication;
module.exports.PublicApplication = require('./application').PublicApplication;
module.exports.PartnerApplication = require('./application').PartnerApplication;

function init(options) {
    logger.config({ level: options.log.level, toConsole: options.log.toConsole });
    _.mixin({
        deepResult: function(o, path) {
            var pathParts = path.split('.');
            var currentO = o,
                retValue;
            _.each(pathParts, function(part, i) {
                if (i == pathParts.length - 1) {
                    retValue = _.result(currentO, part);
                    return false;
                }

                currentO = _.result(currentO, part);
                if (!_.isObject(currentO))
                    return false;

            })
            return retValue;
        }
    })
}

init({ log: { level: 'error', toConsole: false } });