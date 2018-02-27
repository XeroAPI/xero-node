# node-xero

NodeJS Client for the Xero API, supporting Public, Private and Partner Apps

## Current Status: PRE-PRE-ALPHA.

Ideas we want to achieve.

We want to make this wrapper as thin as possible. This means:

1. An interface that matches the api endpoints.
    eg:

	`PUT https://api.xero.com/api.xro/2.0/ContactGroups/b05466c8-dc54-4ff8-8f17-9d7008a2e44b/Contacts`

	Will become

	`xero.contacts.contactGroups.create(contact)`

	This will help with documentation, as API docs == SDK interface.

	That rather than using verbs `.put()`, `.post` etc will use actions. Example `get()`, `create()`,`delete()`, `update()`. This will abstract away the Accounting Apis funny `PUT` vs `POST`.

2. Simple Partner flows. Rather than automatically refreshing tokens we will expose methods which show when it will expire and ability to refresh. KISS.

3. Abstracted away OAuth lib. This will allow us to swap it out if we needed. We won't bleed the OAuth libs exception types into the SDK. This will make it easier for us to extend to Payroll etc

5. No entity validation. The user will pass in JSON and get JSON out. There will be no manipulation of data along the way. Again the public docs will show what will be returned. Helper methods if asked for will be provided by a separate module. This will reduce maintenance costs.

4. Unit tests

5. Oauth2 ready. The Oauth lib we are using us OAuth2 ready. Design decision will be made with this in mind. The current SDK forked and changed the Oauth lib, which makes things hard.

6. Typescript. This will aid in self-generated docs etc.


# There are LOTS of // TODOs - Feel free to pick one off

- [ ] Standard Error types
	- We said there would be two (APIException, OAuthException)
	- Make interfaces for them
	- Need to throw these at the right time
- [ ] Scopes
- [ ] All Endpoints
- [ ] Partner Auth
- [ ] Public Sample App
- [ ] Public App can take a call back URL
- [ ] Partner Sample App
- [ ] CI
- [ ] TSDoc?
