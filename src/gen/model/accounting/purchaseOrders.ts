import { PurchaseOrder } from '././purchaseOrder';

export class PurchaseOrders {
    'purchaseOrders'?: Array<PurchaseOrder>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "purchaseOrders",
            "baseName": "PurchaseOrders",
            "type": "Array<PurchaseOrder>"
        }    ];

    static getAttributeTypeMap() {
        return PurchaseOrders.attributeTypeMap;
    }
}

