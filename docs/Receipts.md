The following examples explain the Receipts section of the SDK.  The API documentation on Receipts can be found [here](https://developer.xero.com/documentation/api/receipts).

### Supported functions

* Create New Receipts
* Retrieve Receipts (all, by ID, or with 'where' clause)
* Update Receipts

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the receipts functions exists in the following place:

`client.core.receipts`

This helper contains the following functions:

* `newReceipt(data[, options])`
* `saveReceipts(receipts[, options])`
* `getReceipts([options])`
* `getReceipt(id[, modifiedAfter])`

### Creating a new receipt

This code assumes you've already created a client using the xero-node sdk. 

```javascript

const sampleReceipt = {
  Status: 'ACTIVE',
  Date: new Date().toISOString().split('T')[0],
  User: {
    UserID: '...'
  },
  Contact: {
    ContactID: '...'
  },
  LineItems: [{
    Description: 'Services',
    Quantity: 1,
    UnitAmount: 230,
    AccountCode: '...'
  }],
};

var receiptObj = xeroClient.core.receipts.newReceipt(sampleReceipt);

receiptObj.save()
    .then(function(receipts) {
        //Receipt has been created 
        var myReceipt = receipts.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newReceipt()` function doesn't actually make any API call to Xero.  It only creates an object according to the receipt schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple receipts

This functionality allows developers to create multiple receipts in one call to the SDK, rather than iterating.

```javascript

var data = [{
  Status: 'ACTIVE',
  Date: new Date().toISOString().split('T')[0],
  User: {
    UserID: '...'
  },
  Contact: {
    ContactID: '...'
  },
  Reference: 'Services 1',
  LineItems: [{
    Description: 'Services',
    Quantity: 1,
    UnitAmount: 230,
    AccountCode: '...'
  }],
},{
  Status: 'ACTIVE',
  Date: new Date().toISOString().split('T')[0],
  User: {
    UserID: '...'
  },
  Contact: {
    ContactID: '...'
  },
  Reference: 'Services 1',
  LineItems: [{
    Description: 'Services',
    Quantity: 1,
    UnitAmount: 230,
    AccountCode: '...'
  }],
}];

var receipts = [];

receipts.push(xeroClient.core.receipts.newReceipt(data[0]));
receipts.push(xeroClient.core.receipts.newReceipt(data[1]));

xeroClient.core.receipts.saveReceipts(receipts)
    .then(function(response) {
        //Receipts have been created 
        console.log(response.entities[0].Reference); // 'Services 1'
        console.log(response.entities[1].Reference); // 'Services 2'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Receipts

This example shows how to retrieve all receipts in a single call.

```javascript

xeroClient.core.receipts.getReceipts()
   .then(function(receipts) {
      //We've got some receipts
      receipts.forEach(function(receipt){
         //do something useful
         console.log(receipt.Name);
      });
   })
```

* When using the getReceipts method, as no object is being saved there is no `entities` array.  Instead you are provided an array of receipt objects that you can use directly in your application.

### Retrieving Receipt by ID

This example shows how to retrieve an receipt using the Xero supplied GUID.

```javascript

var myReceiptID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.receipts.getReceipt(myReceiptID)
   .then(function(receipt) {
      //We've got the receipt so do something useful
      console.log(receipt.Name);
   });
```

### Retrieving Receipts with filters

This example shows how to retrieve an receipt using the 'where' filter.

```javascript

//filter receipts that are type Customer
var filter = 'Reference == "Services"';

xeroClient.core.receipts.getReceipts({where: filter})
   .then(function(receipts) {
      //We've got some receipts
      receipts.forEach(function(receipt){
         //do something useful
         console.log(receipt.Reference); //will be 'Services'
      });
   })
```

### Retrieving Receipts Modified Since X

This example shows how to retrieve a list of receipts that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.receipts.getReceipts({ modifiedAfter: modifiedDate })
   .then(function(receipts) {
      //We've got some receipts
      receipts.forEach(function(receipt){
         //do something useful
         console.log(receipt.Name);
      });
   })
```

### Updating Receipts

This example shows how to update an receipt that's been retrieved via the SDK.

```javascript

var someReceiptID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.receipts.getReceipt(someReceiptID)
   .then(function(receipt) {
      //We've got the receipt so now let's change the name
      receipt.Reference = 'My awesome new name';

      receipt.save()
         .then(function(response) {
            var thisReceipt = response.entities[0];
            console.log(thisReceipt.Reference); //'My awesome new name'
         })
   });
```
