const { isUndefined, isFunction, isObject, isArray, isBoolean, isString, toArray, isDate, isNumber, size, clone, difference, includes, defaults, isNull, isEmpty, matches } = require('lodash');

// Is a number (ignores type).
var isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

// Used to fetch current values.
var getter = function(index, value, properties) {
    // Most calculations happen within the setter and the value passed is typically the value we want to use.
    // Typically, the getter just returns the value.
    // Modifications to the value within the getter are not written to the object.

    // Return default value if present & current value is undefined -- do not write to object
    if (isUndefined(value) && !isUndefined(properties.default)) {
        value = setter.call(this, index, (isFunction(properties.default) ? properties.default.call(this) : properties.default), value, properties);
    }

    return value;
};

// Returns typecasted value if possible. If rejected, originalValue is returned.
var setter = function(index, value, originalValue, properties) {
    var self = this;
    // Allow transform to manipulate raw properties.
    if (properties.transform) {
        value = properties.transform.call(this, value, originalValue, properties);
    }

    switch (properties.type) {
        case 'string':
            // Reject if object or array.
            if (isObject(value) || isArray(value)) {
                return originalValue;
            }

            // If index is being set with null or undefined, set value and end.
            if (isUndefined(value) || value === null) {
                return changeTracking(value);
            }

            // Typecast to String.
            value = value + '';

            // If stringTransform function is defined, use.
            // This is used before we do validation checks (except to be sure we have a string at all).
            if (properties.stringTransform) {
                value = properties.stringTransform.call(this, value, originalValue, properties);
            }

            // If clip property & maxLength properties are set, the string should be clipped.
            // This is basically a shortcut property that could be done with stringTransform.
            if (properties.clip && !isUndefined(properties.maxLength)) {
                value = value.substr(0, properties.maxLength);
            }

            // Check against filters before returning value
            if (
                // If enum is being used, be sure the value is within definition.
                (isArray(properties.enum) && properties.enum.indexOf(value) === -1)

                // If minLength is defined, check to be sure the string is > minLength
                ||
                (!isUndefined(properties.minLength) && value.length < properties.minLength)

                // If maxLength is defined, check to be sure the string is < maxLength
                ||
                (!isUndefined(properties.maxLength) && value.length > properties.maxLength)

                // If regex is defined, check to be sure the string matches the regex pattern.
                ||
                (properties.regex && !properties.regex.test(value))
            ) {
                // If the string doesn't meet requirements, it will remain untouched.
                return originalValue;
            }
            return changeTracking(value);

        case 'number':
            // Set values for boolean.
            if (isBoolean(value)) {
                value = value ? 1 : 0;
            }

            if (
                // Reject if array.
                isArray(value)
                ||
                isObject(value)

                // Reject if not numeric.
                ||
                !isNumeric(value)
            ) {
                // If the value doesn't meet requirements, it will remain untouched.
                return originalValue;
            }

            // Typecast to number.
            value = value * 1;

            // Check against filters before returning value
            if (
                // If min is defined, check to be sure the integer is > min
                (!isUndefined(properties.min) && value < properties.min)

                // If max is defined, check to be sure the string is < max
                ||
                (!isUndefined(properties.max) && value > properties.max)
            ) {
                // If the string doesn't meet requirements, it will remain untouched.
                return originalValue;
            }
            return changeTracking(value);

        case 'boolean':
            // If is String and is 'false', return false.
            if (isString(value) && value === 'false') {
                return changeTracking(false);
            }

            // If is Number, <0 is true and >0 is false.
            if (isNumeric(value)) {
                return changeTracking((value * 1) > 0 ? true : false);
            }

            // Use Javascript to eval and return boolean.
            return changeTracking(value ? true : false);

        case 'array':
            // If it's an object, typecast to an array and return array.
            if (isObject(value)) {
                value = toArray(value);
            }

            // Reject if not array
            if (!isArray(value)) {
                // If the value doesn't meet requirements, it will remain untouched.
                return originalValue;
            }

            // Arrays are never set directly.
            // Instead, the values are copied over to the existing SchemaArray instance.
            // The SchemaArray is initialized immediately and will always exist.

            originalValue.length = 0;
            value.forEach(function(arrayValue) {
                originalValue.push(arrayValue);
            });

            return originalValue;

        case 'object':
            // If it's not an Object, reject.
            if (!isObject(value)) {
                // If the value doesn't meet requirements, it will remain untouched.
                return originalValue;
            }

            // If object is schema object and an entirely new object was passed, clear values and set.
            // This preserves the object instance.
            if (properties.objectType) {
                // The object will usually exist because it's initialized immediately for deep access within SchemaObjects.
                // However, in the case of Array elements, it will not exist.
                var schemaObject;
                if (!isUndefined(originalValue)) {
                    // Clear existing values.
                    schemaObject = originalValue;
                    schemaObject.clear();
                } else {
                    // The SchemaObject doesn't exist yet. Let's initialize a new one.
                    // This is used for Array types.
                    schemaObject = new properties.objectType;
                }

                // Copy value to SchemaObject and set value to SchemaObject.
                value.forEach(function(v, k) {
                    schemaObject[k] = v;
                });
                value = schemaObject;
            }

            // Otherwise, it's OK.
            return value;

        case 'date':
            // Reject if object, array or boolean.
            if (!isDate(value) && !isString(value) && !isNumber(value)) {
                return originalValue;
            }

            // Attempt to parse string value with Date.parse (which returns number of milliseconds).
            if (isString(value)) {
                var parsed = Date.parse(value);

                if (!parsed) {
                    //Try to convert from the Xero JSON Response e.g. /Date(1494671492303+0000)/
                    let d = value.substr(1).slice(0, -1); //remove the first and last character e.g. the slashes
                    parsed = eval(`new ${d}`)
                }

                value = parsed;
            }

            // If is timestamp, convert to Date.
            if (isNumber(value)) {
                value = new Date((value + '').length > 10 ? value : value * 1000);
            }

            // If the date couldn't be parsed, do not modify index.
            if (value == 'Invalid Date' || !isDate(value)) {
                value = originalValue;
            }

            return changeTracking(value);
        case 'alias':
            return setter.call(this, properties.index, value, originalValue, this._schema[properties.index]);
        default:
            return changeTracking(value);
    }

    function changeTracking(value) {
        if (properties.type != 'alias' && properties.type != 'object' && properties.type != 'array')
            self.tracking.changed(index, value);
        return value;
    }
};

// Properties can be passed in multiple forms (an object, just a type, etc).
// Normalize to a standard format.
var normalizeProperties = function(properties) {
    // Allow for shorthand type declaration:

    // index: Type is translated to index: {type: Type}
    if (properties && isUndefined(properties.type)) {
        properties = { type: properties };
    }

    // Type may be an object with properties.
    // If "type.type" exists, we'll assume it's meant to be properties.
    // This means that shorthand objects can't use the "type" index.
    // If "type" is necessary, they must be wrapped in a SchemaObject.
    if (isObject(properties.type) && !isUndefined(properties.type.type)) {
        properties.type.forEach(function(value, key) {
            if (isUndefined(properties[key])) {
                properties[key] = value;
            }
        });
        properties.type = properties.type.type;
    }

    // Null or undefined should be flexible and allow any value.
    if (properties.type === null || properties.type === undefined) {
        properties.type = 'any';

        // Convert object representation of type to lowercase string.
        // String is converted to 'string', Number to 'number', etc.
    } else if (properties.type.name) {
        properties.type = properties.type.name;
    }
    if (isString(properties.type)) {
        properties.type = properties.type.toLowerCase();
    }

    // index: [Type] or index: [] is translated to index: {type: Array, arrayType: Type}
    if (isArray(properties.type)) {
        if (size(properties.type)) {
            // Properties will be normalized when array is initialized.
            properties.arrayType = properties.type[0];
        }
        properties.type = 'array';
    }

    // index: {} or index: SchemaObject is translated to index: {type: Object, objectType: Type}
    // SchemaObject factory is initialized when raw schema is provided.
    if (!isString(properties.type)) {
        if (isFunction(properties.type)) {
            properties.objectType = properties.type;
            properties.type = 'object';
        } else if (properties.type === {}) {
            properties.type = 'object';
        } else if (isObject(properties.type) && size(properties.type)) {
            properties.objectType = SchemaObject(properties.type);
            properties.type = 'object';
        }
    }
    properties.toObject = properties.toObject || 'changed';
    return properties;
};

// Represents a basic array with typecasted values.
var SchemaArray = function(self, properties, index) {
    this._index = index;
    this._self = self;
    this._properties = properties;

    this.toArray = function(options) {
        // Create new Array to hold elements.
        var array = [];

        // Loop through each element, clone if necessary.
        this.forEach(function(element) {
            // Call toObject() method if defined (this allows us to return primitive objects instead of SchemaObjects).
            if (isObject(element) && isFunction(element.toObject)) {
                element = element.toObject(options);

                // If is nonSchemaType object, shallow clone so that properties modification don't have an affect on the original object.
            } else if (isObject(element)) {
                element = clone(element);
            }

            array.push(element);
        });

        return array;
    }

    if (this._properties.arrayType) {
        this._properties.arrayType = normalizeProperties(this._properties.arrayType);
    }
};
SchemaArray.prototype = new Array;
SchemaArray.prototype.push = function() {
    // Values are passed through the setter before being allowed onto the array if arrayType is set.
    // In the case of rejection, the setter returns undefined, which is not appended to the array.
    var values;
    if (this._properties.arrayType) {
        values = [].map.call(arguments, function(value) {
            return setter.call(this._self, this._index, value, undefined, this._properties.arrayType);
        }, this);
    } else {
        values = arguments;
    }

    if (this._properties.unique) {
        values = difference(values, toArray(this));
    }

    var ret = [].push.apply(this, values);

    return ret;
};

// Represents an object with typed indexes.
var SchemaObject = function(schema) {
    return function(defaults) {
        var self = this;
        var init = true;
        // Object used to store properties internally.
        var obj;
        self._obj = obj = {};
        self.tracking = new Tracking(self);

        // Schema as defined by constructor.
        self._schema = schema;

        // Define getters/setters based off of schema.
        schema.forEach(function(properties, index) {
            if (!properties) {
                throw new Error("properties not defined")
            }
            // Normalize properties to allow for various shorthand declarations.
            schema[index] = properties = normalizeProperties(properties);

            // The actual index on the object may be an alias.
            var objIndex = index;
            if (properties.type === 'alias') {
                // Use properties of referenced index.
                // TODO: Allow for alias to be recognized via dot-notation.
                objIndex = properties.index;
                var referencedProperties = normalizeProperties(schema[objIndex]);
                referencedProperties.isAlias = true;

                // Allow alias to use transform() to pre-transform any values passing through it.
                if (properties.transform) {
                    referencedProperties.transform = function(value, originalValue, properties) {
                        value = properties.transform.call(this, value, originalValue, properties);
                        value = referencedProperties.transform.call(this, value, originalValue, properties);
                        return value;
                    };
                }
            }

            // Use getter / setter to intercept and re-route, transform, etc.
            self.__defineGetter__(index, function() {
                return getter.call(self, index, obj[objIndex], properties);
            });

            self.__defineSetter__(index, function(value) {
                // Don't proceed if readOnly is true.
                if (!init && properties.readOnly) {
                    return;
                }

                // self[index] is used instead of obj[index] to route through the getter
                obj[objIndex] = setter.call(self, index, value, self[objIndex], properties);
            });

            // In case of object & array, they must be initialized immediately. However, this should not be done for aliases.
            if (properties.isAlias !== true) {
                if (properties.type === 'object') {
                    obj[objIndex] = properties.objectType ? new properties.objectType : {};

                    // Native arrays are never used so that toArray can be globally supported.
                    // Additionally, other properties such as unique rely on passing through SchemaObject.
                } else if (properties.type === 'array') {
                    obj[objIndex] = new SchemaArray(self, properties, index);
                }
            }
        });

        // Return object without getter/setters, extra properties, etc.
        this.validate = function(options, parentPath) {
            var self = this;
            var errors = [];
            // Populate all properties in schema.
            schema.forEach(function(properties, index) {
                var error;
                if (properties.index) // Only validate real properties
                    return;

                // Fetch value from self[index] to route through getter.
                var value = self[index];

                if (properties.type == 'object') {
                    var nestedErrors = value.validate(options, makePath(index));
                    addError(nestedErrors);
                } else if (properties.type == 'array') {
                    value.forEach(function(arrayItem, arrayIndex) {
                        if (isObject(arrayItem) && isFunction(arrayItem.validate))
                            error = arrayItem.validate(options, (parentPath && '.') + index + '[' + arrayIndex + ']');
                        else if (properties.validators)
                            error = validateItem(index + '[' + arrayIndex + ']', arrayItem, properties);
                    })
                } else if (properties.validators)
                    validateItem(index, value, properties);


            });
            return errors;

            function validateItem(index, value, properties) {
                properties.validators.forEach(function(settings, validatorType) {
                    switch (validatorType) {
                        case 'required':
                            if (isUndefined(value))
                                addError({ path: makePath(index), type: 'required', error: 'No value' });
                            break;
                        case 'minLength':
                            if (isString(value) && value.length < settings)
                                addError({ path: makePath(index), type: 'minLength', error: 'Not minimum length' });
                            break;
                        case 'maxLength':
                            if (isString(value) && value.length > settings)
                                addError({ path: makePath(index), type: 'maxLength', error: 'Exceeds maximum length' });
                            break;
                        case 'oneOf':
                            if (!includes(settings, value))
                                addError({ path: makePath(index), type: 'oneOf', error: 'Not one of the allowed values' });
                            break;
                        case 'min':
                            if (isNumber(value) && value < settings)
                                addError({ path: makePath(index), type: 'min', error: 'Less than minimum value of ' + settings });
                            break;
                        case 'max':
                            if (isNumber(value) && value > settings)
                                addError({ path: makePath(index), type: 'max', error: 'Greater than maximum value of ' + settings });
                            break;

                    }
                })
            }

            function makePath(index) {
                return (parentPath ? (parentPath + '.') : '') + index;
            }

            function addError(error) {
                if (isArray(error))
                    errors.push.apply(errors, error);
                else if (isObject(error))
                    errors.push(error);
            }
        }

        this.toObject = function(options) {

            var getObj = {};

            options = defaults({}, options, {
                all: null,
                alias: null,
                undefineds: null,
                nulls: null,
                changed: null,
                emptyObjects: false,
                never: null,
                always: null,
                hasValue: null
            });
            // Populate all properties in schema.
            schema.forEach(function(properties, index) {
                var realProperties = properties.index ? schema[properties.index] : properties;
                var realIndex = properties.index ? properties.index : index;

                if (options.all !== true && !isUndefined(properties.toObject) /* && properties.type != 'object' && properties.type != 'array' */ &&
                    ((properties.invisible || (properties.toObject == 'never' && options.nevers !== false) ||
                        (properties.toObject == 'changed' && (options.changed === false || !self.tracking.hasChanged(realIndex))) ||
                        (properties.type == 'alias' && !options.alias === false) ||
                        (properties.toObject == 'hasValue' &&
                            ((isUndefined(self[index]) && options.undefineds === false) ||
                                (isNull(self[index]) && options.nulls == false) ||
                                options.hasValues === false)) ||
                        (properties.toObject == 'always' && options.always === false) ||
                        (properties.toObject == 'hasValue' && ((isNull(self[index]) && !options.nulls === false) || options.hasValues === false))))) {
                    return;
                }

                // Fetch value from self[index] to route through getter.
                var value = self[index];

                if ((isNull(value) && !options.includeNull) || (isUndefined(value) && !options.includeUndefined))
                    return;

                if (isFunction(properties.toObject)) {
                    var retValue = properties.toObject(value, properties, schema);
                    if (retValue)
                        getObj[index] = retValue;
                    return;
                }

                // If value does not need to be cloned, place in index.
                if ((value === undefined || value === null) ||
                    properties.type !== 'object' && properties.type !== 'array' && properties.type !== 'date') {
                    getObj[index] = value;
                    // Clone Object
                } else if (properties.type === 'object') {
                    // Call toObject() method if defined (this allows us to return primitive objects instead of SchemaObjects).
                    if (isFunction(value.toObject)) {
                        getObj[index] = value.toObject(options);
                        // If is non-SchemaType object, shallow clone so that properties modification don't have an affect on the original object.
                    } else if (isObject(value)) {
                        getObj[index] = clone(value);
                    }
                    if (isEmpty(getObj[index]))
                        delete getObj[index];
                    // Clone Array
                } else if (properties.type === 'array') {
                    // Built in method to clone array to native type
                    getObj[index] = value.toArray(options);
                    if (isEmpty(getObj[index]))
                        delete getObj[index];

                    // Clone Date object.
                } else if (properties.type === 'date') {
                    // https://github.com/documentcloud/underscore/pull/863
                    // _.clone doesn't work on Date object.
                    if (properties.toObjectTransform)
                        getObj[index] = properties.toObjectTransform(value);
                    else
                        getObj[index] = new Date(value.getTime());
                }

                //Commented by JWalsh 16-02-2017
                //This was causing issues with 'toString' being present in the XML
                //I believe this function simply calls the 'toString()' method of an object to get it's representation.
                //However, it's broken.

                // if (_.isFunction(properties.toString) && _.isObject(getObj[index]))
                //     getObj[index].toString = properties.toString;

            });

            return getObj;
        };

        // toJSON is an interface used by JSON.stringify.
        // Return the raw object if called.
        this.toJSON = this.toObject;

        // Clear all values.
        this.clear = function() {
            self._obj = {};
        };

        this.reset = function() {
            self.clear();
            self.tracking.clear();
            setDefaults();
        }

        function setDefaults() {
            // Populate runtime defaults as provided to this instance of object.
            // (Different than the default for each field - is simply a shortcut to populate values in object.)
            if (isObject(defaults)) {
                defaults.forEach(function(value, key) {
                    self[key] = value;
                });
            };
        }
        setDefaults();
        self.tracking.clear();
        init = false;
    };
};

var Tracking = function(instance) {
    this._originalValues = {};
    this._changes = [];
    this._instance = instance;
}

Object.assign(Tracking.prototype, {
    clear: function() {
        var self = this;
        this._instance._schema.forEach(function(properties, index) {
            if (['array', 'object', 'alias'].indexOf(properties.type) < 0 && !self.hasOwnProperty(index)) {
                self._originalValues[index] = self._instance._obj[index]
            }
        })
        this._changes.splice(0);
    },
    changed: function(index, value) {
        if (value !== this._instance[index]) {
            this._changes.push({ index: index, oldValue: this._instance[index], newValue: value });
        }
    },
    hasChanged: function(index) {
        return !!this._changes.find(_.matches({ index: index }));
    }
})
module.exports = SchemaObject;