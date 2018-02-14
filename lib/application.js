/* eslint-disable prettier/prettier */
'use strict';

const _ = require('lodash');
const OAuth = require('./oauth/oauth').OAuth;
const extend = require('./misc/extend');
const querystring = require('querystring');
const Core = require('./core');
const qs = require('querystring');
const Payroll = require('./payroll');
const events = require('events');

function Batch(application) {
    this._application = application;
    this._operations = [];
}

Object.assign(Batch.prototype, {
    get: function() {

    },
    post: function() {

    },
    put: function() {

    },
    delete: function() {

    },
    addOperation: function(operation) {
        this._operations.push(operation);
    },
    process: function() {

    }
});

function Application(options) {
  this.options = _.merge(_.clone(Application.defaults), options);

  this.init();

  const core = new Core(this);
  const payroll = new Payroll(this);

  Object.defineProperties(this, {
    core: {
      get() {
        return core;
      },
    },
    payroll: {
      get() {
        return payroll;
      },
    },
  });
}

Application.extend = extend;

Object.assign(Application, {
  defaults: {
    baseUrl: 'https://api.xero.com',
    consumerSecret: '',
    consumerKey: '',
    requestTokenUrl: '/oauth/RequestToken',
    accessTokenUrl: '/oauth/AccessToken',
    authorizeUrl: '/oauth/Authorize',
    authorizeCallbackUrl: '',
    coreAPIEndPointUrl: '/api.xro/2.0/',
    payrollAPIEndPointUrl: '/payroll.xro/1.0/',
    pageMaxRecords: 100,
    redirectOnError: false
  },
});

Object.assign(Application.prototype, {
  init: function() {
    if (this.options["runscopeBucketId"] && this.options["runscopeBucketId"] !== "") {
      this.options.baseUrl = "https://api-xero-com-" + this.options["runscopeBucketId"] + ".runscope.net";
    }

    if (!this.options.userAgent) {
        this.options.userAgent = this.options.consumerKey;
        console.warn('DEPRECATION WARNING: User agent not specified in config file. Consumer Key used instead. This may be deprecated in a future release.');
    }

    const PKG_JSON = require('../package.json')
    const XERO_APP_NAME = PKG_JSON.name;
    const XERO_VERSION = PKG_JSON.version;

    // Include the SDK name and version in the user-agent
    this.options.userAgent += ' (' + XERO_APP_NAME + ' - v' + XERO_VERSION + ')';

      this.eventEmitter = new events.EventEmitter();
    },
    post: function(path, body, options, callback) {
        return this.putOrPost('post', path, body, options, callback);
    },
    put: function(path, body, options, callback) {
        return this.putOrPost('put', path, body, options, callback);
    },
    putOrPost: function(method, path, body, options, callback) {
        var self = this;

        if (_.isFunction(options)) {
            callback = options;
            options = {};
        }
        options = options || {};
        return new Promise(function(resolve, reject) {
            var params = {};

            self.checkExpiry()
                .then(function() {
                    if (options.summarizeErrors === false)
                        params.summarizeErrors = false;

                    //Added to support more than 2dp being added.
                    if (options.unitdp)
                        params.unitdp = options.unitdp;

                    //Added to support attachments POST/PUT for invoices
                    //being included on the online invoice
                    if (options.IncludeOnline === true)
                        params.IncludeOnline = 'true';

                    var endPointUrl = options.api === 'payroll' ? self.options.payrollAPIEndPointUrl : self.options.coreAPIEndPointUrl;
                    var url = self.options.baseUrl + endPointUrl + path;
                    if (!_.isEmpty(params))
                        url += '?' + querystring.stringify(params);

                    var payload = body;
                    var contentType = options.contentType || 'application/json';

                    self.oa[method](url, self.options.accessToken, self.options.accessSecret, payload, contentType, function(err, data, res) {
                        try {
                          data = JSON.parse(data);
                        } catch (ex) {
                          // data could not be parsed as JSON, it's likely because of an oauth error
                          data = qs.parse(data);
                        }

                        if (err && data && data['ErrorNumber'] >= 0) {
                            var errObj = new Error(method.toUpperCase() + ' call failed with: ' + err.statusCode);
                            errObj.statusCode = err.statusCode;
                            errObj.data = data;
                            reject(errObj);
                            callback && callback(errObj);
                            return;
                        }

                        if (err) {
                            var exception = "";
                            if (data.ApiException)
                                exception = data.ApiException;
                            else if (data.ErrorNumber)
                                exception = data;
                            var errObj = new Error(method.toUpperCase() + ' call failed with: ' + err.statusCode + ' and exception: ' + JSON.stringify(exception, null, 2));
                            errObj.statusCode = err.statusCode;
                            reject(errObj);
                            callback && callback(errObj);
                        } else {

                            var ret = { response: data, res: res };
                            if (options.entityConstructor) {
                                ret.entities = self.convertEntities(data, options);
                            }
                            resolve(ret);
                            callback && callback(null, data, res, ret.entities);
                        }

                    });
                })
                .catch(function(err) {

                    if (err && err.data) {
                        var errObj = new Error(method.toUpperCase() + ' call failed with: ' + err.statusCode);
                        errObj.statusCode = err.statusCode;
                        errObj.data = err.data;
                        reject(errObj);
                        callback && callback(errObj);
                        return;
                    }
                });


        });
    },
    delete: function(path, options, callback) {
        var self = this;
        options = options || {};

        return new Promise(function(resolve, reject) {
            var endPointUrl = options.api === 'payroll' ? self.options.payrollAPIEndPointUrl : self.options.coreAPIEndPointUrl;
            var url = self.options.baseUrl + endPointUrl + path;

            self.checkExpiry()
                .then(function() {
                    self.oa.delete(url, self.options.accessToken, self.options.accessSecret, function(err, data, res) {
                        try {
                          data = JSON.parse(data);
                        } catch (ex) {
                          // data could not be parsed as JSON, it's likely because of an oauth error
                          data = qs.parse(data);
                        }

                        if (options.stream && !err) {
                            // Already done
                            return resolve();
                        }
                        if (err && data && data['ErrorNumber'] >= 0) {
                            var errObj = new Error('DELETE call failed with: ' + err.statusCode);
                            errObj.statusCode = err.statusCode;
                            errObj.data = data;
                            reject(errObj);
                            callback && callback(errObj);
                            return;
                        }

                        if (err) {
                            var errObj = new Error('DELETE call failed with: ' + err.statusCode + ' and message: ' + err.data);
                            errObj.statusCode = err.statusCode;
                            reject(errObj);
                            callback && callback(errObj);
                            return;
                        }

                        //Some delete operations don't return any content (e.g. HTTP204) so simply resolve the promise
                        if (!data || data === "") {
                            return resolve();
                        }

                        var ret = { response: data, res: res };
                        resolve(ret);
                        callback && callback(null, data, res);

                    }, { stream: options.stream });
                })
                .catch(function(err) {

                    if (err && err.data) {
                        var errObj = new Error('DELETE call failed with: ' + err.statusCode);
                        errObj.statusCode = err.statusCode;
                        errObj.data = err.data;
                        reject(errObj);
                        callback && callback(errObj);
                        return;
                    }
                });
        });
    },
    get: function(path, options, callback) {
        var self = this;
        options = options || {};

        return new Promise(function(resolve, reject) {
            // modifiedAfter
            delete self.oa._headers['If-Modified-Since'];
            if (options.modifiedAfter) {
                //parse the supplied value. timestamp will be NaN if an invalid string is parsed.
                var modifiedDate = new Date(options.modifiedAfter);

                if (isNaN(modifiedDate.getTime()) === false) {
                    self.oa._headers['If-Modified-Since'] = modifiedDate.toISOString();
                }
            }

            if (options.format) {
               //Make more robust for ways to set the format.
               if(options.format.startsWith('application/')) {
                 self.oa._headers['Accept'] = options.format;
               } else{
                  self.oa._headers['Accept'] = 'application/' + options.format;
               }

            } else {
                self.oa._headers['Accept'] = 'application/json';
            }

            self.checkExpiry()
                .then(function() {
                    if (options.pager)
                        getResource(options.pager.start || 1)
                    else
                        getResource();
                })
                .catch(function(err) {

                    if (err && err.data) {
                        var errObj = new Error('GET call failed with: ' + err.statusCode);
                        errObj.statusCode = err.statusCode;
                        errObj.data = err.data;
                        reject(errObj);
                        callback && callback(errObj);
                        return;
                    }
                });

            function getResource(offset) {
                var endPointUrl = options.api === 'payroll' ? self.options.payrollAPIEndPointUrl : self.options.coreAPIEndPointUrl;
                var url = self.options.baseUrl + endPointUrl + path;
                var params = options.params || {};
                if (offset) {
                    params[options.pager.paramName || 'page'] = offset;
                    if (options.other) {
                        _.each(options.other, function(value, key) {
                            if (!_.isUndefined(value))
                                params[key] = value;
                        })
                    }
                }

                /*
                Added for where clause support on the GET requests.
                */
                if (options.where) {
                    params['Where'] = options.where;
                }

                if (options.unitdp) {
                    params.unitdp = options.unitdp;
                }

                if (!_.isEmpty(params)) {
                    url += '?' + querystring.stringify(params);
                }

                self.oa.get(url, self.options.accessToken, self.options.accessSecret, function(err, data, res) {

                   var contentTypeHeader = (res.headers['content-type']) ? res.headers['content-type'] : "";
                   var contentType = (contentTypeHeader.indexOf(';') >=0) ?
                     contentTypeHeader.substr(0, contentTypeHeader.indexOf(';')) : contentTypeHeader;

                  try {
                    switch(contentType){
                       case 'application/pdf':
                         //Extract FileName Details
                         //OLD REGEX
                         //var fileMatches = /filename="([^"]+(INV-\d+)\.pdf)"/i.exec(res.headers['content-disposition']);
                         // IMPROVED REGEX
                         var fileMatches = /filename="([^"]+(.+)\.pdf)"/i.exec(res.headers['content-disposition']);
                         //Extract Object Type - TODO: Is there not a better way than this?
                         var objectMatches = /https:\/\/api\.xero\.com\/api\.xro\/[\d\.]+\/([^\/]+)/i.exec(res.responseUrl);
                         var returnObject = {};
                         returnObject[objectMatches[1]] = [{
                           FileName: fileMatches[1],
                           InvoiceNumber: fileMatches[2],
                           PdfContentRaw : data
                         }];
                         data = returnObject;
                         break;
                       case 'text/xml':
                       //TODO: Account for this, but I'm not sure about the OAuth Error mentioned in the catch below
                       default:
                         data = JSON.parse(data);
                     }
                  } catch (ex) {
                    // data could not be parsed as JSON, it's likely because of an oauth error
                    data = qs.parse(data);
                  }

                  if (options.stream && !err) {
                      // Already done
                      return resolve();
                  }

                  if (err && data) {
                      var errObj = new Error('GET call failed with: ' + err.statusCode);
                      errObj.statusCode = err.statusCode;
                      errObj.data = data;
                      reject(errObj);
                      callback && callback(errObj);
                      return;
                  }

                  var ret = { response: data, res: res };
                  if (err) {
                      var errObj = new Error('GET call failed with: ' + err.statusCode + ' and exception: ' + JSON.stringify(data.ApiException, null, 2));
                      errObj.statusCode = err.statusCode;
                      reject(errObj);
                      callback && callback(errObj);
                      return;
                  }

                  if (options.pager && options.pager.callback) {
                      options.pager.callback(err, ret, function(err, result) {
                          result = _.defaults({}, result, { recordCount: 0, stop: false });
                          if (!result.stop)
                              getResource(result.nextOffset || ++offset);
                          else
                              done();
                      })
                      return;
                  }

                  done();

                  function done() {
                      resolve(ret);
                      callback && callback(null, data, res);
                  }
                }, { stream: options.stream });
            };
        });
    },
    getRaw: function(path, options, callback) {
        var self = this;
        options = options || {};

        return new Promise(function(resolve, reject) {
            // modifiedAfter
            delete self.oa._headers['If-Modified-Since'];
            delete self.oa._headers['Accept'];

            self.checkExpiry()
                .then(function() {
                    getResource();
                })
                .catch(function(err) {

                    if (err && err.data) {
                        var errObj = new Error('GET call failed with: ' + err.statusCode);
                        errObj.statusCode = err.statusCode;
                        errObj.data = err.data;
                        reject(errObj);
                        callback && callback(errObj);
                        return;
                    }
                });

            function getResource() {
                var endPointUrl = options.api === 'payroll' ? self.options.payrollAPIEndPointUrl : self.options.coreAPIEndPointUrl;
                var url = self.options.baseUrl + endPointUrl + path.split(endPointUrl)[1];

                self.oa.get(url, self.options.accessToken, self.options.accessSecret, function(err, data, res) {
                    if (options.stream && !err) {
                        // Already done
                        return resolve();
                    }
                    if (err && data) {
                      var dataParts = qs.parse(data);

                      var errObj = new Error('GET call failed with: ' + err.statusCode);
                      errObj.statusCode = err.statusCode;
                      errObj.data = dataParts;
                      reject(errObj);
                      callback && callback(errObj);
                      return;
                    } else if(err) {
                      var errObj = new Error('GET call failed with: ' + err.statusCode);
                      errObj.statusCode = err.statusCode;
                      reject(errObj);
                      callback && callback(errObj);
                      return;
                    }

                    resolve(data);
                    callback && callback(null, data, null);
                    return;
                }, { stream: options.stream });

            };
        });
    },
    makeObjectFromPath: function(path) {
        var pathParts = path.split('.');
        var obj = currentObj = {};
        _.each(pathParts, function(pathPart) {
            currentObj = currentObj[pathPart] = {};
        });
        return obj;
    },
    putOrPostEntity: function(method, path, body, options, callback) {
        return this.putOrPost(method, path, body, options, callback)
    },
    putOrPostPostEntities: function(method, path, body, options, callback) {
        return this.putOrPost(method, path, body, options, callback)
    },
    postEntity: function(path, body, options, callback) {
        return this.putOrPostEntity('post', path, body, options, callback)
    },
    putEntity: function(path, body, options, callback) {
        return this.putOrPostEntity('put', path, body, options, callback)
    },
    postEntities: function(path, body, options, callback) {
        return this.putOrPostPostEntities('post', path, body, options, callback)
    },
    putEntities: function(path, body, options, callback) {
        return this.putOrPostPostEntities('put', path, body, options, callback)
    },
    convertEntities: function(obj, options) {
        var entities = [];
        var entitiesTop = obj[options.entityPath];
        if (!entitiesTop)
            return [];

        if (_.isArray(entitiesTop)) {
            _.each(entitiesTop, function(entityObj) {
                addEntity(entityObj);
            })
        } else {
            addEntity(entitiesTop);
        }
        return entities;

        function addEntity(entityObj) {
            var entity = options.entityConstructor();
            entity.fromXmlObj(entityObj);
            entities.push(entity);
        }
    },
    deleteEntities: function(path, options) {
        return this.delete(path, options)
            .then(function(ret) {
                if (ret && ret.response)
                    return ret.response;
            })
            .catch(function(err) {
                throw err;
            })

    },
    getEntities: function(path, options) {
        var self = this;
        var clonedOptions = _.clone(options || {});

        var callerPagerCallback;
        if (clonedOptions.pager) {
            callerPagerCallback = clonedOptions.pager.callback;
            clonedOptions.pager.callback = pagerCallback;
        }

        return this.get(path, options)
            .then(function(ret) {
                if (ret && ret.response)
                    return self.convertEntities(ret.response, clonedOptions);
            })
            .catch(function(err) {
                throw err;
            })

        function pagerCallback(err, result, cb) {

            if (err) {
                callerPagerCallback && callerPagerCallback(err, null,
                    function() {
                        cb(err);
                    })
            } else {
                var entities = self.convertEntities(result.response, clonedOptions);
                callerPagerCallback && callerPagerCallback(err, {
                        data: entities,
                        finished: entities.length < self.options.pageMaxRecords
                    },
                    function(err, result) {
                        result = _.defaults({}, result, {
                            recordCount: entities.length,
                            stop: entities.length < self.options.pageMaxRecords
                        });
                        cb(err, result);
                    });
            }
        }
    },
    batch: function() {
        return new Batch(application);
    },
    convertDate: function(d) {
        if (typeof d.getDate === 'function') {
            return d.toISOString().split("T")[0]
        } else {
            return d
        }
    },
    checkExpiry: function() {

        /**
         * CheckExpiry is a helper function that will compare the current token expiry to the current time.
         *
         * As there is potential for a time difference, instead of waiting all the way until the current time
         * has passed the expiry time, we instead add 3 minutes to the current time, and use that as a comparison.
         *
         * This ensures that if the token is 'nearing' the expiry, it'll attempt to be refreshed.
         */

        var expiry = new Date(this.options.tokenExpiry),
            checkTime = addMinutes(new Date(), 3);

        if (checkTime >= expiry) {

            return this.refreshAccessToken();
        } else {
            return Promise.resolve();
        }

        function addMinutes(date, minutes) {
            return new Date(date.getTime() + minutes * 60000);
        }
    }
})

var PrivateApplication = Application.extend({
    constructor: function(config) {

        Application.call(this, Object.assign({}, config, { type: 'private' }));
    },
    init: function() {
        Application.prototype.init.apply(this, arguments);
        var rsaPrivateKey = this.options.privateKey;
        this.oa = new OAuth(
            null,
            null,
            this.options.consumerKey,
            rsaPrivateKey,
            "1.0a",
            null,
            "RSA-SHA1",
            null, { 'User-Agent': this.options.userAgent }
        );
        this.options.accessToken = this.options.consumerKey;
        this.accessSecret = this.options.consumerSecret;
    }

});

var RequireAuthorizationApplication = Application.extend({
    constructor: function(options) {
        Application.call(this, options);
    },
    init: function() {
        Application.prototype.init.apply(this, arguments);
    },
    getRequestToken: function(extras, callback) {
        if (_.isFunction(extras)) {
            callback = extras;
            extras = {};
        }
        extras = extras || {};

        var self = this;

        return new Promise(function(resolve, reject) {
            self.oa.getOAuthRequestToken(extras, function(err, token, secret, results) {
                if (err)
                    reject(err);
                else
                    resolve({ token: token, secret: secret, results: results });
                callback && callback.apply(callback, arguments);
            });
        });
    },
    setAccessToken: function(token, secret, verifier, callback, options) {
        var self = this;

        return new Promise(function(resolve, reject) {
            self.oa.getOAuthAccessToken(token, secret, verifier, function(err, results) {
                if (err)
                    reject(err);
                else {
                    var exp = new Date();
                    exp.setTime(exp.getTime() + (results.oauth_expires_in * 1000));
                    self.setOptions({
                        accessToken: results.oauth_token,
                        accessSecret: results.oauth_token_secret,
                        sessionHandle: results.oauth_session_handle,
                        tokenExpiry: exp.toString()
                    });
                    resolve({ results: results });
                }
                callback && callback.apply(callback, arguments);
            })
        });
    },
    refreshAccessToken: function(callback, options) {
        var self = this;

        return new Promise(function(resolve, reject) {
            self.oa.getOAuthAccessToken(self.options.accessToken, self.options.accessSecret, { oauth_session_handle: self.options.sessionHandle }, function(err, results) {
                if (err)
                    reject(err);
                else {
                    var exp = new Date();
                    exp.setTime(exp.getTime() + (results.oauth_expires_in * 1000));
                    self.setOptions({
                        accessToken: results.oauth_token,
                        accessSecret: results.oauth_token_secret,
                        sessionHandle: results.oauth_session_handle,
                        tokenExpiry: exp.toString()
                    });
                    resolve({ results: results });
                }

                callback && callback.apply(callback, arguments);
            })
        });
    },
    buildAuthorizeUrl: function(requestToken, other) {
        other = other || {};
        other['redirectOnError'] = this.options.redirectOnError

        var q = Object.assign({}, { oauth_token: requestToken }, other);
        return this.options.baseUrl + this.options.authorizeUrl + '?' + querystring.stringify(q);
    },
    setOptions: function(options) {


        if (this.options.accessToken) {
            if (options.accessToken !== this.options.accessToken) {
                if (this.eventEmitter) {

                    this.eventEmitter.emit('xeroTokenUpdate', options);
                }
            }
        }

        this.options = Object.assign(this.options, options);
    }
});


var PublicApplication = RequireAuthorizationApplication.extend({
    constructor: function(config) {
        RequireAuthorizationApplication.call(this, Object.assign({}, config, { type: 'public' }));
    },
    init: function() {
        RequireAuthorizationApplication.prototype.init.apply(this, arguments);
        this.oa = new OAuth(
            this.options.baseUrl + this.options.requestTokenUrl,
            this.options.baseUrl + this.options.accessTokenUrl,
            this.options.consumerKey,
            this.options.consumerSecret,
            "1.0a",
            this.options.authorizeCallbackUrl,
            "HMAC-SHA1",
            null, { 'User-Agent': this.options.userAgent }
        );
    }
});

var PartnerApplication = RequireAuthorizationApplication.extend({
    constructor: function(config) {

        RequireAuthorizationApplication.call(this, Object.assign({}, config, { type: 'partner' }));
    },

    init: function() {
        RequireAuthorizationApplication.prototype.init.apply(this, arguments);
        var rsaPrivateKey = this.options.privateKey;
        this.oa = new OAuth(
            this.options.baseUrl + this.options.requestTokenUrl,
            this.options.baseUrl + this.options.accessTokenUrl,
            this.options.consumerKey,
            rsaPrivateKey,
            "1.0a",
            this.options.authorizeCallbackUrl,
            "RSA-SHA1",
            null, { 'User-Agent': this.options.userAgent }
        );
        //use SSL certificate
        var keyCert = this.options.privateKey;
        this.oa._createClient = function(port, hostname, method, path, headers, sslEnabled) {
            var options = {
                host: hostname,
                port: port,
                path: path,
                method: method,
                headers: headers,
                key: keyCert
            };
            var httpModel;
            if (sslEnabled) {
                httpModel = require('https');
            } else {
                httpModel = require('http');
            }
            return httpModel.request(options);
        };
    }

});

module.exports.PrivateApplication = PrivateApplication;
module.exports.PublicApplication = PublicApplication;
module.exports.PartnerApplication = PartnerApplication;
module.exports.Application = Application;
