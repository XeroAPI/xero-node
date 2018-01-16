const { isFunction, clone, defaults } = require('lodash');
var EntityHelper = require('../entity_helper');
var Journal = require('../../entities/accounting/journal').Journal;
var util = require('util');

var Journals = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.apply(this, arguments);
    },
    newJournal: function(data, options) {
        return new Journal(this.application, data, options)
    },
    getJournal: function(id, modifiedAfter) {
        return this.getJournals({ id: id, modifiedAfter: modifiedAfter })
            .then(function(journals) {
                return journals[0];
            });
    },
    getJournals: function(callback, options) {
        !isFunction(callback) && (options = callback, callback = null);
        options = options || {};
        var self = this;
        var path = 'Journals';
        if (options.id)
            path += '/' + options.id;

        var clonedOptions = clone(options || {});
        clonedOptions.entityPath = 'Journals';
        var recordCount
        if (clonedOptions.pager) {
            clonedOptions.pager.paramName = 'offset';
            var pagerCallback = clonedOptions.pager.callback;
            clonedOptions.pager.callback = function(err, response, cb) {
                var lastJournal = response.data[response.data.length - 1];
                if (pagerCallback) {
                    pagerCallback(err, response, function(err, result) {
                        if (lastJournal)
                            result = defaults({}, result, { nextOffset: Number(lastJournal.JournalNumber) });
                        cb(err, result);
                    });
                } else {
                    if (lastJournal)
                        result = { nextOffset: Number(lastJournal.JournalNumber) };
                    cb(null, result);
                }
            }
        }
        clonedOptions.entityConstructor = function(data) { return self.newJournal(data) };
        return this.application.getEntities(path, clonedOptions)
            .then(function(journals) {
                callback && callback(null, journals);
                return journals;
            })
            .catch(function(err) {
                callback && callback(err);
                throw err;
            })
    }
})

module.exports = Journals;