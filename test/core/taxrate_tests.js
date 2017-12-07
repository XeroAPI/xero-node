'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;

const currentApp = common.currentApp;

describe('taxRates', () => {
  let createdTaxRate = '';

  it('gets tax rates', done => {
    currentApp.core.taxRates
      .getTaxRates()
      .then(taxRates => {
        // This test requires that some tax rates are set up in the targeted company
        expect(taxRates).to.have.length.greaterThan(0);
        taxRates.forEach(taxRate => {
          expect(taxRate.Name).to.not.equal('');
          expect(taxRate.Name).to.not.equal(undefined);
          expect(taxRate.TaxType).to.not.equal('');
          expect(taxRate.TaxType).to.not.equal(undefined);
          expect(taxRate.CanApplyToAssets).to.be.a('Boolean');
          expect(taxRate.CanApplyToEquity).to.be.a('Boolean');
          expect(taxRate.CanApplyToExpenses).to.be.a('Boolean');
          expect(taxRate.CanApplyToLiabilities).to.be.a('Boolean');
          expect(taxRate.CanApplyToRevenue).to.be.a('Boolean');
          expect(taxRate.DisplayTaxRate).to.be.a('Number');
          expect(taxRate.Status).to.be.oneOf(['ACTIVE', 'DELETED', 'ARCHIVED']);
          expect(taxRate.TaxComponents).to.have.length.greaterThan(0);

          taxRate.TaxComponents.forEach(taxComponent => {
            expect(taxComponent.Name).to.not.equal('');
            expect(taxComponent.Name).to.not.equal(undefined);
            expect(taxComponent.Rate).to.be.a('Number');
            expect(taxComponent.IsCompound).to.be.a('Boolean');
            expect(taxComponent.IsNonRecoverable).to.be.a('Boolean');
          });
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('creates a new tax rate', done => {
    const taxrate = {
      Name: '20% GST on Expenses',
      TaxComponents: [
        {
          Name: 'GST',
          Rate: 20.1234,
          IsCompound: false,
        },
      ],
    };

    currentApp.core.organisations
      .getOrganisation()
      .then(ret => ret.CountryCode)
      .then(organisationCountry => {
        if (['AU', 'NZ', 'UK'].indexOf(organisationCountry) > -1) {
          // we're an Org country that needs a report tax type so:
          taxrate.ReportTaxType = 'INPUT';
        }

        const taxRate = currentApp.core.taxRates.newTaxRate(taxrate);

        taxRate
          .save()
          .then(response => {
            expect(response.entities).to.have.length.greaterThan(0);
            createdTaxRate = response.entities[0];

            expect(createdTaxRate.Name).to.equal(taxrate.Name);
            expect(createdTaxRate.TaxType).to.match(/TAX[0-9]{3}/);
            expect(createdTaxRate.CanApplyToAssets).to.be.a('Boolean');
            expect(createdTaxRate.CanApplyToEquity).to.be.a('Boolean');
            expect(createdTaxRate.CanApplyToExpenses).to.be.a('Boolean');
            expect(createdTaxRate.CanApplyToLiabilities).to.be.a('Boolean');
            expect(createdTaxRate.CanApplyToRevenue).to.be.a('Boolean');
            expect(createdTaxRate.DisplayTaxRate).to.equal(
              taxrate.TaxComponents[0].Rate
            );
            expect(createdTaxRate.EffectiveRate).to.equal(
              taxrate.TaxComponents[0].Rate
            );
            expect(createdTaxRate.Status).to.equal('ACTIVE');
            expect(createdTaxRate.ReportTaxType).to.equal(
              taxrate.ReportTaxType
            );

            createdTaxRate.TaxComponents.forEach(taxComponent => {
              expect(taxComponent.Name).to.equal(taxrate.TaxComponents[0].Name);
              expect(taxComponent.Rate).to.equal(taxrate.TaxComponents[0].Rate);
              expect(taxComponent.IsCompound).to.equal(
                taxrate.TaxComponents[0].IsCompound
              );
              expect(taxComponent.IsNonRecoverable).to.equal(false);
            });
            done();
          })
          .catch(err => {
            console.error(err);
            done(wrapError(err));
          });
      });
  });

  it('updates the taxrate to DELETED', done => {
    createdTaxRate
      .delete()
      .then(response => {
        expect(response.entities).to.have.lengthOf(1);
        expect(response.entities[0].Status).to.equal('DELETED');
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
