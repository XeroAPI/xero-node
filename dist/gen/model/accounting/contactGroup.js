"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ContactGroup {
    static getAttributeTypeMap() {
        return ContactGroup.attributeTypeMap;
    }
}
exports.ContactGroup = ContactGroup;
ContactGroup.discriminator = undefined;
ContactGroup.attributeTypeMap = [
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "ContactGroup.StatusEnum"
    },
    {
        "name": "contactGroupID",
        "baseName": "ContactGroupID",
        "type": "string"
    },
    {
        "name": "contacts",
        "baseName": "Contacts",
        "type": "Array<Contact>"
    }
];
(function (ContactGroup) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = ContactGroup.StatusEnum || (ContactGroup.StatusEnum = {}));
})(ContactGroup = exports.ContactGroup || (exports.ContactGroup = {}));
//# sourceMappingURL=contactGroup.js.map