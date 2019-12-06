"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContactPerson {
    static getAttributeTypeMap() {
        return ContactPerson.attributeTypeMap;
    }
}
exports.ContactPerson = ContactPerson;
ContactPerson.discriminator = undefined;
ContactPerson.attributeTypeMap = [
    {
        "name": "firstName",
        "baseName": "FirstName",
        "type": "string"
    },
    {
        "name": "lastName",
        "baseName": "LastName",
        "type": "string"
    },
    {
        "name": "emailAddress",
        "baseName": "EmailAddress",
        "type": "string"
    },
    {
        "name": "includeInEmails",
        "baseName": "IncludeInEmails",
        "type": "boolean"
    }
];
//# sourceMappingURL=contactPerson.js.map