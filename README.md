[![npm version](https://badge.fury.io/js/xero-node.svg)](https://badge.fury.io/js/xero-node)
[![CircleCI](https://circleci.com/gh/XeroAPI/xero-node/tree/v3.svg?style=svg)](https://circleci.com/gh/XeroAPI/xero-node/tree/v3)

# node-xero

NodeJS Client for the [Xero API](http://developer.xero.com).

Supports all application types:

* Private - apps that can only connect to a single organisation
* Public - apps that can connect to any organisation, but only for 30 minutes at a time
* Partner - approved apps that can automatically refresh tokens

<!-- [API Reference](https://xeroapi.github.io/xero-node/). -->

# Features

- v3.0.0
	- all [accounting endpoints](https://developer.xero.com/documentation/api/api-overview)
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
	- generic methods (`get`, `put`, `post`, `delete`) for calling any unsupported endpoints

# Installation

This SDK is published as an npm package called `xero-node`.

```npm install --save xero-node```

### Configuration

Sample configuration files for various application types are in the [integration test directory](src/__integration_tests__).

| Parameter            | Description                                                                              | Mandatory | Default |
|----------------------|------------------------------------------------------------------------------------------|-----------|---------|
| ConsumerKey          | The consumer key that is required with all calls to the Xero API                         | True      | - |
| ConsumerSecret       | The secret key from the developer portal that is required to authenticate your API calls | True      | - |
| CallbackBaseUrl      | The callback that Xero should invoke when the authorization is successful               	  | False     | null |
| PrivateKeyCert       | The filesystem path to your privatekey.pem file to sign the API calls                    | False     | null |
| redirectOnError      | Whether Xero Auth should redirect to your app in the event the user clicks 'Cancel'      | False     | true |

# Usage

```javascript
const XeroClient = require('xero-node').AccountingAPIClient;
const config = require('/some/path/to/config.json');

const xeroClient = new XeroClient(config);

//Print a count of invoices
let invoices = xeroClient.invoices.get()
console.log("Number of Invoices: " + invoices.length);
```

### Examples

- [Integration tests](src/__integration_tests__)
- [Sample app](https://github.com/XeroAPI/xero-node-sample-app)

# Contributing

## Local development

There are lots of TODOs in code and on our GitHub Projects kanban board - feel free to pick one off.

After you clone the repository, run `npm install` to install required dependencies.

### Running the tests
1. Copy `private-config-example.json` to `private-config.json` in the [integration test directory](src/__integration_tests__).
2. Overwrite the example values with your own from the [Developer Portal](https://developer.xero.com/myapps).
3. (Do the same for `partner-config-example.json` if required.)
4. Run `npm test`

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
