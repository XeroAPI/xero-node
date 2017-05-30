The following examples explain the Manual Journal section of the SDK.  The API documentation on the Manual Journal endpoint can be found [here](https://developer.xero.com/documentation/api/manual-journals).

### Supported functions

* Create New Manual Journals
* Retrieve Manual Journals (all, paginated, by ID, with 'where' clause)
* Update Manual Journals

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the manualjournals functions exists in the following place:

`client.core.manualjournals`

This helper contains the following functions:

* `newManualJournal(data[, options])`
* `getManualJournals([options])`
* `getManualJournal(id[, modifiedAfter])`

The Manual Journal  has one function that can be called externally:

* `save([options])`

### Creating a new Manual Journal

This code assumes you've already created a client using the xero-node sdk.

```javascript

var sampleManualJournal = {
    Narration: "Manual Journal Entry",
    Date: new Date().toISOString().split("T")[0],
    JournalLines: [
        {
            LineAmount: "-1000.00",
            AccountCode: "489"
        },
        {
            LineAmount: "1000.00",
            AccountCode: "620"
        }
    ]
};

var manualjournal = xeroClient.core.manualjournals.newManualJournal(sampleManualJournal);

manualjournal.save()
    .then(function(manualJournals) {
        //Manual Journal has been created 
        var myManualJournal = manualJournals.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });

```

Some points to note with the code snippet above:

* The `.newManualJournal()` function doesn't actually make any API call to Xero.  It only creates an object according to the manual journal schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Updating a Manual Journal

This functionality shows how a manual journal's narration can be updated.

```javascript

var manualJournalID = '39580864-26a9-40fd-840a-da4c61564476';

//Get the manual journal, update it, and save it.
xeroClient.core.manualjournals.getManualJournal(manualJournalID)
    .then(function(manualJournal) {
        manualJournal.Narration = "New Manual Journal Entry";
        manualJournal.save()
            .then(function(savedManualJournal) {
                console.log(savedManualJournal.entities[0].Narration); //'New Manual Journal Entry'
            });

```

### Retrieving All Manual Journals

This example shows how to retrieve all manualJournals in a single call.

```javascript

xeroClient.core.manualjournals.getManualJournals()
   .then(function(manualJournals) {
      //We've got some manualJournals
      manualJournals.forEach(function(manualJournal){
         //do something useful
         console.log(manualJournal.Narration);
      });
   })
```

* When using the getManualJournals method, as no object is being saved there is no `entities` array.  Instead you are provided an array of manual journal objects that you can use directly in your application.

### Retrieving Manual Journal by ID

This example shows how to retrieve an manual journal using the Xero supplied GUID.

```javascript

var manualJournalID = '39580864-26a9-40fd-840a-da4c61564476';

xeroClient.core.manualjournals.getManualJournal(manualJournalID)
   .then(function(manualJournal) {
      //We've got the manual journal so do something useful
      console.log(manualJournal.Narration);
   });
```

### Retrieving Manual Journals with filters

This example shows how to retrieve an manual journal using the 'where' filter.

```javascript

//filter creditNotes that have Narration == 'Manual Journal Entry'
var filter = 'Narration == "Manual Journal Entry"';

xeroClient.core.manualjournals.getManualJournal({where: filter})
   .then(function(manualJournals) {
      //We've got some manualJournals
      manualJournals.forEach(function(manualJournal){
         //do something useful
         console.log(manualJournal.Narration);
      });
   })
```

### Retrieving Manual Journals Modified Since X

This example shows how to retrieve a list of manualJournals that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.manualjournals.getManualJournal({ modifiedAfter: modifiedDate })
   .then(function(manualJournals) {
      //We've got some manualJournals
      manualJournals.forEach(function(manualJournal){
         //do something useful
         console.log(manualJournal.Narration);
      });
   })
```