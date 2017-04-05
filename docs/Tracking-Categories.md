The following examples explain the Tracking Categories section of the SDK.  The API documentation on Tracking Categories can be found [here](https://developer.xero.com/documentation/api/tracking-categories).

### Supported functions

* Create New Tracking Categories & Options
* Retrieve Tracking Categories (all, paginated, by ID, with 'where' clause)
* Update Tracking Categories & Options
* Delete Tracking Categories & Options

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the tracking category functions exists in the following place:

`client.core.trackingCategories`

This helper contains the following functions:

* `newTrackingCategory(data[, options])`
* `getTrackingCategories([options])`
* `getTrackingCategory(id[, modifiedAfter])`
* `deleteTrackingCategory(id)`

### Creating a new tracking category

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var data = {
    Name: "My Shiny New Category"
};

var trackingCategoryObj = xeroClient.core.trackingCategories.newTrackingCategory(data);

trackingCategoryObj.save()
    .then(function(trackingCategories) {
        //Tracking Category has been created 
        var myTrackingCategory = trackingCategories.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newTrackingCategory()` function doesn't actually make any API call to Xero.  It only creates an object according to the trackingCategory schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Adding Options to a Tracking Category

This functionality shows how to add a list of options to a created tracking category (note, this must be done in two steps)

```javascript

var trackingOptions = [{
    Name: "up"
}, {
    Name: "down"
}];

//this object was created above
myTrackingCategory.saveTrackingOptions(TrackingOptions)
    .then(function(response) {
        response.entities.forEach(function(trackingOption) {
            //options added!
            console.log(trackingOption.Name) //'up' then 'down' respectively.
        });
    })
```

### Updating an existing options within a Tracking Category

This functionality shows how to modfiy a tracking category option in place.

```javascript
//we want to change 'up' to 'left'
var trackingOption = {
    Name: "left"
};

//the variable `myTrackingCategory` was created above
xeroClient.core.trackingCategories.getTrackingCategory(myTrackingCategory.TrackingCategoryID)
    .then(function(trackingCategory) {

        var optionIDtoUpdate = trackingCategory.Options[0].TrackingOptionID; //this should be the option 'up'

        trackingCategory.saveTrackingOptions(trackingOption, optionIDtoUpdate)
            .then(function(response) {
                //updated
                console.log(response.entities[0].Name); //'left'
            })
    })
```

### Retrieving All Tracking Categories

This example shows how to retrieve all trackingCategories in a single call.

```javascript

xeroClient.core.trackingCategories.getTrackingCategories()
   .then(function(trackingCategories) {
      //We've got some trackingCategories
      trackingCategories.forEach(function(trackingCategory){
         //do something useful
         console.log(trackingCategory.Name);
      });
   })
```

* When using the getTrackingCategories method, as no object is being saved there is no `entities` array.  Instead you are provided an array of trackingCategory objects that you can use directly in your application.

### Retrieving Tracking Category by ID

This example shows how to retrieve an trackingCategory using the Xero supplied GUID.

```javascript

var myAcctID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.trackingCategories.getTrackingCategory(myAcctID)
   .then(function(trackingCategory) {
      //We've got the trackingCategory so do something useful
      console.log(trackingCategory.Name);
   });
```

### Retrieving Tracking Categories with filters

This example shows how to retrieve an trackingCategory using the 'where' filter.

```javascript

//filter trackingCategories that are type Bank
var filter = 'Name == "Region"';

xeroClient.core.trackingCategories.getTrackingCategories({where: filter})
   .then(function(trackingCategories) {
      //We've got some trackingCategories
      trackingCategories.forEach(function(trackingCategory){
         //do something useful
         console.log(trackingCategory.Name); //will be 'Region'
      });
   })
```

### Retrieving Tracking Categories Modified Since X

This example shows how to retrieve a list of trackingCategories that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.trackingCategories.getTrackingCategories({ modifiedAfter: modifiedDate })
   .then(function(trackingCategories) {
      //We've got some trackingCategories
      trackingCategories.forEach(function(trackingCategory){
         //do something useful
         console.log(trackingCategory.Name);
      });
   })
```

### Updating Tracking Categories

This example shows how to update an trackingCategory that's been retrieved via the SDK.

```javascript

var someCategoryId = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.trackingCategories.getTrackingCategory(someCategoryId)
   .then(function(trackingCategory) {
      //We've got the trackingCategory so now let's change the name
      trackingCategory.Name = 'My awesome new name';

      trackingCategory.save()
         .then(function(response) {
            var thisTrackingCategory = response.entities[0];
            console.log(thisTrackingCategory.Name); //'My awesome new name'
         })
   });
```

### Deleting Tracking Categories

This example shows how to delete an trackingCategory.

```javascript

var someCategoryId = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.trackingCategories.deleteTrackingCategory(someCategoryId)
   .then(function(response) {
      //We've got a response, so let's check the status
      console.log(response.Status); //Should be 'OK'
   });
```