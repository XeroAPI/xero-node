[![CircleCI](https://circleci.com/gh/philals/xero-node-v3/tree/master.svg?style=svg&circle-token=0a866212b40b6ecaa44f2f4fe98401b536a44038)](https://circleci.com/gh/philals/xero-node-v3/tree/master)

# node-xero

NodeJS Client for the Xero API, supporting Public, Private and Partner Apps

API Reference: [here](https://philals.github.io/xero-node-v3/).

## Current Status: PRE-PRE-ALPHA.

### Project philosophies

1. A simple and intuitive interface.
   eg:

    `PUT https://api.xero.com/api.xro/2.0/ContactGroups/b05466c8-dc54-4ff8-8f17-9d7008a2e44b/Contacts`

    Will become:

    `xero.contacts.contactGroups.create(contact)`

    Matching SDK methods names to endpoints, allows consumers to read the official API documentation and translate it to SDK method calls quickly.

    That rather than using HTTP verbs (`.put()`, `.post()` etc) the SDK will use actions. Example `get()`, `create()`,`delete()`, `update()`. This will abstract away the Xero's funny `PUT` vs `POST` (https://developer.xero.com/documentation/api/requests-and-responses).

2. A simple and single OAuth flows. Rather than automatically refreshing tokens, the SDK we will expose methods which allow the OAuth methods eg Refreshing Tokens etc. Consideration is also being made to OAuth2.

3. Abstracted underlyting OAuth/HTTP lib. This will allow swapping it out if we needed. The SDK won't bleed the OAuth libs exception types onto the consumer when it hits a 500/400 etc. Having a OAuth/HTTP layer will allow reuse and extension to other APIs (Payroll, Expenses etc).

5. Minimal to no entity/request/response validation. A consumer will pass in JSON and get JSON out. There will be no manipulation of data along the way. Helper methods if asked for will be provided by a separate module. This will reduce maintenance costs.

4. Unit tests

5. Writing the SDK in Typescript will allow us to provide TS types for the API's contracts, and it's what we use internally at Xero. This will also aid in self-generated docs.


# There are LOTS of TODOs in code and on our Kanban board - Feel free to pick one off
