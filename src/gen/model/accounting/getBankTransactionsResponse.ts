import { BankTransactions } from '././bankTransactions';
import { PageInfo } from '././pageInfo';

export class GetBankTransactionsResponse {
    'id'?: string;
    'status'?: string;
    'providerName'?: string;
    'dateTimeUTC'?: string;
    'pageInfo'?: PageInfo;
    'bankTransactions'?: Array<BankTransactions>;

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
            "name": "bankTransactions",
            "baseName": "BankTransactions",
            "type": "Array<BankTransactions>"
        }    ];

    static getAttributeTypeMap() {
        return GetBankTransactionsResponse.attributeTypeMap;
    }
}

