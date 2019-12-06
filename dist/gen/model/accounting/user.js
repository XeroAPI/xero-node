"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    static getAttributeTypeMap() {
        return User.attributeTypeMap;
    }
}
exports.User = User;
User.discriminator = undefined;
User.attributeTypeMap = [
    {
        "name": "userID",
        "baseName": "UserID",
        "type": "string"
    },
    {
        "name": "emailAddress",
        "baseName": "EmailAddress",
        "type": "string"
    },
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
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "isSubscriber",
        "baseName": "IsSubscriber",
        "type": "boolean"
    },
    {
        "name": "organisationRole",
        "baseName": "OrganisationRole",
        "type": "User.OrganisationRoleEnum"
    }
];
(function (User) {
    let OrganisationRoleEnum;
    (function (OrganisationRoleEnum) {
        OrganisationRoleEnum[OrganisationRoleEnum["READONLY"] = 'READONLY'] = "READONLY";
        OrganisationRoleEnum[OrganisationRoleEnum["INVOICEONLY"] = 'INVOICEONLY'] = "INVOICEONLY";
        OrganisationRoleEnum[OrganisationRoleEnum["STANDARD"] = 'STANDARD'] = "STANDARD";
        OrganisationRoleEnum[OrganisationRoleEnum["FINANCIALADVISER"] = 'FINANCIALADVISER'] = "FINANCIALADVISER";
        OrganisationRoleEnum[OrganisationRoleEnum["MANAGEDCLIENT"] = 'MANAGEDCLIENT'] = "MANAGEDCLIENT";
        OrganisationRoleEnum[OrganisationRoleEnum["CASHBOOKCLIENT"] = 'CASHBOOKCLIENT'] = "CASHBOOKCLIENT";
        OrganisationRoleEnum[OrganisationRoleEnum["UNKNOWN"] = 'UNKNOWN'] = "UNKNOWN";
    })(OrganisationRoleEnum = User.OrganisationRoleEnum || (User.OrganisationRoleEnum = {}));
})(User = exports.User || (exports.User = {}));
//# sourceMappingURL=user.js.map