The following examples explain the Overpayments section of the SDK.  The API documentation on Overpayments can be found [here](https://developer.xero.com/documentation/api/overpayments).

### Supported functions

* Retrieve Overpayments (all, by ID, with 'where' clause)
* Update Overpayments

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the overpayments functions exists in the following place:

`client.core.overpayments`

This helper contains the following functions:

* `getOverpayments([options])`
* `getOverpayment(id[, modifiedAfter])`

The Overpayment can has two functions that can be called externally:

* `save([options])`
* `saveAllocations(allocations)`


### Retrieving All Overpayments

This example shows how to retrieve all overpayments in a single call.

```javascript

xeroClient.core.overpayments.getOverpayments()
   .then(function(overpayments) {
      //We've got some overpayments
      overpayments.forEach(function(overpayment){
         //do something useful
         console.log(overpayment.Type); //SPEND-OVERPAYMENT
      });
   })
```

* When using the getOverpayments method, as no object is being saved there is no `entities` array.  Instead you are provided an array of overpayment objects that you can use directly in your application.

### Retrieving Overpayment by ID

This example shows how to retrieve an overpayment using the Xero supplied GUID.

```javascript

var myOverpaymentID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.overpayments.getOverpayment(myOverpaymentID)
   .then(function(overpayment) {
      //We've got the overpayment so do something useful
      console.log(overpayment.Type); //SPEND-OVERPAYMENT
   });
```

### Retrieving Overpayments with filters

This example shows how to retrieve an overpayment using the 'where' filter.

```javascript

//filter overpayments that have status == 'AUTHORISED'
var filter = 'Type == "SPEND-OVERPAYMENT"';

xeroClient.core.overpayments.getOverpayments({where: filter})
   .then(function(overpayments) {
      //We've got some overpayments
      overpayments.forEach(function(overpayment){
         //do something useful
         console.log(overpayment.Type); //SPEND-OVERPAYMENT
      });
   })
```

### Retrieving Overpayments Modified Since X

This example shows how to retrieve a list of overpayments that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.overpayments.getOverpayments({ modifiedAfter: modifiedDate })
   .then(function(overpayments) {
      //We've got some overpayments
      overpayments.forEach(function(overpayment){
         //do something useful
         console.log(overpayment.Type); //SPEND-OVERPAYMENT
      });
   })
```

### Adding an Allocation to a Overpayment

This functionality shows how a overpayment can be updated to have a new allocation.

```javascript

var overpaymentID = '39580864-26a9-40fd-840a-da4c61564476';
var invoiceID = '36ebc13f-1359-422c-ab8f-cfd30dc38c83';

currentApp.core.overpayments.getOverpayment(overpaymentID)
    .then(function(overpayment) {

        var allocations = [{
            AppliedAmount: 500,
            Invoice: {
              InvoiceID: myInvoice.InvoiceID
            }
        }];

        overpayment.saveAllocations(allocations)
            .then(function(res) {
                //Allocation has been added.
                console.log(allocations.entities[0].Overpayment.Type); //'SPEND-OVERPAYMENT'
            });
    });
```