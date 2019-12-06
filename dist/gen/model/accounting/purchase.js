"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Purchase {
    static getAttributeTypeMap() {
        return Purchase.attributeTypeMap;
    }
}
exports.Purchase = Purchase;
Purchase.discriminator = undefined;
Purchase.attributeTypeMap = [
    {
        "name": "unitPrice",
        "baseName": "UnitPrice",
        "type": "number"
    },
    {
        "name": "accountCode",
        "baseName": "AccountCode",
        "type": "string"
    },
    {
        "name": "cOGSAccountCode",
        "baseName": "COGSAccountCode",
        "type": "string"
    },
    {
        "name": "taxType",
        "baseName": "TaxType",
        "type": "string"
    }
];
//# sourceMappingURL=purchase.js.map