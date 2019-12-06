"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Prepayments {
    static getAttributeTypeMap() {
        return Prepayments.attributeTypeMap;
    }
}
exports.Prepayments = Prepayments;
Prepayments.discriminator = undefined;
Prepayments.attributeTypeMap = [
    {
        "name": "prepayments",
        "baseName": "Prepayments",
        "type": "Array<Prepayment>"
    }
];
//# sourceMappingURL=prepayments.js.map