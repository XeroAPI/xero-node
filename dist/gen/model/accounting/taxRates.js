"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaxRates {
    static getAttributeTypeMap() {
        return TaxRates.attributeTypeMap;
    }
}
exports.TaxRates = TaxRates;
TaxRates.discriminator = undefined;
TaxRates.attributeTypeMap = [
    {
        "name": "taxRates",
        "baseName": "TaxRates",
        "type": "Array<TaxRate>"
    }
];
//# sourceMappingURL=taxRates.js.map