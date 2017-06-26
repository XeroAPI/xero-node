The following examples explain the Items section of the SDK.  The API documentation on Items can be found [here](https://developer.xero.com/documentation/api/items).

### Supported functions

* Create New Items
* Retrieve Items (all, paginated, by ID, with 'where' clause)
* Update Items
* Delete Items

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the items functions exists in the following place:

`client.core.items`

This helper contains the following functions:

* `newItem(data[, options])`
* `getItems([options])`
* `getItem(id[, modifiedAfter])`
* `deleteItem(id)`
* `saveItems(items,[options])`

### Creating a new item

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var sampleItem = {
  Code: 'Item-12345',
  Name: 'Fully Tracked Item',
  Description: '2014 Merino Sweater',
  PurchaseDescription: '2014 Merino Sweater',
  PurchaseDetails: {
      UnitPrice: 149.00,
      AccountCode: '200'
  },
  SalesDetails: {
      UnitPrice: 299.00,
      AccountCode: '200'
  }
};

var itemObj = xeroClient.core.items.newItem(sampleItem);

itemObj.save()
    .then(function(items) {
        //Item has been created 
        var myItem = items.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newItem()` function doesn't actually make any API call to Xero.  It only creates an object according to the item schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Creating multiple Items in one go

You can use the helper function `saveItems` to save an array of items in one go.

The following code provides guidance on how to set this up:

```javascript

var sampleItem1 = {
  //some item...
};

var sampleItem2 = {
  //some item...
};

var items = [];

items.push(xeroClient.core.items.newItem(sampleItem1));
items.push(xeroClient.core.items.newItem(sampleItem2));

xeroClient.core.items.saveItems(items)
    .then(function(items) {
        //Items have been created 
        var item1 = items.entities[0];
        var item2 = items.entities[1];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

### Retrieving All Items

This example shows how to retrieve all items in a single call.

```javascript

xeroClient.core.items.getItems()
   .then(function(items) {
      //We've got some items
      items.forEach(function(item){
         //do something useful
         console.log(item.Name);
      });
   })
```

* When using the getItems method, as no object is being saved there is no `entities` array.  Instead you are provided an array of item objects that you can use directly in your application.

### Retrieving Item by ID

This example shows how to retrieve an item using the Xero supplied GUID.

```javascript

var myItemID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.items.getItem(myItemID)
   .then(function(item) {
      //We've got the item so do something useful
      console.log(item.Name);
   });
```

### Retrieving Items with filters

This example shows how to retrieve an item using the 'where' filter.

```javascript

//filter items that are tracked
var filter = 'IsTrackedAsInventory == true';

xeroClient.core.items.getItems({where: filter})
   .then(function(items) {
      //We've got some items
      items.forEach(function(item){
         //do something useful
         console.log(item.IsTrackedAsInventory); //will be true
      });
   })
```

### Retrieving Items Modified Since X

This example shows how to retrieve a list of items that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.items.getItems({ modifiedAfter: modifiedDate })
   .then(function(items) {
      //We've got some items
      items.forEach(function(item){
         //do something useful
         console.log(item.IsTrackedAsInventory);
      });
   })
```

### Updating Items

This example shows how to update an item that's been retrieved via the SDK.

```javascript

var someItemID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.items.getItem(someItemID)
   .then(function(item) {
      //We've got the item so now let's change the name
      item.Name = 'My awesome new name';

      item.save()
         .then(function(response) {
            var thisItem = response.entities[0];
            console.log(thisItem.Name); //'My awesome new name'
         })
   });
```

### Deleting Items

This example shows how to delete an item that's been retrieved via the SDK.

```javascript

var someItemID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.items.deleteItem(someItemID)
   .then(function(res) {
      console.log(res); //Item has been deleted
   });
```