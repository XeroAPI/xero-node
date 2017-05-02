## Setup / Connection

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

Once created this file should be saved somewhere that is visible to your application.

### Config Parameters

| Parameter            | Description                                                                              | Mandatory |
|----------------------|------------------------------------------------------------------------------------------|-----------|
| UserAgent            | The useragent that should be used with all calls to the Xero API                         | True      |
| ConsumerKey          | The consumer key that is required with all calls to the Xero API.,                       | True      |
| ConsumerSecret       | The secret key from the developer portal that is required to authenticate your API calls | True      |
| AuthorizeCallbackUrl | The callback that Xero should invoke when the authorization is successful.               | False     |
| PrivateKeyPath       | The filesystem path to your privatekey.pem file to sign the API calls                    | False     |
| RunscopeBucketId     | Your personal runscope bucket for debugging API calls                                    | False     |
---

**Note:** `RunscopeBucketId` has been added to support debugging the SDK.  Runscope is a simple tool for Testing Complex APIs. You can use Runscope to verify that the structure and content of your API calls meets your expectations. 

Sign up for a free runscope account at http://runscope.com and place your bucket ID in the config file to monitor API calls in real time.

Runscope is not endorsed by or affiliated with Xero. This tool was used by the SDK creator when authoring the code only.

## Creating the Client

The client needs to be created depending on your application type (and the config file that was created).  You have three options to choose from:

* Private - can only connect to a single Xero Org
* Public  - can connect to any number of Xero Orgs, but with a 30 minute token expiry
* Partner - can connect to any number of Xero Orgs, with a 30 minute expiry and auto-refresh capability

Once you've chosen this, you can import the appropriate dependency from the `xero-node` library e.g.

## Private App Usage

```javascript
var xero = require('xero-node');
var fs = require('fs');
var config = require('/some/path/to/config.js');

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) 
    config.privateKey = fs.readFileSync(config.privateKeyPath);

var xeroClient = new xero.PrivateApplication(config);
```

## Public Usage

```javascript
var xero = require('xero-node');
var fs = require('fs');
var config = require('/some/path/to/config.js');

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) 
    config.privateKey = fs.readFileSync(config.privateKeyPath);

var xeroClient = new xero.PublicApplication(myConfigFile);
```

## Partner Usage

```javascript
var xero = require('xero-node');
var fs = require('fs');
var config = require('/some/path/to/config.js');

//Private key can either be a path or a String so check both variables and make sure the path has been parsed.
if (config.privateKeyPath && !config.privateKey) 
    config.privateKey = fs.readFileSync(config.privateKeyPath);
    
var xeroClient = new xero.PartnerApplication(myConfigFile);
```

Now that you've got your Xero client, you can make some calls!
