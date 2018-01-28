'use strict';

const common = require('../common/common');
const functions = require('../common/functions');
const xero = require('../..');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

const nonExistentId = '0B283B87-E2AC-4924-AF49-74CF65A763DA';

describe('errors', () => {

  describe('PUT endpoints', () => {

    it('throws an error with data and statusCode 400 when a bad request is made', () => {
      const contact = currentApp.core.contacts.newContact({ InvalidFields: 'yup!' });
      return contact
        .save()
        .then(response => { throw new Error('expected to throw'); })
        .catch(err => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.contain('PUT call failed');
          expect(err.data).to.be.an('object');
          expect(err.statusCode).to.equal(400);
        });
    });

  });

  describe('POST endpoints', () => {

    it('throws an error with data and statusCode 400 when a bad request is made', () => {
      const contact = currentApp.core.contacts.newContact({ ContactID: nonExistentId, InvalidFields: 'yup!' });
      return contact
        .save()
        .then(response => { throw new Error('expected to throw'); })
        .catch(err => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.contain('POST call failed');
          expect(err.data).to.be.an('object');
          expect(err.statusCode).to.equal(400);
        });
    });

  });

  describe('DELETE endpoints', () => {

    it('throws an error with data and statusCode 404 when a non-existing ID is specified', () => {
      return currentApp.core.accounts
        .deleteAccount('not_a_guid')
        .then(response => { throw new Error('expected to throw'); })
        .catch(err => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.contain('DELETE call failed');
          expect(err.statusCode).to.equal(404);
        });
    });

  });

  describe('GET endpoints', () => {

    it('throws an error with data and statusCode 404 when a non-existing ID is specified', () => {
      return currentApp.core.contacts
        .getContact(nonExistentId)
        .then(response => { throw new Error('expected to throw'); })
        .catch(err => {
          expect(err).to.be.instanceof(Error);
          expect(err.message).to.contain('GET call failed');
          expect(err.data).to.be.an('object');
          expect(err.statusCode).to.equal(404);
        });
    });

  });

});

describe('when private key is invalid', () => {

  it('throws an error for private apps', () => {
    const config = JSON.parse(
      fs.readFileSync(`./test/config/testing_config.json`)
    );

    config.privateKeyPath = "`${__dirname}/../test/core/testdata/invalid_privatekey.pemx";

    //Private key can either be a path or a String so check both variables and make sure the path has been parsed.
    if (config.privateKeyPath && !config.privateKey)
      config.privateKey = fs.readFileSync(config.privateKeyPath);

    try {
      const xeroClient = new xero.PrivateApplication(config)
      throw new Error('expected to throw');
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect(error.message).to.contain('Your Private Key does not appear to be valid');
    }
  });

  it('throws an error for Partner apps', () => {
    const config = JSON.parse(
      fs.readFileSync(`./test/config/testing_config.json`)
    );

    config.privateKeyPath = "`${__dirname}/../test/core/testdata/invalid_privatekey.pemx";

    //Private key can either be a path or a String so check both variables and make sure the path has been parsed.
    if (config.privateKeyPath && !config.privateKey)
      config.privateKey = fs.readFileSync(config.privateKeyPath);

    try {
      const xeroClient = new xero.PartnerApplication(config)
      throw new Error('expected to throw');
    } catch (error) {
      expect(error).to.be.instanceof(Error);
      expect(error.message).to.contain('Your Private Key does not appear to be valid');
    }
  });
});
