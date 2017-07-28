'use strict';

const common = require('../common/common');

const expect = common.expect;
const wrapError = common.wrapError;

const currentApp = common.currentApp;

describe('taxRates', function() {
  let createdTaxRate = '';
  let organisationCountry = '';

  before(function() {
    currentApp.core.organisations.getOrganisation().then(function(ret) {
      organisationCountry = ret.CountryCode;
    });
  });

  it('gets tax rates', function(done) {
    currentApp.core.taxRates
      .getTaxRates()
      .then(function(taxRates) {
        // This test requires that some tax rates are set up in the targeted company
        expect(taxRates).to.have.length.greaterThan(0);
        taxRates.forEach(function(taxRate) {
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

          taxRate.TaxComponents.forEach(function(taxComponent) {
            expect(taxComponent.Name).to.not.equal('');
            expect(taxComponent.Name).to.not.equal(undefined);
            expect(taxComponent.Rate).to.be.a('Number');
            expect(taxComponent.IsCompound).to.be.a('Boolean');
          });
        });
        done();
      })
      .catch(function(err) {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('creates a new tax rate', function(done) {
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

    if (['AU', 'NZ', 'UK'].indexOf(organisationCountry) > -1) {
      // we're an Org country that needs a report tax type so:
      taxrate.ReportTaxType = 'INPUT';
    }

    const taxRate = currentApp.core.taxRates.newTaxRate(taxrate);

    taxRate
      .save()
      .then(function(response) {
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
        expect(createdTaxRate.ReportTaxType).to.equal(taxrate.ReportTaxType);

        createdTaxRate.TaxComponents.forEach(function(taxComponent) {
          expect(taxComponent.Name).to.equal(taxrate.TaxComponents[0].Name);
          expect(taxComponent.Rate).to.equal(taxrate.TaxComponents[0].Rate);
          expect(taxComponent.IsCompound).to.equal(
            taxrate.TaxComponents[0].IsCompound
          );
        });
        done();
      })
      .catch(function(err) {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('updates the taxrate to DELETED', function(done) {
    createdTaxRate
      .delete()
      .then(function(response) {
        expect(response.entities).to.have.lengthOf(1);
        expect(response.entities[0].Status).to.equal('DELETED');
        done();
      })
      .catch(function(err) {
        console.error(err);
        done(wrapError(err));
      });
  });
});
