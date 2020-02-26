# xero-node
![npm](https://img.shields.io/npm/v/xero-node?label=xero-node)

## Requirements
node version 10.13.0 or higher

## SDK Documentation
* [version 3 - deprecated end of 2020](https://xeroapi.github.io/xero-node/v3/index.html) documentation
* [version 4](https://xeroapi.github.io/xero-node/v4) documentation

## Release of SDK with oAuth 2 support
Version 4.x of Xero NodeJS SDK only supports oAuth2 authentication and the following API sets.
* accounting

### Bank feeds support in OAuth 2
An early release in a separate package is availalbe [bank feeds API](https://github.com/XeroAPI/xero-node-bankfeeds).

## Looking for OAuth 1.0a support?
[![npm package](https://img.shields.io/badge/npm%20package-3.1.2-blue.svg)](https://www.npmjs.com/package/xero-node/v/3.1.2)

We've moved this code into the [oauth1 branch](https://github.com/XeroAPI/xero-node/tree/oauth1).

## Getting Started

### Create a Xero App
Follow these steps to create your Xero app

* Create a [free Xero user account](https://www.xero.com/us/signup/api/) (if you don't have one)
* Login to [Xero developer center](https://developer.xero.com/myapps)
* Click "Try oAuth2" link
* Enter your App name, company url, privacy policy url.
* Enter the redirect URI (this is your callback url - localhost, etc)
* Agree to terms and condition and click "Create App".
* Click "Generate a secret" button.
* Copy your client id and client secret and save for use later.
* Click the "Save" button. You secret is now hidden.

## Repo Context & Contributing
This SDK's functionality is majority generated [from our OpenAPISpec](https://github.com/XeroAPI/Xero-OpenAPI).
The exception is the `src/xeroClient.ts` which contains the typescript that is unique to this repository. Contributions are welcome but please keep in mind that majority of SDK is auto-generated from the OpenAPISpec. We try to get changes in that projects to be released on a reasonable cadence.

> Read more about our process in [maintaining our suite of SDK's](https://devblog.xero.com/building-sdks-for-the-future-b79ff726dfd6)

## Authentication

We use [OAuth2.0](https://oauth.net/2) to authenticate requests against our API. Each API call will need to have a valid token populated on the API client to succeed. In a tokenSet will be an *access_token* which lasts for 30 minutes, and a *refresh_token* which lasts for 30 days. If you don't want to require your users to re-authenticate each time you want to call the API on their behalf, you will need a datastore for these tokens and will be required to refresh the tokens at least once per 30 days to avoid expiration. The `offline_access` scope is required for refresh tokens to work.
 
In Xero a user can belong to multiple organisations. Tokens are ultimately associated with a Xero user, who can belong to multiple tenants/organisations. If your user 'Allows Access' to multiple organisations, be hyper aware of which `tenantId` you are passing to each function.

---

**Step 1:** Initialize the `XeroClient`, and redirect user to xero auth flow

**Step 2:** Call `apiCallback` to get your tokenSet

**Step 3:** Call `updateTenats` to populate additional tenant data

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
  scopes: 'openid profile email accounting.transactions offline_access'.split(" ")
});

await xero.initialize();

let consentUrl = await xero.buildConsentUrl();

res.redirect(consentUrl);
```

## Step 2
Call the `apiCallback` function with the response url which returns a tokenSet you can save in your datastore for future API calls.

*The `tokenSet` can also be accessed from the client as `xero.readTokenSet()`.*

```js
const tokenSet = await xero.apiCallback(req.url);
```
The `tokenSet` will contain your access_token and refresh_token as well as other information regarding your connection.
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

Populate the XeroClient's active tenant data

For most integrations you will always want to display the org name and additional metadata about the connected org. The `/connections` endpoint does not currently serialize that data so requires developers to make additional api calls for each org that your user connects to surface that information.

The `updatedTenants` function will query & nest the additional orgData results in your xeroClient under each connection/tenant object and return the array of tenants.

```js
const tenants = await xero.updateTenants()

console.log(tenants || xero.tenants)
[
  {
    id: 'xxx-yyy-zzz-xxx-yyy',
    tenantId: 'xxx-yyy-zzz-xxx-yyy',
    tenantType: 'ORGANISATION',
    createdDateUtc: 'UTC-DateString',
    updatedDateUtc: 'UTC-DateString',
    orgData: {
      organisationID: 'xxx-yyy-zzz-xxx-yyy',
      name: 'My first org',
      version: 'US',
      shortCode: '!2h37s',
      ...
    }
  },
  {
    id: 'xxx-yyy-zzz-xxx-yyy',
    tenantId: 'xxx-yyy-zzz-xxx-yyy',
    tenantType: 'ORGANISATION',
    createdDateUtc: 'UTC-DateString',
    updatedDateUtc: 'UTC-DateString',
    orgData: {
      organisationID: 'xxx-yyy-zzz-xxx-yyy',
      name: 'My second org',
      version: 'AUS',
      shortCode: '!yrcgp',
      ...
    }
  }
]
```

---
## Making **offline_access** calls

Once you have a valid token saved you can set the token on the client without going through the callback by calling `setTokenSet`.

For example - once a user authenticates you can refresh the token (which will also set the new token on the client) to make authorized api calls.
```js
const tokenSet = getTokenFromDatabase(userId) // example function name

await xero.setTokenSet(tokenSet)

// you can call this to fetch/set your connected tenant data on your client, or you could also store this information in a database
await xero.updateTenants()

await xero.accountingApi.getInvoices(xero.tenants[0].tenantId)
```

## Usage
> Full API documentation: https://xeroapi.github.io/xero-node/v4/

### Basics
```js
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
```

## Sample App
For more robust examples in how to utilize our accounting api we have *(roughly)* every single endpoint mapped out with an example in our sample app - complete with showing the Xero data dependencies required for interaction with many objects ( ie. types, assoc. accounts, tax types, date formats).

Just visit the repo https://github.com/XeroAPI/xero-node-oauth2-app configure your credentials & get started.

### Other Helper functions
```js
// xero.tenants
xero.tenants

// buildConsentUrl()
await xero.buildConsentUrl()

// readTokenSet()
const tokenSet = await xero.readTokenSet();

// tokenSet.expired()
if (tokenSet.expired()) {
  // refresh etc.
}

// refreshToken()
const validTokenSet = await xero.refreshToken()

// refreshTokenUsingTokenSet()
await xero.refreshTokenUsingTokenSet(tokenSet)

// disconnect()
await xero.disconnect(xero.tenants[0].id)

// readIdTokenClaims()
await xero.readIdTokenClaims()

// readTokenSet()
await xero.readTokenSet()

// setTokenSet(tokenSet)
const tokenSet = await xero.readTokenSet()
await xero.setTokenSet(tokenSet)
```
