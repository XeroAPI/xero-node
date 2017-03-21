var _ = require('lodash'),
    logger = require('../../logger'),
    EntityHelper = require('../entity_helper'),
    CreditNote = require('../../entities/accounting/creditnote'),
    util = require('util')

var CreditNotes = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'CreditNote', entityPlural: 'CreditNotes' }, options));
    },
    getCreditNotes: function(options, callback) {
        var self = this;
        var clonedOptions = _.clone(options || {});
        clonedOptions.entityConstructor = function(data) { return new CreditNote(data) };
        return this.getEntities(clonedOptions)
    },
    getCreditNote: function(id) {
        return this.getCreditNotes({ id: id })
            .then(function(creditNotes) {
                return _.first(creditNotes);
            })
    },
})

module.exports = CreditNotes;