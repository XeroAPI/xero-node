"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payments {
    static getAttributeTypeMap() {
        return Payments.attributeTypeMap;
    }
}
exports.Payments = Payments;
Payments.discriminator = undefined;
Payments.attributeTypeMap = [
    {
        "name": "payments",
        "baseName": "Payments",
        "type": "Array<Payment>"
    }
];
//# sourceMappingURL=payments.js.map