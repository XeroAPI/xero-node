import { Pagination } from '././pagination';
import { PurchaseOrder } from '././purchaseOrder';

export class PurchaseOrders {
    'pagination'?: Pagination;
    'purchaseOrders'?: Array<PurchaseOrder>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
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

