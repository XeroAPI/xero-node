var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    CreditNote = require('../../entities/accounting/creditnote').CreditNote,
    util = require('util')

var CreditNotes = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'CreditNotes' }, options));
    },
    newCreditNote: function(data, options) {
        return new CreditNote(this.application, data, options);
    },
    getCreditNotes: function(options) {
        return this.getEntities(this.setUpOptions(options))
    },
    getCreditNote: function(id) {
        return this.getCreditNotes({ id: id })
            .then(function(creditNotes) {
                return _.first(creditNotes);
            })
    },
    saveCreditNotes: function(creditnotes, options) {
        return this.saveEntities(creditnotes, this.setUpOptions(options));
    },
    setUpOptions: function(options) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityPath = 'CreditNotes';
        clonedOptions.entityConstructor = function(data) { return self.newCreditNote(data) };
        return clonedOptions;
    }
})

module.exports = CreditNotes;