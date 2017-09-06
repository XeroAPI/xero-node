The following examples explain the Purchase Orders section of the SDK.  The API documentation on Purchase Orders can be found [here](https://developer.xero.com/documentation/api/credit-notes).

### Supported functions

* Create New Purchase Orders
* Retrieve Purchase Orders (all, paginated, by ID)
* Update Purchase Orders

These functions are explained further below.

### Unsupported functions

* The 'Where' clause is not supported on this endpoint.

### Entity Helper

The entity helper that has been created for the purchaseOrders functions exists in the following place:

`client.core.purchaseOrders`

This helper contains the following functions:

* `newPurchaseOrder(data[, options])`
* `getPurchaseOrders([options])`
* `getPurchaseOrder(id[, modifiedAfter])`

The Purchase Order can has two functions that can be called externally:

* `save([options])`

### Creating a new purchase order

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var samplePurchaseOrder = {
  Contact: {
    ...
  },
  Date: new Date().toISOString().split('T')[0],
  DeliveryDate: new Date().toISOString().split('T')[0],
  LineAmountTypes: 'Inclusive',
  LineItems: [
    {
      Description: 'Office Chairs',
      Quantity: 5,
      UnitAmount: 120.0,
    },
  ],
};

var purchaseOrderObj = xeroClient.core.purchaseOrders.newPurchaseOrder(samplePurchaseOrder);

purchaseOrderObj.save()
    .then(function(purchaseOrders) {
        //Purchase Order has been created 
        var myPurchaseOrder = purchaseOrders.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newPurchaseOrder()` function doesn't actually make any API call to Xero.  It only creates an object according to the purchase order schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Updating a Purchase Order

This functionality shows how a purchase order can be updated to a status of 'AUTHORISED'.

```javascript

var purchaseOrderID = '39580864-26a9-40fd-840a-da4c61564476';

//Get the draft purchase order, update it, and save it.
currentApp.core.purchaseOrders.getPurchaseOrder(purchaseOrderID)
    .then(function(purchaseOrder) {

        purchaseOrder.Reference = 'Updated';

        purchaseOrder.save()
            .then(function(savedPurchaseOrder) {
                console.log(savedPurchaseOrder.entities[0].Reference); //'Updated'
            });
```

### Retrieving All Purchase Orders

This example shows how to retrieve all purchaseOrders in a single call.

```javascript

xeroClient.core.purchaseOrders.getPurchaseOrders()
   .then(function(purchaseOrders) {
      //We've got some purchaseOrders
      purchaseOrders.forEach(function(purchaseOrder){
         //do something useful
         console.log(purchaseOrder.PurchaseOrderNumber); // PO-0001
      });
   })
```

* When using the getPurchaseOrders method, as no object is being saved there is no `entities` array.  Instead you are provided an array of purchase order objects that you can use directly in your application.

### Retrieving Purchase Order by ID

This example shows how to retrieve an purchase order using the Xero supplied GUID.

```javascript

var myPurchaseOrderID = '288762e4-67a9-442d-9956-9a14e9d8826e';

xeroClient.core.purchaseOrders.getPurchaseOrder(myPurchaseOrderID)
   .then(function(purchaseOrder) {
      //We've got the purchase order so do something useful
      console.log(purchaseOrder.PurchaseOrderNumber); // PO-0001
   });
```

### Retrieving Purchase Orders Modified Since X

This example shows how to retrieve a list of purchaseOrders that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.purchaseOrders.getPurchaseOrders({ modifiedAfter: modifiedDate })
   .then(function(purchaseOrders) {
      //We've got some purchaseOrders
      purchaseOrders.forEach(function(purchaseOrder){
         //do something useful
         console.log(purchaseOrder.PurchaseOrderNumber); // PO-0001
      });
   })
```