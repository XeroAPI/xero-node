import { ApiError } from '../model/ApiError';
import axios from "axios";
import { AccountingApi } from "../gen/api/accountingApi";

jest.mock("axios");

describe("generated API error handling", () => {
  it("rejects with a structured error object instead of a JSON string", async () => {
    const api = new AccountingApi();
    api.accessToken = "token";

    (axios as jest.MockedFunction<typeof axios>).mockRejectedValue({
      response: {
        status: 401,
        data: {
          Title: "Unauthorized",
          Detail: "TokenExpired: token expired",
        },
        headers: {
          "www-authenticate": "Bearer error=invalid_token",
        },
      },
      request: {
        protocol: "https:",
        agent: { defaultPort: 443 },
        host: "api.xero.com",
        path: "/api.xro/2.0/Accounts",
        getHeaders: () => ({ authorization: "Bearer secret-token" }),
        method: "PUT",
      },
    });

    const promise = api.createAccount("tenant-id", {
      code: "200",
      name: "Demo account",
      type: "EXPENSE",
    } as never);

    await expect(promise).rejects.toMatchObject({
      response: {
        statusCode: 401,
        body: {
          Title: "Unauthorized",
          Detail: "TokenExpired: token expired",
        },
      },
      body: {
        Title: "Unauthorized",
        Detail: "TokenExpired: token expired",
      },
    });

    await promise.catch((error) => {
      expect(typeof error).toBe("object");
      expect(error.response.statusCode).toBe(401);
    });
  });
});

describe('ApiError', () => {
	it('handles axios errors without a response', () => {
		const apiError = new ApiError({
			message: 'Network Error',
			request: {
				protocol: 'https:',
				agent: {
					defaultPort: 443,
				},
				host: 'api.xero.com',
				path: '/api.xro/2.0/Invoices',
				getHeaders: () => ({
					authorization: 'Bearer token',
				}),
				method: 'GET',
			},
		});

		expect(apiError.generateError()).toEqual({
			response: {
				statusCode: 0,
				body: 'Network Error',
				headers: {},
				request: {
					url: {
						protocol: 'https:',
						port: 443,
						host: 'api.xero.com',
						path: '/api.xro/2.0/Invoices',
					},
					headers: {
						authorization: 'Bearer token',
					},
					method: 'GET',
				},
			},
			body: 'Network Error',
		});
	});

	it('preserves axios response details when available', () => {
		const apiError = new ApiError({
			response: {
				status: 401,
				data: {
					error: 'invalid_token',
				},
				headers: {
					'content-type': 'application/json',
				},
			},
			request: {
				protocol: 'https:',
				socket: {
					localPort: 443,
				},
				host: 'api.xero.com',
				path: '/api.xro/2.0/Invoices',
				getHeaders: () => ({}),
				method: 'GET',
			},
		});

		expect(apiError.generateError()).toEqual({
			response: {
				statusCode: 401,
				body: {
					error: 'invalid_token',
				},
				headers: {
					'content-type': 'application/json',
				},
				request: {
					url: {
						protocol: 'https:',
						port: 443,
						host: 'api.xero.com',
						path: '/api.xro/2.0/Invoices',
					},
					headers: {},
					method: 'GET',
				},
			},
			body: {
				error: 'invalid_token',
			},
		});
	});
});
