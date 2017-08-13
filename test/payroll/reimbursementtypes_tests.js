const common = require("../common/common"),
    mocha = common.mocha,
    expect = common.expect,
    xero = common.xero,
    wrapError = common.wrapError,
    uuid = common.uuid

let currentApp = common.currentApp

describe('reimbursement types', function() {

    let expenseAccountID = '',
        expenseAccountCode = '',
        reimbursementTypeID = ''

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

    it('get reimbursement types', function(done) {
        currentApp.payroll.payitems.getReimbursementTypes()
            .then(function(reimbursementTypes) {
                expect(reimbursementTypes.length).to.be.at.least(1)

                reimbursementTypes.forEach((reimbursementType) => {
                    expect(reimbursementType.ReimbursementTypeID).to.not.equal(undefined)
                    expect(reimbursementType.ReimbursementTypeID).to.not.equal('')

                    expect(reimbursementType.Name).to.not.equal(undefined)
                    expect(reimbursementType.Name).to.not.equal('')

                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('creates a new reimbursement type', function(done) {
        let sampleReimbursementType = {
            Name: 'Super Duper Reimbursement',
            AccountCode: expenseAccountCode
        }

        let reimbursementType = currentApp.payroll.payitems.newReimbursementType(sampleReimbursementType);

        reimbursementType.save()
            .then(function(reimbursementTypes) {
                expect(reimbursementTypes.entities.length).to.be.at.least(1)

                reimbursementTypes.entities.forEach((reimbursementType) => {
                    expect(reimbursementType.ReimbursementTypeID).to.not.equal(undefined)
                    expect(reimbursementType.ReimbursementTypeID).to.not.equal('')

                    expect(reimbursementType.Name).to.not.equal(undefined)
                    expect(reimbursementType.Name).to.not.equal('')

                    expect(reimbursementType.AccountCode).to.not.equal(undefined)
                    expect(reimbursementType.AccountCode).to.not.equal('')

                    reimbursementTypeID = reimbursementType.ReimbursementTypeID

                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('gets a single reimbursement type', function(done) {
        currentApp.payroll.payitems.getReimbursementType(reimbursementTypeID)
            .then(function(reimbursementType) {

                expect(reimbursementType.ReimbursementTypeID).to.not.equal(undefined)
                expect(reimbursementType.ReimbursementTypeID).to.not.equal('')

                expect(reimbursementType.Name).to.not.equal(undefined)
                expect(reimbursementType.Name).to.not.equal('')

                expect(reimbursementType.AccountCode).to.not.equal(undefined)
                expect(reimbursementType.AccountCode).to.not.equal('')

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('updates a reimbursement type', function(done) {
        currentApp.payroll.payitems.getReimbursementType(reimbursementTypeID)
            .then(function(reimbursementType) {

                //earningsRate.EarningsRateID should contain some value
                var updatedID = reimbursementType.ReimbursementTypeID
                var updatedName = "UPDATED!!!"

                reimbursementType.Name = updatedName

                //We use the new method for both new and updated objects
                let updatedReimbursementType = currentApp.payroll.payitems.newReimbursementType(reimbursementType);

                updatedReimbursementType.save()
                    .then(function(reimbursementTypes) {
                        expect(reimbursementTypes.entities.length).to.be.at.least(1)

                        reimbursementTypes.entities.forEach(function(reimbursementType) {
                            if (reimbursementType.ReimbursementTypeID === updatedID) {
                                expect(reimbursementType.Name).to.equal(updatedName)
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

    it('deletes a reimbursement type', function(done) {
        currentApp.payroll.payitems.deleteReimbursementType(reimbursementTypeID)
            .then(function(reimbursementTypes) {
                expect(reimbursementTypes.entities.length).to.be.at.least(1)

                reimbursementTypes.entities.forEach(function(reimbursementType) {
                    expect(reimbursementType.ReimbursementTypeID).to.not.equal(reimbursementTypeID)
                })
                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })
})