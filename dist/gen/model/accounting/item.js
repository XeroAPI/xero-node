"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Item {
    static getAttributeTypeMap() {
        return Item.attributeTypeMap;
    }
}
exports.Item = Item;
Item.discriminator = undefined;
Item.attributeTypeMap = [
    {
        "name": "code",
        "baseName": "Code",
        "type": "string"
    },
    {
        "name": "inventoryAssetAccountCode",
        "baseName": "InventoryAssetAccountCode",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "isSold",
        "baseName": "IsSold",
        "type": "boolean"
    },
    {
        "name": "isPurchased",
        "baseName": "IsPurchased",
        "type": "boolean"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    },
    {
        "name": "purchaseDescription",
        "baseName": "PurchaseDescription",
        "type": "string"
    },
    {
        "name": "purchaseDetails",
        "baseName": "PurchaseDetails",
        "type": "Purchase"
    },
    {
        "name": "salesDetails",
        "baseName": "SalesDetails",
        "type": "Purchase"
    },
    {
        "name": "isTrackedAsInventory",
        "baseName": "IsTrackedAsInventory",
        "type": "boolean"
    },
    {
        "name": "totalCostPool",
        "baseName": "TotalCostPool",
        "type": "number"
    },
    {
        "name": "quantityOnHand",
        "baseName": "QuantityOnHand",
        "type": "number"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "itemID",
        "baseName": "ItemID",
        "type": "string"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
//# sourceMappingURL=item.js.map