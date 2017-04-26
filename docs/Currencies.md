The following examples explain the Currencies section of the SDK.  The API documentation on Currencies can be found [here](https://developer.xero.com/documentation/api/currencies).

### Supported functions

* Retrieve Currencies (all, paginated, by ID, with 'where' clause)

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the currencies functions exists in the following place:

`client.core.currencies`

This helper contains the following functions:

* `getCurrencies([options])`

### Retrieving All Currencies

This example shows how to retrieve all Currencies in a single call.

```javascript

xeroClient.core.currencies.getCurrencies()
   .then(function(currencies) {
      //We've got some Currencies
      currencies.forEach(function(currency){
         //do something useful
         console.log(currency.Code);
      });
   })
```

### Retrieving Currencies with filters

This example shows how to retrieve a Currency using the 'where' filter.

```javascript

//filter currencies that have Code: USD
var filter = 'Code == "USD"';

xeroClient.core.currencies.getCurrencies({where: filter})
   .then(function(currencies) {
      //We've got some currencies
      currencies.forEach(function(currency){
         //do something useful
         console.log(currency.Code); //'USD'
      });
   })
```

### Retrieving Currencies Modified Since X

This example shows how to retrieve a list of currencies that have been updated since a specified date.

```javascript

//Return dates with an UpdatedDateUTC greater than midnight on March 24th, 2017.
var modifiedDate = new Date("March 24, 2017 00:00:00");

xeroClient.core.currencies.getCurrencies({ modifiedAfter: modifiedDate })
   .then(function(currencies) {
      //We've got some currencies
      currencies.forEach(function(currency){
         //do something useful
         console.log(currency.Code); //'USD'
      });
   })
```