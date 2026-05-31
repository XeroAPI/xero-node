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
			headers: typeof request.getHeaders === 'function' ? request.getHeaders() : {},
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
