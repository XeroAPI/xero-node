var _ = require('lodash'),
    Entity = require('../entity'),
    logger = require('../../logger'),
    fs = require('fs');

var AttachmentSchema = new Entity.SchemaObject({
    AttachmentID: { type: String, toObject: 'never' },
    FileName: { type: String, toObject: 'always' },
    Url: { type: String, toObject: 'always' },
    MimeType: { type: String, toObject: 'always' },
    ContentLength: { type: Number, toObject: 'always' }
});


var Attachment = Entity.extend(AttachmentSchema, {
    constructor: function(application, data, options) {
        logger.debug('Attachment::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    getContent: function(ownerPath) {
        return this.application.core.attachments.getContent(ownerPath, this.FileName);
    },
    save: function(ownerPath, data, stream) {
        var self = this;
        var path = ownerPath + '/Attachments/' + this.FileName;

        if (!stream) {
            //we'll assume data is not a file stream, so we'll create one
            data = fs.createReadStream(data);
        }

        if (typeof data.read !== 'function') {
            throw "Data must be a valid read stream or file handle."
        }

        var options = {
            contentType: this.MimeType,
            entityPath: 'Attachments.Attachment',
            entityConstructor: function(data) {
                return self.application.core.attachments.newAttachment(data);
            }
        };

        return this.application.putOrPostEntity('post', path, data, options);
    }
});


module.exports = Attachment;
module.exports.AttachmentSchema = AttachmentSchema;