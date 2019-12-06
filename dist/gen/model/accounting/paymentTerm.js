"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentTerm {
    static getAttributeTypeMap() {
        return PaymentTerm.attributeTypeMap;
    }
}
exports.PaymentTerm = PaymentTerm;
PaymentTerm.discriminator = undefined;
PaymentTerm.attributeTypeMap = [
    {
        "name": "bills",
        "baseName": "Bills",
        "type": "Bill"
    },
    {
        "name": "sales",
        "baseName": "Sales",
        "type": "Bill"
    }
];
//# sourceMappingURL=paymentTerm.js.map