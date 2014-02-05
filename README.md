node-xero
===========
An API wrapper for xero (http://developer.xero.com).

Supports all three applications types:

* Private

* Public

* Partner

Support for regular callbacks and promises

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