"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Allocation {
    static getAttributeTypeMap() {
        return Allocation.attributeTypeMap;
    }
}
exports.Allocation = Allocation;
Allocation.discriminator = undefined;
Allocation.attributeTypeMap = [
    {
        "name": "invoice",
        "baseName": "Invoice",
        "type": "Invoice"
    },
    {
        "name": "amount",
        "baseName": "Amount",
        "type": "number"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    }
];
//# sourceMappingURL=allocation.js.map