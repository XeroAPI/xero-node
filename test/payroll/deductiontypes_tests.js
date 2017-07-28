const common = require("../common/common"),
    mocha = common.mocha,
    expect = common.expect,
    xero = common.xero,
    wrapError = common.wrapError,
    uuid = common.uuid

let currentApp = common.currentApp

describe('deduction types', function() {

    let expenseAccountID = '',
        expenseAccountCode = '',
        deductionTypeID = ''

    before('create an expense account for testing', function() {
        const randomString = uuid.v4()

        var testAccountData = {
            Code: randomString.replace(/-/g, '').substring(0, 10),
            Name: 'Test expense from Node SDK ' + randomString,
            Type: 'EXPENSE',
            Status: 'ACTIVE'
        }

        var account = currentApp.core.accounts.newAccount(testAccountData)

        return account.save()
            .then(function(response) {
                expenseAccountID = response.entities[0].AccountID
                expenseAccountCode = response.entities[0].Code
            })
    })

    after('archive the account for testing', function() {
        currentApp.core.accounts.getAccount(expenseAccountID)
            .then(function(account) {
                account.Status = 'ARCHIVED'
                return account.save()
            })
    })

    it('get deduction types', function(done) {
        currentApp.payroll.payitems.getDeductionTypes()
            .then(function(deductionTypes) {
                expect(deductionTypes.length).to.be.at.least(1)

                deductionTypes.forEach((deductionType) => {
                    expect(deductionType.DeductionTypeID).to.not.equal(undefined)
                    expect(deductionType.DeductionTypeID).to.not.equal('')

                    expect(deductionType.Name).to.not.equal(undefined)
                    expect(deductionType.Name).to.not.equal('')

                    expect(deductionType.DeductionCategory).to.not.equal(undefined)
                    expect(deductionType.DeductionCategory).to.not.equal('')

                    expect(deductionType.AccountCode).to.not.equal(undefined)
                    expect(deductionType.AccountCode).to.not.equal('')

                    expect(deductionType.ReducesTax).to.be.a('Boolean')
                    expect(deductionType.ReducesSuper).to.be.a('Boolean')

                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('creates a new deduction type', function(done) {
        let sampleDeductionType = {
            Name: 'Super Duper Deduction',
            AccountCode: expenseAccountCode,
            ReducesTax: false,
            ReducesSuper: false
        }

        let deductionType = currentApp.payroll.payitems.newDeductionType(sampleDeductionType);

        deductionType.save()
            .then(function(deductionTypes) {
                expect(deductionTypes.entities.length).to.be.at.least(1)

                deductionTypes.entities.forEach((deductionType) => {
                    expect(deductionType.DeductionTypeID).to.not.equal(undefined)
                    expect(deductionType.DeductionTypeID).to.not.equal('')

                    expect(deductionType.DeductionCategory).to.not.equal(undefined)
                    expect(deductionType.DeductionCategory).to.not.equal('')

                    deductionTypeID = deductionType.DeductionTypeID

                    expect(deductionType.Name).to.not.equal(undefined)
                    expect(deductionType.Name).to.not.equal('')

                    expect(deductionType.AccountCode).to.not.equal(undefined)
                    expect(deductionType.AccountCode).to.not.equal('')

                    expect(deductionType.ReducesTax).to.be.a('Boolean')
                    expect(deductionType.ReducesSuper).to.be.a('Boolean')
                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('gets a single deduction type', function(done) {
        currentApp.payroll.payitems.getDeductionType(deductionTypeID)
            .then(function(deductionType) {

                expect(deductionType.DeductionTypeID).to.not.equal(undefined)
                expect(deductionType.DeductionTypeID).to.not.equal('')

                expect(deductionType.Name).to.not.equal(undefined)
                expect(deductionType.Name).to.not.equal('')

                expect(deductionType.DeductionCategory).to.not.equal(undefined)
                expect(deductionType.DeductionCategory).to.not.equal('')

                expect(deductionType.AccountCode).to.not.equal(undefined)
                expect(deductionType.AccountCode).to.not.equal('')

                expect(deductionType.ReducesTax).to.be.a('Boolean')
                expect(deductionType.ReducesSuper).to.be.a('Boolean')

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('updates a deduction type', function(done) {
        currentApp.payroll.payitems.getDeductionType(deductionTypeID)
            .then(function(deductionType) {

                //earningsRate.EarningsRateID should contain some value
                var updatedID = deductionType.DeductionTypeID
                var updatedName = "UPDATED!!!"

                deductionType.Name = updatedName

                //We use the new method for both new and updated objects
                let updatedDeductionType = currentApp.payroll.payitems.newDeductionType(deductionType);

                updatedDeductionType.save()
                    .then(function(deductionTypes) {
                        expect(deductionTypes.entities.length).to.be.at.least(1)

                        deductionTypes.entities.forEach(function(deductionType) {
                            if (deductionType.DeductionTypeID === updatedID) {
                                expect(deductionType.Name).to.equal(updatedName)
                            }
                        })

                        done();
                    })
                    .catch(function(err) {
                        done(wrapError(err));
                    })

            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('deletes a deduction type', function(done) {
        currentApp.payroll.payitems.deleteDeductionType(deductionTypeID)
            .then(function(deductionTypes) {
                expect(deductionTypes.entities.length).to.be.at.least(1)

                deductionTypes.entities.forEach(function(deductionType) {
                    expect(deductionType.DeductionTypeID).to.not.equal(deductionTypeID)
                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })
})