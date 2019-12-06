"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Receipts {
    static getAttributeTypeMap() {
        return Receipts.attributeTypeMap;
    }
}
exports.Receipts = Receipts;
Receipts.discriminator = undefined;
Receipts.attributeTypeMap = [
    {
        "name": "receipts",
        "baseName": "Receipts",
        "type": "Array<Receipt>"
    }
];
//# sourceMappingURL=receipts.js.map