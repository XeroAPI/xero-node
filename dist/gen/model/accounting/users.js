"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    static getAttributeTypeMap() {
        return Users.attributeTypeMap;
    }
}
exports.Users = Users;
Users.discriminator = undefined;
Users.attributeTypeMap = [
    {
        "name": "users",
        "baseName": "Users",
        "type": "Array<User>"
    }
];
//# sourceMappingURL=users.js.map