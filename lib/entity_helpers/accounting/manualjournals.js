const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var ManualJournal = require('../../entities/accounting/manualjournal');
var util = require('util');

var ManualJournals = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({
            entityPlural: 'ManualJournals'
        }, options));
    },
    newManualJournal: function(data, options) {
        return new ManualJournal(this.application, data, options)
    },
    getManualJournal: function(id, modifiedAfter) {
        return this.getManualJournals({
                id: id,
                modifiedAfter: modifiedAfter
            })
            .then(function(manualJournals) {
                return manualJournals[0];
            });
    },
    getManualJournals: function(options) {
        return this.getEntities(this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityPath = 'ManualJournals';
        clonedOptions.entityConstructor = function(data) {
            return self.application.core.manualjournals.newManualJournal(data)
        };
        return clonedOptions;
    }
});

module.exports = ManualJournals;
