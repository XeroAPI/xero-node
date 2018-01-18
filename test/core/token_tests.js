'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const sinon = common.sinon;
const xero = common.xero;
const Browser = common.Browser;
const wrapError = functions.wrapError;
const metaConfig = common.config;
const config = metaConfig[metaConfig.APPTYPE.toLowerCase()];

let currentApp = common.currentApp;
let eventReceiver = currentApp.eventEmitter;

Browser.waitDuration = '30s';

describe('get access for public or partner application', () => {
  beforeEach(function() {
    if (metaConfig.APPTYPE === 'PRIVATE') {
      this.skip();
    }
  });

  describe('Get tokens', () => {
    let authoriseUrl = '';
    let requestToken = '';
    let requestSecret = '';
    let verifier = '';

    // This function is used by the event emitter to receive the event when the token
    // is automatically refreshed.  We use the 'spy' function so that we can include
    // some checks within the tests.
    const spy = sinon.spy((...args) => {
      console.warn('Event Received. Creating new Partner App');

      // Create a new application object when we receive new tokens
      currentApp = new xero.PartnerApplication(config);
      currentApp.setOptions(args[0]);
      // Reset the event receiver so the listener stack is shared correctly.
      eventReceiver = currentApp.eventEmitter;
      eventReceiver.on('xeroTokenUpdate', data => {
        console.warn('Event Received: ', data);
      });

      console.warn('Partner app recreated');
    });

    it('adds the event listener', done => {
      eventReceiver.on('xeroTokenUpdate', spy);
      done();
    });

    it('user gets a token and builds the url', () =>
      currentApp.getRequestToken().then(res => {
        requestToken = res.token;
        requestSecret = res.secret;
        authoriseUrl = currentApp.buildAuthorizeUrl(requestToken, {
          scope: 'payroll.employees,payroll.payitems,payroll.leaveapplications',
        });
        console.warn(`URL: ${authoriseUrl}`);
        console.warn(`Request Token: ${requestToken}`);
        console.warn(`Request Secret: ${requestSecret}`);
      }));

    describe('gets the request token from the url', () => {
      const userAgentString =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.20 (KHTML, like Gecko) Chrome/19.0.1036.7';
      const browser = new Browser({
        userAgent: userAgentString,
        wait: 20000,
        runScripts: false,
      });

      // browser.debug();

      before(function(done) {
        if (metaConfig.APPTYPE === 'PRIVATE') {
          this.skip();
        }

        browser.visit(authoriseUrl, done);
      });

      describe('submits form', () => {
        const options = {
          XeroUsername: config.xeroUsername,
          XeroPassword: config.xeroPassword,
        };

        it('should login', done => {
          browser
            .fill('userName', options.XeroUsername)
            .fill('password', options.XeroPassword)
            .pressButton('Login', done);
        });

        it('should be successful', done => {
          browser.assert.success();
          done();
        });

        it('should see noscript page', done => {
          browser.assert.text('title', 'Working...');
          browser.document.forms[0].submit();
          browser.wait().then(() => {
            // just dump some debug data to see if we're on the right page
            // console.error(browser.dump());
            done();
          });
        });

        it('should see application auth page', done => {
          // console.error(browser.document.documentElement.innerHTML);
          browser.assert.text('title', 'Xero | Authorise Application');

          if (config.selectedAppId && config.selectedAppId !== '') {
            browser.select('SelectedOrganisation', config.selectedAppId);
          }

          if (metaConfig.APPTYPE === 'PUBLIC') {
            browser.pressButton('Allow access for 30 mins');
          } else {
            // It must be a partner app
            browser.pressButton('Allow access');
          }

          browser.wait().then(() =>
            // just dump some debug data to see if we're on the right page
            // console.error(browser.dump());
            done()
          );
        });

        it('should get a code to enter', done => {
          browser.assert.text('title', 'Xero | Authorise Application');
          verifier = browser.field('#pin-input').value;

          expect(verifier).to.not.equal('');
          expect(verifier).to.be.a('String');
          done();
        });
      });
    });

    describe('swaps the request token for an access token', () => {
      it('calls the access token method and sets the options', done => {
        currentApp
          .setAccessToken(requestToken, requestSecret, verifier)
          .then(() => {
            expect(currentApp.options.accessToken).to.not.equal(undefined);
            expect(currentApp.options.accessToken).to.not.equal('');
            expect(currentApp.options.accessSecret).to.not.equal(undefined);
            expect(currentApp.options.accessSecret).to.not.equal('');

            if (metaConfig.APPTYPE === 'PARTNER') {
              expect(currentApp.options.sessionHandle).to.not.equal(undefined);
              expect(currentApp.options.sessionHandle).to.not.equal('');
            }

            done();
          })
          .catch(err => {
            done(wrapError(err));
          });
      });

      it('refreshes the token', done => {
        if (metaConfig.APPTYPE !== 'PARTNER') {
          done();
        } else {
          // Only supported for Partner integrations
          currentApp
            .refreshAccessToken()
            .then(() => {
              expect(currentApp.options.accessToken).to.not.equal(undefined);
              expect(currentApp.options.accessToken).to.not.equal('');
              expect(currentApp.options.accessSecret).to.not.equal(undefined);
              expect(currentApp.options.accessSecret).to.not.equal('');
              expect(currentApp.options.sessionHandle).to.not.equal(undefined);
              expect(currentApp.options.sessionHandle).to.not.equal('');

              expect(spy.called).to.equal(true);
              done();
            })
            .catch(err => {
              done(wrapError(err));
            });
        }
      });
    });
  });
});
