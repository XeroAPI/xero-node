"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Attachments {
    static getAttributeTypeMap() {
        return Attachments.attributeTypeMap;
    }
}
exports.Attachments = Attachments;
Attachments.discriminator = undefined;
Attachments.attributeTypeMap = [
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    }
];
//# sourceMappingURL=attachments.js.map