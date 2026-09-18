interface RequestUrl {
	protocol: string
	port: number
	host: string
	path: string
}

interface Request {
	url: RequestUrl
	headers: any
	method: string
}

interface Response {
	statusCode: number,
	body: any,
	headers: any,
	request: Request,
}

interface ErrorResponse {
	response: Response
	body: any
}

// The request headers that may appear on a rejected error. This is exactly the
// set the SDK itself sends: the OpenAPI header parameters plus what axios and
// Node add. Anything else, including headers supplied through options.headers
// or axios defaults, is left out.
const LOGGABLE_HEADERS = [
	'accept',
	'accept-encoding',
	'content-length',
	'content-type',
	'host',
	'idempotency-key',
	'if-modified-since',
	'user-agent',
	'xero-application-id',
	'xero-tenant-id',
	'xero-user-id',
]

/**
 * Returns a copy of the given headers containing only the entries that may be
 * logged or serialised.
 */
export function redactHeaders(headers: any): any {
	const safe: any = {}

	Object.keys(headers || {}).forEach((name) => {
		if (LOGGABLE_HEADERS.indexOf(name.toLowerCase()) !== -1) {
			safe[name] = headers[name]
		}
	})

	return safe
}

/**
 * A plain summary of an outbound request, used in place of the live Node
 * ClientRequest on a rejected error.
 */
function summariseRequest(request: any): any {
	if (!request) {
		return request
	}

	return {
		method: request.method,
		protocol: request.protocol,
		host: request.host,
		path: request.path,
		headers: typeof request.getHeaders === 'function' ? redactHeaders(request.getHeaders()) : {},
	}
}

/**
 * Reduces the request details on an axios error to what is safe to log or
 * serialise, and returns the same error. The request config headers are
 * filtered and `error.request` / `error.response.request` become a plain
 * summary of the request.
 *
 * `error.response.status`, `error.response.data`, `error.message` and
 * `error.code` are left as they are.
 */
export function redactError(error: any): any {
	if (!error) {
		return error
	}

	if (error.config?.headers) {
		error.config.headers = redactHeaders(error.config.headers)
	}

	const request = summariseRequest(error.request)

	if ('request' in error) {
		error.request = request
	}

	if (error.response && 'request' in error.response) {
		error.response.request = request
	}

	return error
}

export class ApiError {

	statusCode: number
	body: any
	headers: any
	request: Request

	constructor(axiosError) {
		const response = axiosError.response || {};
		const request = axiosError.request || {};

		this.statusCode = response.status || 0;
		this.body = response.data ?? axiosError.message;
		this.headers = response.headers || {};
		this.request = {
			url: {
				protocol: request.protocol,
				port: request.agent?.defaultPort || request.socket?.localPort,
				host: request.host,
				path: request.path,
			},
			headers: typeof request.getHeaders === 'function' ? redactHeaders(request.getHeaders()) : {},
			method: request.method
		}
	}

	generateError(): ErrorResponse {
		return {
			response: {
				statusCode: this.statusCode,
				body: this.body,
				headers: this.headers,
				request: this.request,
			},
			body: this.body
		};
	}
}
