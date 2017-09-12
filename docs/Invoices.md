The following examples explain the Invoices section of the SDK.  The API documentation on Invoices can be found [here](https://developer.xero.com/documentation/api/invoices).

### Supported functions

* Create New Invoices
* Retrieve Invoices (all, paginated, by ID, by Contact IDs/Invoice Numbers/Statuses, or with 'where' clause)
* Update Invoices
* Get Invoice Attachments

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the invoices functions exists in the following place:

`client.core.invoices`

This helper contains the following functions:

* `newInvoice(data[, options])`
* `saveInvoices(invoices[, options])`
* `getInvoices([options])`
* `getInvoice(id[, modifiedAfter])`
* `streamInvoice(id, format, stream)`

### Creating a new draft invoice

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var sampleInvoice = {
    Type: 'ACCREC',
    Contact: {
        Name: 'Department of Testing'
    },
    DueDate: new Date().toISOString().split("T")[0],
    LineItems: [{
        Description: 'Services',
        Quantity: 2,
        UnitAmount: 230,
        AccountCode: '200'
    }]
};

var invoiceObj = xeroClient.core.invoices.newInvoice(sampleInvoice);

invoiceObj.save()
    .then(function(invoices) {
        //Invoice has been created 
        var [ myInvoice ] = invoices.entities;
        console.log(myInvoice)
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newInvoice()` function doesn't actually make any API call to Xero.  It only creates an object according to the invoice schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Updating a Invoice

This functionality shows how a invoice can be updated to a status of 'AUTHORISED'.

```javascript

var invoiceID = '39580864-26a9-40fd-840a-da4c61564476';

//Get the draft invoice, update it, and save it.
currentApp.core.invoices.getInvoice(invoiceID)
    .then(function(invoice) {

        invoice.Status = 'AUTHORISED';

        invoice.save()
            .then(function(savedInvoice) {
                var [ mySavedInvoice ] = savedInvoice.entities
                console.log(mySavedInvoice.Status); //'AUTHORISED'
            });
```

### Retrieving All Invoices

This example shows how to retrieve all invoices in a single call.

```javascript

xeroClient.core.invoices.getInvoices()
   .then(function(invoices) {
      //We've got some invoices
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   })
```

* When using the getInvoices method, as no object is being saved there is no `entities` array.  Instead you are provided an array of invoice objects that you can use directly in your application.

### Retrieving Invoice by ID

This example shows how to retrieve an invoice using the Xero supplied GUID.

```javascript

var myInvoiceID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.invoices.getInvoice(myInvoiceID)
   .then(function(invoice) {
      //We've got the invoice so do something useful
      console.log(invoice.Type); //ACCPAY
   });
```

### Retrieving Invoice by Invoice IDs List

This example shows how to retrieve a list of invoices using their Xero supplied GUIDs.

```javascript

var myInvoiceIDs = ['id1', 'id2', ...ids];

xeroClient.core.invoices.getInvoices({
      params: {
          IDs: myInvoiceIDs.toString()
      }
   })
   .then(function(invoices) {
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   });
```

### Retrieving Invoice by Contact IDs List

This example shows how to retrieve a list of invoices using their associated Contact GUIDs.

```javascript

var myContactIDs = ['id1', 'id2', ...ids];

xeroClient.core.invoices.getInvoices({
      params: {
          ContactIDs: myContactIDs.toString()
      }
   })
   .then(function(invoices) {
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   });
```

### Retrieving Invoice by Invoice Numbers List

This example shows how to retrieve a list of invoices using their associated Invoice Numbers.

```javascript

var myInvoiceNumbers = ['ORC1001', 'ORC1002', ...numbers];

xeroClient.core.invoices.getInvoices({
      params: {
          InvoiceNumbers: myInvoiceNumbers.toString()
      }
   })
   .then(function(invoices) {
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   });
```

### Retrieving Invoices by Statuses

This example shows how to retrieve a list of invoices using their statuses without requiring a 'Where' clause.

```javascript

var myStatuses = ['PAID', 'VOIDED'];

xeroClient.core.invoices.getInvoices({
      params: {
          Statuses: myStatuses.toString()
      }
   })
   .then(function(invoices) {
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   });
```

### Retrieving Invoices with filters

This example shows how to retrieve an invoice using the 'where' filter.

```javascript

//filter invoices that have status == 'AUTHORISED'
var filter = 'Status == "AUTHORISED"';

xeroClient.core.invoices.getInvoices({where: filter})
   .then(function(invoices) {
      //We've got some invoices
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   })
```

### Retrieving Invoices Modified Since X

This example shows how to retrieve a list of invoices that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.invoices.getInvoices({ modifiedAfter: modifiedDate })
   .then(function(invoices) {
      //We've got some invoices
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   })
```
