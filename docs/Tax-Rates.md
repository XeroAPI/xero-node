The following examples explain the Tax Rates section of the SDK.  The API documentation on Tax Rates can be found [here](https://developer.xero.com/documentation/api/tax-rates).

### Supported functions

* Create New Tax Rates
* Retrieve Tax Rates (all, paginated, by ID, with 'where' clause)
* Update Tax Rates

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the taxRates functions exists in the following place:

`client.core.taxRates`

This helper contains the following functions:

* `newTaxRate(data[, options])`
* `getTaxRates([options])`

### Creating a new tax rate

This code assumes you've already created a client using the xero-node sdk. 

```javascript

var sampleTaxRate = {
    Name: '20% GST on Expenses',
    TaxComponents: [{
        Name: 'GST',
        Rate: 20.1234,
        IsCompound: false
    }]
};

var taxRateObj = xeroClient.core.taxRates.newTaxRate(sampleTaxRate);

taxRateObj.save()
    .then(function(taxRates) {
        //Tax Rate has been created 
        var myTaxRate = taxRates.entities[0];
    })
    .catch(function(err) {
        //Some error occurred
    });
```

Some points to note with the code snippet above:

* The `.newTaxRate()` function doesn't actually make any API call to Xero.  It only creates an object according to the tax rate schema that _can_ be saved using the `.save()` function at some point in future.
* The `.save()` function returns a promise that can be met using the `.then()` function, and rejections can be caught using the `.catch()` function.
* The promise that is returned by the `.save()` function contains a response object.  This has a bunch of information about the state of the response, but also contains an `entities` array.  This array is what actually contains the object that was just created. 
* For single object saving, this `entities` array should only ever contain one element, but some objects support a multiple object save and in this case the `entities` array will contain all of the objects that were created.

### Retrieving All Tax Rates

This example shows how to retrieve all tax rates in a single call.

```javascript

xeroClient.core.taxRates.getTaxRates()
   .then(function(taxRates) {
      //We've got some taxRates
      taxRates.forEach(function(taxrate){
         //do something useful
         console.log(taxrate.Name);
      });
   })
```

* When using the getTaxRates method, as no object is being saved there is no `entities` array.  Instead you are provided an array of tax rate objects that you can use directly in your application.

### Retrieving Tax Rates with filters

This example shows how to retrieve an tax rate using the 'where' filter.

```javascript

//filter taxRates that are Active
var filter = 'Status == "ACTIVE"';

xeroClient.core.taxRates.getTaxRates({where: filter})
   .then(function(taxRates) {
      //We've got some taxRates
      taxRates.forEach(function(taxrate){
         //do something useful
         console.log(taxeate.Status); //will be ACTIVE
      });
   })
```

### Retrieving Tax Rates Modified Since X

This example shows how to retrieve a list of taxRates that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.taxRates.getTaxRates({ modifiedAfter: modifiedDate })
   .then(function(taxRates) {
      //We've got some taxRates
      taxRates.forEach(function(taxrate){
         //do something useful
         console.log(taxrate.Name);
      });
   })
```

### Updating Tax Rates

This example shows how to update an tax rate that's been retrieved via the SDK.

```javascript

var someTaxRateName = 'tax001';

xeroClient.core.taxRates.getTaxRate(someTaxRateName)
   .then(function(taxrate) {
      //We've got the tax rate so now let's change Name
      taxrate.Name = '50% Mwahaha';

      taxrate.save()
         .then(function(response) {
            var thisTaxRate = response.entities[0];
            console.log(thisTaxRate.Name); //'50% Mwahaha'
         })
   });
```
