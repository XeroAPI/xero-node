The following examples explain the Repeating Invoices section of the SDK.  The API documentation on Repeating Invoices can be found [here](https://developer.xero.com/documentation/api/repeating-invoices).

### Supported functions

* Retrieve Repeating Invoices

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the Repeating Invoices functions exists in the following place:

`client.core.repeatinginvoices`

This helper contains the following functions:

* `getRepeatingInvoices([options])`

### Retrieving All Repeating Invoices

This example shows how to retrieve the Repeating Invoices.

```javascript

xeroClient.core.repeatinginvoices.getRepeatingInvoices()
   .then(function(repeatingInvoices) {
      //We've got the Repeating Invoices
      repeatingInvoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.InvoiceID);
      });
   })
```

### Retrieving Repeating Invoices by ID

This example shows how to retrieve a repeating invoice using the Xero supplied GUID.

```javascript

var myRepeatingInvoiceID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.repeatinginvoices.getRepeatingInvoice(myRepeatingInvoiceID)
   .then(function(invoice) {
      //We've got the invoice so do something useful
      console.log(invoice.Type); //ACCPAY
   });
```

### Retrieving Repeating Invoices with filters

This example shows how to retrieve a repeating invoice using the 'where' filter.

```javascript

//filter invoices that have status == 'AUTHORISED'
var filter = 'Status == "AUTHORISED"';

xeroClient.core.repeatinginvoices.getRepeatingInvoices({where: filter})
   .then(function(invoices) {
      //We've got some invoices
      invoices.forEach(function(invoice){
         //do something useful
         console.log(invoice.Type); //ACCPAY
      });
   })
```