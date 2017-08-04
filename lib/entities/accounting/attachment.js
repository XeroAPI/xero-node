var _ = require('lodash'),
    Entity = require('../entity')
    fs = require('fs');

var AttachmentSchema = Entity.SchemaObject({
    AttachmentID: { type: String, toObject: 'never' },
    FileName: { type: String, toObject: 'always' },
    Url: { type: String, toObject: 'always' },
    MimeType: { type: String, toObject: 'always' },
    ContentLength: { type: Number, toObject: 'always' },
    OnlineInvoice: { type: Boolean, toObject: 'hasValue' }
});

var Attachment = Entity.extend(AttachmentSchema, {
    constructor: function(application, data, options) {
        
        this.Entity.apply(this, arguments);
    },
    initialize: function(data, options) {},
    getContent: function(writeStream) {
        return this.application.core.attachments.getContent(this, writeStream);
    },
    save: function(ownerPath, data, stream, options) {
        var self = this;
        var path = ownerPath + '/Attachments/' + this.FileName;

        options = options || {};

        if (!stream) {
            //we'll assume data is not a file stream, so we'll create one
            data = fs.createReadStream(data);
        }

        if (typeof data.read !== 'function') {
            return Promise.reject(new Error("Data must be a valid read stream or file handle."));
        }

        //Adding other options for saving purposes
        options.contentType = this.MimeType;
        options.entityPath = 'Attachments';
        options.entityConstructor = function(data) {
            return self.application.core.attachments.newAttachment(data);
        };

        return this.application.putOrPostEntity('post', path, data, options);
    }
});


module.exports.Attachment = Attachment;
module.exports.AttachmentSchema = AttachmentSchema;