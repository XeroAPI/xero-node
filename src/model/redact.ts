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
  const uri = request.uri && typeof request.uri === 'object' ? request.uri : undefined;
  const headers = request.headers || (typeof request.getHeaders === 'function' ? request.getHeaders() : {});
  return {
    method: request.method,
    host: request.host || (uri && uri.host),
    path: request.path || (uri && uri.path),
    headers: redactHeaders(headers),
  };
}

export function redactResponse(response: any): any {
  if (!response || typeof response !== 'object') {
    return response;
  }
  if (response.request) {
    response.request = summariseRequest(response.request);
  }
  if (response.req) {
    response.req = summariseRequest(response.req);
  }
  ['socket', 'connection', 'client'].forEach((name) => {
    if (name in response) {
      Object.defineProperty(response, name, { value: undefined, writable: true, configurable: true, enumerable: false });
    }
  });
  if (typeof response.toJSON === 'function') {
    response.toJSON = function () {
      return { statusCode: this.statusCode, headers: this.headers, body: this.body };
    };
  }
  return response;
}

export function redactError(error: any): any {
  if (!error || typeof error !== 'object') {
    return error;
  }
  if (error.response) {
    redactResponse(error.response);
  }
  if (error.request) {
    error.request = summariseRequest(error.request);
  }
  if (error.options && typeof error.options === 'object') {
    if (error.options.headers) {
      error.options.headers = redactHeaders(error.options.headers);
    }
    delete error.options.body;
    delete error.options.auth;
  }
  return error;
}
