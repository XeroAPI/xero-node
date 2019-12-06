"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountsReceivable {
    static getAttributeTypeMap() {
        return AccountsReceivable.attributeTypeMap;
    }
}
exports.AccountsReceivable = AccountsReceivable;
AccountsReceivable.discriminator = undefined;
AccountsReceivable.attributeTypeMap = [
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
//# sourceMappingURL=accountsReceivable.js.map