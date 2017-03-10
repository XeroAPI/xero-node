var _ = require('lodash'),
    logger = require('../logger'),
    EntityHelper = require('./entity_helper'),
    Attachment = require('../entities/attachment'),
    util = require('util')

var entityName = 'AttachmentsHelper';
var Attachments = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityName: 'Attachment', entityPlural: 'Attachments' }, options));
    },
    newAttachment: function(data, options) {
        this.trackEvent(entityName, arguments.callee.name);
        return new Attachment(this.application, data, options)
    },
    getContent: function(ownerPath, fileName) {
        this.trackEvent(entityName, arguments.callee.name);
        var path = ownerPath + '/Attachments/' + fileName;
        return this.application.getRaw({ id: id, modifiedAfter: modifiedAfter })
            .then(function(attachments) {
                return _.first(attachments);
            })
    },
    getAttachments: function(ownerPath, options) {
        this.trackEvent(entityName, arguments.callee.name);
        var clonedOptions = Object.assign({}, options, { path: ownerPath + '/Attachments' });
        clonedOptions.entityConstructor = function(data) { return self.newAttachment(data) };
        return this.getEntities(clonedOptions);
    }
})

module.exports = Attachments;