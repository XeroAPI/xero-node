var _ = require('lodash')
    , logger = require('../logger')
    , EntityHelper = require('./entity_helper')
    , Attachment = require('../entities/attachment')
    , p = require('../misc/promise')
    , util = require('util')

var Attachments = EntityHelper.extend({
    constructor: function (application, options)
    {
        EntityHelper.call(this, application, _.extend({ entityName:'Attachment', entityPlural:'Attachments'}, options));
    },
    newAttachment: function (data, options)
    {
        return new Attachment(this.application, data, options)
    },
    getContent: function (ownerPath, fileName)
    {
        var path = ownerPath + '/Attachments/' + fileName;
        return this.application.getRaw({ id: id, modifiedAfter: modifiedAfter})
            .then(function (attachments)
            {
                return _.first(attachments);
            })
    },
    getAttachments: function (ownerPath, options)
    {
        options = options || {};
        var path = ownerPath + '/Attachments';
        return this.application.getEntities(path, options);
    }
})

module.exports = Attachments;

