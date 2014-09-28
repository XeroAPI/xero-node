var _ = require('lodash')
    , Entity = require('./entity')
    , logger = require('../logger')
    , dateformat = require('dateformat')
    , fs = require('fs')

var AttachmentSchema = new Entity.SchemaObject({
    AttachmentID: { type: String, toObject: 'never' },
    FileName: {type: String, toObject: 'always'},
    Url: {type: String, toObject:'always'},
    MimeType: {type: String, toObject: 'always'},
    ContentLength: {type: Number, toObject:'always'}
});


var Attachment = Entity.extend(AttachmentSchema, {
    constructor: function (application, data, options)
    {
        logger.debug('Attachment::constructor');
        this.Entity.apply(this, arguments);
    },
    initialize: function (data, options)
    {
    },
    getContent:function(ownerPath)
    {
        return this.application.core.attachments.getContent(ownerPath, this.FileName);
    },
    save:function(ownerPath, streamOrFilePath)
    {
        var self = this;
        var path = ownerPath + '/Attachments/' + this.FileName;
        var stream;
        if (_.isString(streamOrFilePath))
            stream = fs.createReadStream(streamOrFilePath);
        else
            stream = streamOrFilePath;
        return this.application.putEntity(path, stream)
            .then(function(ret)
            {
                return ret.response.Attachments.Attachment;
            })
    }
});


module.exports = Attachment;
module.exports.AttachmentSchema = AttachmentSchema;
