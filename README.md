# xero-node
[![npm version](https://badge.fury.io/js/xero-node.svg)](https://badge.fury.io/js/xero-node)
[![Github forks](https://img.shields.io/github/forks/XeroAPI/xero-node.svg)](https://github.com/XeroAPI/xero-node/network)
[![Github stars](https://img.shields.io/github/stars/XeroAPI/xero-node.svg)](https://github.com/XeroAPI/xero-node/stargazers)
![npm](https://img.shields.io/npm/dt/xero-node)

The xero-node SDK makes it easy for developers to access Xero's APIs in their JavaScript code, and build robust applications and software using small business & general ledger accounting data.
# Table of Contents
- [API Client documentation](#api-client-documentation)
- [Sample Applications](#sample-applications)
- [Xero Account Requirements](#xero-account-requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Authentication](#authentication)
- [Custom Connections](#custom-connections)
- [App Store Subscriptions](#app-store-subscriptions)
- [API Clients](#api-clients)
- [Helper Methods](#helper-methods)
- [Usage Examples](#usage-examples)
- [SDK conventions](#sdk-conventions)
- [Security](#security)
- [Contributing](#contributing)

<hr>

## API Client documentation
This SDK supports full method coverage for the following Xero API sets:

| API Set | Description |
| --- | --- |
| [`Accounting`](https://xeroapi.github.io/xero-node/accounting/index.html) | The Accounting API exposes accounting functions of the main Xero application *(most commonly used)*
| [Assets](https://xeroapi.github.io/xero-node/assets/index.html) | The Assets API exposes fixed asset related functions of the Xero Accounting application |
| [Bankfeeds](https://xeroapi.github.io/xero-node/bankfeeds/index.html) | The Bankfeeds API facilitates the flow of transaction and statement data |
| [Files](https://xeroapi.github.io/xero-node/files/index.html) | The Files API provides access to the files, folders, and the association of files within a Xero organisation |
| [Projects](https://xeroapi.github.io/xero-node/projects/index.html) | Xero Projects allows businesses to track time and costs on projects/jobs and report on profitability |
| [Payroll (AU)](https://xeroapi.github.io/xero-node/payroll-au/index.html) | The (AU) Payroll API exposes payroll related functions of the payroll Xero application |
| [Payroll (NZ)](https://xeroapi.github.io/xero-node/payroll-nz/index.html) | The (NZ) Payroll API exposes payroll related functions of the payroll Xero application |
| [Payroll (UK)](https://xeroapi.github.io/xero-node/payroll-uk/index.html) | The (UK) Payroll API exposes payroll related functions of the payroll Xero application |

<img src="https://i.imgur.com/3ISSOwp.png" alt="drawing" width="350"/>

<hr>

## Sample Applications
Sample apps can get you started quickly with simple auth flows and advanced usage examples.

| Sample App | Description | Screenshot |
| --- | --- | --- |
| [`starter-app`](https://github.com/XeroAPI/xero-node-oauth2-ts-starter) | Basic getting started code samples | <img src="https://i.imgur.com/k208KAv.png" alt="drawing" width="200"/>
| [`full-app`](https://github.com/XeroAPI/xero-node-oauth2-app) | Complete app with more complex examples | <img src="https://i.imgur.com/TaMQvnp.png" alt="drawing" width="500"/>
| [`custom-connections-starter`](https://github.com/XeroAPI/xero-node-custom-connections-starter) | Basic app showing Custom Connections - a Xero [premium option](https://developer.xero.com/documentation/oauth2/custom-connections) for building M2M integrations to a single org | <img src="https://i.imgur.com/HoQHLuq.png" alt="drawing" width="300"/>
| [`xero-node-sso-app`](https://github.com/XeroAPI/xero-node-sso-app) | App showing Xero Single Sign On - as well as basic setup and usage of the Xero App Store `appStoreApi.getSubscription` endpoint | <img src="https://i.imgur.com/4NGowZz.png" alt="drawing" width="300"/>
| [`xero-node-sso-form`](https://github.com/XeroAPI/xero-node-sso-form) | App showing Sign up with Xero to Lead | <img src="https://raw.githubusercontent.com/XeroAPI/xero-node-sso-form/main/public/images/ssu-demo-screenshot.png" alt="drawing" width="300"/>
 
<hr>

## Xero Account Requirements
- Create a [free Xero user account](https://www.xero.com/us/signup/api/)
- Login to your Xero developer [dashboard](https://developer.xero.com/app/manage) and create an API application
- Copy the credentials from your API app and store them using a secure ENV variable strategy
- Decide the [neccesary scopes](https://developer.xero.com/documentation/oauth2/scopes) for your app's functionality

# Installation
To install this SDK in your project:
```
npm install xero-node
```

---
## Configuration
```js
import { XeroClient } from 'xero-node';

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:${port}/callback`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" "),
  state: 'returnPage=my-sweet-dashboard', // custom params (optional)
  httpTimeout: 3000 // ms (optional)
});
```

---
## Authentication
All API requests go through Xero's OAuth2.0 gateway and require a valid `access_token` to be set on the `client` which appends the `access_token` [JWT](https://jwt.io/) to the header of each request.

If you are making an API call for the first time:

1. Send the user to the Xero authorization URL
```js
let consentUrl = await xero.buildConsentUrl();
res.redirect(consentUrl);
```
2. The user will authorize your application and be sent to your `redirect_uri`
```js
process.env.REDIRECT_URI
=> /callback?code=xyz123
```
3. You exchange the temporary `code` for a valid `token_set`
```js
const tokenSet = await xero.apiCallback(req.url);
// save the tokenSet
```

It is recommended that you store this token set JSON in a datastore in relation to the user who has authenticated the Xero API connection. Each time you want to call the Xero API, you will need to access the previously generated token set, initialize it on the SDK `client`, and refresh the `access_token` prior to making API calls.

### Token Set
| key | value | description |
| --- | --- | --- |
| id_token: | "xxx.yyy.zzz" | [OpenID Connect](https://openid.net/connect/) token returned if `openid profile email` scopes accepted |
| access_token: | "xxx.yyy.zzz" | [Bearer token](https://oauth.net/2/jwt/) with a 30 minute expiration required for all API calls |
| expires_in: | 1800 | Time in seconds till the token expires - 1800s is 30m |
| refresh_token: | "XXXXXXX" | Alphanumeric string used to obtain a new Token Set w/ a fresh access_token - 60 day expiry |
| scope: | "email profile openid accounting.transactions offline_access" | The Xero permissions that are embedded in the `access_token` |

Example Token Set JSON:
```
{
  "id_token": "xxx.yyy.zz",
  "access_token": "xxx.yyy.zzz",
  "expires_in": 1800,
  "token_type": "Bearer",
  "refresh_token": "xxxxxxxxx",
  "scope": "email profile openid accounting.transactions offline_access"
}
```

---
## Custom Connections 

Custom Connections are a Xero [premium option](https://developer.xero.com/documentation/oauth2/custom-connections) used for building M2M integrations to a single organisation. A custom connection uses OAuth2.0's [`client_credentials`](https://www.oauth.com/oauth2-servers/access-tokens/client-credentials/) grant which eliminates the step of exchanging the temporary code for a token set.

To use this SDK with a `Custom Connection`:
```js
import { XeroClient } from 'xero-node';

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  grantType: 'client_credentials'
});

const tokenSet = await xero.getClientCredentialsToken();
// save the tokenSet

const invoices = await xero.accountingApi.getInvoices('');
```

Because Custom Connections are only valid for a single organisation you don't need to pass the `xero-tenant-id` as the first parameter to every method, or more specifically for this SDK `xeroTenantId` can be an empty string.

> Becuase the SDK is generated from the OpenAPI spec the parameter remains which requires you to pass an empty string to use this SDK with a Custom Connection.

---

## App Store Subscriptions 

If you are implementing subscriptions to participate in Xero's App Store you will need to setup [App Store subscriptions](https://developer.xero.com/documentation/guides/how-to-guides/xero-app-store-referrals/) endpoints.

When a plan is successfully purchased, the user is redirected back to the URL specified in the setup process. The Xero App Store appends the subscription Id to this URL so you can immediately determine what plan the user has subscribed to through the subscriptions API.

With your app credentials you can create a client via `client_credentials` grant_type with the `marketplace.billing` scope. This unique access_token will allow you to query any functions in `appStoreApi`. Client Credentials tokens to query app store endpoints will only work for apps that have completed the App Store on-boarding process.

```ts
// => /post-purchase-url

const xeroAppStoreClient = new XeroClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  grantType: 'client_credentials',
  scopes: ['marketplace.billing']
});

try {
  await xeroAppStoreClient.getClientCredentialsToken()
} catch(e) {
  console.log('ERROR: ', e)
}

const subscriptionRequest = await xeroAppStoreClient.appStoreApi.getSubscription(subscripionId)

console.log(subscriptionRequest.body)
{
  currentPeriodEnd: 2021-09-02T20:08:58.772Z,
  endDate: null,
  id: '03bc74f2-1237-4477-b782-2dfb1a6d8b21',
  organisationId: '79e8b2e5-c63d-4dce-888f-e0f3e9eac647',
  plans: [
    Plan {
      id: '6abc26f3-9390-4194-8b25-ce8b9942fda9',
      name: 'Small',
      status: 'ACTIVE',
      subscriptionItems: [
        endDate: null,
        id: '834cff4c-b753-4de2-9e7a-3451e14fa17a',
        price: {
          id: '2310de92-c7c0-4bcb-b972-fb7612177bc7',
          amount: 0.1,
          currency: 'NZD'
        },
        product: Product {
          id: '9586421f-7325-4493-bac9-d93be06a6a38',
          name: '',
          type: 'FIXED'
        },      
        startDate: 2021-08-02T20:08:58.772Z,
        testMode: true

      ]
    }
  ],
  startDate: 2021-08-02T20:08:58.772Z,
  status: 'ACTIVE',
  testMode: true
}
```
You should use the subscription data to provision user access/permissions to your application.
### App Store Subscription Webhooks

In additon to a subscription Id being passed through the URL, when a purchase or an upgrade takes place you will be notified via a webhook. You can then use the subscription Id in the webhook payload to query the AppStore endpoints and determine what plan the user purchased, upgraded, downgraded or cancelled.

Refer to Xero's documenation to learn more about setting up and receiving webhooks or review [this blogpost](https://devblog.xero.com/keeping-your-integration-in-sync-implementing-xero-webhooks-using-node-express-and-ngrok-6d2976baac6d) explaing webhooks using xero-node sdk.
> https://developer.xero.com/documentation/guides/webhooks/overview/

---
## API Clients
You can access the different API sets and their available methods through the following:

```js
const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID', // required
  clientSecret: 'YOUR_CLIENT_SECRET', // required
  redirectUris: [`http://localhost:${port}/callback`], // not used for client_credentials auth flow
  grantType: 'client_credentials', // only used for client_credentials auth flow
  scopes: 'openid profile email accounting.transactions offline_access'.split(" "), // not used for client_credentials auth flow
  state: 'returnPage=my-sweet-dashboard', // custom params (optional), not used for client_credentials auth flow
  httpTimeout: 3000 // ms (optional)
});

xero.accountingApi
xero.assetApi
xero.projectApi
xero.filesApi
xero.payrollAUApi
xero.payrollNZApi
xero.payrollUKApi
```
---
## Helper Methods

Once you have a valid Token Set in your datastore, the next time you want to call the Xero API simply initialize a new `client` and refresh the token set. There are two ways to refresh a token

```js
// you can refresh the token using the fully initialized client leveraging openid-client

import { XeroClient } from 'xero-node';

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:${port}/callback`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
});

await xero.initialize();

const tokenSet = getTokenSetFromDatabase(userId); // example function name

await xero.setTokenSet(tokenSet);

if(tokenSet.expired()){
  const validTokenSet = await xero.refreshToken();
  // save the new tokenset
}
```
```js
// or if you already generated a tokenSet and have a valid (< 60 days refresh token),
// you can initialize an empty client and refresh by passing the client, secret, and refresh_token

import { XeroClient } from 'xero-node';

const tokenSet = getTokenSetFromDatabase(userId); // example function name

if(tokenSet.expired()){
  const xero = new XeroClient();
  const validTokenSet = await xero.refreshWithRefreshToken(client_id, client_secret, tokenSet.refresh_token)
  // save the new tokenset
}
```

A full list of the SDK client's methods:

| method | description |
| --- | --- |
| client.`initialize` | Initializes the Xero Client with the provided configuration |
| client.`buildConsentUrl` | Returns a url concatenated from the provided redirect uri, scope, and the issuer ( Xero identity authorize url) |
| client.`apiCallback`(callbackUrl) | Leverages openid-client library to exchange temporary auth code for token set |
| client.`disconnect`(connectionId) | Removes an individual tenant connection by connection ID |
| client.`readTokenSet` | Returns token set currently set on the Xero Client |
| client.`setTokenSet`(tokenSet) | Sets a specified token set on the Xero Client |
| client.`refreshToken` | Leverages openid-client library to refresh token set currently set on the Xero Client and returns updated token set |
| client.`revokeToken` | Revokes a users refresh token and removes all their connections to your app |
| client.`formatMsDate`(dateString) | Takes a date string and returns it formatted as an MS Date |
| client.`refreshWithRefreshToken`(clientId, clientSecret, refreshToken) | Refresh a token set without leveraging openid-client |
| client.`getClientCredentialsToken` | Get a token set without user intervention via the client credentials grant type for custom connections only |
| client.`updateTenants`(fullOrgDetails: boolean = true) | GET request to the /connections endpoint. Accepts a boolean to indicate whether or not to also make a GET request to the /organisations endpoint and map full org data to each connection object prior to returning the array of connections |
---
## Usage Examples
### Accounting API
```js
import { XeroClient, HistoryRecords, Invoice } from 'xero-node';

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:${port}/callback`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
});

await xero.initialize();

const tokenSet = getTokenSetFromDatabase(userId); // example function name

await xero.setTokenSet(tokenSet);

if(tokenSet.expired()){
  const validTokenSet = await xero.refreshToken();
  // save the new tokenset
}

await xero.updateTenants();

const activeTenantId = xero.tenants[0].tenantId;

// GET all Accounts
const getAccountsResponse = await xero.accountingApi.getAccounts(activeTenantId);

const accountId = getAccountsResponse.body.accounts[0].accountID

// GET one Account by ID
const getAccountResponse = await xero.accountingApi.getAccount(activeTenantId, accountId);

// CREATE an Invoice
const invoices = {
  invoices: [
    {
      type: Invoice.TypeEnum.ACCREC,
      contact: {
        contactID: contactId
      },
      lineItems: [
        {
          description: "Acme Tires",
          quantity: 2.0,
          unitAmount: 20.0,
          accountCode: "500",
          taxType: "NONE",
          lineAmount: 40.0
        }
      ],
      date: "2019-03-11",
      dueDate: "2018-12-10",
      reference: "Website Design",
      status: Invoice.StatusEnum.AUTHORISED
    }
  ]
};

const createdInvoicesResponse = await xero.accountingApi.createInvoices(activeTenantId, invoices)

const invoiceId = createdInvoicesResponse.body.invoices[0].invoiceID;

// CREATE a History Record
const historyRecords: HistoryRecords = {
  historyRecords: [
    {
      details: "This is a history record"
    }
  ]
};

const createdInvoiceHistoryResponse = await xero.accountingApi.createInvoiceHistory(activeTenantId, invoiceId, historyRecords);

// CREATE Attachment
const filename = "xero-dev.png";
const pathToUpload = path.resolve(__dirname, "../public/images/xero-dev.png");
const readStream = fs.createReadStream(pathToUpload);
const contentType = mime.lookup(filename);

const accountAttachmentsResponse = await xero.accountingApi.createInvoiceAttachmentByFileName(activeTenantId, invoiceId, filename, readStream, {
  headers: {
    'Content-Type': contentType
  }
});
```

---
## SDK conventions


### Querying & Filtering


```js
const activeTenantId = 'XERO_TENANT_ID';
const ifModifiedSince: Date = new Date("2020-02-06T12:17:43.202-08:00");
const where = 'Status=="AUTHORISED" AND Type=="SPEND"';
const order = 'Reference ASC';
const page = 1;
const unitdp = 4;

const response = await xero.accountingApi.getBankTransactions(activeTenantId, ifModifiedSince, where, order, page, unitdp);
```
Note that you should set the query param to undefined instead of null if you wish to ignore a specific filter.
```js
const purchaseOrders = xero.accountingApi.getPurchaseOrders(tenant.tenantId, null, null, '2021-01-01', '2021-04-25', null, 1);

// http://api-oauth2.xero.com/api.xro/2.0/PurchaseOrders?Status=&DateFrom=2008-01-01&DateTo=2021-04-25&order=&page=1
// "Status=&" is breaking the above query 
// purchaseOrders will be an empty array

const purchaseOrders = xero.accountingApi.getPurchaseOrders(tenant.tenantId, undefined, undefined, '2021-01-01', '2021-04-25', undefined, 1);

// http://api-oauth2.xero.com/api.xro/2.0/PurchaseOrders?DateFrom=2008-01-01&DateTo=2021-04-25&order=&page=1
// params are omitted
// purchaseOrders array will have results now
```
---
## Security
This repo leverages a certified OA2 and OIDC library called openid-client. For a deeper dive the repo's functionality, check out them directly https://github.com/panva/node-openid-client.

### Preventing CSRF Using Xero-Node
When xero.buildConsentUrl is called we call openid-client authorizationUrl method, passing redirect_uri, scope, and state (if present) as arguments and returns a formatted url string made up from the given config. The user is then directed to the consentUrl to begin the auth process with Xero. When the auth process is complete Xero redirects the user to the specified callback route and passes along params including the state if it was initially provided. At this point openid-client takes over verifying params.state and check.state match if provided. If the state does not match the initial user's, the openid-client library throws an error:

```
RPError: state mismatch, expected user=1234, got: user=666
```
###  JWT Verification Using Xero-Node
JWT verification of both the `access_token` and `id_token` are baked into the openid-client library we leverage. When `xero.apiCallback` is called, openid-client `validateJARM` is triggered which also invokes `validateJWT`. If openid-client fails to validate the JWT signature it will throw an error. 

---
## Contributing
PRs, issues, and discussion are highly appreciated and encouraged. Note that the majority of this project is generated code based on [Xero's OpenAPI specs](https://github.com/XeroAPI/Xero-OpenAPI) - PR's will be evaluated and pre-merge will be incorporated into the root generation templates.

Please add tests for net new functionality and ensure existing test suite passes all tests.
```
npm test
```

### Versioning
We do our best to keep OS industry `semver` standards, but we can make mistakes! If something is not accurately reflected in a version's release notes please let the team know.


## Participating in Xero’s developer community

This SDK is one of a number of SDK’s that the Xero Developer team builds and maintains. We are grateful for all the contributions that the community makes. 

Here are a few things you should be aware of as a contributor:
* Xero has adopted the Contributor Covenant [Code of Conduct](https://github.com/XeroAPI/xero-node/blob/master/CODE_OF_CONDUCT.md), we expect all contributors in our community to adhere to it
* If you raise an issue then please make sure to fill out the github issue template, doing so helps us help you 
* You’re welcome to raise PRs. As our SDKs are generated we may use your code in the core SDK build instead of merging your code
* We have a [contribution guide](https://github.com/XeroAPI/xero-node/blob/master/CONTRIBUTING.md) for you to follow when contributing to this SDK
* Curious about how we generate our SDK’s? Have a [read of our process](https://devblog.xero.com/building-sdks-for-the-future-b79ff726dfd6) and have a look at our [OpenAPISpec](https://github.com/XeroAPI/Xero-OpenAPI)
* This software is published under the [MIT License](https://github.com/XeroAPI/xero-node/blob/master/LICENSE)

For questions that aren’t related to SDKs please refer to our [developer support page](https://developer.xero.com/support/).
