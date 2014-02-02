var _ = require('lodash')
    , logger = require('./logger')
    , OAuth = require('oauth').OAuth
    , p = require('./misc/promise')
    , fs = require('fs')
    , extend = require('./misc/extend')
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
        apiEndPointUrl: 'https://api.xero.com/api.xro/2.0/'
    }
})

_.extend(Application.prototype, {
    init: function ()
    {
    },
    get: function (path, callback)
    {
        var defer = p.defer();
        this.oa.getProtectedResource(this.options.apiEndPointUrl + path, "GET", this.accessToken, this.accessSecret, function (err, data, response)
        {
            if (err)
                defer.reject(err);
            else
                defer.resolve({ data: data, response: response});
            callback && callback(error, data, response);
        });
        return defer.promise;
    },
    post: function(path,data,callback)
    {

    },
    put: function(path,data,callback)
    {

    },
    newBatch: function()
    {

    },
    xml2js: function(xml)
    {
        var parser = new xml2js.Parser({explicitArray:false});
        return p.nbind(parser.parseString,parser)(xml);
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