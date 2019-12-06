"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Quotes {
    static getAttributeTypeMap() {
        return Quotes.attributeTypeMap;
    }
}
exports.Quotes = Quotes;
Quotes.discriminator = undefined;
Quotes.attributeTypeMap = [
    {
        "name": "quotes",
        "baseName": "Quotes",
        "type": "Array<Quote>"
    }
];
//# sourceMappingURL=quotes.js.map