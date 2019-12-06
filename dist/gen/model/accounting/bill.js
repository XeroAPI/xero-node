"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Bill {
    static getAttributeTypeMap() {
        return Bill.attributeTypeMap;
    }
}
exports.Bill = Bill;
Bill.discriminator = undefined;
Bill.attributeTypeMap = [
    {
        "name": "day",
        "baseName": "Day",
        "type": "number"
    },
    {
        "name": "type",
        "baseName": "Type",
        "type": "PaymentTermType"
    }
];
//# sourceMappingURL=bill.js.map