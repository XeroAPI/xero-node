"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContactGroups {
    static getAttributeTypeMap() {
        return ContactGroups.attributeTypeMap;
    }
}
exports.ContactGroups = ContactGroups;
ContactGroups.discriminator = undefined;
ContactGroups.attributeTypeMap = [
    {
        "name": "contactGroups",
        "baseName": "ContactGroups",
        "type": "Array<ContactGroup>"
    }
];
//# sourceMappingURL=contactGroups.js.map