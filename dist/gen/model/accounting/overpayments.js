"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Overpayments {
    static getAttributeTypeMap() {
        return Overpayments.attributeTypeMap;
    }
}
exports.Overpayments = Overpayments;
Overpayments.discriminator = undefined;
Overpayments.attributeTypeMap = [
    {
        "name": "overpayments",
        "baseName": "Overpayments",
        "type": "Array<Overpayment>"
    }
];
//# sourceMappingURL=overpayments.js.map