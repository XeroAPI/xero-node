'use strict';

const common = require('../common/common');
const functions = require('../common/functions');

const expect = common.expect;
const wrapError = functions.wrapError;
const util = common.util;

const currentApp = common.currentApp;

const validateEmployee = employee => {
  if (!employee) return false;

  expect(employee.EmployeeID).to.be.a('String');

  return true;
};

describe('employees', () => {
  const sampleEmployee = {
    Status: 'ACTIVE',
    FirstName: 'John',
    LastName: `${Math.random()}`,
    ExternalLink: {
      Url: 'https://twitter.com/johnsampsontest',
    },
  };

  it('creates an employee', done => {
    const employee = common.currentApp.core.employees.newEmployee(
      sampleEmployee
    );

    employee
      .save()
      .then(response => {
        expect(validateEmployee(response.entities[0])).to.equal(true);
        sampleEmployee.EmployeeID = response.entities[0].EmployeeID;
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get one', done => {
    common.currentApp.core.employees
      .getEmployee(sampleEmployee.EmployeeID)
      .then(employee => {
        expect(validateEmployee(employee)).to.equal(true);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('get all', done => {
    currentApp.core.employees
      .getEmployees()
      .then(employees => {
        employees.forEach(employee => {
          expect(validateEmployee(employee)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(util.inspect(err, null, null));
        done(wrapError(err));
      });
  });

  it('create multiple employees', done => {
    const employees = [];

    for (let i = 0; i < 2; i += 1) {
      employees.push(
        common.currentApp.core.employees.newEmployee({
          FirstName: `New Employee`,
          LastName: `${Math.random()}`,
          Status: 'ACTIVE',
        })
      );
    }

    common.currentApp.core.employees
      .saveEmployees(employees)
      .then(response => {
        expect(response.entities).to.have.length.greaterThan(0);
        response.entities.forEach(employee => {
          expect(validateEmployee(employee)).to.equal(true);
        });
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });

  it('Updates an employee', done => {
    const updatedName = `Updated ${Math.random()}`;
    common.currentApp.core.employees
      .getEmployee(sampleEmployee.EmployeeID)
      .then(employee => {
        expect(validateEmployee(employee)).to.equal(true);
        employee.FirstName = updatedName;
        return employee.save();
      })
      .then(response => {
        expect(validateEmployee(response.entities[0])).to.equal(true);
        expect(response.entities[0].FirstName).to.equal(updatedName);
        done();
      })
      .catch(err => {
        console.error(err);
        done(wrapError(err));
      });
  });
});
