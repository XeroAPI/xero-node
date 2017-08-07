'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;

const currentApp = common.currentApp;

describe('currencies', () => {
  it('get', done => {
    currentApp.core.currencies
      .getCurrencies()
      .then(currencies => {
        expect(currencies).to.have.length.greaterThan(0);
        currencies.forEach(currency => {
          expect(currency.Code).to.not.equal(undefined);
          expect(currency.Code).to.not.equal('');
          expect(currency.Description).to.not.equal(undefined);
          expect(currency.Description).to.not.equal('');
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
