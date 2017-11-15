const common = require('../common/common'),
  mocha = common.mocha,
  expect = common.expect,
  xero = common.xero,
  wrapError = common.wrapError,
  uuid = common.uuid;

const currentApp = common.currentApp;

describe('deduction types', () => {
  let expenseAccountID = '',
    expenseAccountCode = '',
    deductionTypeID = '';

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

  it('get deduction types', done => {
    currentApp.payroll.payitems
      .getDeductionTypes()
      .then(deductionTypes => {
        expect(deductionTypes.length).to.be.at.least(1);

        deductionTypes.forEach(deductionType => {
          expect(deductionType.DeductionTypeID).to.not.equal(undefined);
          expect(deductionType.DeductionTypeID).to.not.equal('');

          expect(deductionType.Name).to.not.equal(undefined);
          expect(deductionType.Name).to.not.equal('');

          expect(deductionType.DeductionCategory).to.not.equal(undefined);
          expect(deductionType.DeductionCategory).to.not.equal('');

          expect(deductionType.AccountCode).to.not.equal(undefined);
          expect(deductionType.AccountCode).to.not.equal('');

          expect(deductionType.ReducesTax).to.be.a('Boolean');
          expect(deductionType.ReducesSuper).to.be.a('Boolean');
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('creates a new deduction type', done => {
    const sampleDeductionType = {
      Name: 'Super Duper Deduction',
      AccountCode: expenseAccountCode,
      ReducesTax: false,
      ReducesSuper: false,
    };

    const deductionType = currentApp.payroll.payitems.newDeductionType(
      sampleDeductionType
    );

    deductionType
      .save()
      .then(deductionTypes => {
        expect(deductionTypes.entities.length).to.be.at.least(1);

        deductionTypes.entities.forEach(deductionType => {
          expect(deductionType.DeductionTypeID).to.not.equal(undefined);
          expect(deductionType.DeductionTypeID).to.not.equal('');

          expect(deductionType.DeductionCategory).to.not.equal(undefined);
          expect(deductionType.DeductionCategory).to.not.equal('');

          deductionTypeID = deductionType.DeductionTypeID;

          expect(deductionType.Name).to.not.equal(undefined);
          expect(deductionType.Name).to.not.equal('');

          expect(deductionType.AccountCode).to.not.equal(undefined);
          expect(deductionType.AccountCode).to.not.equal('');

          expect(deductionType.ReducesTax).to.be.a('Boolean');
          expect(deductionType.ReducesSuper).to.be.a('Boolean');
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('gets a single deduction type', done => {
    currentApp.payroll.payitems
      .getDeductionType(deductionTypeID)
      .then(deductionType => {
        expect(deductionType.DeductionTypeID).to.not.equal(undefined);
        expect(deductionType.DeductionTypeID).to.not.equal('');

        expect(deductionType.Name).to.not.equal(undefined);
        expect(deductionType.Name).to.not.equal('');

        expect(deductionType.DeductionCategory).to.not.equal(undefined);
        expect(deductionType.DeductionCategory).to.not.equal('');

        expect(deductionType.AccountCode).to.not.equal(undefined);
        expect(deductionType.AccountCode).to.not.equal('');

        expect(deductionType.ReducesTax).to.be.a('Boolean');
        expect(deductionType.ReducesSuper).to.be.a('Boolean');

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('updates a deduction type', done => {
    currentApp.payroll.payitems
      .getDeductionType(deductionTypeID)
      .then(deductionType => {
        // earningsRate.EarningsRateID should contain some value
        const updatedID = deductionType.DeductionTypeID;
        const updatedName = 'UPDATED!!!';

        deductionType.Name = updatedName;

        // We use the new method for both new and updated objects
        const updatedDeductionType = currentApp.payroll.payitems.newDeductionType(
          deductionType
        );

        updatedDeductionType
          .save()
          .then(deductionTypes => {
            expect(deductionTypes.entities.length).to.be.at.least(1);

            deductionTypes.entities.forEach(deductionType => {
              if (deductionType.DeductionTypeID === updatedID) {
                expect(deductionType.Name).to.equal(updatedName);
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

  it('deletes a deduction type', done => {
    currentApp.payroll.payitems
      .deleteDeductionType(deductionTypeID)
      .then(deductionTypes => {
        expect(deductionTypes.entities.length).to.be.at.least(1);

        deductionTypes.entities.forEach(deductionType => {
          expect(deductionType.DeductionTypeID).to.not.equal(deductionTypeID);
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
});
