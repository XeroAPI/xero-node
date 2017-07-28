'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;

const currentApp = common.currentApp;

describe('currencies', function() {
  it('get', function(done) {
    currentApp.core.currencies
      .getCurrencies()
      .then(function(currencies) {
        expect(currencies).to.have.length.greaterThan(0);
        currencies.forEach(function(currencies) {
          expect(currencies.Code).to.not.equal(undefined);
          expect(currencies.Code).to.not.equal('');
          expect(currencies.Description).to.not.equal(undefined);
          expect(currencies.Description).to.not.equal('');
        });
        done();
      })
      .catch(function(err) {
        console.error(err);
        done(wrapError(err));
      });
  });
});
