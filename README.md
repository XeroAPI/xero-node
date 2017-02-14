xero-node
===========
An API wrapper for xero (http://developer.xero.com).

Supports all three applications types:

* Private

* Public

* Partner

This module will be completed to support ALL Core and Payroll operations by the end of February 2014.

Create an Issue for any suggestions, specifically how to tidily support Where in a simple fashion.

Features
========
Implemented/Planned

* Support all API operations

* Efficient paging

* Support for Private, Public, and Partner applications (look at oauth_test/server.js for 3 stage support)


Installation
============

    $ npm install node-xero


Private Usage
=============
```javascript
var PrivateApplication = require('node-xero').PrivateApplication;
var privateApp = new PrivateApplication({ consumerSecret: 'AAAAA', consumerKey: 'BBBBBB', privateKeyPath: './cert/privatekey.pem'});
```


Pubic Usage
=============
```javascript
var PublicApplication = require('node-xero').PublicApplication;
var publicApp = new PublicApplication({ consumerSecret: 'AAAAA', consumerKey: 'BBBBBB'});
```

Partner Usage
=============
```javascript
var ParnetApplication = require('node-xero').PartnerApplication;
var partnerApp = new PartnerApplication({ consumerSecret: 'AAAAA', consumerKey: 'BBBBBB', privateKeyPath: './cert/privatekey.pem', sslCertPath: './cert/ssl.crt'});
```

Examples
========
Efficient paging:

```javascript
privateApp.core.contacts.getContacts({ pager: {start:1 /* page number */, callback:onContacts}})
    .fail(function(err)
    {
        console.log('Oh no, an error');
    })

/* Called per page */
function onContacts(err, response, cb)
{
    var contacts = response.data;
    if (response.finished) // finished paging
        ....
    cb(); // Async support
}

```

Filter support: Modified After
```
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

* 0.0.2
    - Added journals
    - modifiedAfter support
* 0.0.1
    - Initial Release


Copyright (c) 2014 Tim Shnaider

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

