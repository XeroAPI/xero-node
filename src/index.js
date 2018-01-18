var _ = require('lodash')

module.exports.PrivateApplication = require('./application').PrivateApplication;
module.exports.PublicApplication = require('./application').PublicApplication;
module.exports.PartnerApplication = require('./application').PartnerApplication;

module.exports.setLogLevel = function(logLevel, toConsole) {
    logLevel = logLevel || "warn";
    toConsole = toConsole || false;
};

function init(options) {
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

init({ log: { level: 'warn', toConsole: false } });