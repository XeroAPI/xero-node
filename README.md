# xero-node
![npm](https://img.shields.io/npm/v/xero-node?label=xero-node)

## Requirements
node version 10.13.0 or higher

## SDK Documentation
[version 4](https://xeroapi.github.io/xero-node/) documentation

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
The exception is the `src/xeroClient.ts` which contains the javascript specific helper code that is unique to this repository only. Contributions are welcome but please keep in mind that majority of SDK is auto-generated from the OpenAPISpec. We try to get changes in that projects to be released on a bi-weekly cadence.

> Read more about our process in [maintaining our suite of SDK's](https://devblog.xero.com/building-sdks-for-the-future-b79ff726dfd6)

## Authentication

We use [OAuth2.0](https://oauth.net/2) to authenticate requests against our API

**Step 1:** Redirect user to xero authentication page

**Step 2:** Call `apiCallback` to populate additional tenant data and get your tokenSet

---

## Step 1
* Configure client and generate Authorization URL.
* Choose your [XeroAPI Scopes](https://developer.xero.com/documentation/oauth2/scopes) based on the access you want the user to allow on their behalf.
```js
const port = process.env.PORT || 3000

const xero = new XeroClient({
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUris: [`http://localhost:${port}/callback`],
  scopes: 'openid profile email accounting.transactions accounting.settings offline_access'.split(" ")
});

await xero.initialize();

let consentUrl = await xero.buildConsentUrl();

res.redirect(consentUrl);
```

## Step 2
Call xero-node's `apiCallback` function. This will:
* Populate the XeroClients active tenant data
* Return a tokenSet which you can save in your datastore
  * `tokenSet` will automatically be set on the `xero` client object to be accessed as `xero.readTokenSet()` but you can use the return value to persist and attribute it to a user/session. Helper functions explained below.
```js
const tokenSet = await xero.apiCallback(req.url);
```
The tokenSet will contain your access_token and refresh_token and will look like this:
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

The `apiCallback` function will also fetch additional metadata about each of your authorized organisations (aka tenants) so you can display the name, etc. In Xero a user can belong to multiple organisations. A single token could be authorized to call the API for a single user to multiple tenants - so please be hyper aware of which `tenantId` you are passing to each xero-node function, as a user could accidently authenticate to multiple orgs if they belong to many.

So to re-iterate - after calling 
```javascript
await xero.apiCallback(req.url);
```
You can then access your tenant data from the initial client instance.
```js
console.log(xero.tenants)

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
      ...
    }
  }
]
```

## Usage

> Full API documentation: https://xeroapi.github.io/xero-node/v4/


### Basics
```js
const activeTenantId = xero.tenants[0].tenantId

const getOrgs = await xero.accountingApi.getOrganisations(activeTenantId)
const getOrgs.body.organisations

const contactsResponse = await xero.accountingApi.getContacts(activeTenantId);
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

const createdInvoices = await xero.accountingApi.createInvoices(activeTenantId, invoices);
```

## Sample App
For more robust examples in how to utilize our accounting api, we have roughly every single endpoint mapped out with an example in our sample app - complete with showing the Xero data dependencies required for interaction with many objects ( ie. types, assoc. accounts, tax types, date formats)

Just visit the repo - https://github.com/XeroAPI/xero-node-oauth2-app and configure your credentials to get started exploring.

## Helper functions
```javascript
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
await xero.refreshToken()

// refreshTokenUsingTokenSet()
await xero.refreshTokenUsingTokenSet(tokenSet)

// disconnect()
await xero.disconnect(xero.tenants[0].id)

// readIdTokenClaims()
await xero.readIdTokenClaims()

// readTokenSet()
await xero.readTokenSet()

// setTokenSet()
await xero.setTokenSet()
```
