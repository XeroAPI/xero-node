describe.skip('timesheets', () => {
  it('create timesheet', done => {
    const timesheet = currentApp.payroll.timesheets.newTimesheet({
      EmployeeID: '065a115c-ba9c-4c03-b8e3-44c551ed8f21',
      StartDate: new Date(2014, 8, 23),
      EndDate: new Date(2014, 8, 29),
      Status: 'Draft',
      TimesheetLines: [
        {
          EarningsRateID: 'a9ab82bf-c421-4840-b245-1df307c2127a',
          NumberOfUnits: [5, 0, 0, 0, 0, 0, 0],
        },
      ],
    });
    timesheet
      .save()
      .then(() => {
        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
  it.skip('get timesheets', done => {
    currentApp.payroll.timesheets
      .getTimesheets()
      .then(timesheets => {
        if (!_.isEmpty(timesheets))
          console.log(util.inspect(timesheets[0].toObject(), null, null));
        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
});

describe.skip('employees', () => {
  let employee;
  it('get (no paging)', done => {
    currentApp.payroll.employees
      .getEmployees()
      .then(ret => {
        console.log(ret[0].toObject());
        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
  it.skip('get by id', done => {
    currentApp.payroll.employees
      .getEmployee('065a115c-ba9c-4c03-b8e3-44c551ed8f21')
      .then(ret => {
        employee = ret;
        console.log(employee.toObject());
        done();
      })
      .catch(err => {
        done(wrapError(err));
      });
  });
});
