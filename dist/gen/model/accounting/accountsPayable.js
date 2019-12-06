"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountsPayable {
    static getAttributeTypeMap() {
        return AccountsPayable.attributeTypeMap;
    }
}
exports.AccountsPayable = AccountsPayable;
AccountsPayable.discriminator = undefined;
AccountsPayable.attributeTypeMap = [
    {
        "name": "outstanding",
        "baseName": "Outstanding",
        "type": "number"
    },
    {
        "name": "overdue",
        "baseName": "Overdue",
        "type": "number"
    }
];
//# sourceMappingURL=accountsPayable.js.map