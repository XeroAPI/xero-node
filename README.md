node-xero
===========
An API wrapper for xero (http://developer.xero.com).

Supports all three applications types:

* Private

* Public

* Partner

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


Tests
==========

'npm install' to install devDependencies and then 'npm test'


Release History
==============

* 0.0.1
    - Initial Release