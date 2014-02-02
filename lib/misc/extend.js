var _ = require('lodash')

/* Courtesy Backbone.extend */
module.exports = function (protoProps, staticProps)
{
    var ctor = function () { }, inherits = function (parent, protoProps, staticProps)
    {
        var child, _super = parent.prototype, fnTest = /xyz/.test(function () { xyz; }) ? /\b_super\b/ : /.*/;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && protoProps.hasOwnProperty('constructor'))
        {
            child = protoProps.constructor;
        } else
        {
            child = function () { parent.apply(this, arguments); };
        }

        // Inherit class (static) properties from parent.
        _.extend(child, parent);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        ctor.prototype = parent.prototype;
        child.prototype = new ctor();

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps)
        {
            _.extend(child.prototype, protoProps);

            // Copy the properties over onto the new prototype
            for (var name in protoProps)
            {
                // Check if we're overwriting an existing function
                if (typeof protoProps[name] == "function" && typeof _super[name] == "function" && fnTest.test(protoProps[name]))
                {
                    child.prototype[name] = (function (name, fn)
                    {
                        var wrapper = function ()
                        {
                            var tmp = this._super;

                            // Add a new ._super() method that is the same method
                            // but on the super-class
                            this._super = _super[name];

                            // The method only need to be bound temporarily, so we
                            // remove it when we're done executing
                            var ret;
                            try
                            {
                                ret = fn.apply(this, arguments);
                            } finally
                            {
                                this._super = tmp;
                            }
                            return ret;
                        };

                        //we must move properties from old function to new
                        for (var prop in fn)
                        {
                            wrapper[prop] = fn[prop];
                            delete fn[prop];
                        }

                        return wrapper;
                    })(name, protoProps[name]);
                }
            }
        }

        // Add static properties to the constructor function, if supplied.
        if (staticProps) _.extend(child, staticProps);

        // Correctly set child's `prototype.constructor`.
        child.prototype.constructor = child;

        // Set a convenience property in case the parent's prototype is needed later.
        child.__super__ = parent.prototype;

        return child;
    };
    return inherits(this, protoProps, staticProps);
}
