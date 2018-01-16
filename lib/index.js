const { mixin, result, isObject } = require('lodash');

module.exports.PrivateApplication = require('./application').PrivateApplication;
module.exports.PublicApplication = require('./application').PublicApplication;
module.exports.PartnerApplication = require('./application').PartnerApplication;

module.exports.setLogLevel = function(logLevel, toConsole) {
    logLevel = logLevel || "warn";
    toConsole = toConsole || false;
};

function init(options) {
    mixin({
        deepResult: function(o, path) {
            var pathParts = path.split('.');
            var currentO = o,
                retValue;
            pathParts.forEach(function(part, i) {
                if (i == pathParts.length - 1) {
                    retValue = result(currentO, part);
                    return false;
                }

                currentO = result(currentO, part);
                if (!isObject(currentO))
                    return false;

            })
            return retValue;
        }
    })
}

init({ log: { level: 'warn', toConsole: false } });
