The following examples explain the Bank Transactions section of the SDK.  The API documentation on Bank Transactions can be found [here](https://developer.xero.com/documentation/api/banktransactions).

### Supported functions

* Create New Bank Transactions
* Retrieve Bank Transactions (all, paginated, by ID, with 'where' clause)

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the bank transactions functions exists in the following place:

`client.core.bankTransactions`

This helper contains the following functions:

* `newBankTransaction(data[, options])`
* `saveBankTransactions(data)`
* `getBankTransaction(id[, modifiedAfter])`
* `getBankTransactions([options])`

### Creating a new Bank Transaction

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var transaction = currentApp.core.bankTransactions.newBankTransaction({
   Type: "SPEND",
   Contact: {
      Name: "Johnny McGibbons"
   },
   LineItems: [{
      Description: 'Annual Bank Account Fee',
      UnitAmount: 250,
      AccountCode: '200'
   }],
   BankAccount: {
      AccountID: '573ea556-6ff2-4dcf-a524-b40fe578aa7a'
   }
});

transaction.save()
    .then(function(transactions) {
        //Bank Transaction has been created 
        var myTransaction = transactions.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newBankTransaction()` function doesn't actually make any API call to Xero.  It only creates an object according to the account schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple Bank Transactions

This functionality allows developers to create multiple bank transactions in one call to the SDK, rather than iterating.

```javascript

var data = [{
   Type: "SPEND",
   Contact: {
      Name: "Johnny McGibbons"
   },
   LineItems: [{
      Description: 'Annual Bank Account Fee',
      UnitAmount: 250,
      AccountCode: '200'
   }],
   BankAccount: {
      AccountID: '573ea556-6ff2-4dcf-a524-b40fe578aa7a'
   }
},{
   Type: "SPEND",
   Contact: {
      Name: "Freddy McGibbons"
   },
   LineItems: [{
      Description: 'Golf Clubs',
      UnitAmount: 250,
      AccountCode: '200'
   }],
   BankAccount: {
      AccountID: '573ea556-6ff2-4dcf-a524-b40fe578aa7a'
   }
}];

var bankTransactions = [];

bankTransactions.push(xeroClient.core.bankTransactions.newBankTransaction(data[0]));
bankTransactions.push(xeroClient.core.bankTransactions.newBankTransaction(data[1]));

xeroClient.core.bankTransactions.saveBankTransactions(bankTransactions)
    .then(function(response) {
        //Bank Transactions have been created 
        console.log(response.entities[0].Contact.Name); // 'Johnny McGibbons'
        console.log(response.entities[1].Contact.Name); // 'Freddy McGibbons'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Bank Transactions

This example shows how to retrieve all Bank Transactions in a single call.

```javascript

xeroClient.core.bankTransactions.getBankTransactions()
   .then(function(bankTransactions) {
      //We've got some Bank Transactions
      bankTransactions.forEach(function(transaction){
         //do something useful
         console.log(transaction.Type); //SPEND
      });
   })
```

### Retrieving Bank Transaction by ID

This example shows how to retrieve a Bank Transaction using the Xero supplied GUID.

```javascript

var bankTransactionID = '256f2a70-36dc-43ce-b195-f183824f59c9';

xeroClient.core.bankTransactions.getBankTransaction(bankTransactionID)
   .then(function(bankTransaction) {
      //We've got the Bank Transaction so do something useful
      console.log(bankTransaction.Type); //SPEND
   });
```

### Retrieving Bank Transactions with filters

This example shows how to retrieve a Bank Transaction using the 'where' filter.

```javascript

//filter bank transactions that are type SPEND
var filter = 'Type == "SPEND"';

xeroClient.core.bankTransactions.getBankTransactions({where: filter})
   .then(function(bankTransactions) {
      //We've got some bank transactions
      bankTransactions.forEach(function(transaction){
         //do something useful
         console.log(transaction.Type); //will be 'SPEND'
      });
   })
```

### Retrieving Bank Transactions Modified Since X

This example shows how to retrieve a list of bank transactions that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.bankTransactions.getBankTransactions({ modifiedAfter: modifiedDate })
   .then(function(bankTransactions) {
      //We've got some bank transactions
      bankTransactions.forEach(function(transaction){
         //do something useful
         console.log(transaction.Type); //will be 'SPEND'
      });
   })
```
