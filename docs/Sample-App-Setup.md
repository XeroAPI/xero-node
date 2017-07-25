To help users get up and running with the xero-node SDK quickly, we've included a sample app that is written using the Express library.

https://xero-sample-app.herokuapp.com

### Clone the Repo

To get this sample app up and running follow these steps;

```
git clone https://github.com/XeroAPI/xero-node-sample-app
cd xero-node-sample-app
npm install
```

### Modify the sample config file

You'll then need to modify the config file available at `xero-node-sample-app/config/example_config.json`.

```javascript
{
    "APPTYPE": "PARTNER",
    "partner": {
        "authorizeCallbackUrl": "https://example.com/xerocallback",
        "consumerKey": "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "privateKeyPath": "/some/path/to/privatekey.pem",
        "userAgent": "Tester (PARTNER) - Application for testing Xero"
    },
    "public": {
        "authorizeCallbackUrl": "https://example.com/xerocallback",
        "consumerKey": "AAAAAAAAAAAAAAAAAA",
        "consumerSecret": "BBBBBBBBBBBBBBBBBBBB",
        "userAgent": "Tester (PUBLIC) - Application for testing Xero"
    }
}
```

* The `APPTYPE` determines whether you would like to run the sample app using your public or partner credentials.
* The consumerKey/Secret should be provided depending on your app type
* The User-Agent can be left as is.

Save this file as: `xero-node-sample-app/config/config.json`.

### Running the Sample App

```
node xero-node-sample-app/index.js
```

You should now see the prompt `listening on http://localhost:3100`.  Browse there and enjoy.