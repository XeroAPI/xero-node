xero-node (alpha)
===========

[![npm version](https://badge.fury.io/js/xero-node.svg)](https://badge.fury.io/js/xero-node)

An API wrapper for xero (http://developer.xero.com).

Supports the three applications types:

* Private - apps connecting to a single Org
* Public - apps that connect to any Org, but with a 30 minute limitation
* Partner - approved apps that can automatically refresh Org tokens

For any suggestions create a github issue, or fork the code and submit a PR.

# Features

The following Xero API functions are supported:
* Accounts
* Attachments
* Bank Transactions
* Bank Transfers
* Branding Themes
* Contacts
* Contact Groups
* Credit Notes
* Currencies
* Employees
* Expense Claims
* Invoices
* Invoice Reminders
* Items
* Journals
* Manual Journals
* Linked Transactions
* Organisations
* Overpayments
* Payments
* Prepayments
* Purchase Orders
* Receipts
* Repeating Invoices
* Reports
* Tax Rates
* Tracking Categories (and Tracking Options)
* Users

The following endpoints are included but are not currently under test nor are they supported for use:
* Timesheets (Payroll API)
* Employees (Payroll API)
* PayItems (Payroll API)


The following features are provided:
* Create / Read / Update / Delete (for most endpoints)
* Search (using 'where' clause)
* Efficient pagination with callbacks
* Support for Private, Public, and Partner applications (check out the sample app https://xero-sample-app.herokuapp.com for 3 legged oauth example)


# Usage

This package can be installed via npm or yarn.

`npm install --save xero-node`

`yarn add xero-node`

### Config Parameters

| Parameter            | Description                                                                              | Mandatory |
|----------------------|------------------------------------------------------------------------------------------|-----------|
| userAgent            | The useragent that should be used with all calls to the Xero API                         | True      |
| consumerKey          | The consumer key that is required with all calls to the Xero API.,                       | True      |
| consumerSecret       | The secret key from the developer portal that is required to authenticate your API calls | True      |
| authorizeCallbackUrl | The callback that Xero should invoke when the authorization is successful.               | False     |
| privateKeyPath       | The filesystem path to your privatekey.pem file to sign the API calls                    | False     |
| runscopeBucketId     | Your personal runscope bucket for debugging API calls                                    | False     |
| redirectOnError      | Whether the Xero Auth process should redirect to your app in the event the user clicks 'Cancel'   | False     |
---

```javascript
//Sample Private App Config
{
    "userAgent" : "REPLACE ME",
    "consumerKey": "AAAAAAAAAAAAAAAAAA",
    "consumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "privateKeyPath": "/some/path/to/privatekey.pem",
    "runscopeBucketId" : "xxxyyyzzzz"
}

//Sample Public App Config
{
    "userAgent" : "REPLACE ME",
    "consumerKey": "AAAAAAAAAAAAAAAAAA",
    "consumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "authorizeCallbackUrl": 'https://www.mywebsite.com/xerocallback',
    "runscopeBucketId" : "xxxyyyzzzz",
    "redirectOnError" : true
}

//Sample Partner App Config
{
    "userAgent" : "REPLACE ME",
    "consumerKey": "AAAAAAAAAAAAAAAAAA",
    "consumerSecret": "BBBBBBBBBBBBBBBBBBBB",
    "authorizeCallbackUrl": 'https://www.mywebsite.com/xerocallback',
    "privateKeyPath" : "/some/path/to/partner_privatekey.pem",
    "runscopeBucketId" : "xxxyyyzzzz",
    "redirectOnError" : true
}
```

**Note:** `RunscopeBucketId` has been added to support debugging the SDK.  Runscope is a simple tool for Testing Complex APIs. You can use Runscope to verify that the structure and content of your API calls meets your expectations. 

Sign up for a free runscope account at http://runscope.com and place your bucket ID in the config file to monitor API calls in real time.

Runscope is not endorsed by or affiliated with Xero. This tool was used by the SDK creator when authoring the code only.


## App Usage

```javascript
const xero = require('xero-node');
const fs = require('fs');
const config = require('/some/path/to/config.json');

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) 
    config.privateKey = fs.readFileSync(config.privateKeyPath);

// Available application types are:
// xero.PrivateApplication
// xero.PublicApplication
// xero.PartnerApplication

const xeroClient = new xero.PrivateApplication(config);
```

Examples
========

Sample app using this package: https://github.com/XeroAPI/xero-node-sample-app

Print a count of invoices:

```javascript
//Print a count of invoices
xeroClient.core.invoices.getInvoices()
.then(invoices => {
    console.log("Invoices: " + invoices.length);
}).catch(err => {
    console.log(err);
});
```

Print the name of some filtered contacts:

```javascript
//Print the name of a contact
xeroClient.core.contacts.getContacts({ 
    where: 'Name.Contains("Bayside")' 
})
.then(contacts => {
    contacts.forEach(contact => {
        console.log(contact.Name);
    });
}).catch(err => {
    console.log(err);
});
```

Efficient paging:

```javascript
/* Called per page */
const onContacts = (err, response, cb) => {
    let contacts = response.data;
    if (response.finished) // finished paging
        ....
    cb(); // Async support
};

xeroClient.core.contacts.getContacts({ pager: {start:1 /* page number */, callback: onContacts}})
    .catch(err => {
        console.log(`Oh no, an error: ${err}`);
    });

```

Filter support: Modified After
```javascript
// No paging
xeroClient.core.contacts.getContacts({ 
    modifiedAfter: new Date(2013,1,1) 
})
.then(contacts => {
    contacts.forEach(contact => {
        // Do something with contact
    });
})

```


Get and Save an Invoice as a PDF:
```javascript
var invoiceId = "924XXXXXXXXXXX56f";       
  xeroClient.core.invoices.getInvoice(invoiceId, null, null, null,null,"application/pdf")
    .then(function(data) {
      fs.writeFile(data.FileName, data.PdfContentRaw, 'binary', function(){
        // Do something with the file
      });
    })
```


Void a Credit Note:
```javascript
  var CreditNoteID = '7adXXXXXXXXXXXXXXXX2cda';

  var data = {
    CreditNoteID: CreditNoteID,
    Status: 'VOIDED'
  };

  var creditnote = xeroClient.core.creditNotes.newCreditNote(data,null);
  creditnote.save()
    .then(function(ret) {
      // Do something with the file
    })
```

## Docs

Check the [`docs`](./docs) folder for more detailed examples of how to use each SDK function. 

## Tests

`npm test`

## Roadmap

Feel free to send PRs on any of these issues.

- [x] Add ESLint rules
- [ ] ESLint rule complaint
- [ ] Update code to use modern ES6 syntax and style
- [x] Remove log4js
- [x] Remove xml2js dependency
- [x] Remove console.log
- [ ] Throw exceptions with good messaging
- [ ] Remove lodash
- [ ] More unit tests


## Release Change Log

* 2.19.0
    - Fix missing 'OrganisationID' after called organisation.toJSON() #173
* 2.18.0
    - PR#171 Preserve CurrencyCode when serializing an Accout
    - Remove NYC as cost > benefit
    - Removes content type checking from #156 as it was failing a test
* 2.17.0
    - Merge #157 CreditNote Entity Update and ContactPersons fixed on Contact Entity (not including any RSA checking)
* 2.16.0
    - Merge PDF Download code from PR 119 #156 (Resolves #119 and #120)
* 2.15.0
    - Adds 'statusCode' property to errors returned from API calls #153
* 2.14.0
    - Make npm the default over yarn #136
* 2.13.0
    - Merged Fixed Payroll Timesheet Entity Helper #148
    - Merged Fixed bug in Payroll Employee Entity #147
    - Merged Fix error references #145
    - Merged Reference field added to creditnote schema #143
    - Merged Added unitdp to GetInvoice #142
* 2.12.0
    - Merged #139 - Options on Manual Journals and using ManualJournalID
* 2.11.0
    - Merged #149 - Add IsNonRecoverable property to TaxComponent
    - Merged #128 - First pass fixes for eslint errors
* 2.10.1
    - Merged [PR#109](https://github.com/XeroAPI/xero-node/pull/109) - Fix undefined data on checkExpiry failure
    - Merged [PR#108](https://github.com/XeroAPI/xero-node/pull/108) - Fix serialization of credit note properties
* 2.10.0
    - Merged [PR#104](https://github.com/XeroAPI/xero-node/pull/98) - Add support for linked transactions
    - Merged [PR#103](https://github.com/XeroAPI/xero-node/pull/103) - Add support for Prepayments
    - Merged [PR#102](https://github.com/XeroAPI/xero-node/pull/102) - Add support for OverPayments 
* 2.9.0
    - Merged [PR#98](https://github.com/XeroAPI/xero-node/pull/98) - Add support for redirectOnError
* ~~2.7.0~~ Released as 2.8.0
    - Merged [PR#84](https://github.com/XeroAPI/xero-node/pull/84) - Add support for Employees
    - Merged [PR#85](https://github.com/XeroAPI/xero-node/pull/85) - Fix for BankTransactions
    - Merged [PR#88](https://github.com/XeroAPI/xero-node/pull/88) - Add support for Receipts' Endpoint 
    - Merged [PR#89](https://github.com/XeroAPI/xero-node/pull/89) - Fix issue for Tracking Categories
    - Merged [PR#90](https://github.com/XeroAPI/xero-node/pull/90) - Add support for Expense Claims
    - Merged [PR#92](https://github.com/XeroAPI/xero-node/pull/92) - Add support for Purchase Orders 
    - Merged [PR#94](https://github.com/XeroAPI/xero-node/pull/94) - Issue 87
* 2.6.0
    - Merged [PR#79](https://github.com/XeroAPI/xero-node/pull/79) - Add support for ContactGroups
    - Merged [PR#80](https://github.com/XeroAPI/xero-node/pull/80) - Fixes Contact address deatil schema.
* 2.5.3
    - Merged [PR#76](https://github.com/XeroAPI/xero-node/pull/76) - Updated the docs to add repeating invoices (missed from PR#72).
    - Merged [PR#75](https://github.com/XeroAPI/xero-node/pull/75) - Added documentation about invoice/contact filters.
* 2.5.2
    - Merged [PR#72](https://github.com/XeroAPI/xero-node/pull/72) - Fix for Issue#71 to add support for the repeating invoices endpoint.
    - Merged [PR#70](https://github.com/XeroAPI/xero-node/pull/70) - Fix for Issue#69 where oauth errors were not being serialised to JSON.
* 2.5.1
    - Merged [PR#68](https://github.com/XeroAPI/xero-node/pull/68) - Fix for Issue#67 where attachments with an '&' in the name couldn't be downloaded.
* 2.5.0
    - Merged [PR#65](https://github.com/XeroAPI/xero-node/pull/65) - Removed xml2js and instead use only application/json as a content-type.
    - Refactored e2e tests to be modular and easier to maintain
    - Fixed various linting and code styling issues
    - Updated extend.js to latest version of Backbone
    - Updated Date variables in all schemas to be Date Objects instead of strings.
* 2.4.0
    - Merged [PR#64](https://github.com/XeroAPI/xero-node/pull/64) - Updated accountingtests.js to pass ESlint rules.
    - Merged [PR#63](https://github.com/XeroAPI/xero-node/pull/63) - Add style guide and ESlint check.
    - Merged [PR#61](https://github.com/XeroAPI/xero-node/pull/61) - Add roadmap to readme.
    - Merged [PR#59](https://github.com/XeroAPI/xero-node/pull/59) - Remove log4js dependency. Uses console.log instead.
* 2.3.0
    - Removed the sample application as there was an issue with clashing dependencies.  This has been moved to a separate repo: [xero-node-sample-app](https://github.com/XeroAPI/xero-node-sample-app)
    - Merged [PR#58](https://github.com/XeroAPI/xero-node/pull/58) - Fix lodash require issue.
    - Merged [PR#57](https://github.com/XeroAPI/xero-node/pull/57) - Give xml2js a version in package.json
    - Merged [PR#56](https://github.com/XeroAPI/xero-node/pull/56) - Update docs issue in Payments.md.
* 2.2.2
    - Merged [PR#55](https://github.com/XeroAPI/xero-node/pull/55) - Fixed webpack warning.
    - Merged [PR#53](https://github.com/XeroAPI/xero-node/pull/53) - Updated log4js.
    - Merged [PR#51](https://github.com/XeroAPI/xero-node/pull/51) - Moved unecessary dependencies into dev dependencies.
* 2.2.1
    - Merged [PR#49](https://github.com/XeroAPI/xero-node/pull/49) - Merge PR#49 to change `createPayment` method to be `newPayment` in line with other entities, and introduce a new savePayments method for creating multiple payments in one call.
* 2.2.0
    - Merged [PR#46](https://github.com/XeroAPI/xero-node/pull/46) - Merge PR#45 and provide library level support for boolean values (formerly this required string conversion).
* 2.1.8
    - Merged [PR#44](https://github.com/XeroAPI/xero-node/pull/44) - Merge PR#43 and expose more contact fields (fix for issue #40).
* 2.1.7
    - Merged [PR#41](https://github.com/XeroAPI/xero-node/pull/41) - Added support for multiple item creation (fix for issue #39).
* 2.1.6
    - Merged [PR#38](https://github.com/XeroAPI/xero-node/pull/38) - Fixed attachment streaming bug on partner applications.
* 2.1.5
    - Merged [PR#34](https://github.com/XeroAPI/xero-node/pull/34) - Updated lodash version as this was causing minor issues.
* 2.1.4
    - Merged [PR#24](https://github.com/XeroAPI/xero-node/pull/24) - Add support for Manual Journals.
* 2.1.3
    - Merged [PR#18](https://github.com/XeroAPI/xero-node/pull/18) - set a default useragent header when not provided in the config file and warn the user.
* 2.1.2
    - Merged [PR#17](https://github.com/XeroAPI/xero-node/pull/17) - fix typo.
* 2.1.1
    - Merged [PR#16](https://github.com/XeroAPI/xero-node/pull/16) - fix typo.
* 2.1.0
    - Added support for adding Attachments to Accounts, BankTransactions, BankTransfers, Contacts, CreditNotes and Invoices
    - Fixed issues in the readme.
* 2.0.2
    - Merged changes from [PR#10](https://github.com/XeroAPI/xero-node/pull/10) which fixes an issue where errors were being swallowed.
* 2.0.1
    - Updated readme to reference npm availability.
* 2.0.0 
    - Updated package for NPM deployment. Jump to v2.0.0 under advise of NPM.
* 0.0.4
    - [view](http://github.com/XeroAPI/xero-node/commit/0e9444051537806b5567c08080cd95b93449cbdf) Externalised the config file for private apps, fixed the log level settings, updated the tests to use 'should' library, added support for runscope urls within the signature generation 
    - [view](http://github.com/XeroAPI/xero-node/commit/88d22ffee782288bf375462396490dfb21e7fd15) updated readme 
    - [view](http://github.com/XeroAPI/xero-node/commit/fa4ed825995e8fdbfb2e257a72f34696ce5d91fe) updated tests to check each field of an account 
    - [view](http://github.com/XeroAPI/xero-node/commit/0497a8ae7d68549a8e8358151cf5c340af74bf6a) added account tests. Currently there is an issue creating new accounts: BankAccountNumber is not being sent through. Needs investigation 
    - [view](http://github.com/XeroAPI/xero-node/commit/17ed6605f6fd84bfc875e87c81c00b8fab830ca5) added more tests for accounts. Fixed bug around passing BankAccountNumbers. TODO: Delete method hasn't been implemented globally. 
    - [view](http://github.com/XeroAPI/xero-node/commit/12a60708fd8448fad90444b842613e34d642bfe5) added support for Payments, however this is still in progress. 
    - [view](http://github.com/XeroAPI/xero-node/commit/72546b964ff12a664573a77e41ab5ad6e9c1c1c6) fixed bug with payments, these are working as expected 
    - [view](http://github.com/XeroAPI/xero-node/commit/aff762aedf4583f4ff637662ddd52dcb466d4bbe) updated banktransactions to copy contact objects from XML correctly 
    - [view](http://github.com/XeroAPI/xero-node/commit/cb8a1a06e5aefc60fbd669a343fb3efeb7dae2a2) removed guid from test 
    - [view](http://github.com/XeroAPI/xero-node/commit/4464acf9576aff61fa09b2cca9eb2a229c357244) changed tests to all running 
    - [view](http://github.com/XeroAPI/xero-node/commit/e1fce607e9928d60b1f9fd1831ae50208900cf45) added support for invoice rounding 
    - [view](http://github.com/XeroAPI/xero-node/commit/0df589e3d39c5522549d2d5f53f4a9b4ff27ba12) updated DP rounding fix to remove double querystring additions 
    - [view](http://github.com/XeroAPI/xero-node/commit/eefd34a7535236d14edcc8b02b08e3dc64649f77) added support for externalising user-agent header in config.json file 
    - [view](http://github.com/XeroAPI/xero-node/commit/edd51f9a5e512b4e2db787dc27feed63cf6c944b) added zombie support to gain access tokens on public apps 
    - [view](http://github.com/XeroAPI/xero-node/commit/f947eced4aa0e6ac304c9a0e2c2190af37564d41) added support for istanbul test reporting, and completed support for public app auth 
    - [view](http://github.com/XeroAPI/xero-node/commit/2b8b65a27799298e1a6e4e1e262725490d8c9972) fixed issue with banktransfers fromXML function, updated tests to pass above 80% 
    - [view](http://github.com/XeroAPI/xero-node/commit/c4a9b248977466e0d2709e4e3630ef8cff8abd8c) fixed tests for contacts and added more address information to the schema 
    - [view](http://github.com/XeroAPI/xero-node/commit/b5b82aedf87bfbb156f935b9a78b06cc8a82821c) updated items to support retrieving and saving 
    - [view](http://github.com/XeroAPI/xero-node/commit/5a64852bd5056dbe3d1044bb3f96fba06689af1f) updated various elements to have consistent responses on when save() is called. Updated Items tests to have 100% coverage.. woohoo 
    - [view](http://github.com/XeroAPI/xero-node/commit/efed46b222c898a1f63789ca2db1293537de752d) externalised the runscope bucket ID to the config file 
    - [view](http://github.com/XeroAPI/xero-node/commit/251b0839f5ab641f6a5bcf120d964765beaf9fd0) fixed the saveContacts method on the contacts object and did some refactoring. This concept could be applied across all endpoints. Also removed some console.log statements from the code 
    - [view](http://github.com/XeroAPI/xero-node/commit/a2409633a78825880f85c7ac776a90262dd7b6c5) added tests for Journals 
    - [view](http://github.com/XeroAPI/xero-node/commit/882fedf9f995d2eeedfec4da9a92f360ff0e1eca) added payment tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/34ab49da6e823c343b9b6298d40d39d8fcae46ab) added support for tracking categories but tracking options is not currently working 
    - [view](http://github.com/XeroAPI/xero-node/commit/86c57337933acf057776f40aee48fc1c59577497) added support for tracking categories and tracking options 
    - [view](http://github.com/XeroAPI/xero-node/commit/16fff713121faa84dd831318ceb62422ed6bf5b3) Added attachment Tests but these aren't currently working 
    - [view](http://github.com/XeroAPI/xero-node/commit/65d964acb25a95597c96f6363be4ad8a09c363e0) Updated readme 
    - [view](http://github.com/XeroAPI/xero-node/commit/57066c8b89dc4e8a1fe1bd7f26cf0965cea33dcf) updated readme 
    - [view](http://github.com/XeroAPI/xero-node/commit/8a310f27e7b0a5720f84a6b175f019f4338a35b5) added support for Partner application types 
    - [view](http://github.com/XeroAPI/xero-node/commit/ccbb239995e75abbc290031342cbfeca749c1f9e) updated sample app to get this working 
    - [view](http://github.com/XeroAPI/xero-node/commit/5cf2235050be389387d76de8b7b5430c649455c4) Updated tests to override the default callback URL 
    - [view](http://github.com/XeroAPI/xero-node/commit/e2253364db39707e5f240218b74c040573f58301) Updated the sample app to use a bootstrap theme. 
    - [view](http://github.com/XeroAPI/xero-node/commit/d093f8d3bcf8914ae4b15b5ea18f81eb7466406b) Added more support for features in the sample app 
    - [view](http://github.com/XeroAPI/xero-node/commit/d5952b32bc69c58a317ffd9568baf73520badf4a) Added support for the remaining endpoints to sample app 
    - [view](http://github.com/XeroAPI/xero-node/commit/cfc846f639b3f41d59694b125a346a2fae58fdca) Added navigation highlights 
    - [view](http://github.com/XeroAPI/xero-node/commit/7e8a62d64e4d140edf34a7a9ecdb34e847d90186) Updated oauth_test to sample_app 
    - [view](http://github.com/XeroAPI/xero-node/commit/29f80b01ed42fda48df3be4048f6cf7827d961b3) Merge pull request #3 from jordanwalsh23/v1.0.0 
    - [view](http://github.com/XeroAPI/xero-node/commit/5f719b131ac84cc5206f11e6aaf23bcb415ef4ca) added various tests and updated sample app 
    - [view](http://github.com/XeroAPI/xero-node/commit/be1dac5e9aca3f0700fbef535016bf2340fd85ca) Merge pull request #4 from jordanwalsh23/v1.0.0 
    - [view](http://github.com/XeroAPI/xero-node/commit/ca30b9bdf02765f30930633cadb2d05889ca3cf6) updated tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/d79da2117cc7e87de1a6a31f66692c53df3de994) adding tax rates 
    - [view](http://github.com/XeroAPI/xero-node/commit/dc6cb40de1dd464b51674f8956356a881ff75d19) Reflect the fact that issues are switched off 
    - [view](http://github.com/XeroAPI/xero-node/commit/642ad9b52b5c9fec1bba75deb5fb4ef95cccd831) Reflect deprecation of entrust certs 
    - [view](http://github.com/XeroAPI/xero-node/commit/c9d1ce3179ad07ccc18929cc1ffff3feed74da7b) Merge pull request #5 from davidbanham/no-issue 
    - [view](http://github.com/XeroAPI/xero-node/commit/6b56e2b5c91b2aaf269a81125690c140c6aae5df) Change user-specific config paths 
    - [view](http://github.com/XeroAPI/xero-node/commit/9246c0b6b5f60e4950998762d8b06e177e0ce186) Move config setup to before hook 
    - [view](http://github.com/XeroAPI/xero-node/commit/01c815f30aed8d597fcae005aab23bd6fc2636ab) Increase timeout for token tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/b972d2b43758e1ec02ff7a7c3c0c09424d4ab794) Drop org selection 
    - [view](http://github.com/XeroAPI/xero-node/commit/8c03f1287157a38e0fdaac67d9fc329e06227cdf) updated gitignore to ignore *config.json files 
    - [view](http://github.com/XeroAPI/xero-node/commit/7956c1fbe2bb73bb0f8fcada1db7b66aebd028f5) Merge branch 'master' of github.com:jordanwalsh23/xero-node 
    - [view](http://github.com/XeroAPI/xero-node/commit/3dbbc3293277ee82854a051bc6ab74b89a3d693a) Merge pull request #6 from davidbanham/deprecate-entrust 
    - [view](http://github.com/XeroAPI/xero-node/commit/5918bb842f2f0f6c7727181d22c3ab87e2ce5b44) Merge branch 'master' of github.com:jordanwalsh23/xero-node 
    - [view](http://github.com/XeroAPI/xero-node/commit/c75e2da0e49afcf0b250aa928a58e96829815795) Explain test failure for tax rates get test 
    - [view](http://github.com/XeroAPI/xero-node/commit/2ced01354d1123026cfdf4cc08758d3476388d17) Fix reference to undefined `obj`
    - [view](http://github.com/XeroAPI/xero-node/commit/d83c845c9be87b088ce8feeec6afb501879efb85) Throw errors instead of objects. 
    - [view](http://github.com/XeroAPI/xero-node/commit/03d0052e450ce87da0b117dd93355acf2f79780a) fixing taxrates 
    - [view](http://github.com/XeroAPI/xero-node/commit/e2c8efcd5846531573ef2149a8471521aabd1196) Merge pull request #7 from davidbanham/fix-errors 
    - [view](http://github.com/XeroAPI/xero-node/commit/8e76123b19cb786cc50b14fa4172d03e7e0d386d) Merge branch 'master' of github.com:jordanwalsh23/xero-node 
    - [view](http://github.com/XeroAPI/xero-node/commit/23949da7dda02196e2ca9544cc347e844e38bc84) fixed taxrates test 
    - [view](http://github.com/XeroAPI/xero-node/commit/2a4dc93ab95d0d64c98c7e35544a0364afb36616) Add missing space to error message 
    - [view](http://github.com/XeroAPI/xero-node/commit/6b96d4260ba4f23163e7d8745a8b696ec0232708) Add account creation hooks to payment tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/f0ab37b8a94192d6c46f4280d267b118f938a2b2) Set timeout globally 
    - [view](http://github.com/XeroAPI/xero-node/commit/5771b5c3a3a200c1940c30438ee47c4318ec7f6d) Add account creation hooks to bank transaction testing 
    - [view](http://github.com/XeroAPI/xero-node/commit/1828d87af188e2fa6cb8f72bbc32d5ee90f633fc) Use created bank accounts for bank transfers tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/5f2f480cca18ca483860a8c1b2b1d0e81ef175e0) Add setup and teardown of tracking categories for region test 
    - [view](http://github.com/XeroAPI/xero-node/commit/4adccb897a3318d3951851cfea1b51e1b5effc92) Make accounts test repeatable 
    - [view](http://github.com/XeroAPI/xero-node/commit/28d361cd732be9f7d1b5377d933d786e3fb7656f) Unskip working tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/f96b5a330a8f4411575273a6099ddf63dc2b5166) Unskip tax rate test after rebase 
    - [view](http://github.com/XeroAPI/xero-node/commit/5d31493d777e40b46d185f38108bc57cbb97fece) Merge branch 'davidbanham-refactor-tests' 
    - [view](http://github.com/XeroAPI/xero-node/commit/308b85dcb9c1611db1ed293f77bf7e7054aa5abc) s/fail/catch/g 
    - [view](http://github.com/XeroAPI/xero-node/commit/36484a5e5ab12d01d47f2bae466856fd968b6ea3) Add entropy to updated name 
    - [view](http://github.com/XeroAPI/xero-node/commit/761b2c6e42e300b70ad2a43a682333adf9c37a22) Switch application.js to native Promises 
    - [view](http://github.com/XeroAPI/xero-node/commit/7bbd1bf04b9eda400154af74889a7848037e2bce) Complete switch to native promises 
    - [view](http://github.com/XeroAPI/xero-node/commit/0d92db48ded79bb999fb3ec22e6087ab759f3d54) Add editorconfig for 4 space tabs 
    - [view](http://github.com/XeroAPI/xero-node/commit/2e38ead301e2b1638295fe0a978843a344c58e18) Add yarn lockfile 
    - [view](http://github.com/XeroAPI/xero-node/commit/3d6b613eccb05cf533043b76fc2ce8f9a1759507) Merge branch 'davidbanham-promises' 
    - [view](http://github.com/XeroAPI/xero-node/commit/8c55b7249afc7a3916f3396113c4735366e759bd) Merge branch 'meta' of git://github.com/davidbanham/xero-node into davidbanham-meta 
    - [view](http://github.com/XeroAPI/xero-node/commit/0f44ca7eeba70156cf0d657d58e7887c918dec35) Merge branch 'davidbanham-meta' 
    - [view](http://github.com/XeroAPI/xero-node/commit/01fa26d7494b43327bb08efb370149829f447fd9) Pass config variables rather than reading file from disc. 
    - [view](http://github.com/XeroAPI/xero-node/commit/35554a0201a0408d12a8178d7a547a91c287c9ff) Just use camelCase rather than PascalCase in passed config 
    - [view](http://github.com/XeroAPI/xero-node/commit/aadad1e7d5b98ff05cea072156261e1b931e8f9d) s/_.extend/Object.assign/g 
    - [view](http://github.com/XeroAPI/xero-node/commit/a439c1407b123e85891fda828054487f2aedf753) updated sample app to include taxrates and users 
    - [view](http://github.com/XeroAPI/xero-node/commit/535e15866215ebb261c2fabd6a060624757ae53a) Merge branch 'config' of git://github.com/davidbanham/xero-node into davidbanham-config 
    - [view](http://github.com/XeroAPI/xero-node/commit/8a51f1f7bcddde0fcefd92878cf74a260a84c13e) updated sample app and removed console.log from taxrate 
    - [view](http://github.com/XeroAPI/xero-node/commit/f732c5ea6dab546ea889d5210c8d57bc2d33df8d) Merge branch 'davidbanham-config' 
    - [view](http://github.com/XeroAPI/xero-node/commit/1b0a79dad13ab97fc22476308770fb944b559657) Merge branch 'less-lodash' of git://github.com/davidbanham/xero-node into davidbanham-less-lodash 
    - [view](http://github.com/XeroAPI/xero-node/commit/560950b4b8bfd8d4301cb5607e592269e8f380a9) migrated config files to their own directories 
    - [view](http://github.com/XeroAPI/xero-node/commit/619146e95126b17132b14b124f2536efe82e63da) Merged dabvidbanhan-less-lodash 
    - [view](http://github.com/XeroAPI/xero-node/commit/72937fe13d490037d91dbbb597e70f01f63930b3) updated sample_app.js to index.js 
    - [view](http://github.com/XeroAPI/xero-node/commit/7325004388adf28a185a09b3222dd43bdf8f3832) removed comments from json file 
    - [view](http://github.com/XeroAPI/xero-node/commit/762770eaab898ca33c518a92619562cbf2828e69) working on refresh functions 
    - [view](http://github.com/XeroAPI/xero-node/commit/9bcd056a85bf6a6d4e772208168b7292e5571fb1) implemented refresh function. Need to detect unauthorized API call and automatically refresh the tokens 
    - [view](http://github.com/XeroAPI/xero-node/commit/7dd4b15f59dd08aa57119ecb35a0a68f0aa7eeb0) added automatic refresh on the GET function, haven't tested it properly yet 
    - [view](http://github.com/XeroAPI/xero-node/commit/804e36ebaf1ad927580af1804b05ad516f7d909a) added refresh and check expiry functions. Also updated the sample app 
    - [view](http://github.com/XeroAPI/xero-node/commit/52ff3909e1ea29847f3b3e251de51ffff7b9034e) Minor cleanup of promise/callback confusion in tests 
    - [view](http://github.com/XeroAPI/xero-node/commit/71c2f6ecf70ef0b3a2d66bc51a2e94d34464b64f) Merge branch 'davidbanham-cleaner-tests' 
    - [view](http://github.com/XeroAPI/xero-node/commit/a73f23b4dbadd275af13f98669ae2aca66cac448) Merge branch 'master' into add_refresh_token_functionality 
    - [view](http://github.com/XeroAPI/xero-node/commit/c17877bd291c08a54b3f0a180611e94ac48f6e23) Added event emitter to send updated tokens. 
    - [view](http://github.com/XeroAPI/xero-node/commit/752f05a88415da37416712a96d1e35affee854b3) merged promise/callback fix 
    - [view](http://github.com/XeroAPI/xero-node/commit/bf5236023353a14b6aa94100e931dbd5c68bcf83) fixed test file merge issue 
    - [view](http://github.com/XeroAPI/xero-node/commit/acb9aeb6abb639830c2c2f479ba79eb848309ca2) added tax rates save and delete functions 
    - [view](http://github.com/XeroAPI/xero-node/commit/53a47c94b1b9a1f28a8e2b39e65e730ef06f1599) updated yarn.lockfile 
    - [view](http://github.com/XeroAPI/xero-node/commit/96d890aee3c5229bf564a7c88118b6626def182c) added the 'after' function to cleanup the test accounts 
    - [view](http://github.com/XeroAPI/xero-node/commit/95bd79c3819e1f3ab0cc8f2059d76e1d5117ec7f) Merge pull request #18 from jordanwalsh23/accounts_setup_teardown_cleanup 
    - [view](http://github.com/XeroAPI/xero-node/commit/5e2805d3fbb6f6094897e41428a7f4b57fb3e43f) re-added the tests after commenting them out 
    - [view](http://github.com/XeroAPI/xero-node/commit/003da15fe1b02a12051f48772082ce3f41355a61) Merge pull request #17 from jordanwalsh23/add_taxrate_support 
    - [view](http://github.com/XeroAPI/xero-node/commit/04099590532e6558103f9789e5a24883effd0666) Merge branch 'master' into add_refresh_token_functionality 
    - [view](http://github.com/XeroAPI/xero-node/commit/ae43d41b82a4f7af4db20262b25f470afe1d0e1f) reverted forced timeout of the token 
    - [view](http://github.com/XeroAPI/xero-node/commit/ed4d797ffec2bd27308b104d6c198166d5910b1b) Merge branch 'add_refresh_token_functionality' of github.com:jordanwalsh23/xero-node into add_refresh_token_functionality 
    - [view](http://github.com/XeroAPI/xero-node/commit/d2bff73444196a6441121d0fff3d85e529705a0e) Merge pull request #14 from
     jordanwalsh23/add_refresh_token_functionality
    - [view](http://github.com/XeroAPI/xero-node/commit/ef398494a34574b392e4b613068725c3a8476615) merged from master
    - [view](http://github.com/XeroAPI/xero-node/commit/2de70061e8b32dd4d75619b09aba95773fae3a48) Drop events dep
    - [view](http://github.com/XeroAPI/xero-node/commit/7e612c34ce32f4e165ae2b62ddc8376a7ce166cf) adding recursion to reports parsing
    - [view](http://github.com/XeroAPI/xero-node/commit/7f0199daf6afc3408b614b45d83d6d7ec2a0bb8a) Merge branch 'davidbanham-events'
    - [view](http://github.com/XeroAPI/xero-node/commit/0f0525f927fbbcc276150bc213f5fcaa9b4d196a) Clean up ternary expressions
    - [view](http://github.com/XeroAPI/xero-node/commit/12c5b81345356bc7e9c4002135d4a3ddec156a9d) Clean up setOptions API
    - [view](http://github.com/XeroAPI/xero-node/commit/ea168eb44b65b6b9e15053cc42c4c97da93adfa2) Remove catch statement for event handlers
    - [view](http://github.com/XeroAPI/xero-node/commit/673c805b4a337ef2c6e92a41bf1884f23cfdb88c) added reports to the sample app, not yet completed
    - [view](http://github.com/XeroAPI/xero-node/commit/16c5b96ad41e77c1c84042636b4dc507b8d220b4) Merge pull request #20 from davidbanham/events
    - [view](http://github.com/XeroAPI/xero-node/commit/10c879c0ff2a18c3e7609386cea28b5fd147bb75) Merge branch 'master' into add_reports_endpoint_support
    - [view](http://github.com/XeroAPI/xero-node/commit/b1c644aa2b714d94f073db5979667631e1f289d4) added reports view. Still has issues with rendering
    - [view](http://github.com/XeroAPI/xero-node/commit/bf11e6778da40d3c5c1cbe9223c56a3a9d7cbaca) Added support for 9 reports.
    - [view](http://github.com/XeroAPI/xero-node/commit/a1e63682633f1d24399e7986806442a0c089ffae) added support for retrieving branding themes
    - [view](http://github.com/XeroAPI/xero-node/commit/a321c23668a9e8001f9b9ef8596dc6bc27e61ca2) Merge pull request #21 from jordanwalsh23/add_reports_endpoint_support
    - [view](http://github.com/XeroAPI/xero-node/commit/4b5cef9300491177d144a18d235bc654890949f7) merged from master
    - [view](http://github.com/XeroAPI/xero-node/commit/954044c9ca482bcaf22d64bdf1540267ae77d60d) fixed require paths
    - [view](http://github.com/XeroAPI/xero-node/commit/7c4f51613782d94c9015ee5360be722829d143ba) Merge pull request #22 from jordanwalsh23/add_branding_themes
    - [view](http://github.com/XeroAPI/xero-node/commit/60d0287d69b97b8dcac554a5dd019ae34e88c416) added currencies support
    - [view](http://github.com/XeroAPI/xero-node/commit/1bd4eb9ba5c2265786c896bc123a5d77b72f3a7f) Merge pull request #23 from jordanwalsh23/add_currencies_support
    - [view](http://github.com/XeroAPI/xero-node/commit/84692e01889a3649a9ae080f96ee7870db2552ad) added name and version to user-agent header
    - [view](http://github.com/XeroAPI/xero-node/commit/d1868e5eeabb70201a6e7a6df1017c63f458eb0a) added support for retrieving invoice reminder settings
    - [view](http://github.com/XeroAPI/xero-node/commit/f31ff161d246a577eb0a1e69b4775c12ded05c81) Merge pull request #25 from jordanwalsh23/add_invoice_reminders
    - [view](http://github.com/XeroAPI/xero-node/commit/cfe7f08ae66eef7d7c2364a017b898c2afc7d603) Merge pull request #24 from jordanwalsh23/user_agent_modifier
    - [view](http://github.com/XeroAPI/xero-node/commit/4075135496b0dfcecf365dda323f9a17e73f5edb) added credit note support and refactored some methods
    - [view](http://github.com/XeroAPI/xero-node/commit/0e3efa4ed6ff04c640df4cc568592e15080d469d) added support for credit notes and allocations
    - [view](http://github.com/XeroAPI/xero-node/commit/4393358213ca3141dbf669296f0fdd25a0a270fa) Merge pull request #26 from jordanwalsh23/add_credit_notes
    - [view](http://github.com/XeroAPI/xero-node/commit/1879ce50e968d51fa4bd511f117c4c8d87c2ccb6) updated readme and sample app. Removed payroll functions from sample app.
    - [view](http://github.com/XeroAPI/xero-node/commit/ceb6e24adbca90bfa6f95dd8ae617fda66977841) updated package.json
    - [view](http://github.com/XeroAPI/xero-node/commit/83727e9520c94c390175c295c2947d96206b30bd) Merge pull request #27 from jordanwalsh23/prep_for_pr_to_master
    - [view](http://github.com/XeroAPI/xero-node/commit/f64e6f4f5f5551ba457536584df95ced30531f50) Merge pull request #3 from jordanwalsh23/master
    - [view](http://github.com/XeroAPI/xero-node/commit/644b633e9a22c7075089bfbe06cc44d541f97e76) added function to allow users to set the log level
    - [view](http://github.com/XeroAPI/xero-node/commit/ddea2ab7bfc9c2a75c1e092b732ea4b6de390107) Merge pull request #28 from jordanwalsh23/externalise_log_level
    - [view](http://github.com/XeroAPI/xero-node/commit/710ac94b615807b760dd5967b4d9dce463d80a78) updated readme
    - [view](http://github.com/XeroAPI/xero-node/commit/889ca7b2e222ce618cda752372577b9cc1a1c0a4) Merge branch 'master' of github.com:jordanwalsh23/xero-node
    - [view](http://github.com/XeroAPI/xero-node/commit/c0adcbc885a75f53d9c6c065912ee0e46fb6b98d) removed unecessary logging from test
    - [view](http://github.com/XeroAPI/xero-node/commit/ca750aa72b53e4913003608a0d83b458b10bc9f7) Merge pull request #4 from jordanwalsh23/master
* 0.0.3
    - Merged various orphan branches
* 0.0.2
    - Added journals
    - modifiedAfter support
* 0.0.1
    - Initial Release


Copyright (c) 2017 Tim Shnaider, Guillermo Gette, Andrew Connell, Elliot Shepherd, David Banham, and Jordan Walsh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
