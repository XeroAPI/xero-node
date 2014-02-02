var _ = require('lodash')
    , logger = require('./logger')

module.exports.PrivateApplication = require('./application').PrivateApplication;
module.exports.PublicApplication = require('./application').PublicApplication;
module.exports.PartnerApplication = require('./application').PartnerApplication;

function init(options)
{
    logger.config({ level: options.log.level, toConsole: options.log.toConsole});
}

init({log: {level: 'debug', toConsole:true}});