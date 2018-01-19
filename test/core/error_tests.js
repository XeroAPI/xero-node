'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

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
