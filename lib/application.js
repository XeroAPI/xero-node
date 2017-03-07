var _ = require('lodash'),
    logger = require('./logger'),
    OAuth = require('./oauth/oauth').OAuth,
    OAuthEcho = require('./oauth/oauth').OAuthEcho,
    p = require('./misc/promise'),
    fs = require('fs'),
    extend = require('./misc/extend'),
    dateformat = require('dateformat'),
    querystring = require('querystring'),
    Core = require('./core'),
    qs = require('querystring'),
    Payroll = require('./payroll'),
    xml2js = require('xml2js')

function Batch(application) {
    logger.debug('Batch::constructor');
    this._application = application;
    this._operations = [];
}

_.extend(Batch.prototype, {
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
    logger.debug('Application::constructor');
    this.options = _.merge(_.clone(Application.defaults), options);

    this.init();

    var core = new Core(this);
    var payroll = new Payroll(this);
    Object.defineProperties(this, {
        core: {
            get: function() {
                return core;
            }
        },
        payroll: {
            get: function() {
                return payroll;
            }
        }
    });
}

Application.extend = extend;

_.extend(Application, {
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
        pageMaxRecords: 100
    }
})

_.extend(Application.prototype, {
    init: function() {
        if (this.options["runscopeBucketId"] && this.options["runscopeBucketId"] !== "") {
            this.options.baseUrl = "https://api-xero-com-" + this.options["runscopeBucketId"] + ".runscope.net";
        }
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
        var deferred = p.defer();
        var params = {};
        if (options.summarizeErrors === false)
            params.summarizeErrors = false;

        //Added to support more than 2dp being added.
        if (options.unitdp)
            params.unitdp = options.unitdp;

        var endPointUrl = options.api === 'payroll' ? this.options.payrollAPIEndPointUrl : this.options.coreAPIEndPointUrl;
        var url = this.options.baseUrl + endPointUrl + path;
        if (!_.isEmpty(params))
            url += '?' + querystring.stringify(params);

        this.oa[method](url, this.options.accessToken, this.options.accessSecret, { xml: body }, function(err, data, res) {

            if (err && data && data.indexOf('oauth_problem') >= 0) {
                var errObj = new Error(method.toUpperCase() + ' call failed with: ' + err.statusCode);
                errObj.data = qs.parse(data);
                deferred.reject(errObj);
                callback && callback(errObj);
                return;
            }

            self.xml2js(data)
                .then(function(obj) {
                    if (err) {
                        var exception = "";
                        if (obj.ApiException)
                            exception = obj.ApiException;
                        else if (obj.Response.ErrorNumber)
                            exception = obj.Response;
                        var errObj = new Error(method.toUpperCase() + ' call failed with: ' + err.statusCode + ' and exception: ' + JSON.stringify(exception, null, 2));
                        deferred.reject(errObj);
                        callback && callback(errObj);
                    } else {
                        var ret = { response: obj.Response, res: res };
                        if (options.entityConstructor) {
                            ret.entities = self.convertEntities(obj.Response, options);
                        }
                        deferred.resolve(ret);
                        callback && callback(null, obj, res, ret.entities);
                    }

                })
                .fail(function(err) {
                    logger.error(err);
                    throw err;
                })

        });
        return deferred.promise;
    },
    delete: function(path, options, callback) {
        var self = this;
        options = options || {};

        var deferred, promise;
        deferred = p.defer();
        promise = deferred.promise;

        deleteResource();

        return promise;

        function deleteResource() {
            var endPointUrl = options.api === 'payroll' ? self.options.payrollAPIEndPointUrl : self.options.coreAPIEndPointUrl;
            var url = self.options.baseUrl + endPointUrl + path;

            self.oa.delete(url, self.options.accessToken, self.options.accessSecret, function(err, data, res) {
                if (options.stream && !err) {
                    // Already done
                    return deferred.resolve();
                }
                if (err && data && data.indexOf('oauth_problem') >= 0) {
                    var errObj = new Error('DELETE call failed with: ' + err.statusCode);
                    errObj.data = qs.parse(data);
                    deferred.reject(errObj);
                    callback && callback(errObj);
                    return;
                }

                if (err) {
                    var errObj = new Error('DELETE call failed with: ' + err.statusCode + ' and message: ' + err.data);
                    deferred.reject(errObj);
                    callback && callback(errObj);
                    return;
                }

                //Some delete operations don't return any content (e.g. HTTP204) so simply resolve the promise
                if (!data || data === "") {
                    return deferred.resolve();
                }

                self.xml2js(data)
                    .then(function(obj) {
                        var ret = { response: obj.Response, res: res };
                        deferred.resolve(ret);
                        callback && callback(null, obj, res);
                    })
                    .fail(function(err) {
                        logger.error(err);
                        throw err;
                    })
            }, { stream: options.stream });

        }
    },
    get: function(path, options, callback) {
        var self = this;
        options = options || {};

        var deferred, promise;

        // modifiedAfter
        delete self.oa._headers['If-Modified-Since'];
        if (options.modifiedAfter)
            this.oa._headers['If-Modified-Since'] = dateformat(options.modifiedAfter, 'yyyy-mm-dd"T"hh:MM:ss');
        if (options.format)
            this.oa._headers['Accept'] = 'application/' + options.format;
        deferred = p.defer();
        promise = deferred.promise;

        if (options.pager)
            getResource(options.pager.start || 1)
        else
            getResource();

        return promise;

        function getResource(offset) {
            var endPointUrl = options.api === 'payroll' ? self.options.payrollAPIEndPointUrl : self.options.coreAPIEndPointUrl;
            var url = self.options.baseUrl + endPointUrl + path;
            var params = {};
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

            if (!_.isEmpty(params)) {
                url += '?' + querystring.stringify(params);
            }

            self.oa.get(url, self.options.accessToken, self.options.accessSecret, function(err, data, res) {
                if (options.stream && !err) {
                    // Already done
                    return deferred.resolve();
                }
                if (err && data) {
                    var dataParts;
                    if (_.isObject(data))
                        dataParts = qs.parse(data);
                    else
                        dataParts = data;

                    var errObj = new Error('GET call failed with: ' + err.statusCode);
                    errObj.data = dataParts;
                    deferred.reject(errObj);
                    callback && callback(errObj);
                    return;
                }

                self.xml2js(data)
                    .then(function(obj) {
                        var ret = { response: obj.Response, res: res };
                        if (err) {
                            var errObj = new Error('GET call failed with: ' + err.statusCode + ' and exception: ' + JSON.stringify(obj.ApiException, null, 2));
                            deferred.reject(errObj);
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
                            deferred.resolve(ret);
                            callback && callback(null, obj, res);
                        }
                    })
                    .fail(function(err) {
                        logger.error(err);
                        throw err;
                    })
            }, { stream: options.stream });

        }
    },
    asArray: function(obj) {
        if (_.isArray(obj))
            return obj;
        else if (!_.isUndefined(obj))
            return [obj];
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
        var entitiesTop = _.deepResult(obj, options.entityPath);
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
            .fail(function(err) {
                logger.error(err);
                throw err;
            })

    },
    getEntities: function(path, options) {
        var self = this;
        var clonedOptions = _.clone(options || {});

        var deferred = p.defer();

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
            .fail(function(err) {
                logger.error(err);
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
    xml2js: function(xml) {
        var parser = new xml2js.Parser({ explicitArray: false });
        return p.nbind(parser.parseString, parser)(xml);
    },
    js2xml: function(obj, rootName) {
        var builder = new xml2js.Builder({ rootName: rootName, headless: true });
        var obj = builder.buildObject(obj);
        return obj;
    }
})

populateOptions = function(configFilePath) {
    if (!configFilePath) {
        //look for the config file in the user's home directory
        var homedir, config;

        homedir = process.env.HOME || process.env.USERPROFILE;
        if (homedir) {
            configFilePath = homedir + '/.xero/config.json';
        } else {
            var err = 'Couldn\'t find config.json in your home dir [' + homedir + '/.xero]. Exiting...';
            console.error(err);
            throw err;
        }
    }

    var options = {};

    try {
        logger.debug('configFilePath: ' + configFilePath);

        config = require(configFilePath);
        options["consumerKey"] = config.ConsumerKey;
        options["consumerSecret"] = config.ConsumerSecret;
        options["privateKeyPath"] = config.PrivateKeyPath;
        options["authorizeCallbackUrl"] = config.AuthorizeCallbackUrl;
        options["userAgent"] = config.UserAgent || "Xero - Node.js SDK";
        options["runscopeBucketId"] = config.RunscopeBucketId;
    } catch (e) {
        var err = 'Couldn\'t read config.json from [' + configFilePath + ']. Exiting...';
        console.error(err);
    }

    return options;
}

var PrivateApplication = Application.extend({
    constructor: function(configFilePath, options) {
        logger.debug('PrivateApplication::constructor');
        var options = _.merge(populateOptions(configFilePath), options);
        Application.call(this, _.extend({}, options, { type: 'private' }));
    },
    init: function() {
        Application.prototype.init.apply(this, arguments);
        var rsaPrivateKey = fs.readFileSync(this.options.privateKeyPath, "utf8");
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
        logger.debug('RequireAuthorizationApplication::constructor');
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

        var deferred = p.defer();
        this.oa.getOAuthRequestToken(extras, function(err, token, secret, results) {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve({ token: token, secret: secret, results: results });
            callback && callback.apply(callback, arguments);
        });
        return deferred.promise;
    },
    getAccessToken: function(token, secret, verifier, callback, options) {
        var deferred = p.defer();
        this.oa.getOAuthAccessToken(token, secret, verifier,
            function(err, token, secret, results) {
                if (err)
                    deferred.reject(err);
                else
                    deferred.resolve({ token: token, secret: secret, results: results });
                callback && callback.apply(callback, arguments);
            })
        return deferred.promise;
    },
    buildAuthorizeUrl: function(requestToken, other) {
        var q = _.extend({}, { oauth_token: requestToken }, other);
        return this.options.baseUrl + this.options.authorizeUrl + '?' + querystring.stringify(q);
    },
    setOptions: function(options) {
        this.options.accessToken = options.accessToken;
        this.options.accessSecret = options.accessSecret;
    }
});


var PublicApplication = RequireAuthorizationApplication.extend({
    constructor: function(configFilePath, args) {
        logger.debug('PublicApplication::constructor');
        var params = _.merge(populateOptions(configFilePath), args);
        RequireAuthorizationApplication.call(this, _.extend({}, params, { type: 'public' }));
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
    constructor: function(configFilePath, options) {
        logger.debug('PartnerApplication::constructor');
        var options = _.merge(populateOptions(configFilePath), options);
        RequireAuthorizationApplication.call(this, _.extend({}, options, { type: 'partner' }));
    },

    init: function() {
        RequireAuthorizationApplication.prototype.init.apply(this, arguments);
        var rsaPrivateKey = fs.readFileSync(this.options.privateKeyPath, "utf8");
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
        var keyCert = fs.readFileSync(this.options.privateKeyPath);
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