const common = require('../common/common'),
  mocha = common.mocha,
  expect = common.expect,
  xero = common.xero,
  wrapError = common.wrapError,
  uuid = common.uuid;

const currentApp = common.currentApp;

describe('leave types', () => {
  let leaveTypeID = '';

  it('get leave types', done => {
    currentApp.payroll.payitems
      .getLeaveTypes()
      .then(leaveTypes => {
        expect(leaveTypes.length).to.be.at.least(1);

        leaveTypes.forEach(leaveType => {
          expect(leaveType.LeaveTypeID).to.not.equal(undefined);
          expect(leaveType.LeaveTypeID).to.not.equal('');

          expect(leaveType.Name).to.not.equal(undefined);
          expect(leaveType.Name).to.not.equal('');

          expect(leaveType.TypeOfUnits).to.not.equal(undefined);
          expect(leaveType.TypeOfUnits).to.not.equal('');

          expect(leaveType.IsPaidLeave).to.be.a('Boolean');

          expect(leaveType.ShowOnPayslip).to.be.a('Boolean');
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('creates a new leave type', done => {
    const sampleLeaveType = {
      Name: 'Super Duper Leave',
      TypeOfUnits: 'Hours',
      IsPaidLeave: true,
      ShowOnPayslip: true,
    };

    const leaveType = currentApp.payroll.payitems.newLeaveType(sampleLeaveType);

    leaveType
      .save()
      .then(leaveTypes => {
        expect(leaveTypes.entities.length).to.be.at.least(1);

        leaveTypes.entities.forEach(leaveType => {
          expect(leaveType.LeaveTypeID).to.not.equal(undefined);
          expect(leaveType.LeaveTypeID).to.not.equal('');

          expect(leaveType.Name).to.not.equal(undefined);
          expect(leaveType.Name).to.not.equal('');

          expect(leaveType.TypeOfUnits).to.not.equal(undefined);
          expect(leaveType.TypeOfUnits).to.not.equal('');

          expect(leaveType.IsPaidLeave).to.be.a('Boolean');

          expect(leaveType.ShowOnPayslip).to.be.a('Boolean');

          leaveTypeID = leaveType.LeaveTypeID;
        });

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('gets a single leave type', done => {
    currentApp.payroll.payitems
      .getLeaveType(leaveTypeID)
      .then(leaveType => {
        expect(leaveType.LeaveTypeID).to.not.equal(undefined);
        expect(leaveType.LeaveTypeID).to.not.equal('');

        expect(leaveType.Name).to.not.equal(undefined);
        expect(leaveType.Name).to.not.equal('');

        expect(leaveType.TypeOfUnits).to.not.equal(undefined);
        expect(leaveType.TypeOfUnits).to.not.equal('');

        expect(leaveType.IsPaidLeave).to.be.a('Boolean');

        expect(leaveType.ShowOnPayslip).to.be.a('Boolean');

        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });

  it('updates a leave type', done => {
    currentApp.payroll.payitems
      .getLeaveType(leaveTypeID)
      .then(leaveType => {
        // earningsRate.EarningsRateID should contain some value
        const updatedID = leaveType.LeaveTypeID;
        const updatedName = 'UPDATED!!!';

        leaveType.Name = updatedName;

        // We use the new method for both new and updated objects
        const updatedLeaveType = currentApp.payroll.payitems.newLeaveType(
          leaveType
        );

        updatedLeaveType
          .save()
          .then(leaveTypes => {
            expect(leaveTypes.entities.length).to.be.at.least(1);

            leaveTypes.entities.forEach(leaveType => {
              if (leaveType.LeaveTypeID === updatedID) {
                expect(leaveType.Name).to.equal(updatedName);
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

  it('deletes a leave type', done => {
    currentApp.payroll.payitems
      .deleteLeaveType(leaveTypeID)
      .then(leaveTypes => {
        expect(leaveTypes.entities.length).to.be.at.least(1);

        leaveTypes.entities.forEach(leaveType => {
          expect(leaveType.LeaveTypeID).to.not.equal(leaveTypeID);
        });
        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
});
