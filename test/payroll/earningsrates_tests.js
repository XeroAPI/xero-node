const common = require("../common/common"),
    mocha = common.mocha,
    expect = common.expect,
    xero = common.xero,
    wrapError = common.wrapError,
    uuid = common.uuid

let currentApp = common.currentApp

describe('earningsrates', function() {

    let expenseAccountID = '',
        expenseAccountCode = '',
        earningsRateID = ''

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

    it('get earnings rates', function(done) {
        currentApp.payroll.payitems.getEarningsRates()
            .then(function(earningsRates) {
                expect(earningsRates.length).to.be.at.least(1)

                earningsRates.forEach((earningsRate) => {
                    expect(earningsRate.EarningsRateID).to.not.equal(undefined)
                    expect(earningsRate.EarningsRateID).to.not.equal('')

                    expect(earningsRate.Name).to.not.equal(undefined)
                    expect(earningsRate.Name).to.not.equal('')

                    expect(earningsRate.AccountCode).to.not.equal(undefined)
                    expect(earningsRate.AccountCode).to.not.equal('')

                    expect(earningsRate.IsExemptFromTax).to.be.a('Boolean')
                    expect(earningsRate.IsExemptFromSuper).to.be.a('Boolean')

                    const earningsTypes = ['FIXED', 'ORDINARYTIMEEARNINGS', 'OVERTIMEEARNINGS', 'ALLOWANCE', 'LUMPSUMD']
                    expect(earningsRate.EarningsType).to.be.oneOf(earningsTypes)

                    const rateTypes = ['FIXEDAMOUNT', 'MULTIPLE', 'RATEPERUNIT']
                    expect(earningsRate.RateType).to.be.oneOf(rateTypes)

                    if (earningsRate.RateType === rateTypes[2] && earningsRate.RatePerUnit) {
                        expect(earningsRate.RatePerUnit).to.be.a('String')
                    }

                    if (earningsRate.RateType === rateTypes[1] && earningsRate.Multiplier) {
                        expect(earningsRate.Multiplier).to.be.a('Number')
                    }

                    if (earningsRate.RateType === rateTypes[1] && earningsRate.AccrueLeave) {
                        expect(earningsRate.AccrueLeave).to.be.a('Boolean')
                    }

                    if (earningsRate.RateType === rateTypes[0] && earningsRate.Amount) {
                        expect(earningsRate.Amount).to.be.a('Number')
                    }
                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('create new earnings rate', function(done) {
        let sampleEarningsRate = {
            Name: 'Super Duper Time',
            AccountCode: expenseAccountCode,
            EarningsType: 'ORDINARYTIMEEARNINGS',
            RateType: 'RATEPERUNIT',
            IsExemptFromTax: false,
            IsExemptFromSuper: false,
            TypeOfUnits: 'Hours'
        }

        let earningsRate = currentApp.payroll.payitems.newEarningsRate(sampleEarningsRate);

        earningsRate.save()
            .then(function(earningsRates) {
                expect(earningsRates.entities.length).to.be.at.least(1)

                earningsRates.entities.forEach((earningsRate) => {
                    expect(earningsRate.EarningsRateID).to.not.equal(undefined)
                    expect(earningsRate.EarningsRateID).to.not.equal('')

                    earningsRateID = earningsRate.EarningsRateID

                    expect(earningsRate.Name).to.not.equal(undefined)
                    expect(earningsRate.Name).to.not.equal('')

                    expect(earningsRate.AccountCode).to.not.equal(undefined)
                    expect(earningsRate.AccountCode).to.not.equal('')

                    expect(earningsRate.IsExemptFromTax).to.be.a('Boolean')
                    expect(earningsRate.IsExemptFromSuper).to.be.a('Boolean')

                    const earningsTypes = ['FIXED', 'ORDINARYTIMEEARNINGS', 'OVERTIMEEARNINGS', 'ALLOWANCE', 'LUMPSUMD']
                    expect(earningsRate.EarningsType).to.be.oneOf(earningsTypes)

                    const rateTypes = ['FIXEDAMOUNT', 'MULTIPLE', 'RATEPERUNIT']
                    expect(earningsRate.RateType).to.be.oneOf(rateTypes)

                    if (earningsRate.RateType === rateTypes[2] && earningsRate.RatePerUnit) {
                        expect(earningsRate.RatePerUnit).to.be.a('String')
                    }

                    if (earningsRate.RateType === rateTypes[1] && earningsRate.Multiplier) {
                        expect(earningsRate.Multiplier).to.be.a('Number')
                    }

                    if (earningsRate.RateType === rateTypes[1] && earningsRate.AccrueLeave) {
                        expect(earningsRate.AccrueLeave).to.be.a('Boolean')
                    }

                    if (earningsRate.RateType === rateTypes[0] && earningsRate.Amount) {
                        expect(earningsRate.Amount).to.be.a('Number')
                    }
                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('get a single earnings rate', function(done) {
        currentApp.payroll.payitems.getEarningsRate(earningsRateID)
            .then(function(earningsRate) {

                expect(earningsRate.EarningsRateID).to.equal(earningsRateID)

                expect(earningsRate.Name).to.not.equal(undefined)
                expect(earningsRate.Name).to.not.equal('')

                expect(earningsRate.AccountCode).to.not.equal(undefined)
                expect(earningsRate.AccountCode).to.not.equal('')

                expect(earningsRate.IsExemptFromTax).to.be.a('Boolean')
                expect(earningsRate.IsExemptFromSuper).to.be.a('Boolean')

                const earningsTypes = ['FIXED', 'ORDINARYTIMEEARNINGS', 'OVERTIMEEARNINGS', 'ALLOWANCE', 'LUMPSUMD']
                expect(earningsRate.EarningsType).to.be.oneOf(earningsTypes)

                const rateTypes = ['FIXEDAMOUNT', 'MULTIPLE', 'RATEPERUNIT']
                expect(earningsRate.RateType).to.be.oneOf(rateTypes)

                if (earningsRate.RateType === rateTypes[2] && earningsRate.RatePerUnit) {
                    expect(earningsRate.RatePerUnit).to.be.a('String')
                }

                if (earningsRate.RateType === rateTypes[1] && earningsRate.Multiplier) {
                    expect(earningsRate.Multiplier).to.be.a('Number')
                }

                if (earningsRate.RateType === rateTypes[1] && earningsRate.AccrueLeave) {
                    expect(earningsRate.AccrueLeave).to.be.a('Boolean')
                }

                if (earningsRate.RateType === rateTypes[0] && earningsRate.Amount) {
                    expect(earningsRate.Amount).to.be.a('Number')
                }

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('update an earnings rate', function(done) {
        currentApp.payroll.payitems.getEarningsRate(earningsRateID)
            .then(function(earningsRate) {

                //earningsRate.EarningsRateID should contain some value
                var updatedID = earningsRate.EarningsRateID
                var updatedName = "UPDATED!!!"

                earningsRate.Name = updatedName

                //We use the new method for both new and updated objects
                let updatedEarningsRate = currentApp.payroll.payitems.newEarningsRate(earningsRate);

                updatedEarningsRate.save()
                    .then(function(earningsRates) {
                        expect(earningsRates.entities.length).to.be.at.least(1)

                        earningsRates.entities.forEach(function(earningsRate) {
                            if (earningsRate.EarningsRateID === updatedID) {
                                expect(earningsRate.Name).to.equal(updatedName)
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

    it('deletes an earnings rate', function(done) {
        currentApp.payroll.payitems.deleteEarningsRate(earningsRateID)
            .then(function(earningsRates) {
                expect(earningsRates.entities.length).to.be.at.least(1)

                earningsRates.entities.forEach(function(earningsRate) {
                    expect(earningsRate.EarningsRateID).to.not.equal(earningsRateID)
                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })



})