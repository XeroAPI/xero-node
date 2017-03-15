var _ = require('lodash'),
    logger = require('../../logger'),
    EntityHelper = require('../entity_helper'),
    Journal = require('../../entities/accounting/journal'),
    util = require('util')

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
                return _.first(journals);
            })
    },
    getJournals: function(callback, options) {
        !_.isFunction(callback) && (options = callback, callback = null);
        options = options || {};
        var self = this;
        var path = 'Journals';
        if (options.id)
            path += '/' + options.id;

        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'Journals.Journal';
        var recordCount
        if (clonedOptions.pager) {
            clonedOptions.pager.paramName = 'offset';
            var pagerCallback = clonedOptions.pager.callback;
            clonedOptions.pager.callback = function(err, response, cb) {
                var lastJournal = _.last(response.data);
                if (pagerCallback) {
                    pagerCallback(err, response, function(err, result) {
                        if (lastJournal)
                            result = _.defaults({}, result, { nextOffset: Number(lastJournal.JournalNumber) });
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