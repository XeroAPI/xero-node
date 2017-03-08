describe.skip('payitems', function() {
    it('get payitems', function(done) {
        currentApp.payroll.payitems.getPayItems()
            .then(function(payitems) {
                console.log(payitems[0].EarningsTypes);
                done();
            })
            .fail(function(err) {
                done(wrapError(err));
            })
    })
})
describe.skip('timesheets', function() {
    it('create timesheet', function(done) {
        var timesheet = currentApp.payroll.timesheets.newTimesheet({
            EmployeeID: '065a115c-ba9c-4c03-b8e3-44c551ed8f21',
            StartDate: new Date(2014, 8, 23),
            EndDate: new Date(2014, 8, 29),
            Status: 'Draft',
            TimesheetLines: [{
                EarningsTypeID: 'a9ab82bf-c421-4840-b245-1df307c2127a',
                NumberOfUnits: [5, 0, 0, 0, 0, 0, 0]
            }]
        });
        timesheet.save()
            .then(function() {
                done();
            })
            .fail(function(err) {
                done(wrapError(err));
            })

    })
    it.skip('get timesheets', function(done) {
        currentApp.payroll.timesheets.getTimesheets()
            .then(function(timesheets) {
                if (!_.isEmpty(timesheets))
                    console.log(util.inspect(timesheets[0].toObject(), null, null));
                done();
            })
            .fail(function(err) {
                done(wrapError(err));
            })
    })
})

describe.skip('employees', function() {
    var employee;
    it('get (no paging)', function(done) {
        currentApp.payroll.employees.getEmployees()
            .then(function(ret) {
                console.log(ret[0].toObject());
                done();
            })
            .fail(function(err) {
                done(wrapError(err));
            })
    })
    it.skip('get by id', function(done) {
        currentApp.payroll.employees.getEmployee('065a115c-ba9c-4c03-b8e3-44c551ed8f21')
            .then(function(ret) {
                employee = ret;
                console.log(employee.toObject());
                done();
            })
            .fail(function(err) {
                done(wrapError(err));
            })
    })


})