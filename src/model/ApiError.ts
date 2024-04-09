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

        this.statusCode = axiosError.response.status;
		this.body = axiosError.response.data;
		this.headers = axiosError.response.headers;
		this.request = {
			url: {
				protocol: axiosError.request?.protocol,
				port: axiosError.request?.agent?.defaultPort || axiosError.request?.socket?.localPort,
				host: axiosError.request?.host,
				path: axiosError.request?.path,
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
}
