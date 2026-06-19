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

export class ApiError extends Error {

	statusCode: number
	body: any
	headers: any
	request: Request

	constructor(axiosError) {
		super('Xero API request failed');
		this.name = 'ApiError';

        this.statusCode = axiosError.response.status;
		this.body = axiosError.response.data;
		this.headers = axiosError.response.headers;
		this.request = {
			url: {
				protocol: axiosError.request.protocol,
				port: axiosError.request.agent?.defaultPort || axiosError.request.socket?.localPort,
				host: axiosError.request.host,
				path: axiosError.request.path,
			},
			headers: axiosError.request.getHeaders(),
			method: axiosError.request.method
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

	toError(): Error & ErrorResponse & { statusCode: number; headers: any; request: Request } {
		const error = this as unknown as Error & ErrorResponse & {
			statusCode: number;
			headers: any;
			request: Request;
		};
		error.response = {
			statusCode: this.statusCode,
			body: this.body,
			headers: this.headers,
			request: this.request,
		};
		error.body = this.body;
		error.message =
			typeof this.body === 'string'
				? this.body
				: `Xero API request failed with status ${this.statusCode}`;
		return error;
	}
}
