"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contacts {
    static getAttributeTypeMap() {
        return Contacts.attributeTypeMap;
    }
}
exports.Contacts = Contacts;
Contacts.discriminator = undefined;
Contacts.attributeTypeMap = [
    {
        "name": "contacts",
        "baseName": "Contacts",
        "type": "Array<Contact>"
    }
];
//# sourceMappingURL=contacts.js.map