import { Purchase } from '././purchase';
import { ValidationError } from '././validationError';

export class Item {
    /**
    * User defined item code (max length = 30)
    */
    'code': string;
    /**
    * The inventory asset account for the item. The account must be of type INVENTORY. The  COGSAccountCode in PurchaseDetails is also required to create a tracked item
    */
    'inventoryAssetAccountCode'?: string;
    /**
    * The name of the item (max length = 50)
    */
    'name'?: string;
    /**
    * Boolean value, defaults to true. When IsSold is true the item will be available on sales transactions in the Xero UI. If IsSold is updated to false then Description and SalesDetails values will be nulled.
    */
    'isSold'?: boolean;
    /**
    * Boolean value, defaults to true. When IsPurchased is true the item is available for purchase transactions in the Xero UI. If IsPurchased is updated to false then PurchaseDescription and PurchaseDetails values will be nulled.
    */
    'isPurchased'?: boolean;
    /**
    * The sales description of the item (max length = 4000)
    */
    'description'?: string;
    /**
    * The purchase description of the item (max length = 4000)
    */
    'purchaseDescription'?: string;
    'purchaseDetails'?: Purchase;
    'salesDetails'?: Purchase;
    /**
    * True for items that are tracked as inventory. An item will be tracked as inventory if the InventoryAssetAccountCode and COGSAccountCode are set.
    */
    'isTrackedAsInventory'?: boolean;
    /**
    * The value of the item on hand. Calculated using average cost accounting.
    */
    'totalCostPool'?: number;
    /**
    * The quantity of the item on hand
    */
    'quantityOnHand'?: number;
    /**
    * Last modified date in UTC format
    */
    'updatedDateUTC'?: Date;
    /**
    * The Xero identifier for an Item
    */
    'itemID'?: string;
    /**
    * Status of object
    */
    'statusAttributeString'?: string;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
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
            "name": "statusAttributeString",
            "baseName": "StatusAttributeString",
            "type": "string"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return Item.attributeTypeMap;
    }
}

