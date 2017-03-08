var _ = require('lodash'),
    Entity = require('./entity'),
    logger = require('../logger'),
    dateformat = require('dateformat'),
    fs = require('fs')

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
    save: function(ownerPath, streamOrFilePath) {
        var self = this;
        var path = ownerPath + '/Attachments/' + this.FileName;

        var base64string = base64_encode(streamOrFilePath);
        console.log(base64string);
        console.log(path);

        return this.application.postEntity(path, base64string, { type: this.MimeType })
            .then(function(ret) {
                console.log(ret);
                return ret.response.Attachments.Attachment;
            })
            .catch(function(err) {
                console.log(err);
            })

        function base64_encode(file) {
            // read binary data
            var bitmap = fs.readFileSync(file);
            // convert binary data to base64 encoded string
            return new Buffer(bitmap).toString('base64');
        }
    }
});


module.exports = Attachment;
module.exports.AttachmentSchema = AttachmentSchema;