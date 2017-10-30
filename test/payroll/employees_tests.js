const common = require('../common/common'),
  mocha = common.mocha,
  expect = common.expect,
  xero = common.xero,
  wrapError = common.wrapError,
  uuid = common.uuid,
  util = common.util;

const currentApp = common.currentApp;

describe('employees', () => {
  it('get (no paging)', done => {
    currentApp.payroll.employees
      .getEmployees()
      .then(employees => {
        employees.forEach(employee => {
          expect(employee.EmployeeID).to.not.equal('');
          expect(employee.EmployeeID).to.not.equal(undefined);

          expect(employee.FirstName).to.not.equal('');
          expect(employee.FirstName).to.not.equal(undefined);

          expect(employee.LastName).to.not.equal('');
          expect(employee.LastName).to.not.equal(undefined);

          console.log(`${employee.FirstName} ${employee.LastName}`);

          expect(employee.Status).to.not.equal('');
          expect(employee.Status).to.not.equal(undefined);

          expect(employee.Email).to.not.equal('');
          expect(employee.Email).to.not.equal(undefined);

          expect(employee.DateOfBirth).to.not.equal('');
          expect(employee.DateOfBirth).to.not.equal(undefined);

          console.log(employee);

          if (employee.HomeAddress) {
            // console.log(employee.HomeAddress)
            expect(employee.HomeAddress.AddressLine1).to.not.equal('');
            expect(employee.HomeAddress.AddressLine1).to.not.equal(undefined);
          }
        });
        done();
      })
      .catch(err => {
        console.log(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });
});
