var _ = require('lodash')
    , logger = require('./logger')
    , OAuth = require('oauth').OAuth
    , p = require('./misc/promise')
    , fs = require('fs')
    , extend = require('./misc/extend')
    , dateformat = require('dateformat')
    , querystring = require('querystring')
    , Core = require('./core')
    // , Payroll = require('./payroll')
    , xml2js = require('xml2js')

function Batch(application)
{
    logger.debug('Batch::constructor');
    this._application = application;
    this._operations = [];
}

_.extend(Batch.prototype, {
    get: function()
    {

    },
    post: function()
    {

    },
    put: function()
    {

    },
    addOperation: function(operation)
    {
        this._operations.push(operation);
    },
    process: function()
    {

    }
});

function Application(options)
{
    logger.debug('Application::constructor');
    this.options = _.merge(_.clone(Application.defaults), options);
    this.init();

    var core = new Core(this);
    // var payroll = new Payroll(this);
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
    })
}

Application.extend = extend;

_.extend(Application, {
    defaults: {
        consumerSecret: '',
        consumerKey: '',
        requestTokenUrl: 'https://api.xero.com/oauth/RequestToken',
        accessTokenUrl: 'https://api.xero.com/oauth/AccessToken',
        authorizeUrl: 'https://api.xero.com/oauth/Authorize',
        authorizeCallbackUrl: '',
        apiEndPointUrl: 'https://api.xero.com/api.xro/2.0/',
        pageMaxRecords: 100
    }
})

_.extend(Application.prototype, {
    init: function ()
    {
    },
    post: function(path, body, options,callback)
    {
        return this.putOrPost('post',path, body, options,callback);
    },
    put: function(path, body, options,callback)
    {
        return this.putOrPost('put',path, body, options,callback);
    },
    putOrPost: function(method,path, body, options,callback)
    {
        var self = this;

        if (_.isFunction(options))
        {
            callback = options;
            options = {};
        }
        options = options || {};
        var deferred = p.defer();
        var params = {};
        if (options.summarizeErrors === false)
            params.summarizeErrors = false;

        var url = this.options.apiEndPointUrl + path + '?' + querystring.stringify(params);
        this.oa[method](url, this.accessToken, this.accessSecret, {xml:body},function (err, data, res)
            {
                self.xml2js(data)
                    .then(function(obj)
                    {
                        if (err)
                        {
                            var errObj = { statusCode:err.statusCode, exception:obj.ApiException};
                            deferred.reject(errObj);
                            callback && callback(errObj);
                        }
                        else
                        {
                            deferred.resolve({response:obj.Response, res:res});
                            callback && callback(null, obj, res);
                        }

                    })

            });
        return deferred.promise;
    },
    get: function (path, options,callback)
    {
        var self = this;
        options = options || {};

        var deferred, promise;

        // modifiedAfter
        delete self.oa._headers['If-Modified-Since'];
        if (options.modifiedAfter)
            this.oa._headers['If-Modified-Since'] = dateformat(options.modifiedAfter,'yyyy-mm-dd"T"hh:MM:ss');

        if (options.pager )
        {
            promise = p();
            getResource(options.pager.start)
        }
        else
        {
            deferred = p.defer();
            promise = deferred.promise;
            getResource();
        }

        return promise;
        function getResource(offset)
        {
            var url = self.options.apiEndPointUrl + path;
            var params = {};
            if (offset)
            {
                params[options.pager.paramName || 'page'] = offset;
            }
            if (!_.isEmpty(params))
                url += '?' + querystring.stringify(params);
            self.oa.get(url, self.accessToken, self.accessSecret, function (err, data, res)
            {
                self.xml2js(data)
                    .then(function(obj)
                    {
                        var ret = {response:obj.Response,  res: res};
                        if (deferred)
                        {
                            if (err)
                            {
                                var errObj = { statusCode:err.statusCode, exception:obj.ApiException};
                                deferred.reject(errObj);
                                callback && callback(errObj);
                            }
                            else
                            {
                                deferred.resolve(ret);
                                callback && callback(null, obj, res);
                            }
                        }
                        else
                        {
                            if (options.pager && options.pager.callback)
                            {
                                options.pager.callback(err, ret, function(err,result)
                                {
                                    result = _.defaults({}, result, { recordCount:0, stop:false});
                                    if (!result.stop)
                                        getResource(result.nextOffset || ++offset);
                                })
                            }

                        }
                    })
            });

        }
    },
    asArray: function(obj)
    {
        if (_.isArray(obj))
            return obj;
        else if (!_.isUndefined(obj))
            return [obj];
    },
    makeObjectFromPath: function(path)
    {
        var pathParts = path.split('.');
        var obj = currentObj = {};
        _.each(pathParts, function(pathPart)
        {
            currentObj = currentObj[pathPart] = {};
        });
        return obj;
    },
    putOrPostEntity: function(method,path,body,options,callback)
    {
        return this.putOrPost(method, path, body, options, callback)
    },
    putOrPostPostEntities: function(method,path, body, options,callback)
    {
        return this.putOrPost(method, path, body, options, callback)
    },
    postEntity: function(path,body,options,callback)
    {
        return this.putOrPostEntity('post',path, body, options, callback)
    },
    putEntity: function(path,body,options,callback)
    {
        return this.putOrPostEntity('put',path, body, options, callback)
    },
    postEntities: function(path, body, options,callback)
    {
        return this.putOrPostPostEntities('post',path, body, options, callback)
    },
    putEntities: function(path, body, options,callback)
    {
        return this.putOrPostPostEntities('put',path, body, options, callback)
    },
    getEntities: function (path,options)
    {
        var self = this;
        var clonedOptions = _.clone(options || {});


        var callerPagerCallback;
        if (clonedOptions.pager) {
            callerPagerCallback = clonedOptions.pager.callback;
            clonedOptions.pager.callback = pagerCallback;
        }

        return this.get(path, options)
            .then(function (ret)
            {
                if (ret && ret.response)
                    return convertEntities(ret.response);
            })

        function convertEntities(obj)
        {
            var entities = [];
            var entitiesTop = _.deepResult(obj, clonedOptions.entityPath);
            if (!entitiesTop)
                return;

            if (_.isArray(entitiesTop)) {
                _.each(entitiesTop, function (entityObj)
                {
                    addEntity(entityObj);
                })
            }
            else {
                addEntity(entitiesTop);
            }
            return entities;

            function addEntity(entityObj)
            {
                var entity = clonedOptions.entityConstructor();
                entity.fromXmlObj(entityObj);
                entities.push(entity);
            }
        }

        function pagerCallback(err, result, cb)
        {

            if (err)
            {
                callerPagerCallback && callerPagerCallback(err,  null,
                    function()
                    {
                        cb(err);
                    })
            }
            else
            {
                var entities = convertEntities(result.response);
                callerPagerCallback && callerPagerCallback(err, {data: entities, finished:entities.length < self.options.pageMaxRecords},
                    function (err,result)
                    {
                        result = _.defaults({}, result,  { recordCount:entities.length, stop:entities.length < self.options.pageMaxRecords});
                        cb(err, result);
                    });
            }
        }
    },
    batch: function()
    {
        return new Batch(application);
    },
    xml2js: function(xml)
    {
        var parser = new xml2js.Parser({explicitArray:false});
        return p.nbind(parser.parseString,parser)(xml);
    },
    js2xml: function(obj,rootName)
    {
        var builder = new xml2js.Builder({ rootName:rootName, xmldec:{headless:true}});
        return builder.buildObject(obj);
    }
})


var PrivateApplication = Application.extend({
    constructor: function (options)
    {
        logger.debug('PrivateApplication::constructor');
        Application.call(this, _.extend({}, options, { type: 'private'}));
    },
    init: function ()
    {
        Application.prototype.init.apply(this, arguments);
        var rsaPrivateKey = fs.readFileSync(this.options.privateKeyPath, "utf8");
        this.oa = new OAuth(
            null,
            null,
            this.options.consumerKey,
            rsaPrivateKey,
            "1.0a",
            null,
            "RSA-SHA1"
        );
        this.accessToken = this.options.consumerKey;
        this.accessSecret = this.options.consumerSecret;
    }

});

var RequireAuthorizationApplication = Application.extend({
    constructor: function (options)
    {
        logger.debug('RequireAuthorizationApplication::constructor');
        Application.call(this, options);
    },
    init: function ()
    {
        Application.prototype.init.apply(this, arguments);
    },
    getRequestToken: function (callback, options)
    {
        var deferred = p.defer();
        this.oa.getOAuthRequestToken(function (err, token, secret, results)
        {
            if (err)
                deferred.reject(err);
            else
                deferred.resolve({ token: token, secret: secret, results: results});
            callback && callback.apply(callback, arguments);
        });
        return deferred.promise;
    },
    getAccessToken: function (token, secret, verifier, callback, options)
    {
        var deferred = p.defer();
        this.oa.getOAuthAccessToken(token, secret, verifier,
            function (err, token, secret, results)
            {
                if (err)
                    deferred.reject(err);
                else
                    deferred.resolve({ token: token, secret: secret, results: results});
                callback && callback.apply(callback, arguments);
            })
        return deferred.promise;
    },
    buildAuthorizeUrl: function (requestToken, options)
    {
        return this.options.authorizeUrl + '?' + querystring.stringify({ oauth_token: requestToken});
    }
});


var PublicApplication = RequireAuthorizationApplication.extend({
    constructor: function (options)
    {
        logger.debug('PublicApplication::constructor');
        RequireAuthorizationApplication.call(this, _.extend({}, options, { type: 'public'}));
    },
    init: function ()
    {
        RequireAuthorizationApplication.prototype.init.apply(this, arguments);
        this.oa = new OAuth(
            this.options.requestTokenUrl,
            this.options.accessTokenUrl,
            this.options.consumerKey,
            this.options.consumerSecret,
            "1.0a",
            this.options.authorizeCallbackUrl,
            "HMAC-SHA1"
        );

    }
});

var PartnerApplication = RequireAuthorizationApplication.extend({
    constructor: function (options)
    {
        logger.debug('PartnerApplication::constructor');
        RequireAuthorizationApplication.call(this, _.extend({}, options, { type: 'parter'}));
    },
    init: function ()
    {
        RequireAuthorizationApplication.prototype.init.apply(this, arguments);
    }

});

module.exports.PrivateApplication = PrivateApplication;
module.exports.PublicApplication = PublicApplication;
module.exports.PartnerApplication = PartnerApplication;
module.exports.Application = Application;