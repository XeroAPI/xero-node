The following examples explain the Employees section of the SDK.  The API documentation on Employees can be found [here](https://developer.xero.com/documentation/api/employees).

### Supported functions

* Create New Employees
* Retrieve Employees (all, by ID, or with 'where' clause)
* Update Employees

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the employees functions exists in the following place:

`client.core.employees`

This helper contains the following functions:

* `newEmployee(data[, options])`
* `saveEmployees(employees[, options])`
* `getEmployees([options])`
* `getEmployee(id[, modifiedAfter])`

### Creating a new employee

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var employee = xeroClient.core.employees.newEmployee({
    Status: 'ACTIVE',
    FirstName: 'John',
    LastName: 'Smith'
});

employee.save()
    .then(function(employees) {
        //Employee has been created 
        var myEmployee = employees.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newEmployee()` function doesn't actually make any API call to Xero.  It only creates an object according to the employee schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple employees

This functionality allows developers to create multiple employees in one call to the SDK, rather than iterating.

```javascript

var data = [{
    Status: 'ACTIVE',
    FirstName: 'John',
    LastName: 'Smith'
},{
    Status: 'ACTIVE',
    FirstName: 'Jim',
    LastName: 'Cups'
}];

var employees = [];

employees.push(xeroClient.core.employees.newEmployee(data[0]));
employees.push(xeroClient.core.employees.newEmployee(data[1]));

xeroClient.core.employees.saveEmployees(employees)
    .then(function(response) {
        //Employees have been created 
        console.log(response.entities[0].FirstName); // 'John'
        console.log(response.entities[1].FirstName); // 'Jim'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Employees

This example shows how to retrieve all employees in a single call.

```javascript

xeroClient.core.employees.getEmployees()
   .then(function(employees) {
      //We've got some employees
      employees.forEach(function(employee){
         //do something useful
         console.log(employee.Name);
      });
   })
```

* When using the getEmployees method, as no object is being saved there is no `entities` array.  Instead you are provided an array of employee objects that you can use directly in your application.

### Retrieving Employee by ID

This example shows how to retrieve an employee using the Xero supplied GUID.

```javascript

var myEmployeeID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.employees.getEmployee(myEmployeeID)
   .then(function(employee) {
      //We've got the employee so do something useful
      console.log(employee.Name);
   });
```

### Retrieving Employees with filters

This example shows how to retrieve an employee using the 'where' filter.

```javascript

//filter employees that are type Customer
var filter = 'FirstName == "Jim"';

xeroClient.core.employees.getEmployees({where: filter})
   .then(function(employees) {
      //We've got some employees
      employees.forEach(function(employee){
         //do something useful
         console.log(employee.FirstName); //will be 'Jim'
      });
   })
```

### Retrieving Employees Modified Since X

This example shows how to retrieve a list of employees that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.employees.getEmployees({ modifiedAfter: modifiedDate })
   .then(function(employees) {
      //We've got some employees
      employees.forEach(function(employee){
         //do something useful
         console.log(employee.Name);
      });
   })
```

### Updating Employees

This example shows how to update an employee that's been retrieved via the SDK.

```javascript

var someEmployeeID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.employees.getEmployee(someEmployeeID)
   .then(function(employee) {
      //We've got the employee so now let's change the name
      employee.Name = 'My awesome new name';

      employee.save()
         .then(function(response) {
            var thisEmployee = response.entities[0];
            console.log(thisEmployee.Name); //'My awesome new name'
         })
   });
```
