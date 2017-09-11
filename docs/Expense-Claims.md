The following examples explain the Expense Claims section of the SDK.  The API documentation on ExpenseClaims can be found [here](https://developer.xero.com/documentation/api/expense-claims).

### Supported functions

* Create New Expense Claims
* Retrieve Expense Claims (all, by ID, or with 'where' clause)
* Update Expense Claims

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the expense claims functions exists in the following place:

`client.core.expenseClaims`

This helper contains the following functions:

* `newExpenseClaim(data[, options])`
* `saveExpenseClaims(expenseClaims[, options])`
* `getExpenseClaims([options])`
* `getExpenseClaim(id[, modifiedAfter])`

### Creating a new expenseClaim

This code assumes you've already created a client using the xero-node sdk. 

```javascript

const sampleExpenseClaim = {
  Status: 'SUBMITTED',
  User: {
    UserID: '...'
  },
  Receipts: [{
    ReceiptID: '...'
  }],
};

var expenseClaimObj = xeroClient.core.expenseClaims.newExpenseClaim(sampleExpenseClaim);

expenseClaimObj.save()
    .then(function(expenseClaims) {
        //ExpenseClaim has been created 
        var myExpenseClaim = expenseClaims.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newExpenseClaim()` function doesn't actually make any API call to Xero.  It only creates an object according to the expenseClaim schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple expenseClaims

This functionality allows developers to create multiple expenseClaims in one call to the SDK, rather than iterating.

```javascript

var data = [{
  Status: 'SUBMITTED',
  User: {
    UserID: '...'
  },
  Receipts: [{
    ReceiptID: '...'
  }],
},{
  Status: 'SUBMITTED',
  User: {
    UserID: '...'
  },
  Receipts: [{
    ReceiptID: '...'
  }],
}];

var expenseClaims = [];

expenseClaims.push(xeroClient.core.expenseClaims.newExpenseClaim(data[0]));
expenseClaims.push(xeroClient.core.expenseClaims.newExpenseClaim(data[1]));

xeroClient.core.expenseClaims.saveExpenseClaims(expenseClaims)
    .then(function(response) {
        //ExpenseClaims have been created 
        console.log(response.entities[0].Status); // 'Claim 1'
        console.log(response.entities[1].Status); // 'Claim 2'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All ExpenseClaims

This example shows how to retrieve all expenseClaims in a single call.

```javascript

xeroClient.core.expenseClaims.getExpenseClaims()
   .then(function(expenseClaims) {
      //We've got some expenseClaims
      expenseClaims.forEach(function(expenseClaim){
         //do something useful
         console.log(expenseClaim.Status);
      });
   })
```

* When using the getExpenseClaims method, as no object is being saved there is no `entities` array.  Instead you are provided an array of expenseClaim objects that you can use directly in your application.

### Retrieving ExpenseClaim by ID

This example shows how to retrieve an expenseClaim using the Xero supplied GUID.

```javascript

var myExpenseClaimID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.expenseClaims.getExpenseClaim(myExpenseClaimID)
   .then(function(expenseClaim) {
      //We've got the expenseClaim so do something useful
      console.log(expenseClaim.Status);
   });
```

### Retrieving ExpenseClaims with filters

This example shows how to retrieve an expenseClaim using the 'where' filter.

```javascript

//filter expenseClaims that are type Customer
var filter = 'Status == "VOIDED"';

xeroClient.core.expenseClaims.getExpenseClaims({where: filter})
   .then(function(expenseClaims) {
      //We've got some expenseClaims
      expenseClaims.forEach(function(expenseClaim){
         //do something useful
         console.log(expenseClaim.Status); //will be 'VOIDED'
      });
   })
```

### Retrieving Expense Claims Modified Since X

This example shows how to retrieve a list of expenseClaims that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.expenseClaims.getExpenseClaims({ modifiedAfter: modifiedDate })
   .then(function(expenseClaims) {
      //We've got some expenseClaims
      expenseClaims.forEach(function(expenseClaim){
         //do something useful
         console.log(expenseClaim.Status);
      });
   })
```

### Updating ExpenseClaims

This example shows how to update an expenseClaim that's been retrieved via the SDK.

```javascript

var someExpenseClaimID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.expenseClaims.getExpenseClaim(someExpenseClaimID)
   .then(function(expenseClaim) {
      //We've got the expenseClaim so now let's change the name
      expenseClaim.Status = 'AUTHORISED';

      expenseClaim.save()
         .then(function(response) {
            var thisExpenseClaim = response.entities[0];
            console.log(thisExpenseClaim.Status); //'AUTHORISED'
         })
   });
```