The following examples explain the Accounts section of the SDK.  The API documentation on Accounts can be found [here](https://developer.xero.com/documentation/api/accounts).

### Supported functions

* Create New Accounts
* Retrieve Accounts (all, paginated, by ID, with 'where' clause)
* Update Accounts
* Delete Accounts

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the accounts functions exists in the following place:

`client.core.accounts`

This helper contains the following functions:

* `newAccount(data[, options])`
* `getAccounts([options])`
* `getAccount(id[, modifiedAfter])`
* `deleteAccount(id)`
* `saveAccounts(accounts[, options])`

### Creating a new account

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var data = {
    Code: '999',
    Name: 'My Bank Account',
    Type: 'BANK',
    BankAccountNumber: '062-021-0000000',
};

var accountObj = xeroClient.core.accounts.newAccount(data);

accountObj.save()
    .then(function(accounts) {
        //Account has been created 
        var myAccount = accounts.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newAccount()` function doesn't actually make any API call to Xero.  It only creates an object according to the account schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple accounts

This functionality allows developers to create multiple accounts in one call to the SDK, rather than iterating.

```javascript

var data = [{
    Code: '111',
    Name: 'My Bank Account',
    Type: 'BANK',
    BankAccountNumber: '111-222-0000000',
},{
    Code: '222',
    Name: 'My 2nd Bank Account',
    Type: 'BANK',
    BankAccountNumber: '222-333-0000000',
}];

var accounts = [];

accounts.push(xeroClient.core.accounts.newAccount(data[0]));
accounts.push(xeroClient.core.accounts.newAccount(data[1]));

xeroClient.core.accounts.saveAccounts(accounts)
    .then(function(response) {
        //Accounts have been created 
        console.log(response.entities[0].Code); // '111'
        console.log(response.entities[1].Code); // '222'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Accounts

This example shows how to retrieve all accounts in a single call.

```javascript

xeroClient.core.accounts.getAccounts()
   .then(function(accounts) {
      //We've got some accounts
      accounts.forEach(function(account){
         //do something useful
         console.log(account.Name);
      });
   })
```

* When using the getAccounts method, as no object is being saved there is no `entities` array.  Instead you are provided an array of account objects that you can use directly in your application.

### Retrieving Account by ID

This example shows how to retrieve an account using the Xero supplied GUID.

```javascript

var myAcctID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.accounts.getAccount(myAcctID)
   .then(function(account) {
      //We've got the account so do something useful
      console.log(account.Name);
   });
```

### Retrieving Accounts with filters

This example shows how to retrieve an account using the 'where' filter.

```javascript

//filter accounts that are type Bank
var filter = 'Type == "BANK"';

xeroClient.core.accounts.getAccounts({where: filter})
   .then(function(accounts) {
      //We've got some accounts
      accounts.forEach(function(account){
         //do something useful
         console.log(account.Type); //will be 'BANK'
      });
   })
```

### Retrieving Accounts Modified Since X

This example shows how to retrieve a list of accounts that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.accounts.getAccounts({ modifiedAfter: modifiedDate })
   .then(function(accounts) {
      //We've got some accounts
      accounts.forEach(function(account){
         //do something useful
         console.log(account.Name);
      });
   })
```

### Updating Accounts

This example shows how to update an account that's been retrieved via the SDK.

```javascript

var someAcctID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.accounts.getAccount(someAcctID)
   .then(function(account) {
      //We've got the account so now let's change the name
      account.Name = 'My awesome new name';

      account.save()
         .then(function(response) {
            var thisAccount = response.entities[0];
            console.log(thisAccount.Name); //'My awesome new name'
         })
   });
```

### Deleting Accounts

This example shows how to delete an account.

```javascript

var someAcctID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.accounts.deleteAccount(someAcctID)
   .then(function(response) {
      //We've got a response, so let's check the status
      console.log(response.Status); //Should be 'OK'
   });
```