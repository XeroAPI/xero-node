import { PageInfo } from '././pageInfo';
import { PurchaseOrder } from '././purchaseOrder';

export class GetPurchaseOrdersResponse {
    'id'?: string;
    'status'?: string;
    'providerName'?: string;
    'dateTimeUTC'?: string;
    'pageInfo'?: PageInfo;
    'purchaseOrders'?: Array<PurchaseOrder>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "Id",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "string"
        },
        {
            "name": "providerName",
            "baseName": "ProviderName",
            "type": "string"
        },
        {
            "name": "dateTimeUTC",
            "baseName": "DateTimeUTC",
            "type": "string"
        },
        {
            "name": "pageInfo",
            "baseName": "PageInfo",
            "type": "PageInfo"
        },
        {
            "name": "purchaseOrders",
            "baseName": "PurchaseOrders",
            "type": "Array<PurchaseOrder>"
        }    ];

    static getAttributeTypeMap() {
        return GetPurchaseOrdersResponse.attributeTypeMap;
    }
}

