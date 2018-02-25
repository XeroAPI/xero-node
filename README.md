# node-xero

NodeJS Client for the Xero API, supporting Public, Private and Partner Apps

## Current Status: PRE-ALPHA

Currently Supported App Types:
 * Private

Supported Operations:
 * GET

A rejected Promise is returned in any non-200 API call. The Error looks like this:

`
// TODO: Do we call this?
export interface IHttpError {
	statusCode: number;
	body: string;
	error: object;
}
`

TODO: Try to JSON.parse() the body as it could be an object?


Test
