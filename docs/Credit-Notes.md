The following examples explain the Credit Notes section of the SDK.  The API documentation on Credit Notes can be found [here](https://developer.xero.com/documentation/api/credit-notes).

### Supported functions

* Create New Credit Notes
* Retrieve Credit Notes (all, paginated, by ID, with 'where' clause)
* Update Credit Notes

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the creditNotes functions exists in the following place:

`client.core.creditNotes`

This helper contains the following functions:

* `newCreditNote(data[, options])`
* `getCreditNotes([options])`
* `getCreditNote(id[, modifiedAfter])`

The Credit Note can has two functions that can be called externally:

* `save([options])`
* `saveAllocations(allocations)`

### Creating a new draft credit note

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var sampleCreditNote = {
    Type: 'ACCPAYCREDIT',
    Contact: {
        ContactID: '6bcb2d55-d9e0-4a47-97b1-348e719d4e9c'
    },
    LineItems: [{
        Description: 'Computer - White',
        Quantity: 1,
        UnitAmount: 1995.00,
        AccountCode: '200'
    }]
};

var creditNoteObj = xeroClient.core.creditNotes.newCreditNote(sampleCreditNote);

creditNoteObj.save()
    .then(function(creditNotes) {
        //Credit Note has been created 
        var myCreditNote = creditNotes.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newCreditNote()` function doesn't actually make any API call to Xero.  It only creates an object according to the credit note schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Updating a Credit Note

This functionality shows how a credit note can be updated to a status of 'AUTHORISED'.

```javascript

var creditNoteID = '39580864-26a9-40fd-840a-da4c61564476';

//Get the draft credit note, update it, and save it.
currentApp.core.creditNotes.getCreditNote(creditNoteID)
    .then(function(creditNote) {

        creditNote.Status = 'AUTHORISED';
        creditNote.Date = new Date().toISOString().split("T")[0];

        creditNote.save()
            .then(function(savedCreditNote) {
                console.log(savedCreditNote.entities[0].Status); //'AUTHORISED'
            });
```

### Adding an Allocation to a Credit Note

This functionality shows how a credit note can be updated to have a new allocation.

```javascript

var creditNoteID = '39580864-26a9-40fd-840a-da4c61564476';
var invoiceID = '36ebc13f-1359-422c-ab8f-cfd30dc38c83';

currentApp.core.creditNotes.getCreditNote(creditNoteID)
    .then(function(creditNote) {

        var allocations = [{
            AppliedAmount: 500,
            InvoiceID: myInvoice.InvoiceID
        }];

        creditNote.saveAllocations(allocations)
            .then(function(res) {
                //Allocation has been added.
                console.log(res.Status); //'OK'
            });
```

### Retrieving All Credit Notes

This example shows how to retrieve all creditNotes in a single call.

```javascript

xeroClient.core.creditNotes.getCreditNotes()
   .then(function(creditNotes) {
      //We've got some creditNotes
      creditNotes.forEach(function(creditNote){
         //do something useful
         console.log(creditNote.Type); //ACCPAYCREDIT
      });
   })
```

* When using the getCreditNotes method, as no object is being saved there is no `entities` array.  Instead you are provided an array of credit note objects that you can use directly in your application.

### Retrieving Credit Note by ID

This example shows how to retrieve an credit note using the Xero supplied GUID.

```javascript

var myCreditNoteID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.creditNotes.getCreditNote(myCreditNoteID)
   .then(function(creditNote) {
      //We've got the credit note so do something useful
      console.log(creditNote.Type); //ACCPAYCREDIT
   });
```

### Retrieving Credit Notes with filters

This example shows how to retrieve an credit note using the 'where' filter.

```javascript

//filter creditNotes that have status == 'AUTHORISED'
var filter = 'Status == "AUTHORISED"';

xeroClient.core.creditNotes.getCreditNotes({where: filter})
   .then(function(creditNotes) {
      //We've got some creditNotes
      creditNotes.forEach(function(creditNote){
         //do something useful
         console.log(creditNote.Type); //ACCPAYCREDIT
      });
   })
```

### Retrieving Credit Notes Modified Since X

This example shows how to retrieve a list of creditNotes that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.creditNotes.getCreditNotes({ modifiedAfter: modifiedDate })
   .then(function(creditNotes) {
      //We've got some creditNotes
      creditNotes.forEach(function(creditNote){
         //do something useful
         console.log(creditNote.Type); //ACCPAYCREDIT
      });
   })
```