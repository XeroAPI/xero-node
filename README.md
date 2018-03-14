[![npm version](https://badge.fury.io/js/xero-node.svg)](https://badge.fury.io/js/xero-node)
[![CircleCI](https://circleci.com/gh/philals/xero-node-v3/tree/master.svg?style=svg&circle-token=0a866212b40b6ecaa44f2f4fe98401b536a44038)](https://circleci.com/gh/philals/xero-node-v3/tree/master)

# node-xero

NodeJS Client for the Xero API, supporting Public, Private and Partner Apps.

An API wrapper for xero (http://developer.xero.com).

Supports the three applications types:

* Private - apps connecting to a single Org
* Public - apps that connect to any Org, but with a 30 minute limitation
* Partner - approved apps that can automatically refresh Org tokens.

Auto generated API Reference: [here](https://philals.github.io/xero-node-v3/).

# Features

- By 3.0.0 the SDK will
	- support for all [accounting endpoints]('https://developer.xero.com/documentation/api/api-overview')
	- have a generic methods for calling any unsupported endpoints

# Usage

This package can be installed via npm.

`npm install --save xero-node`

### Config Parameters

Please see the `example-config.json`.

| Parameter            | Description                                                                              | Mandatory | Default |
|----------------------|------------------------------------------------------------------------------------------|-----------|---------|
| ConsumerKey          | The consumer key that is required with all calls to the Xero API.,                       | True      | - |
| ConsumerSecret       | The secret key from the developer portal that is required to authenticate your API calls | True      | - |
| CallbackBaseUrl | The callback that Xero should invoke when the authorization is successful.               	  | False     | null |
| PrivateKeyCert       | The filesystem path to your privatekey.pem file to sign the API calls                    | False     | null |
| redirectOnError      | Whether Xero Auth should redirect to your app in the event the user clicks 'Cancel'      | False     | true |
npm
```javascript
//Sample Private App Config
{
    "ConsumerKey": "AAAAAAAAAAAAAAAAAA",
    "ConsumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "PrivateKeyCert": "/some/path/to/privatekey.pem"
}

//Sample Public App Config
{
    "ConsumerKey": "AAAAAAAAAAAAAAAAAA",
    "ConsumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "CallbackBaseUrl": 'https://www.mywebsite.com/xerocallback'
}

//Sample Partner App Config
{
    "ConsumerKey": "AAAAAAAAAAAAAAAAAA",
    "ConsumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "CallbackBaseUrl": 'https://www.mywebsite.com/xerocallback',
    "PrivateKeyCert" : "/some/path/to/partner_privatekey.pem"
}
```

## App Usage

```javascript
const xero = require('xero-node').AccountingAPIClient;
const config = require('/some/path/to/config.json');

const xeroClient = new xero(config);
```

Examples
========

Sample app using this package: https://github.com/XeroAPI/xero-node-sample-app

The best location for examples are the [example tests](https://github.com/philals/xero-node-v3/tree/master/src/__tests__/integration). However, here are a few:

```javascript
//Print a count of invoices
let invoices = xero.invoices.get()
console.log("Invoices: " + invoices.length);
```

## Tests

Replace the `example-config.json` with `config.json` in the [integration test directory](https://github.com/philals/xero-node-v3/tree/master/src/__tests__/integration). Overwrite the example config values with your own from the [Developer Portal]('https://developer.xero.com/myapps'). Then run:

`npm test`

### Project philosophies

1. A simple and intuitive interface.
   eg:

    `PUT https://api.xero.com/api.xro/2.0/ContactGroups/b05466c8-dc54-4ff8-8f17-9d7008a2e44b/Contacts`

    Will become:

    `xero.contacts.contactGroups.create(contact)`

    Matching SDK methods names to endpoints, allows consumers to read the official API documentation and translate it to SDK method calls quickly.

    That rather than using HTTP verbs (`.put()`, `.post()` etc) the SDK will use actions. Example `get()`, `create()`,`delete()`, `update()`. This will abstract away the Xero's [funny](https://developer.xero.com/documentation/api/requests-and-responses) `PUT` vs `POST`.

2. A simple and single OAuth flows. Rather than automatically refreshing tokens, the SDK we will expose methods which allow the OAuth methods eg Refreshing Tokens etc. Consideration is also being made to OAuth2.

3. Abstracted underlyting OAuth/HTTP lib. This will allow swapping it out if we needed. The SDK won't bleed the OAuth libs exception types onto the consumer when it hits a 500/400 etc. Having a OAuth/HTTP layer will allow reuse and extension to other APIs (Payroll, Expenses etc).

5. Minimal to no entity/request/response validation. A consumer will pass in JSON and get JSON out. There will be no manipulation of data along the way. Helper methods if asked for will be provided by a separate module. This will reduce maintenance costs.

4. Unit tests

5. Writing the SDK in Typescript will allow us to provide TS types for the API's contracts, and it's what we use internally at Xero. This will also aid in self-generated docs.

# There are LOTS of TODOs in code and on our Kanban board - Feel free to pick one off

## Maintainers
@philals @iamam34 @bryanlloydtee @dannyvincent @dupski

## Endpoint completion

- [ ] attachments
- [ ] accounts
- [ ] bankstatements
- [ ] banktransactions
- [ ] bank-transfers
- [ ] branding-themes
- [ ] contacts
- [ ] contactgroups
- [ ] credit-notes
- [ ] currencies
- [ ] employees
- [ ] expense-claims
- [ ] invoices
- [ ] invoice-reminders
- [ ] items
- [ ] journals
- [ ] linked-transactions
- [ ] manual-journals
- [ ] organisation
- [ ] overpayments
- [ ] payments
- [ ] prepayments
- [ ] purchase-orders
- [ ] receipts
- [ ] repeating-invoices
- [ ] reports
- [ ] tax-rates
- [ ] tracking-categories
- [ ] users
- [ ] types
