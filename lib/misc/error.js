var util = require('util');

module.exports.ErrorMessages = {
    e422: 'Unprocessable Entity',
    e404: 'Resource not found'
}


function XeroError(code, data, message)
{
    this.code = code;
    this.data = data;
    this.message = message || module.exports.ErrorMessages[code];
}

module.exports.XeroError = XeroError;

