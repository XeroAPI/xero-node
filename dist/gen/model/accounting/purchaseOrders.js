"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PurchaseOrders {
    static getAttributeTypeMap() {
        return PurchaseOrders.attributeTypeMap;
    }
}
exports.PurchaseOrders = PurchaseOrders;
PurchaseOrders.discriminator = undefined;
PurchaseOrders.attributeTypeMap = [
    {
        "name": "purchaseOrders",
        "baseName": "PurchaseOrders",
        "type": "Array<PurchaseOrder>"
    }
];
//# sourceMappingURL=purchaseOrders.js.map