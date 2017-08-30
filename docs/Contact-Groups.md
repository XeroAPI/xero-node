The following examples explain the Contacts Groups section of the SDK.  The API documentation on Contact Groups can be found [here](https://developer.xero.com/documentation/api/contactgroups).

### Supported functions

* Create New Contact Groups
* Retrieve Contact Groups (all, by ID, or with 'where' clause)
* Update Contact Group Name
* Delete Contact Group
* Add Contacts to Contact Group
* Remove Contacts from Contact Group (single/all)

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the contact groups functions exists in the following place:

`client.core.contactGroups`

This helper contains the following functions:

* `newContactGroup(data[, options])`
* `getContactGroups([options])`
* `getContactGroup(id[, modifiedAfter])`

The ContactGroup itself has the following functions:

* `save([options])`
* `saveContacts(contacts)`
* `deleteContact(contactID)`
* `deleteAllContacts()`

### Creating a new contact group

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var sampleContactGroup = {
    Name: 'New Contacts',
    Status: 'ACTIVE'
};

var contactGroupObj = xeroClient.core.contactGroups.newContactGroup(sampleContactGroup);

contactGroupObj.save()
    .then(function(contactGroups) {
        //Contact Group has been created 
        var myGroup = contactGroups.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newContactGroup()` function doesn't actually make any API call to Xero.  It only creates an object according to the contact schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple contact groups

This functionality allows developers to create multiple contact groups in one call to the SDK, rather than iterating.

```javascript

var data = [{
    Name: 'Johnnies Coffee',
    Status: 'ACTIVE'
},{
    Name: 'Jimmies Cups',
    Status: 'ACTIVE'
}];

var contactGroups = [];

contactGroups.push(xeroClient.core.contactGroups.newContactGroup(data[0]));
contactGroups.push(xeroClient.core.contactGroups.newContactGroup(data[1]));

xeroClient.core.contactGroups.saveContactGroups(contactGroups)
    .then(function(response) {
        //Contact Groups have been created 
        console.log(response.entities[0].Name); // 'Johnnies'
        console.log(response.entities[1].Name); // 'Jimmies'
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Contact Groups

This example shows how to retrieve all contact groups in a single call.

```javascript

xeroClient.core.contactGroups.getContactGroups()
   .then(function(contactGroups) {
      //We've got some groups
      contactGroups.forEach(function(contactGroup){
         //do something useful
         console.log(contactGroup.Name);
      });
   })
```

* When using the getContactGroups method, as no object is being saved there is no `entities` array.  Instead you are provided an array of contactGroup objects that you can use directly in your application.

### Retrieving ContactGroups by ID

This example shows how to retrieve a contact group using the Xero supplied GUID.

```javascript

var myContactGroupID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.contactGroups.getContactGroup(myContactGroupID)
   .then(function(contactGroup) {
      //We've got the contact group so do something useful
      console.log(contactGroup.Name);
   });
```

### Retrieving Contact Groups with filters

This example shows how to retrieve a Contact Group using the 'where' filter.

```javascript

//filter contact groups that are type Customer
const filter = 'Name.Contains("Jim")';

xeroClient.core.contactGroups.getContactGroups({where: filter})
   .then(function(contactGroups) {
      //We've got some groups
      contactGroups.forEach(function(group){
         //do something useful
         console.log(group.Name); //will contain 'Jim'
      });
   })
```

### Updating Contact Groups

This example shows how to update a contact group that's been retrieved via the SDK.

```javascript

var someContactGroupID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.contactGroups.getContactGroup(someContactGroupID)
   .then(function(group) {
      //We've got the group so now let's change the name
      group.Name = 'My awesome new name';

      return group.save();
   })
   .then(function(response) {
      const thisGroup = response.entities[0];
      console.log(thisGroup.Name); //'My awesome new name'
    })
```

### Add a Contact to a Contact Group

This example shows how to add an existing contact to a contact group that has been created.

_Note:_ It's not possible to create a contact group with contacts at the same time.  This must be done with two calls to the SDK.

```javascript

const contacts = [{
  ContactID: '75520d2e-e19d-4f36-b19b-e3b9000b2daa'
}];
const someContactGroupID = '9d9vcd9-a0df-2bfe-39fd-0c0d0es9f0';

xeroClient.core.contactGroups.getContactGroup(someContactGroupID)
   .then(function(group) {
      // We've got the group so now let's save the new contacts
      return group.saveContacts(contacts);
   })
   .then(function(response) {
      // This response contains a list of contacts that were just added 
      const groupContacts = response.entities[0];
      console.log(groupContacts[0].ContactID); // '75520d2e-e19d-4f36-b19b-e3b9000b2daa'
    })
```

### Delete a Contact from a Contact Group

This example shows how to remove a contact from a contact group.

```javascript

const contactIDToRemove = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';
const someContactGroupID = '9d9vcd9-a0df-2bfe-39fd-0c0d0es9f0';

xeroClient.core.contactGroups.getContactGroup(someContactGroupID)
  .then(function(group) {
    // We've got the group so now let's delete a contact
    return group.deleteContact(contactIDToRemove);
  })
  .then(function(response) {
    // if all was successful response will be an empty object
    console.log(response) // will be {}
  })
```

### Delete all Contacts from a Contact Group

This example shows how to remove all contacts from a specified contact group.

```javascript

const someContactGroupID = '9d9vcd9-a0df-2bfe-39fd-0c0d0es9f0';

xeroClient.core.contactGroups.getContactGroup(someContactGroupID)
  .then(function(group) {
    // We've got the group so now let's delete a contact
    return group.deleteAllContacts();
  })
  .then(function(response) {
    // if all was successful response will be an empty object
    console.log(response) // will be {}
  })
```

### Delete a Contact Group

This example shows how to remove a Contact Group completely

```javascript

const someContactGroupID = '9d9vcd9-a0df-2bfe-39fd-0c0d0es9f0';

xeroClient.core.contactGroups.getContactGroup(someContactGroupID)
   .then(function(group) {
      //We've got the group so now let's change the Status
      group.Status = 'DELETED';

      return group.save();
   })
   .then(function(response) {
      const thisGroup = response.entities[0];
      console.log(thisGroup.Status); // 'DELETED'
    })
```
