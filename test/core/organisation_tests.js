'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;

const currentApp = common.currentApp;

describe('organisations', function() {
  it('get', function(done) {
    currentApp.core.organisations
      .getOrganisation()
      .then(function(ret) {
        const orgVersions = ['AU', 'NZ', 'GLOBAL', 'UK', 'US'];
        expect(ret.Name).to.not.equal('');
        expect(ret.Version).to.not.equal('');
        expect(ret.Version).to.be.oneOf(orgVersions);
        done();
      })
      .catch(function(err) {
        console.error(err);
        done(wrapError(err));
      });
  });
});
