[![npm version](https://badge.fury.io/js/xero-node.svg)](https://badge.fury.io/js/xero-node)
[![CircleCI](https://circleci.com/gh/XeroAPI/xero-node/tree/master.svg?style=svg)](https://circleci.com/gh/XeroAPI/xero-node/tree/master)

# xero-node

NodeJS Client for the [Xero API](http://developer.xero.com). Works with ES5, ES6+ and TypeScript.

[API Reference](https://xeroapi.github.io/xero-node/v3)

Supports all application types:

* Private - apps that can only connect to a single organisation
* Public - apps that can connect to any organisation, but only for 30 minutes at a time
* Partner - approved apps that can automatically refresh tokens

Version 3 has been rebuilt fron the ground-up using TypeScript, to make it
more maintainable and to take advantage of modern JavaScript features.

# Features/Change Log

- v3.0.7
	- Thanks davibq for adding the ability to email invoices #209
- v3.0.6
	- Thanks brucem1976 who added History to the endpoints that support History #206
- v3.0.4
	- Thanks nickngsr #203
	- escape filename to ensure it is url safe for attachments
	- add ability to save purchase order pdf
	- fix typo on purchase order number in get request
- v3.0.3
	- Thanks gslisrael. Enable getting creditNotes by CreditNoteNumber #199
- v3.0.2
	- Removes some unused deps
- v3.0.1
	- Reimplmented how to make generic API calls in BaseAPI layer. See examples below
- v3.0.0
	- almost all [accounting endpoints](https://developer.xero.com/documentation/api/api-overview)

# Installation

This SDK is published as an npm package called `xero-node`.

```npm install --save xero-node```

# Usage Example for Private Apps

Create a `config.json` file:

```json
{
	"appType": "private",
	"consumerKey": "your_consumer_key",
	"consumerSecret": "your_consumer_secret",
	"callbackUrl": null,
	"privateKeyPath": "C:\\keys\\your_private_key.pem"
}
```

Then add the following JavaScript (example works in NodeJS version 8 and above):

```javascript
const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('./config.json');

(async () => {

    // You can initialise Private apps directly from your configuration
    let xero = new XeroClient(config);

    const result = await xero.invoices.get();

    console.log('Number of invoices:', result.Invoices.length);

})();

```

# Usage Example for Public and Partner Apps

Create a `config.json` file:

```json
{
	"appType": "public",
	"consumerKey": "your_consumer_key",
	"consumerSecret": "your_consumer_secret",
	"callbackUrl": null,
	"privateKeyPath": "C:\\keys\\your_private_key.pem"
}
```

Then add the following JavaScript (example works in NodeJS version 8 and above):

```javascript
const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('./config.json');

(async () => {

    let xero = new XeroClient(config);

    // Create request token and get an authorisation URL
    const requestToken = await xero.oauth1Client.getRequestToken();
    console.log('Received Request Token:', requestToken);

    authUrl = xero.oauth1Client.buildAuthoriseUrl(requestToken);
    console.log('Authorisation URL:', authUrl);

    // Send the user to the Authorisation URL to authorise the connection

    // Once the user has authorised your app, swap Request token for Access token
    const oauth_verifier = 123456;
    const savedRequestToken = {
        oauth_token: 'aaa',
        oauth_token_secret: 'bbb'
    };
    const accessToken = await xero.oauth1Client.swapRequestTokenforAccessToken(savedRequestToken, oauth_verifier);
    console.log('Received Access Token:', accessToken);

    // You should now store the access token securely for the user.

    // You can make API calls straight away
    const result = await xero.invoices.get();
	console.log('Number of invoices:', result.Invoices.length);

	// You can refresh your access token when it's getting close to expiring
	if((new Date) - accessToken.oauth_expires_at > 60*30*1000){
		let newToken = await xero.oauth1Client.refreshAccessToken();
		// Remember to store the new access token in your data store
	}

	// The SDK will hold the latest acess token, so you can make more calls
	const result1 = await xero.invoices.get();
	console.log('Number of invoices:', result1.Invoices.length);

    // When making future calls, you can initialise the Xero client direectly with the stored access token:

    const storedAccessToken = {
        oauth_token: 'aaa',
        oauth_token_secret: 'bbb',
        oauth_session_handle: 'ccc',
        oauth_expires_at: '2018-01-01T01:02:03'
    };
    const xero2 = new XeroClient(config, storedAccessToken);
    const invoices = await xero2.invoices.get();
    console.log('Number of invoices:', invoices.Invoices.length);

})();

```

### Further Examples

- [Integration tests](src/__integration_tests__)
- [Sample app](https://github.com/XeroAPI/xero-node-sample-app)
- [Generic API calls private](https://github.com/XeroAPI/xero-node/blob/master/src/__integration_tests__/generic-endpoint.integration.tests.ts)
- [Generic API calls public/partner](https://github.com/XeroAPI/xero-node/blob/master/src/__integration_tests__/partner-example-callbackUrl.tests.ts)

## Migration from V2

The biggest change is the number of function calls you have to make to complete your task. This is consistant across all endpoints. It's not JSON in and JSON out. your object never gets modified:

Example:

```
// V2
let invoiceObj = xero.core.invoices.newInvoice(invoiceJSON);
let result = await invoiceObj.save()
```

becomes:
```
// V3
let result = await xero.invoices.create(invoiceJSON);
```

Please also review the documentation around how to construct the client object. You no longer have to use specifc constructors for your App Type. Instead this information is passed in with your config object. For example, rather than `Xero.PublicApplication` you use `new Xero.AccountingAPIClient` and specify the appType in the config passed in.

In addition the oAuth1.0a related methods are in their own namespace now, and there are some changes from `z` to `s` to align with Xero API naming.

Please see related blog post here: https://devblog.xero.com/the-new-xero-node-sdk-2c69dcab4a2f

# Contributing

## Local development

There are lots of TODOs in code and on our GitHub Projects kanban board - feel free to pick one off.

After you clone the repository, run `npm install` to install required dependencies.

### Running the tests

We need two private Apps to get around the ratelimits. They can be connected to the same Org.

1. Copy `private-config-example.json` to `private-config.json` in the [integration test directory](src/__integration_tests__).
2. Copy it again to `1private-config.json` in the [integration test directory](src/__integration_tests__).
3. Overwrite the example values with your own from the [Developer Portal](https://developer.xero.com/myapps).
4. (Do the same for `partner-config-example.json` if required.)
5. Run `npm test`

For the partner tests to pass you will need a partner app. Don't worry if you don't have one and the test fails. It will run in CircleCI.

The Prepayments and Overpayments tests require Pre/Overpayments to be present in your Organisatino, again, don't worry too much if these fail for you - they run in CircleCI.


## Project Philosophies

1. A simple and intuitive interface.
   eg:

    `PUT https://api.xero.com/api.xro/2.0/ContactGroups/b05466c8-dc54-4ff8-8f17-9d7008a2e44b/Contacts`

    becomes:

    `xero.contacts.contactGroups.create(contact)`

    Matching SDK methods names to endpoints, allows consumers to read the official API documentation and translate it to SDK method calls quickly.

    That rather than using HTTP verbs (`.put()`, `.post()` etc) the SDK will use actions. Example `get()`, `create()`,`delete()`, `update()`. This abstracts away Xero's [funny](https://developer.xero.com/documentation/api/requests-and-responses) `PUT` vs `POST`.

2. A simple and single OAuth flow. Rather than automatically refreshing tokens, the SDK we will expose methods which allow the OAuth methods eg Refreshing Tokens etc. Consideration is also being made to OAuth2.

3. Abstracted underlyting OAuth/HTTP lib. This will allow swapping it out if we needed. The SDK won't bleed the OAuth libs exception types onto the consumer when it hits a 500/400 etc. Having a OAuth/HTTP layer will allow reuse and extension to other APIs (Payroll, Expenses etc).

5. Minimal to no entity/request/response validation. A consumer will pass in JSON and get JSON out. There will be no manipulation of data along the way. Helper methods if asked for will be provided by a separate module. This will reduce maintenance costs.

4. Unit tests!

5. Writing the SDK in Typescript will allow us to provide TS types for the API's contracts, and it's what we use internally at Xero. This will also aid in self-generated docs.

## Maintainers
@philals @iamam34 @bryanlloydtee @dannyvincent @dupski
