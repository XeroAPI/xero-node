The following examples explain the Prepayments section of the SDK.  The API documentation on Prepayments can be found [here](https://developer.xero.com/documentation/api/prepayments).

### Supported functions

* Retrieve Prepayments (all, by ID, with 'where' clause)
* Update Prepayments

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the prepayments functions exists in the following place:

`client.core.prepayments`

This helper contains the following functions:

* `getPrepayments([options])`
* `getPrepayment(id[, modifiedAfter])`

The Prepayment can has two functions that can be called externally:

* `save([options])`
* `saveAllocations(allocations)`


### Retrieving All Prepayments

This example shows how to retrieve all prepayments in a single call.

```javascript

xeroClient.core.prepayments.getPrepayments()
   .then(function(prepayments) {
      //We've got some prepayments
      prepayments.forEach(function(prepayment){
         //do something useful
         console.log(prepayment.Type); //SPEND-OVERPAYMENT
      });
   })
```

* When using the getPrepayments method, as no object is being saved there is no `entities` array.  Instead you are provided an array of prepayment objects that you can use directly in your application.

### Retrieving Prepayment by ID

This example shows how to retrieve an prepayment using the Xero supplied GUID.

```javascript

var myPrepaymentID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.prepayments.getPrepayment(myPrepaymentID)
   .then(function(prepayment) {
      //We've got the prepayment so do something useful
      console.log(prepayment.Type); //SPEND-OVERPAYMENT
   });
```

### Retrieving Prepayments with filters

This example shows how to retrieve an prepayment using the 'where' filter.

```javascript

//filter prepayments that have status == 'AUTHORISED'
var filter = 'Type == "SPEND-OVERPAYMENT"';

xeroClient.core.prepayments.getPrepayments({where: filter})
   .then(function(prepayments) {
      //We've got some prepayments
      prepayments.forEach(function(prepayment){
         //do something useful
         console.log(prepayment.Type); //SPEND-OVERPAYMENT
      });
   })
```

### Retrieving Prepayments Modified Since X

This example shows how to retrieve a list of prepayments that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.prepayments.getPrepayments({ modifiedAfter: modifiedDate })
   .then(function(prepayments) {
      //We've got some prepayments
      prepayments.forEach(function(prepayment){
         //do something useful
         console.log(prepayment.Type); //SPEND-OVERPAYMENT
      });
   })
```

### Adding an Allocation to a Prepayment

This functionality shows how a prepayment can be updated to have a new allocation.

```javascript

var prepaymentID = '39580864-26a9-40fd-840a-da4c61564476';
var invoiceID = '36ebc13f-1359-422c-ab8f-cfd30dc38c83';

currentApp.core.prepayments.getPrepayment(prepaymentID)
    .then(function(prepayment) {

        var allocations = [{
            AppliedAmount: 500,
            Invoice: {
              InvoiceID: myInvoice.InvoiceID
            }
        }];

        prepayment.saveAllocations(allocations)
            .then(function(res) {
                //Allocation has been added.
                console.log(allocations.entities[0].Prepayment.Type); //'SPEND-OVERPAYMENT'
            });
    });
```