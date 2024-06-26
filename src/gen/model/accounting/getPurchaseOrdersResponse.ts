import { PageInfo } from '././pageInfo';
import { PurchaseOrders } from '././purchaseOrders';

export class GetPurchaseOrdersResponse {
    'id'?: string;
    'status'?: string;
    'providerName'?: string;
    'dateTimeUTC'?: string;
    'pageInfo'?: PageInfo;
    'purchaseOrders'?: Array<PurchaseOrders>;

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
            "type": "Array<PurchaseOrders>"
        }    ];

    static getAttributeTypeMap() {
        return GetPurchaseOrdersResponse.attributeTypeMap;
    }
}

