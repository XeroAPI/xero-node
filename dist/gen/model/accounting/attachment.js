"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attachment {
    static getAttributeTypeMap() {
        return Attachment.attributeTypeMap;
    }
}
exports.Attachment = Attachment;
Attachment.discriminator = undefined;
Attachment.attributeTypeMap = [
    {
        "name": "attachmentID",
        "baseName": "AttachmentID",
        "type": "string"
    },
    {
        "name": "fileName",
        "baseName": "FileName",
        "type": "string"
    },
    {
        "name": "url",
        "baseName": "Url",
        "type": "string"
    },
    {
        "name": "mimeType",
        "baseName": "MimeType",
        "type": "string"
    },
    {
        "name": "contentLength",
        "baseName": "ContentLength",
        "type": "number"
    },
    {
        "name": "includeOnline",
        "baseName": "IncludeOnline",
        "type": "boolean"
    }
];
//# sourceMappingURL=attachment.js.map