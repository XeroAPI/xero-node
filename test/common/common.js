'use strict';

const chai = require('chai');
const sinon = require('sinon');
const Browser = require('zombie');
const xero = require('../..');
const util = require('util');
const uuid = require('uuid');
const fs = require('fs');

const metaConfig = JSON.parse(
  fs.readFileSync(`${__dirname}/../config/testing_config.json`)
);

const expect = chai.expect;

process.on('uncaughtException', err => {
  console.error('uncaught', err);
});

// Change the log level
xero.setLogLevel('debug');

const APPTYPE = metaConfig.APPTYPE;
const config = metaConfig[APPTYPE.toLowerCase()];

// Set up the global variables
let currentApp;

if (config.privateKeyPath && !config.privateKey)
  config.privateKey = fs.readFileSync(config.privateKeyPath);

switch (APPTYPE) {
  case 'PRIVATE':
    currentApp = new xero.PrivateApplication(config);
    break;
  case 'PUBLIC':
    currentApp = new xero.PublicApplication(config);
    break;
  case 'PARTNER':
    currentApp = new xero.PartnerApplication(config);
    break;
  default:
    throw new Error('No App Type Set!!');
}

module.exports.fs = fs;
module.exports.sinon = sinon;
module.exports.Browser = Browser;
module.exports.config = metaConfig;
module.exports.uuid = uuid;
module.exports.util = util;
module.exports.xero = xero;
module.exports.chai = chai;
module.exports.expect = expect;
module.exports.currentApp = currentApp;
