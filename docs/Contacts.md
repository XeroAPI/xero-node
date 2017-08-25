The following examples explain the Contacts section of the SDK.  The API documentation on Contacts can be found [here](https://developer.xero.com/documentation/api/contacts).

### Supported functions

* Create New Contacts
* Retrieve Contacts (all, paginated, by ID, by List of IDs, or with 'where' clause)
* Update Contacts

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the contacts functions exists in the following place:

`client.core.contacts`

This helper contains the following functions:

* `newContact(data[, options])`
* `saveContacts(contacts[, options])`
* `getContacts([options])`
* `getContact(id[, modifiedAfter])`

### Creating a new contact

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var sampleContact = {
    Name: 'Johnnies Coffee',
    FirstName: 'John',
    LastName: 'Smith'
};

var contactObj = xeroClient.core.contacts.newContact(sampleContact);

contactObj.save()
    .then(function(contacts) {
        //Contact has been created 
        var myContact = contacts.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newContact()` function doesn't actually make any API call to Xero.  It only creates an object according to the contact schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple contacts

This functionality allows developers to create multiple contacts in one call to the SDK, rather than iterating.

```javascript

var data = [{
    Name: 'Johnnies Coffee',
    FirstName: 'John',
    LastName: 'Smith'
},{
    Name: 'Jimmies Cups',
    FirstName: 'Jim',
    LastName: 'Cups'
}];

var contacts = [];

contacts.push(xeroClient.core.contacts.newContact(data[0]));
contacts.push(xeroClient.core.contacts.newContact(data[1]));

xeroClient.core.contacts.saveContacts(contacts)
    .then(function(response) {
        //Contacts have been created 
        console.log(response.entities[0].FirstName); // 'John'
        console.log(response.entities[1].FirstName); // 'Jim'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Contacts

This example shows how to retrieve all contacts in a single call.

```javascript

xeroClient.core.contacts.getContacts()
   .then(function(contacts) {
      //We've got some contacts
      contacts.forEach(function(contact){
         //do something useful
         console.log(contact.Name);
      });
   })
```

* When using the getContacts method, as no object is being saved there is no `entities` array.  Instead you are provided an array of contact objects that you can use directly in your application.

### Retrieving Contact by ID

This example shows how to retrieve an contact using the Xero supplied GUID.

```javascript

var myContactID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.contacts.getContact(myContactID)
   .then(function(contact) {
      //We've got the contact so do something useful
      console.log(contact.Name);
   });
```

### Retrieving Contacts by list of IDs

This example shows how to retrieve a list of contacts using their Xero supplied GUIDs.

```javascript

let myContactIDs = ['id1', 'id2', ...ids];

xeroClient.core.contacts.getContacts({
        params: {
            IDs: myContactIDs.toString()
        }
    })
   .then(function(contacts) {
      //We've got our contacts so do something useful
      contacts.forEach(function(contact){
         //do something useful
         console.log(contact.Name);
      });
   });
```

### Retrieving Contacts with filters

This example shows how to retrieve an contact using the 'where' filter.

```javascript

//filter contacts that are type Customer
var filter = 'IsCustomer == true';

xeroClient.core.contacts.getContacts({where: filter})
   .then(function(contacts) {
      //We've got some contacts
      contacts.forEach(function(contact){
         //do something useful
         console.log(contact.IsCustomer); //will be true
      });
   })
```

### Retrieving Contacts Modified Since X

This example shows how to retrieve a list of contacts that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.contacts.getContacts({ modifiedAfter: modifiedDate })
   .then(function(contacts) {
      //We've got some contacts
      contacts.forEach(function(contact){
         //do something useful
         console.log(contact.Name);
      });
   })
```

### Updating Contacts

This example shows how to update an contact that's been retrieved via the SDK.

```javascript

var someContactID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.contacts.getContact(someContactID)
   .then(function(contact) {
      //We've got the contact so now let's change the name
      contact.Name = 'My awesome new name';

      contact.save()
         .then(function(response) {
            var thisContact = response.entities[0];
            console.log(thisContact.Name); //'My awesome new name'
         })
   });
```