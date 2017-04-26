The following examples explain the Organisation section of the SDK.  The API documentation on the Organisation endpoint can be found [here](https://developer.xero.com/documentation/api/organisation).

### Supported functions

* Retrieve the current organisation

These functions are explained further below.

### Entity Helper

The entity helper that has been created for the Organisations functions exists in the following place:

`client.core.organisations`

This helper contains the following functions:

* `getOrganisation([callback])`

### Retrieving the current Organisation

This example shows how to retrieve the current Organisation in a single call.

```javascript

xeroClient.core.organisations.getOrganisation()
   .then(function(organisation) {
      //do something useful
      console.log(organisation.Name);
   })
```