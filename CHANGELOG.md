# Change Log

## "version": "4.4.3"
Change functionality of `updateTenants()` function to sort connections so the most recent connection / active tenant is index 0

## "version": "4.4.2"
Add functionality for attachments on Quotes

## "version": "4.4.1"
Bug fix for issue [371](https://github.com/XeroAPI/xero-node/issues/371) - import name matches capitalization

## "version": "4.4.0"
> Jumping past vsn 4.3.0 to indicate the breaking changes without having to increment a major release as well as leaving room for development on the previous client configuration

#### Had significant community feedback that the documentation and initial auth was too complex.. This refactor is a simplification of the `xeroClient.ts` naming and an expansion of functionality around the non-generated SDK code.

Breaking Changes:
* `setAccessTokenFromRedirectUri` renamed as `apiCallback`
* `buildClient()` remove from constructor, and those responsibilities were moved to an initializer function which must be called once the XeroClient is constructed due to some asyncronous setup required by the [openid-client](https://github.com/panva/node-openid-client):
	* Example:
		```js
		const xero = new XeroClient({...config})
		xero.initialize()
		```
* Added a `disconnect()` function
* Added a `updateTenants()` function which populates the tenant's organisation details behind during the authentication process and greatly reduces the complexity of showing org details by eliminating the need for developers to make additional calls the the `/organisation` endpoint for each connected tenant
* Added types for XeroAccessToken and XeroIdToken to show usable data that the access & id tokens may contain.

---
## "version": "4.2.0"
* Added Singapore TaxRates and ReportTaxRates
* getInvoiceAsPdf and getCreditNoteAsPdf
	* removed "contentType" param as it's unnecessary
	* changed response content type from application/octet-stream to application/pdf because it will alway return a pdf.
	
* Update createEmployees
	* add summarizeErrors param

* Remove createEmployee method (singular - as this path/method)
* /Employees POST is needed for updateOrCreateEmployees

* Add updateOrCreateEmployees method
	* with summarizeErrors param

* Update createManualJournals
	* add summarizeErrors param

* Remove createManualJournal method (singular - as this path/method)
* /ManualJournals POST is needed for updateOrCreateManualJournals

* Add updateOrCreateManualJournals method
	* with summarizeErrors param

* Remove createOverpaymentAllocation method

* Add createOverpaymentAllocations method
	* with summarizeErrors param

* Add createPrepaymentAllocations method
	* with summarizeErrors param

* Add missing attributes of Employee object
* StatusAttributeString
* ValidationErrors array

* Add missing attributes of Invoice object
* Warnings array

* Add missing attributes of ManualJournal object
* StatusAttributeString

---
## "version": "4.1.7"
* Fixed file uploads.. Image data was being force encoded in JSON.. Using mime type now
* emailInvoice and functions with an empty response need `json: true` to succeed when its a 204 response
* adds some additional types and optionalitities to ceratin functions
---
## "version": "4.1.5"

* Relaxes required types for certain objects & parameters
---
## "version": "4.1.4"

* Adds Quotes CRUD 🥳
* Remove a duplicate Enum
* Improved docs for `unitdp`
* Fix filters and where clause where we expect an array. Serializes to api as a comma sep. string
* Fix bug form 4.1.3 that was serializing all Array[any] when we just wanted Array[strings]
---
## "version": "4.1.2"

* Adds OAuth 2 Gateway to fix #https://github.com/XeroAPI/xero-node/issues/328 so that we can get Quotes
** NOTE
* getQuotes only endpoint supported, but rest of CRUD actions coming soon!
* emailInvoice supported

* Adds Fix for serializer for the numerous dates returned by XeroAPI to fix #https://github.com/XeroAPI/xero-node/issues/323

Possible raw date formats
`"Date": "2009-03-29",`
`"DateString": "2016-12-16T00:00:00",`
`"DateUTCString": "2018-02-28T21:02:11",`
`"createdDateUtc": "2020-01-08T17:26:30.5778680",`
MS Format ( this was main problem date )
`"FullyPaidOnDate": "\/Date(1481846400000+0000)\/",`

ref: https://developer.xero.com/documentation/api/requests-and-responses

---
## "version": "4.1.1"

* Adds OAuth 2 Gateway to fix #https://github.com/XeroAPI/xero-node/issues/328 so that we can get Quotes
** NOTE
* getQuotes only endpoint supported, but rest of CRUD actions coming soon!

* Adds Fix for serializer for the numerous dates returned by XeroAPI to fix #https://github.com/XeroAPI/xero-node/issues/323

Possible raw date formats
`"Date": "2009-03-29",`
`"DateString": "2016-12-16T00:00:00",`
`"DateUTCString": "2018-02-28T21:02:11",`
`"createdDateUtc": "2020-01-08T17:26:30.5778680",`
MS Format ( this was main problem date )
`"FullyPaidOnDate": "\/Date(1481846400000+0000)\/",`

ref: https://developer.xero.com/documentation/api/requests-and-responses

---
## "version": "4.1.0"

Naming Conventions updated - Open API spec only allows us to to single PUT/POST in our generated SDKS - refactoring to enable the supported endpoints. This is a larger change that will enable the generated SDK's to be encompass the full features of the raw API, but does require some painful re-naming.

Semver naming -> MAJOR.MINOR.PATCH

While this is not a backwards compatible change, we are opting to bounce this to 4.1.0 as the current sdk is relatively new and is getting to a more stable palce.

ex:
`createContact` -> `updateOrCreateContacts`
`createBankTransaction` -> `updateOrCreateBankTransactions`

This will enable the ability for our SDK's to both batch create/update from a single endpoint based on the payload..

Refer to the generated type files to see the newly expected format of each function.

Remove singular create methods
* createItem
* createContact
* createBankTransaction
* createInvoice
* createPurchaseOrder

Add createOrUpdate bulk methods
* updateOrCreateItems
* updateOrCreateContacts
* updateOrCreateBankTransactions
* updateOrCreateInvoices
* createPurchaseOrders

* Add summarizeError to bulk create and updateOrCreate methods

* Add missing Enums from
- taxRates

* Fix datatype for DiscountRate from string to number on lineItem model

* Add object IDs to ValidationError element array

* Add statusAttributeString to Contact model

---
## "version": "4.0.7"

1) Persists client in the constructor so you can access `openIdClient` without having to call `buildConsentUrl()`
Fixes: https://github.com/XeroAPI/xero-node/issues/317

2) Needed to pass in the check object which compares the initial params with what is coming back from callback
Fixes: https://github.com/XeroAPI/xero-node/issues/304
```javascript
async setAccessTokenFromRedirectUri(url: string) {
	const params = this.openIdClient.callbackParams(url)
	const check = {...params}
	this.tokenSet = await this.openIdClient.callback(this.config.redirectUris[0], params, check);
	this.setAccessTokenForAllApis();

	await this.fetchConnectedTenantIds();
}
```

3) Leverages openId's callbackParam fn() to simplify K,V object creation
`const params = this.openIdClient.callbackParams(url)`

4) clean up constructor and set default values for token and tenants