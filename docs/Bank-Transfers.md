The following examples explain the Bank Transfers section of the SDK.  The API documentation on Bank Transfers can be found [here](https://developer.xero.com/documentation/api/bank-transfers).

### Supported functions

* Create New Bank Transfers (beta)
* Retrieve Bank Transfers (all, paginated, by ID, with 'where' clause)

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the bank transfers functions exists in the following place:

`client.core.bankTransfers`

This helper contains the following functions:

* `newBankTransfer(data[, options])`
* `newBankTransfers(data)`
* `getBankTransfer(id[, modifiedAfter])`
* `getBankTransfers([options])`

### Creating a new Bank Transfer

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var transfer = currentApp.core.bankTransfers.newBankTransfer({
    FromBankAccount: {
        Code: '010',
    },
    ToBankAccount: {
        Code: '020',
    },
    Amount: '20.00'
});

transfer.save()
    .then(function(transfers) {
        //Bank Transfer has been created 
        var myTransfer = transfers.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newBankTransfer()` function doesn't actually make any API call to Xero.  It only creates an object according to the account schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple Bank Transfers

This functionality allows developers to create multiple bank transfers in one call to the SDK, rather than iterating.

```javascript

var data = [{
    FromBankAccount: {
        Code: '020',
    },
    ToBankAccount: {
        Code: '010',
    },
    Amount: '20.00'
},{
    FromBankAccount: {
        Code: '010',
    },
    ToBankAccount: {
        Code: '020',
    },
    Amount: '20.00'
}];

var bankTransfers = [];

bankTransfers.push(xeroClient.core.bankTransfers.newBankTransfer(data[0]));
bankTransfers.push(xeroClient.core.bankTransfers.newBankTransfer(data[1]));

xeroClient.core.bankTransfers.newBankTransfers(bankTransfers)
    .then(function(response) {
        //Bank Transfers have been created 
        console.log(response.entities[0].FromBankAccount.Code); // '020'
        console.log(response.entities[1].FromBankAccount.Code); // '010'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Bank Transfers

This example shows how to retrieve all Bank Transfers in a single call.

```javascript

xeroClient.core.bankTransfers.getBankTransfers()
   .then(function(bankTransfers) {
      //We've got some Bank Transfers
      bankTransfers.forEach(function(transfer){
         //do something useful
         console.log(transfer.FromBankAccount.Code); //Some bank code
      });
   })
```

### Retrieving Bank Transfer by ID

This example shows how to retrieve a Bank Transfer using the Xero supplied GUID.

```javascript

var bankTransferID = '55d2ea8f-286c-4a41-88da-88d602e3991f';

xeroClient.core.bankTransfers.getBankTransfer(bankTransferID)
   .then(function(bankTransfer) {
      //We've got the Bank Transfer so do something useful
      console.log(transfer.FromBankAccount.Code); //Some bank code
   });
```

### Retrieving Bank Transfers with filters

This example shows how to retrieve a Bank Transfer using the 'where' filter.

```javascript

//filter bank transfers that don't have any attachments
var filter = 'HasAttachments == false';

xeroClient.core.bankTransfers.getBankTransfers({where: filter})
   .then(function(bankTransfers) {
      //We've got some bank transfers
      bankTransfers.forEach(function(transfer){
         //do something useful
         console.log(transfer.FromBankAccount.Code); //Some bank code
      });
   })
```

### Retrieving Bank Transfers Modified Since X

This example shows how to retrieve a list of bank transfers that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.bankTransfers.getBankTransfers({ modifiedAfter: modifiedDate })
   .then(function(bankTransfers) {
      //We've got some bank transfers
      bankTransfers.forEach(function(transfer){
         //do something useful
         console.log(transfer.FromBankAccount.Code); //Some bank code
      });
   })
```