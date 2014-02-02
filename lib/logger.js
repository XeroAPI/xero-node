var log4js = require('log4js')
    , fs = require('fs')
    , path = require('path')
    , dateFormat = require('dateformat')
    , util = require('util')
    , _ = require('lodash');

var Logger = function (settings)
{
	this.settings = _.defaults({}, settings, { level: 'warn', toConsole: false, toFile: false, filePrefix: '', fileDate: null, directory: ''});
	this.init();
	var self = this;
	['info','warning','error','debug','fatal'].forEach(function(v)
	{
	    self[v] = function()
	    {
	        self.log.apply(self, [v].concat(_.toArray(arguments)));
	    }
	});
}
Logger.prototype = {
    config: function(settings)
    {
        settings = _.defaults({}, settings,  this.settings);
        var appenders = [];
        if (settings.toConsole)
        {
            appenders.push({ type: 'console', layout: { type: 'pattern', pattern: '[%d] [%p] %m' } });
        }
        if (settings.toFile)
        {
            log4js.loadAppender('file');
            appenders.push({
                type: 'file',
                filename: path.join(settings.directory, settings.filePrefix + dateFormat(new Date, 'dd-mm-yyyy') + '.log'),
                layout: { type: 'pattern', pattern: '[%d] [%p] %m' }
            });
        }
        log4js.configure({ appenders: appenders, replaceConsole: false });
        this.setLevel(settings.level);
        _.extend(this.settings, settings);

    },
    init: function (settings)
    {
        settings = _.defaults({}, settings, this.settings);
        if (!settings.fileDate || settings.fileDate.toDateString() != (new Date()).toDateString())
        {
            settings.fileDate = this.settings.fileDate = new Date();
            this.config(settings);
        }
    },
    setLevel: function(level)
    {
        log4js.getLogger().setLevel(level);

    },
    log: function (level)
    {
        this.init();
        log4js.getLogger()[level].apply(log4js.getLogger(), Array.prototype.slice.call(arguments,1));
    },
    express: function ()
    {
        var self = this;
        return function (req, res, next)
        {
            res.locals.logger = self;
            next();
        }
    },
    prefix: function (p)
    {
        var self = this;
        var logger = function ()
        {
            this._logger = self;
        }

        var c = function () {}
        c.prototype = this;

        logger.prototype = new c();
        logger.prototype.constructor = logger;
        ['log', 'info', 'debug', 'error', 'warning'].forEach(function (level)
        {
            // module.exports[level] = function ()
            logger.prototype[level] = function ()
            {
                var l = level == 'log' ? arguments[0] : level;
                var args = Array.prototype.slice.call(arguments, level == 'log' ? 1 : 0);
                this._logger[level].call(this._logger, _.map([p].concat(args),
                    function (i)
                    {
                        if (_.isObject(i) || _.isArray(i))
                            return JSON.stringify(i,null,4);
                        else if (i != null )
                            return i.toString()
                        else
                            return ''
                    }).join(' '));
            }
            
        });
        return new logger();
        
    }


};

module.exports = new Logger() // default instance;
module.exports.Logger = Logger;
