"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BankTransfers {
    static getAttributeTypeMap() {
        return BankTransfers.attributeTypeMap;
    }
}
exports.BankTransfers = BankTransfers;
BankTransfers.discriminator = undefined;
BankTransfers.attributeTypeMap = [
    {
        "name": "bankTransfers",
        "baseName": "BankTransfers",
        "type": "Array<BankTransfer>"
    }
];
//# sourceMappingURL=bankTransfers.js.map