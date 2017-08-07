'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;

const currentApp = common.currentApp;

describe('branding themes', () => {
  let brandingThemeID = '';

  it('get', done => {
    currentApp.core.brandingThemes
      .getBrandingThemes()
      .then(brandingThemes => {
        expect(brandingThemes).to.have.length.greaterThan(0);
        brandingThemes.forEach(brandingTheme => {
          expect(brandingTheme.BrandingThemeID).to.not.equal(undefined);
          expect(brandingTheme.BrandingThemeID).to.not.equal('');
          expect(brandingTheme.Name).to.not.equal(undefined);
          expect(brandingTheme.Name).to.not.equal('');

          brandingThemeID = brandingTheme.BrandingThemeID;
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get by ID', done => {
    currentApp.core.brandingThemes
      .getBrandingTheme(brandingThemeID)
      .then(brandingTheme => {
        expect(brandingTheme.BrandingThemeID).to.not.equal(undefined);
        expect(brandingTheme.BrandingThemeID).to.not.equal('');
        expect(brandingTheme.Name).to.not.equal(undefined);
        expect(brandingTheme.Name).to.not.equal('');

        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
