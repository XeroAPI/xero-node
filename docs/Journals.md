The following examples explain the Journals section of the SDK.  The API documentation on Journals can be found [here](https://developer.xero.com/documentation/api/journals).

### Supported functions

* Retrieve Journals (all, paginated, by ID, with 'where' clause)

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the Journals functions exists in the following place:

`client.core.journals`

This helper contains the following functions:

* `getJournal(id[, modifiedAfter])`
* `getJournals([callback, options])`

### Retrieving All Journals

This example shows how to retrieve all Journals in a single call.

```javascript

xeroClient.core.journals.getJournals()
   .then(function(journals) {
      //We've got some Journals
      journals.forEach(function(journal){
         //do something useful
         console.log(journal.JournalNumber);
      });
   })
```

### Retrieving Journal by ID

This example shows how to retrieve a Journal using the Xero supplied GUID.

```javascript

var journalID = '5ff690e5-074e-4421-8f8a-c139ee15393a';

xeroClient.core.journals.getJournal(journalID)
   .then(function(journal) {
      //We've got the Journal so do something useful
      console.log(journal.JournalNumber);
   });
```

### Retrieving Journals using Pagination

As a large number of Journals will be returned, it's likely that users will want to use some form of pagination.

This example shows how our `pager` object can be used in conjunction with a callback function.

```javascript

xeroClient.core.journals.getJournals({ pager: { start: 1, callback: onJournalsFound } })
    .catch(function(err) {
        console.log(err); //Some error occurred
    })

var recordCount = 0;

function onJournalsFound(err, ret, cb) {
    cb && cb();
    recordCount += ret.data.length;
    ret.data.forEach(function(journal) {
        //Do something useful
        console.log(journal.JournalNumber);
    });

    try {
        ret.finished && console.log('Journals record count:' + recordCount);
    } catch(ex) {
        console.log(ex);
        return;
    }
}
```

### Retrieving Journals with filters

This example shows how to retrieve a Journal using the 'where' filter.

```javascript

//filter Journals that have reference == 'Web'
var filter = 'Reference == "Web"';

xeroClient.core.journals.getJournals({where: filter})
   .then(function(journals) {
      //We've got some Journals
      journals.forEach(function(journal){
         //do something useful
         console.log(journal.Reference); //'Web'
      });
   })
```

### Retrieving Journals Modified Since X

This example shows how to retrieve a list of Journals that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.journals.getJournals({ modifiedAfter: modifiedDate })
   .then(function(journals) {
      //We've got some Journals
      journals.forEach(function(journal){
         //do something useful
         console.log(journal.JournalNumber);
      });
   })
```