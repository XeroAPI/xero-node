"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Balances {
    static getAttributeTypeMap() {
        return Balances.attributeTypeMap;
    }
}
exports.Balances = Balances;
Balances.discriminator = undefined;
Balances.attributeTypeMap = [
    {
        "name": "accountsReceivable",
        "baseName": "AccountsReceivable",
        "type": "AccountsReceivable"
    },
    {
        "name": "accountsPayable",
        "baseName": "AccountsPayable",
        "type": "AccountsPayable"
    }
];
//# sourceMappingURL=balances.js.map