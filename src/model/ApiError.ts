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

const LOGGABLE_HEADERS = [
	'accept',
	'accept-encoding',
	'content-length',
	'content-type',
	'contenttype',
	'host',
	'idempotency-key',
	'if-modified-since',
	'user-agent',
	'xero-application-id',
	'xero-tenant-id',
	'xero-user-id',
];

export function redactHeaders(headers: any): any {
	const safe: any = {};

	Object.keys(headers || {}).forEach((name) => {
		if (LOGGABLE_HEADERS.indexOf(name.toLowerCase()) !== -1) {
			safe[name] = headers[name];
		}
	});

	return safe;
}

function summariseRequest(request: any): any {
	if (!request || typeof request !== 'object') {
		return request;
	}

	return {
		method: request.method,
		protocol: request.protocol,
		host: request.host,
		path: request.path,
		headers: typeof request.getHeaders === 'function' ? redactHeaders(request.getHeaders()) : {},
	};
}

function redactConfig(config: any): void {
	if (!config || typeof config !== 'object') {
		return;
	}

	if (config.headers) {
		config.headers = redactHeaders(config.headers);
	}

	delete config.data;
	delete config.auth;
}

export function redactError(error: any): any {
	if (!error || typeof error !== 'object') {
		return error;
	}

	const response = error.response && typeof error.response === 'object' ? error.response : undefined;

	redactConfig(error.config);
	redactConfig(response && response.config);

	const request = summariseRequest(error.request || (response && response.request));

	if ('request' in error) {
		error.request = request;
	}

	if (response && 'request' in response) {
		response.request = request;
	}

	return error;
}

export function redactIdentityError(error: any): any {
	if (error && typeof error === 'object' && error.response && typeof error.response === 'object' && error.response.req) {
		error.response.req = summariseRequest(error.response.req);
	}

	return error;
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
