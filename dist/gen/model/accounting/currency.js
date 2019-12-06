"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Currency {
    static getAttributeTypeMap() {
        return Currency.attributeTypeMap;
    }
}
exports.Currency = Currency;
Currency.discriminator = undefined;
Currency.attributeTypeMap = [
    {
        "name": "code",
        "baseName": "Code",
        "type": "CurrencyCode"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    }
];
//# sourceMappingURL=currency.js.map