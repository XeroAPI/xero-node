'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;

const currentApp = common.currentApp;

describe('organisations', () => {
  it('get', done => {
    currentApp.core.organisations
      .getOrganisation()
      .then(ret => {
        const orgVersions = ['AU', 'NZ', 'GLOBAL', 'UK', 'US'];

        if (ret.APIKey) {
          expect(ret.APIKey).to.be.a('string');
        }

        expect(ret.Name).to.be.a('string');
        expect(ret.LegalName).to.be.a('string');
        expect(ret.PaysTax).to.be.a('boolean');
        expect(ret.Version).to.be.a('string');
        expect(ret.Version).to.be.oneOf(orgVersions);
        expect(ret.OrganisationType).to.be.a('string');
        expect(ret.BaseCurrency).to.be.a('string');
        expect(ret.CountryCode).to.be.a('string');
        expect(ret.IsDemoCompany).to.be.a('boolean');
        expect(ret.OrganisationStatus).to.be.a('string');
        expect(ret.TaxNumber).to.be.a('string');
        expect(ret.FinancialYearEndDay).to.be.a('number');
        expect(ret.FinancialYearEndMonth).to.be.a('number');
        expect(ret.SalesTaxBasis).to.be.a('string');
        expect(ret.SalesTaxPeriod).to.be.a('string');
        expect(ret.PeriodLockDate).to.be.a('date');
        expect(ret.CreatedDateUTC).to.be.a('date');
        expect(ret.OrganisationEntityType).to.be.a('string');
        expect(ret.Timezone).to.be.a('string');
        expect(ret.ShortCode).to.be.a('string');
        expect(ret.OrganisationID).to.be.a('string');

        expect(ret.Addresses.length).to.be.greaterThan(0);

        ret.Addresses.forEach(address => {
          expect(address.AddressType).to.be.a('string');
          expect(address.AddressLine1).to.be.a('string');

          if (address.AddressLine2) {
            expect(address.AddressLine2).to.be.a('string');
          }

          expect(address.City).to.be.a('string');
          expect(address.PostalCode).to.be.a('string');
          expect(address.Country).to.be.a('string');
          expect(address.AttentionTo).to.be.a('string');
        });

        if (ret.ExternalLinks) {
          ret.ExternalLinks.forEach(externalLink => {
            expect(externalLink.LinkType).to.be.a('string');
            expect(externalLink.Url).to.be.a('string');
          });
        }

        if (ret.Phones) {
          ret.Phones.forEach(phone => {
            expect(phone.PhoneType).to.be.a('string');
            expect(phone.PhoneType).to.be.oneOf([
              'DEFAULT',
              'DDI',
              'MOBILE',
              'FAX',
              'OFFICE',
            ]);
            expect(phone.PhoneNumber).to.be.a('string');
          });
        }

        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
