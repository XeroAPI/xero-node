'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const wrapError = functions.wrapError;

const currentApp = common.currentApp;

describe('users', () => {
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
