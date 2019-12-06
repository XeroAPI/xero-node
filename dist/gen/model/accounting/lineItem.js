"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LineItem {
    static getAttributeTypeMap() {
        return LineItem.attributeTypeMap;
    }
}
exports.LineItem = LineItem;
LineItem.discriminator = undefined;
LineItem.attributeTypeMap = [
    {
        "name": "lineItemID",
        "baseName": "LineItemID",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    },
    {
        "name": "quantity",
        "baseName": "Quantity",
        "type": "number"
    },
    {
        "name": "unitAmount",
        "baseName": "UnitAmount",
        "type": "number"
    },
    {
        "name": "itemCode",
        "baseName": "ItemCode",
        "type": "string"
    },
    {
        "name": "accountCode",
        "baseName": "AccountCode",
        "type": "string"
    },
    {
        "name": "taxType",
        "baseName": "TaxType",
        "type": "string"
    },
    {
        "name": "taxAmount",
        "baseName": "TaxAmount",
        "type": "number"
    },
    {
        "name": "lineAmount",
        "baseName": "LineAmount",
        "type": "number"
    },
    {
        "name": "tracking",
        "baseName": "Tracking",
        "type": "Array<LineItemTracking>"
    },
    {
        "name": "discountRate",
        "baseName": "DiscountRate",
        "type": "string"
    },
    {
        "name": "discountAmount",
        "baseName": "DiscountAmount",
        "type": "number"
    },
    {
        "name": "repeatingInvoiceID",
        "baseName": "RepeatingInvoiceID",
        "type": "string"
    }
];
//# sourceMappingURL=lineItem.js.map