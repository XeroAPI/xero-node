xero-node
===========
An API wrapper for xero (http://developer.xero.com).

Supports all three applications types:

* Private
* Public
* Partner


Create an Issue for any suggestions, specifically how to tidily support Where in a simple fashion.

Features
========
Implemented/Planned

* Support all API operations
* Efficient paging
* Support for Private, Public, and Partner applications (look at oauth_test/server.js for 3 stage support)


Installation
============

    $ npm install xero-node --save


Private Usage
=============
```javascript
var PrivateApplication = require('xero-node').PrivateApplication;
var privateApp = new PrivateApplication();

// This checks the ~/.xero/config.json directory by default looking for a config file.
// Alternatively a path to a JSON file can be provided as a parameter:

var myConfigFile = "/tmp/config.json";
var privateApp = new PrivateApplication(myConfigFile);
```

Config file should be set up as follows:

```javascript
{
    "consumerSecret" : "AAAAAA",
    "consumerKey" : "BBBBBB",
    "privateKey" : "/path/to/privateKey.pem"
}
```

Pubic Usage - TO BE UPDATED (Not currently tested)
=============
```javascript
var PublicApplication = require('xero-node').PublicApplication;
var publicApp = new PublicApplication({ consumerSecret: 'AAAAA', consumerKey: 'BBBBBB'});
```

Partner Usage - TO BE UPDATED (Not currently tested)
=============
```javascript
var ParnetApplication = require('xero-node').PartnerApplication;
var partnerApp = new PartnerApplication({ consumerSecret: 'AAAAA', consumerKey: 'BBBBBB', privateKeyPath: './cert/privatekey.pem', sslCertPath: './cert/ssl.crt'});
```

Examples
========
Print a count of invoices:

```javascript
//Print a count of invoices
privateApp.core.invoices.getInvoices().then(function(invoices) {
    console.log("Invoices: " + invoices.length);

}).fail(function(err) {
    console.error(err);
});
```

Print the name of some filtered contacts:

```javascript
//Print the name of a contact
privateApp.core.contacts.getContacts({ where: 'Name.Contains("Bayside")' }).then(function(contacts) {

    contacts.forEach(function(contact) {
        console.log(contact.Name);
    }, this);

}).fail(function(err) {
    console.error(err);
});
```

Efficient paging:

```javascript
privateApp.core.contacts.getContacts({ pager: {start:1 /* page number */, callback:onContacts}})
    .fail(function(err) {
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
publicApp.core.contacts.getContacts({ modifiedAfter: new Date(2013,1,1) })
    .then(function(contacts)
    {
        _.each(contacts,  function(contact)
        {
            // Do something with contact
        })
    })

```


Tests
==========

npm test


Release History
==============

* 1.0.0
    - Merged master branch from guillegette
    - Merged master branch from elliots
    - Externalised configs for private apps (keys should not live in the code)
    - Fixed the private app 'consumerKey' Issue
    - Fixed the logger so it correctly supports different log levels
    - Added support for runscope urls in the signature generation
* 0.0.2
    - Added journals
    - modifiedAfter support
* 0.0.1
    - Initial Release


Copyright (c) 2017 Tim Shnaider, Guillermo Gette, Andrew Connell, Elliot Shepherd, Jordan Walsh

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

