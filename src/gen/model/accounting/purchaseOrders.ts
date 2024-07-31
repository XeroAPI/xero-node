import { Pagination } from '././pagination';
import { PurchaseOrder } from '././purchaseOrder';
import { ValidationError } from '././validationError';

export class PurchaseOrders {
    'pagination'?: Pagination;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    'purchaseOrders'?: Array<PurchaseOrder>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
        },
        {
            "name": "purchaseOrders",
            "baseName": "PurchaseOrders",
            "type": "Array<PurchaseOrder>"
        }    ];

    static getAttributeTypeMap() {
        return PurchaseOrders.attributeTypeMap;
    }
}

