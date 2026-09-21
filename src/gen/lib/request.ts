import request = require('request');
import { redactError, redactResponse } from '../../model/redact';

function redactingRequest(options: request.Options, callback: request.RequestCallback): request.Request {
  return request(options, (error, response, body) => {
    const ok = response && response.statusCode >= 200 && response.statusCode <= 299;
    callback(redactError(error), ok ? response : redactResponse(response), body);
  });
}

namespace redactingRequest {
  export type Options = request.Options;
}

export = redactingRequest;
