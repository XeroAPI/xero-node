import { Overpayment } from '././overpayment';
import { PageInfo } from '././pageInfo';

export class GetOverpaymentsResponse {
    'id'?: string;
    'status'?: string;
    'providerName'?: string;
    'dateTimeUTC'?: string;
    'pageInfo'?: PageInfo;
    'overpayments'?: Array<Overpayment>;

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
            "name": "overpayments",
            "baseName": "Overpayments",
            "type": "Array<Overpayment>"
        }    ];

    static getAttributeTypeMap() {
        return GetOverpaymentsResponse.attributeTypeMap;
    }
}

