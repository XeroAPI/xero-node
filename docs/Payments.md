The following examples explain the Payments section of the SDK.  The API documentation on Payments can be found [here](https://developer.xero.com/documentation/api/payments).

### Supported functions

* Create New Payments
* Retrieve Payments (all, paginated, by ID, with 'where' clause)
* Update Payments

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the payments functions exists in the following place:

`client.core.payments`

This helper contains the following functions:

* `createPayment(data[, options])`
* `getPayments([options])`
* `getPayment(id[, modifiedAfter])`

### Creating a new payment

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var samplePayment = {
    Invoice: {
        InvoiceID: 'cac488a2-e40c-42b2-b8c4-b4a0d2e75bb4'
    },
    Account: {
        Code: '200'
    },
    Date: new Date().toISOString().split("T")[0],
    Amount: '1000.00'
};

var paymentObj = xeroClient.core.payments.newPayment(samplePayment);

paymentObj.save()
    .then(function(payments) {
        //Payment has been created 
        var myPayment = payments.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newPayment()` function doesn't actually make any API call to Xero.  It only creates an object according to the payment schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.


### Retrieving All Payments

This example shows how to retrieve all payments in a single call.

```javascript

xeroClient.core.payments.getPayments()
   .then(function(payments) {
      //We've got some payments
      payments.forEach(function(payment){
         //do something useful
         console.log(payment.Amount);
      });
   })
```

* When using the getPayments method, as no object is being saved there is no `entities` array.  Instead you are provided an array of payment objects that you can use directly in your application.

### Retrieving Payment by ID

This example shows how to retrieve an payment using the Xero supplied GUID.

```javascript

var myPaymentID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.payments.getPayment(myPaymentID)
   .then(function(payment) {
      //We've got the payment so do something useful
      console.log(payment.Amount);
   });
```

### Retrieving Payments with filters

This example shows how to retrieve an payment using the 'where' filter.

```javascript

//filter payments that are type ACCREC
var filter = 'PaymentType == "ACCRECPAYMENT'';

xeroClient.core.payments.getPayments({where: filter})
   .then(function(payments) {
      //We've got some payments
      payments.forEach(function(payment){
         //do something useful
         console.log(payment.PaymentType); //will be ACCRECPAYMENT
      });
   })
```

### Retrieving Payments Modified Since X

This example shows how to retrieve a list of payments that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.payments.getPayments({ modifiedAfter: modifiedDate })
   .then(function(payments) {
      //We've got some payments
      payments.forEach(function(payment){
         //do something useful
         console.log(payment.Name);
      });
   })
```

### Updating Payments

This example shows how to update an payment that's been retrieved via the SDK.

```javascript

var somePaymentID = '75520d2e-e19d-4f36-b19b-e3b9000b2daa';

xeroClient.core.payments.getPayment(somePaymentID)
   .then(function(payment) {
      //We've got the payment so now let's change the name
      payment.Status = 'AUTHORISED';

      payment.save()
         .then(function(response) {
            var thisPayment = response.entities[0];
            console.log(thisPayment.Status); //'AUTHORISED'
         })
   });
```
