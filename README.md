xero-node (v1.0.0)
===========
An API wrapper for xero (http://developer.xero.com).

Supports all three applications types:

* Private
* Public
* Partner

For any suggestions, fork the code and submit a PR.

# Features

The following endpoints are supported:
* Accounts
* BankTransactions
* BankTransfers
* Contacts
* Invoices
* Items
* Journals
* Organisations
* Payments
* TrackingCategories (and TrackingOptions)
* Users

The following endpoints are included but are not currently tested or supported for use:
* Attachments
* Timesheets (Payroll API)
* Employees (Payroll API)
* PayItems (Payroll API)


The following features are provided:
* Create / Read / Update / Delete (for most endpoints)
* Search (using 'where' clause)
* Efficient pagination with callbacks
* Support for Private, Public, and Partner applications (look at oauth_test/server.js for 3 stage support)


# Installation

    $ npm install xero-node --save


### External Config 

This SDK requires the config to be externalised to ensure private keys are not committed into your codebase by mistake.

The config file should be set up as follows:

```javascript
//Sample Private App Config
{
    "UserAgent" : "Tester (PRIVATE) - Application for testing Xero",
    "ConsumerKey": "AAAAAAAAAAAAAAAAAA",
    "ConsumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "PrivateKeyPath": "/some/path/to/privatekey.pem",
    "RunscopeBucketId" : "xxxyyyzzzz"
}

//Sample Public App Config
{
    "UserAgent" : "Tester (PUBLIC) - Application for testing Xero",
    "ConsumerKey": "AAAAAAAAAAAAAAAAAA",
    "ConsumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "AuthorizeCallbackUrl": 'https://www.mywebsite.com/xerocallback',
    "RunscopeBucketId" : "xxxyyyzzzz"
}

//Sample Partner App Config
{
    "UserAgent" : "Tester (PARTNER) - Application for testing Xero",
    "ConsumerKey": "AAAAAAAAAAAAAAAAAA",
    "ConsumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "AuthorizeCallbackUrl": 'https://www.mywebsite.com/xerocallback',
    "PrivateKeyPath" : "/some/path/to/partner_privatekey.pem",
    "RunscopeBucketId" : "xxxyyyzzzz"
}
```

### Config Parameters

| Parameter               | Description                                                                                     | Mandatory |
|-------------------------|-------------------------------------------------------------------------------------------------|-----------|
| UserAgent               | The useragent that should be used with all calls to the Xero API                                | True      |
| ConsumerKey             | The consumer key that is required with all calls to the Xero API.,                              | True      |
| ConsumerSecret          | The secret key from the developer portal that is required to authenticate your API calls        | True      |
| AuthorizeCallbackUrl    | The callback that Xero should invoke when the authorization is successful.                      | False     |
| PrivateKeyPath          | The filesystem path to your privatekey.pem file to sign the API calls                           | False     |
| RunscopeBucketId        | Your personal runscope bucket for debugging API calls                                           | False     |
| sendAnonymousUsageData  | Allows users to choose whether to send usage data back to Xero for debugging (default: true).   | False     |
---

**Note:** `RunscopeBucketId` has been added to support debugging the SDK.  Runscope is a simple tool for Testing Complex APIs. You can use Runscope to verify that the structure and content of your API calls meets your expectations. 

Sign up for a free runscope account at runscope.com and place your bucket ID in the config file to see API calls in real time.

Runscope is not endorsed by or affiliated with Xero. This tool was used by the SDK creator when authoring the code only.


## Private App Usage

```javascript
var PrivateApplication = require('xero-node').PrivateApplication;
var privateApp = new PrivateApplication();

// This checks the ~/.xero/config.json directory by default looking for a config file.
// Alternatively a path to a JSON file can be provided as a parameter:

var myConfigFile = "/tmp/config.json";
var xeroClient = new PrivateApplication(myConfigFile);
```

## Pubic Usage

```javascript
var PublicApplication = require('xero-node').PublicApplication;
var xeroClient = new PublicApplication(myConfigFile);
```

## Partner Usage

```javascript
var ParnerApplication = require('xero-node').PartnerApplication;
var xeroClient = new PartnerApplication(myConfigFile);
```

Examples
========
Print a count of invoices:

```javascript
//Print a count of invoices
xeroClient.core.invoices.getInvoices()
.then(function(invoices) {
    console.log("Invoices: " + invoices.length);
}).catch(function(err) {
    console.error(err);
});
```

Print the name of some filtered contacts:

```javascript
//Print the name of a contact
xeroClient.core.contacts.getContacts({ 
    where: 'Name.Contains("Bayside")' 
})
.then(function(contacts) {
    contacts.forEach(function(contact) {
        console.log(contact.Name);
    });
}).catch(function(err) {
    console.error(err);
});
```

Efficient paging:

```javascript
xeroClient.core.contacts.getContacts({ pager: {start:1 /* page number */, callback: onContacts}})
    .catch(function(err) {
        console.log('Oh no, an error');
    });

/* Called per page */
function onContacts(err, response, cb) {
    var contacts = response.data;
    if (response.finished) // finished paging
        ....
    cb(); // Async support
}
```

Filter support: Modified After
```javascript
// No paging
xeroClient.core.contacts.getContacts({ 
    modifiedAfter: new Date(2013,1,1) 
})
.then(function(contacts) {
    contacts.forEach(function(contact) {
        // Do something with contact
    });
})

```

## Tests

npm test

## Release History

* 1.0.0
    - Merged master branch from guillegette
    - Merged master branch from elliots
    - Externalised configs for private apps (keys should not live in the code)
    - Fixed the private app 'consumerKey' issue
    - Fixed the logger so it correctly supports different log levels
    - Added support for runscope urls in the signature generation
* 0.0.2
    - Added journals
    - modifiedAfter support
* 0.0.1
    - Initial Release


Copyright (c) 2017 Tim Shnaider, Guillermo Gette, Andrew Connell, Elliot Shepherd and Jordan Walsh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

