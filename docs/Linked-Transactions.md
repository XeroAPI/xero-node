The following examples explain the Linked Transactions section of the SDK.  The API documentation on Linked Transactions can be found [here](https://developer.xero.com/documentation/api/linked-transactions).

### Supported functions

* Create New Linked Transactions
* Retrieve Linked Transactions (all, paginated, by ID, by SourceTransactionID, by ContactID, by Status, by TargetTransactionID)
* Update Linked Transactions
* Delete Linked Transactions

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the linked transactions functions exists in the following place:

`client.core.linkedTransactions`

This helper contains the following functions:

* `newLinkedTransaction(data[, options])`
* `getLinkedTransactions([options])`
* `getLinkedTransaction(id[, modifiedAfter])`
* `deleteLinkedTransaction(id)`

### Creating a new linkedTransaction

This code assumes you've already created a client using the xero-node sdk. 

```javascript

const sampleTransaction = {
  SourceTransactionID: expenseInvoiceID,
  SourceLineItemID: expenseLineItemID,
  ContactID: expenseContactID,
};

var linkedTransactionObj = xeroClient.core.linkedTransactions.newLinkedTransaction(sampleTransaction);

linkedTransactionObj.save()
    .then(function(linkedTransactions) {
        //LinkedTransaction has been created 
        var myLinkedTransaction = linkedTransactions.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newLinkedTransaction()` function doesn't actually make any API call to Xero.  It only creates an object according to the linkedTransaction schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Retrieving All Linked Transactions

This example shows how to retrieve all linked transactions in a single call.

```javascript

xeroClient.core.linkedTransactions.getLinkedTransactions()
   .then(function(linkedTransactions) {
      //We've got some linkedTransactions
      linkedTransactions.forEach(function(linkedTransaction){
         //do something useful
         console.log(linkedTransaction.Name);
      });
   })
```

* When using the getLinkedTransactions method, as no object is being saved there is no `entities` array.  Instead you are provided an array of linkedTransaction objects that you can use directly in your application.

### Retrieving Linked Transactions by ID

This example shows how to retrieve a linked transaction using the Xero supplied GUID.

```javascript

var myLinkedTransactionID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.linkedTransactions.getLinkedTransaction(myLinkedTransactionID)
   .then(function(linkedTransaction) {
      //We've got the linkedTransaction so do something useful
      console.log(linkedTransaction.Name);
   });
```

### Retrieving Linked Transactions with filters

This example shows how to retrieve an linkedTransaction using the filters.

```javascript

var myContactID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.linkedTransactions.getLinkedTransactions({
    params: {
      Status: 'BILLED',
      ContactID: myContactID
    }
  })
  .then(function(linkedTransactions) {
      //We've got some linkedTransactions
      linkedTransactions.forEach(function(linkedTransaction){
         //do something useful
         console.log(linkedTransaction.Status); // Billed
      });
   })
```

### Retrieving Linked Transactions Modified Since X

This example shows how to retrieve a list of linkedTransactions that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.linkedTransactions.getLinkedTransactions({ modifiedAfter: modifiedDate })
   .then(function(linkedTransactions) {
      //We've got some linkedTransactions
      linkedTransactions.forEach(function(linkedTransaction){
         //do something useful
         console.log(linkedTransaction.IsTrackedAsInventory);
      });
   })
```

### Updating Linked Transactions

This example shows how to update an linkedTransaction that's been retrieved via the SDK.

```javascript

var someLinkedTransactionID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.linkedTransactions.getLinkedTransaction(someLinkedTransactionID)
   .then(function(linkedTransaction) {
      //We've got the linkedTransaction so now let's change the name
      linkedTransaction.TargetTransactionID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

      linkedTransaction.save()
         .then(function(response) {
            var thisLinkedTransaction = response.entities[0];
            console.log(thisLinkedTransaction.Name); //'75520d2e-e19d-4f36-b19b-e3b9000b2daa'
         })
   });
```

### Deleting Linked Transactions

This example shows how to delete an linkedTransaction that's been retrieved via the SDK.

```javascript

var someLinkedTransactionID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.linkedTransactions.deleteLinkedTransaction(someLinkedTransactionID)
   .then(function(res) {
      console.log(res); //LinkedTransaction has been deleted
   });
```