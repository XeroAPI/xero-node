'use strict';

const common = require('../common/common');

const wrapError = common.wrapError;

const currentApp = common.currentApp;

describe('users', function() {
  it('retrieves a list of users', done => {
    currentApp.core.users
      .getUsers()
      .then(() => {
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
