const common = require('../common/common'),
  mocha = common.mocha,
  expect = common.expect,
  xero = common.xero,
  wrapError = common.wrapError,
  uuid = common.uuid;

const currentApp = common.currentApp;

describe('earningsrates', () => {
  let expenseAccountID = '',
    expenseAccountCode = '',
    earningsRateID = '';

  before('create an expense account for testing', () => {
    const randomString = uuid.v4();

    const testAccountData = {
      Code: randomString.replace(/-/g, '').substring(0, 10),
      Name: `Test expense from Node SDK ${randomString}`,
      Type: 'EXPENSE',
      Status: 'ACTIVE',
    };

    const account = currentApp.core.accounts.newAccount(testAccountData);

    return account.save().then(response => {
      expenseAccountID = response.entities[0].AccountID;
      expenseAccountCode = response.entities[0].Code;
    });
  });

  after('archive the account for testing', () => {
    currentApp.core.accounts.getAccount(expenseAccountID).then(account => {
      account.Status = 'ARCHIVED';
      return account.save();
    });
  });

  it('get earnings rates', done => {
    currentApp.payroll.payitems
      .getEarningsRates()
      .then(earningsRates => {
        expect(earningsRates.length).to.be.at.least(1);

        earningsRates.forEach(earningsRate => {
          expect(earningsRate.EarningsRateID).to.not.equal(undefined);
          expect(earningsRate.EarningsRateID).to.not.equal('');

          expect(earningsRate.Name).to.not.equal(undefined);
          expect(earningsRate.Name).to.not.equal('');

          expect(earningsRate.AccountCode).to.not.equal(undefined);
          expect(earningsRate.AccountCode).to.not.equal('');

          expect(earningsRate.IsExemptFromTax).to.be.a('Boolean');
          expect(earningsRate.IsExemptFromSuper).to.be.a('Boolean');

          const earningsTypes = [
            'FIXED',
            'ORDINARYTIMEEARNINGS',
            'OVERTIMEEARNINGS',
            'ALLOWANCE',
            'LUMPSUMD',
          ];
          expect(earningsRate.EarningsType).to.be.oneOf(earningsTypes);

          const rateTypes = ['FIXEDAMOUNT', 'MULTIPLE', 'RATEPERUNIT'];
          expect(earningsRate.RateType).to.be.oneOf(rateTypes);

          if (
            earningsRate.RateType === rateTypes[2] &&
            earningsRate.RatePerUnit
          ) {
            expect(earningsRate.RatePerUnit).to.be.a('String');
          }

          if (
            earningsRate.RateType === rateTypes[1] &&
            earningsRate.Multiplier
          ) {
            expect(earningsRate.Multiplier).to.be.a('Number');
          }

          if (
            earningsRate.RateType === rateTypes[1] &&
            earningsRate.AccrueLeave
          ) {
            expect(earningsRate.AccrueLeave).to.be.a('Boolean');
          }

          if (earningsRate.RateType === rateTypes[0] && earningsRate.Amount) {
            expect(earningsRate.Amount).to.be.a('Number');
          }
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('create new earnings rate', done => {
    const sampleEarningsRate = {
      Name: 'Super Duper Time',
      AccountCode: expenseAccountCode,
      EarningsType: 'ORDINARYTIMEEARNINGS',
      RateType: 'RATEPERUNIT',
      IsExemptFromTax: false,
      IsExemptFromSuper: false,
      TypeOfUnits: 'Hours',
    };

    const earningsRate = currentApp.payroll.payitems.newEarningsRate(
      sampleEarningsRate
    );

    earningsRate
      .save()
      .then(earningsRates => {
        expect(earningsRates.entities.length).to.be.at.least(1);

        earningsRates.entities.forEach(earningsRate => {
          expect(earningsRate.EarningsRateID).to.not.equal(undefined);
          expect(earningsRate.EarningsRateID).to.not.equal('');

          earningsRateID = earningsRate.EarningsRateID;

          expect(earningsRate.Name).to.not.equal(undefined);
          expect(earningsRate.Name).to.not.equal('');

          expect(earningsRate.AccountCode).to.not.equal(undefined);
          expect(earningsRate.AccountCode).to.not.equal('');

          expect(earningsRate.IsExemptFromTax).to.be.a('Boolean');
          expect(earningsRate.IsExemptFromSuper).to.be.a('Boolean');

          const earningsTypes = [
            'FIXED',
            'ORDINARYTIMEEARNINGS',
            'OVERTIMEEARNINGS',
            'ALLOWANCE',
            'LUMPSUMD',
          ];
          expect(earningsRate.EarningsType).to.be.oneOf(earningsTypes);

          const rateTypes = ['FIXEDAMOUNT', 'MULTIPLE', 'RATEPERUNIT'];
          expect(earningsRate.RateType).to.be.oneOf(rateTypes);

          if (
            earningsRate.RateType === rateTypes[2] &&
            earningsRate.RatePerUnit
          ) {
            expect(earningsRate.RatePerUnit).to.be.a('String');
          }

          if (
            earningsRate.RateType === rateTypes[1] &&
            earningsRate.Multiplier
          ) {
            expect(earningsRate.Multiplier).to.be.a('Number');
          }

          if (
            earningsRate.RateType === rateTypes[1] &&
            earningsRate.AccrueLeave
          ) {
            expect(earningsRate.AccrueLeave).to.be.a('Boolean');
          }

          if (earningsRate.RateType === rateTypes[0] && earningsRate.Amount) {
            expect(earningsRate.Amount).to.be.a('Number');
          }
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('get a single earnings rate', done => {
    currentApp.payroll.payitems
      .getEarningsRate(earningsRateID)
      .then(earningsRate => {
        expect(earningsRate.EarningsRateID).to.equal(earningsRateID);

        expect(earningsRate.Name).to.not.equal(undefined);
        expect(earningsRate.Name).to.not.equal('');

        expect(earningsRate.AccountCode).to.not.equal(undefined);
        expect(earningsRate.AccountCode).to.not.equal('');

        expect(earningsRate.IsExemptFromTax).to.be.a('Boolean');
        expect(earningsRate.IsExemptFromSuper).to.be.a('Boolean');

        const earningsTypes = [
          'FIXED',
          'ORDINARYTIMEEARNINGS',
          'OVERTIMEEARNINGS',
          'ALLOWANCE',
          'LUMPSUMD',
        ];
        expect(earningsRate.EarningsType).to.be.oneOf(earningsTypes);

        const rateTypes = ['FIXEDAMOUNT', 'MULTIPLE', 'RATEPERUNIT'];
        expect(earningsRate.RateType).to.be.oneOf(rateTypes);

        if (
          earningsRate.RateType === rateTypes[2] &&
          earningsRate.RatePerUnit
        ) {
          expect(earningsRate.RatePerUnit).to.be.a('String');
        }

        if (earningsRate.RateType === rateTypes[1] && earningsRate.Multiplier) {
          expect(earningsRate.Multiplier).to.be.a('Number');
        }

        if (
          earningsRate.RateType === rateTypes[1] &&
          earningsRate.AccrueLeave
        ) {
          expect(earningsRate.AccrueLeave).to.be.a('Boolean');
        }

        if (earningsRate.RateType === rateTypes[0] && earningsRate.Amount) {
          expect(earningsRate.Amount).to.be.a('Number');
        }

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('update an earnings rate', done => {
    currentApp.payroll.payitems
      .getEarningsRate(earningsRateID)
      .then(earningsRate => {
        // earningsRate.EarningsRateID should contain some value
        const updatedID = earningsRate.EarningsRateID;
        const updatedName = 'UPDATED!!!';

        earningsRate.Name = updatedName;

        // We use the new method for both new and updated objects
        const updatedEarningsRate = currentApp.payroll.payitems.newEarningsRate(
          earningsRate
        );

        updatedEarningsRate
          .save()
          .then(earningsRates => {
            expect(earningsRates.entities.length).to.be.at.least(1);

            earningsRates.entities.forEach(earningsRate => {
              if (earningsRate.EarningsRateID === updatedID) {
                expect(earningsRate.Name).to.equal(updatedName);
              }
            });

            done();
          })
          .catch(err => {
            done(wrapError(err));
          });
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('deletes an earnings rate', done => {
    currentApp.payroll.payitems
      .deleteEarningsRate(earningsRateID)
      .then(earningsRates => {
        expect(earningsRates.entities.length).to.be.at.least(1);

        earningsRates.entities.forEach(earningsRate => {
          expect(earningsRate.EarningsRateID).to.not.equal(earningsRateID);
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
});
