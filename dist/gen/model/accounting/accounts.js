"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Accounts {
    static getAttributeTypeMap() {
        return Accounts.attributeTypeMap;
    }
}
exports.Accounts = Accounts;
Accounts.discriminator = undefined;
Accounts.attributeTypeMap = [
    {
        "name": "accounts",
        "baseName": "Accounts",
        "type": "Array<Account>"
    }
];
//# sourceMappingURL=accounts.js.map