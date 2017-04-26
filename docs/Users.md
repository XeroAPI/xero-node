The following examples explain the Users section of the SDK.  The API documentation on Users can be found [here](https://developer.xero.com/documentation/api/users).

### Supported functions

* Retrieve Users

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the user functions exists in the following place:

`client.core.users`

This helper contains the following functions:

* `getUser(id [, modifiedAfter])`
* `getUsers([options])`

### Retrieving Users

This example shows how to retrieve a list of Users.

```javascript

xeroClient.core.users.getUsers()
   .then(function(users) {
      //We've got the Users
      users.forEach(function(user){
         //do something useful
         console.log(user.EmailAddress);
      });
   })
```

### Retrieving a specific user by ID

This example shows how to retrieve a specific user by ID

```javascript
var someUserID = '3ea6f254-aa48-42d4-84aa-06aed66ca1a7';

xeroClient.core.users.getUser(someUserID)
   .then(function(user) {
      //do something useful
      console.log(user.EmailAddress);
   })
```

### Retrieving Users with filters

This example shows how to retrieve a User using the 'where' filter.

```javascript

//filter users that have FirstName: John
var filter = 'FirstName == "John"';

xeroClient.core.users.getUsers({where: filter})
   .then(function(users) {
      //We've got some users
      users.forEach(function(user){
         //do something useful
         console.log(user.FirstName); //'John'
      });
   })
```

### Retrieving Users Modified Since X

This example shows how to retrieve a list of users that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.users.getUsers({ modifiedAfter: modifiedDate })
   .then(function(users) {
      //We've got some users
      users.forEach(function(user){
         //do something useful
         console.log(user.FirstName); //'John'
      });
   })
```