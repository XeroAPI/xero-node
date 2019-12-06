import { Purchase } from './purchase';
import { ValidationError } from './validationError';
export declare class Item {
    'code': string;
    'inventoryAssetAccountCode': string;
    'name'?: string;
    'isSold'?: boolean;
    'isPurchased'?: boolean;
    'description'?: string;
    'purchaseDescription'?: string;
    'purchaseDetails'?: Purchase;
    'salesDetails'?: Purchase;
    'isTrackedAsInventory'?: boolean;
    'totalCostPool'?: number;
    'quantityOnHand'?: number;
    'updatedDateUTC'?: Date;
    'itemID'?: string;
    'validationErrors'?: Array<ValidationError>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
