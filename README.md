# xero-node
![npm](https://img.shields.io/npm/v/xero-node?label=xero-node)

## OAuth 2 support

## SDK Documentation
xero-node supports OAuth2 authentication and all the XeroAPI Sets
* Accounting API: 
* Assets API: 
* AU Payroll API: 
* Bankfeeds API: 
* UK Payroll API: 
* Files API: 

## SDK Documentation
* Core [Accounting Api Docs](https://xeroapi.github.io/xero-node/accounting/index.html)
---
* [Asset Api Docs](/https://xeroapi.github.io/xero-node/assets/index.html)
* [Project Api Docs](https://xeroapi.github.io/xero-node/payroll-au/index.html)
* [Files Api Docs](https://xeroapi.github.io/xero-node/files/index.html)
* [Bankfeeds Api Docs](https://xeroapi.github.io/xero-node/bankfeeds/index.html)
* [Payroll Docs (NZ)](https://xeroapi.github.io/xero-node/payroll-uk/index.html)
* [Payroll Docs (UK)](https://xeroapi.github.io/xero-node/payroll-uk/index.html)
* [Payroll Docs (AU)](https://xeroapi.github.io/xero-node/payroll-uk/index.html)


## Getting Started

### Create a Xero App
Follow these steps to create your Xero app

* Create a [free Xero user account](https://www.xero.com/us/signup/api/) (if you don't have one)
* Login to [Xero developer center](https://developer.xero.com/myapps)
* Click "New App" link
* Enter the redirect URI (this is your callback url - localhost, etc)
* Agree to terms and condition and click "Create App".
* Click "Generate a secret" button.
* Copy your client id and client secret and save for use later.

## Repo Context & Contributing
This SDK's functionality is majority generated [from our OpenAPISpec](https://github.com/XeroAPI/Xero-OpenAPI).
The exception is the `src/xeroClient.ts` which contains the typescript that is unique to this repository. Contributions are welcome but please keep in mind that majority of SDK is auto-generated from the OpenAPISpec. We try to get changes in that projects to be released on a reasonable cadence.

> Read more about our process in [maintaining our suite of SDK's](https://devblog.xero.com/building-sdks-for-the-future-b79ff726dfd6)

## Testing
We are working to build out a more robust test suite, and currently just have tests setup for our xeroClient.ts - PR's will now run against a CI build - and as we add more tests to this project community collaboration will be easier to incorporate.

```
npm test
```

## Authentication

We use [OAuth2.0](https://oauth.net/2) to generate access tokens that authenticate requests against our API. Each API call will need to have a valid token populated on the API client to succeed. In a tokenSet will be an *access_token* which lasts for 30 minutes, and a *refresh_token* which lasts for 60 days. If you don't want to require your users to re-authenticate each time you want to call the API on their behalf, you will need a datastore for these tokens and will be required to refresh the tokens at least once per 60 days to avoid expiration. The `offline_access` scope is required for refresh tokens to work.
 
In Xero a user can belong to multiple organisations. Tokens are ultimately associated with a Xero user, who can belong to multiple tenants/organisations. If your user 'Allows Access' to multiple organisations, be hyper aware of which `tenantId` you are passing to each function.

---

**Step 1:** Initialize the `XeroClient`, and redirect user to xero auth flow

**Step 2:** Call `apiCallback` to get your tokenSet

**Step 3:** Call `updateTenants` to populate additional tenant data
*You will need to have the `accounting.settings` scope in order to use this helper*

**NOTE:** If you have already authorized the user and have stored a valid tokenSet, you can create a `new XeroClient()` and refresh your token without triggering the openid-client dependency:
```js
  const tokenSet = getTokenSetFromUserId(user.id) // example function
  const newXeroClient = new XeroClient()
  const newTokenSet = await newXeroClient.refreshWithRefreshToken(xero_client_id, xero_client_secret, tokenSet.refresh_token)
  // refreshWithRefreshToken calls setAccessToken() so the refreshed token will be stored on newXeroClient
  await newXeroClient.accountingApi.getInvoices('my-tenant-uuid')
```

---

## Step 1
* Configure client and generate Authorization URL
* Choose [XeroAPI Scopes](https://developer.xero.com/documentation/oauth2/scopes) based on the access you need
* `initialize()` the client to set up the 'openid-client'
* Build the `consentUrl`
* Redirect to auth flow
```js
const port = process.env.PORT || 3000

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:${port}/callback`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" "),
  state: 'returnPage=my-sweet-dashboard', // custom params (optional)
  httpTimeout: 3000 // ms (optional)
});

// `buildConsentUrl()` will also call `await xero.initialize()`
let consentUrl = await xero.buildConsentUrl();

res.redirect(consentUrl);
```

## Step 2
Call `apiCallback` function with the response url which returns a tokenSet you can save in your datastore for future calls.

*The `tokenSet` can also be accessed from the client as `xero.readTokenSet()`.*

> `http://localhost:${port}/callback`
```js
console.log(xero.config.state)
=> 'returnPage=my-sweet-dashboard'

const tokenSet = await xero.apiCallback(req.url);
```
The `tokenSet` is what you should store in your database. That object is what you will need to pass to the client. It contains your access_token and refresh_token as well as other information regarding your connection.
```js
{
  id_token: 'eyJhxxxx.yyy',
  access_token: 'eyJxxx.yyy.zzz',
  expires_at: 1231231234,
  token_type: 'Bearer',
  refresh_token: 'xxxyyyyzzz',
  scope: 'openid profile email accounting.settings accounting.reports.read accounting.journals.read accounting.contacts accounting.attachments accounting.transactions offline_access',
  session_state: 'xxx.yyy'
}
```

## Step 3 (convenience step)

Populate the XeroClient's active tenant data.

For most integrations you will want to display the org name and use additional metadata about the connected org. The `/connections` endpoint does not currently serialize all org metadata so requires developers to make an additional call for each org your user connects to get information like default currency.

Calling `await xero.updateTenants()` will query the /connections endpoint and store the resulting information on the client. It has an optional parameter named `fullOrgDetails` that defaults to `true`. If you do not pass `false` to this function you will need to have the `accounting.settings` scope on your token as the `/organisation` endpoint that is called, requires it.

If you don't need additional org data (like currency, shortCode, etc) calling the helper with false param `await xero.updateTenants(false)` will not kick off additional org meta data calls.

```js
// updateTenants fullOrgDetails param will default to true
const tenants = await xero.updateTenants()
console.log(xero.tenants)
[
  {
    id: 'xxx-yyy-zzz-xxx-yyy',
    tenantId: 'xxx-yyy-zzz-xxx-yyy',
    tenantType: 'ORGANISATION',
    createdDateUtc: 'UTC-DateString',
    updatedDateUtc: 'UTC-DateString',
    tenantName: 'Demo Company (US)',
    orgData: {
      organisationID: 'xxx-yyy-zzz-xxx-yyy',
      name: 'My first org',
      version: 'US',
      shortCode: '!2h37s',
      ...
    }
  }
]

// if you pass false, the client will not fetch additional metadata about each org connection
const tenants = await xero.updateTenants(false)
console.log(xero.tenants)
[
  {
    id: 'xxx-yyy-zzz-xxx-yyy',
    tenantId: 'xxx-yyy-zzz-xxx-yyy',
    tenantType: 'ORGANISATION',
    createdDateUtc: 'UTC-DateString',
    updatedDateUtc: 'UTC-DateString',
    tenantName: 'Demo Company (US)'
  }
]

// You can also remove a connection by passing `disconnect()` the `.id` which is that tenant's connection id.
await xero.disconnect(xero.tenants[0].id)
```

---
## Making **offline_access** calls

Once you have a valid token/tokenSet saved you can set the tokenSet on the client without going through the callback by calling `setTokenSet`.

For example - once a user authenticates you can refresh the token (which will also set the new token on the client) to make authorized api calls.

There are two ways to refresh a token.

```js
// refreshToken()
const validTokenSet = await xero.refreshToken()
```

If you already generated a valid access token, you can initialize an empty client and refresh any saved access_tokens by passing the client, secret, and refresh_token to refreshWithRefreshToken()
```js
const newXeroClient = new XeroClient()
const refreshedTokenSet = await newXeroClient.refreshWithRefreshToken(client_id, client_secret, tokenSet.refresh_token)
```

Making Authorized API calls:

```js
const tokenSet = getTokenSetFromDatabase(userId) // example function name

await xero.setTokenSet(tokenSet)

// you can call this to fetch/set your connected tenant data on your client, or you could also store this information in a database so you don't need to updateTenants every time you connect to API
await xero.updateTenants()

await xero.accountingApi.getInvoices(xero.tenants[0].tenantId)
```

### Basics
```js
// example flow of initializing and using the client after someone has already authenticated and you have saved their tokenSet
const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:${port}/callback`],
  scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
});
await xero.initialize();

const tokenSet = getYourTokenSetFromSavedLocation(currentUser)

await xero.setTokenSet(tokenSet)
...

const activeTenantId = xero.tenants[0].tenantId

const getOrgs = await xero.accountingApi.getOrganisations(activeTenantId)
const orgCountry= getOrgs.body.organisations[0].countryCode

const contactsResponse = await xero.accountingApi.getContacts(activeTenantId)
const contactId = getContactsResponse.body.contacts[0].contactID

---
import { XeroClient, Invoice } from "xero-node";

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

const createdInvoice = await xero.accountingApi.createInvoices(activeTenantId, invoices)

---

// getting files as PDF
const getAsPdf = await xero.accountingApi.getPurchaseOrderAsPdf(
  req.session.activeTenant.tenantId,
  getPurchaseOrdersResponse.body.purchaseOrders[0].purchaseOrderID,
  { headers: { accept: 'application/pdf' } }
)

// CREATE ATTACHMENT
const filename = "xero-dev.png";
const pathToUpload = path.resolve(__dirname, "../public/images/xero-dev.png");
const readStream = fs.createReadStream(pathToUpload);
const contentType = mime.lookup(filename);

const accountAttachmentsResponse: any = await xero.accountingApi.createAccountAttachmentByFileName(req.session.activeTenant.tenantId, accountId, filename, readStream, {
  headers: {
    'Content-Type': contentType
  }
});

// UPLOAD A FILE
import * as fs from "fs";
const mime = require("mime-types");
const path = require("path");

const tenantId = 'valid-xero-tenant-id-uuid'
const folderId = 'valid-folder-uuid-goes-here'

const filename = "xero-dev.png";
const pathToUpload = path.resolve(__dirname, "../public/images/xero-dev.png");
const readStream = fs.createReadStream(pathToUpload);
const contentType = mime.lookup(filename);

const uploadFile = await xero.filesApi.uploadFile(tenantId, folderId, readStream, filename, contentType);
```

# Querying With Filters And Pagination
```js
const xeroTenantId = 'YOUR_XERO_TENANT_ID';
const ifModifiedSince: Date = new Date("2020-02-06T12:17:43.202-08:00");
const where = 'Status=="AUTHORISED" AND Type=="SPEND"';
const order = 'Reference ASC';
const page = 1;
const unitdp = 4;

const response = await xero.accountingApi.getBankTransactions(xeroTenantId, ifModifiedSince, where, order, page, unitdp);
```

# Security

This repo leverages a certified OA2 and OIDC library called openid-client. For a deeper dive the repo's functionality, check out them directly https://github.com/panva/node-openid-client.
### Preventing CSRF Using Xero-Node
When xero.buildConsentUrl is called we call openid-client authorizationUrl method, passing redirect_uri, scope, and state (if present) as arguments and returns a formatted url string made up from the given config. The user is then directed to the consentUrl to begin the auth process with Xero. When the auth process is complete Xero redirects the user to the specified callback route and passes along params including the state if it was initially provided.

At this point openid-client takes over verifying params.state and check.state match if provided. If the state does not match the initial user's, the openid-client library throws an error:

```json
RPError: state mismatch, expected user=1234, got: user=666
```
###  JWT Verification Using Xero-Node
JWT verification of both the `access_token` and `id_token` are baked into the openid-client library we leverage.

When `xero.apiCallback` is called, openid-client `validateJARM` is triggered which also invokes `validateJWT`

If openid-client fails to validate the JWT signature it will throw an error. 

# Sample App
For more robust examples in how to utilize our accounting api we have *(roughly)* every single endpoint mapped out with an example in our sample app - complete with showing the Xero data dependencies required for interaction with many objects ( ie. types, assoc. accounts, tax types, date formats).

Just visit the repo https://github.com/XeroAPI/xero-node-oauth2-app configure your credentials & get started.

## Other Helper functions
```js
xero.tenants

// This needs to be called to setup relevant openid-client on the XeroClient
await xero.initialize()

// buildConsentUrl calls `await xero.initialize()` so if you wont't need to call initialize() if your using the client to send user through the auth flow.
await xero.buildConsentUrl()

// tokenSet and its expiration
const tokenSet = await xero.readTokenSet();

tokenSet.expired() // returns boolean true/false
tokenSet.expires_in // returns seconds
tokenSet.expires_at // returns milliseconds
new Date(tokenSet.expires_at * 1000).toLocaleString()) // readable expiration

if (tokenSet.expired()) {
  const validTokenSet = await xero.refreshToken()
  // or you can refresh the token without needing to initialize the openid-client
  // helpful for background processes where you want to limit any dependencies
  await xero.refreshWithRefreshToken(client_id, client_secret, tokenSet.refresh_token)
}

// some endpoints date fields require
// the MS date format for POST'ing data
const dateString = "1990-02-05"
const birthday = await xero.formatMsDate(dateString)

await xero.disconnect(xero.tenants[0].id)

await xero.readIdTokenClaims()

await xero.readTokenSet()

const tokenSet = await xero.readTokenSet()
await xero.setTokenSet(tokenSet)

// You can revoke a user's refresh token and remove all their connections to your app by making a request to the revocation endpoint.
await xero.revokeToken()
```
