var _ = require('lodash'),
    EntityHelper = require('../entity_helper'),
    Attachment = require('../../entities/accounting/attachment').Attachment,
    util = require('util')

var Attachments = EntityHelper.extend({
    constructor: function(application, options) {
        EntityHelper.call(this, application, Object.assign({ entityPlural: 'Attachments' }, options));
    },
    newAttachment: function(data, options) {
        return new Attachment(this.application, data, options)
    },
    getContent: function(attachment, writeStream) {
        if (!writeStream) {
            writeStream = null;
        }
        var options = {
            stream: writeStream
        };

        attachment.Url = attachment.Url.replace(/http:/i, "https:");
        attachment.Url = attachment.Url.replace(/%26/i, "&");

        return this.application.getRaw(attachment.Url, options);
    },
    getAttachments: function(ownerPath, options) {
        var self = this;
        var clonedOptions = Object.assign({}, options, { path: ownerPath + '/Attachments' });
        clonedOptions.entityPath = 'Attachments';
        clonedOptions.entityConstructor = function(data) { return self.newAttachment(data) };
        return this.getEntities(clonedOptions);
    }
})

module.exports = Attachments;
