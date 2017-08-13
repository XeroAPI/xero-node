const common = require("../common/common"),
    mocha = common.mocha,
    expect = common.expect,
    xero = common.xero,
    wrapError = common.wrapError,
    uuid = common.uuid

let currentApp = common.currentApp

describe('leave types', function() {

    let leaveTypeID = ''

    it('get leave types', function(done) {
        currentApp.payroll.payitems.getLeaveTypes()
            .then(function(leaveTypes) {
                expect(leaveTypes.length).to.be.at.least(1)

                leaveTypes.forEach((leaveType) => {
                    expect(leaveType.LeaveTypeID).to.not.equal(undefined)
                    expect(leaveType.LeaveTypeID).to.not.equal('')

                    expect(leaveType.Name).to.not.equal(undefined)
                    expect(leaveType.Name).to.not.equal('')

                    expect(leaveType.TypeOfUnits).to.not.equal(undefined)
                    expect(leaveType.TypeOfUnits).to.not.equal('')

                    expect(leaveType.IsPaidLeave).to.be.a('Boolean')

                    expect(leaveType.ShowOnPayslip).to.be.a('Boolean')
                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('creates a new leave type', function(done) {
        let sampleLeaveType = {
            Name: 'Super Duper Leave',
            TypeOfUnits: 'Hours',
            IsPaidLeave: true,
            ShowOnPayslip: true
        }

        let leaveType = currentApp.payroll.payitems.newLeaveType(sampleLeaveType);

        leaveType.save()
            .then(function(leaveTypes) {
                expect(leaveTypes.entities.length).to.be.at.least(1)

                leaveTypes.entities.forEach((leaveType) => {
                    expect(leaveType.LeaveTypeID).to.not.equal(undefined)
                    expect(leaveType.LeaveTypeID).to.not.equal('')

                    expect(leaveType.Name).to.not.equal(undefined)
                    expect(leaveType.Name).to.not.equal('')

                    expect(leaveType.TypeOfUnits).to.not.equal(undefined)
                    expect(leaveType.TypeOfUnits).to.not.equal('')

                    expect(leaveType.IsPaidLeave).to.be.a('Boolean')

                    expect(leaveType.ShowOnPayslip).to.be.a('Boolean')

                    leaveTypeID = leaveType.LeaveTypeID

                })

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('gets a single leave type', function(done) {
        currentApp.payroll.payitems.getLeaveType(leaveTypeID)
            .then(function(leaveType) {

                expect(leaveType.LeaveTypeID).to.not.equal(undefined)
                expect(leaveType.LeaveTypeID).to.not.equal('')

                expect(leaveType.Name).to.not.equal(undefined)
                expect(leaveType.Name).to.not.equal('')

                expect(leaveType.TypeOfUnits).to.not.equal(undefined)
                expect(leaveType.TypeOfUnits).to.not.equal('')

                expect(leaveType.IsPaidLeave).to.be.a('Boolean')

                expect(leaveType.ShowOnPayslip).to.be.a('Boolean')

                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })

    it('updates a leave type', function(done) {
        currentApp.payroll.payitems.getLeaveType(leaveTypeID)
            .then(function(leaveType) {

                //earningsRate.EarningsRateID should contain some value
                var updatedID = leaveType.LeaveTypeID
                var updatedName = "UPDATED!!!"

                leaveType.Name = updatedName

                //We use the new method for both new and updated objects
                let updatedLeaveType = currentApp.payroll.payitems.newLeaveType(leaveType);

                updatedLeaveType.save()
                    .then(function(leaveTypes) {
                        expect(leaveTypes.entities.length).to.be.at.least(1)

                        leaveTypes.entities.forEach(function(leaveType) {
                            if (leaveType.LeaveTypeID === updatedID) {
                                expect(leaveType.Name).to.equal(updatedName)
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

    it('deletes a leave type', function(done) {
        currentApp.payroll.payitems.deleteLeaveType(leaveTypeID)
            .then(function(leaveTypes) {
                expect(leaveTypes.entities.length).to.be.at.least(1)

                leaveTypes.entities.forEach(function(leaveType) {
                    expect(leaveType.LeaveTypeID).to.not.equal(leaveTypeID)
                })
                done();
            })
            .catch(function(err) {
                done(wrapError(err));
            })
    })
})