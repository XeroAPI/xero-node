const { clone } = require('lodash');
var EntityHelper = require('../entity_helper');
var CreditNote = require('../../entities/accounting/creditnote').CreditNote;
var util = require('util');

var CreditNotes = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'CreditNotes' }, options));
    },
    newCreditNote: function(data, options) {
        return new CreditNote(this.application, data, options);
    },
    getCreditNotes: function(options, callback) {
        var self = this;
        var clonedOptions = clone(options || {});
        clonedOptions.entityConstructor = function(data) { return self.newCreditNote(data) };
        return this.getEntities(clonedOptions)
    },
    getCreditNote: function(id) {
        return this.getCreditNotes({ id: id })
            .then(function(creditNotes) {
                return creditNotes[0];
            });
    },
})

module.exports = CreditNotes;