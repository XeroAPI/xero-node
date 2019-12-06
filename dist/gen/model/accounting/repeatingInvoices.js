"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepeatingInvoices {
    static getAttributeTypeMap() {
        return RepeatingInvoices.attributeTypeMap;
    }
}
exports.RepeatingInvoices = RepeatingInvoices;
RepeatingInvoices.discriminator = undefined;
RepeatingInvoices.attributeTypeMap = [
    {
        "name": "repeatingInvoices",
        "baseName": "RepeatingInvoices",
        "type": "Array<RepeatingInvoice>"
    }
];
//# sourceMappingURL=repeatingInvoices.js.map