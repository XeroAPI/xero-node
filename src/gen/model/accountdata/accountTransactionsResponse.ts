import { AccountTransactionLine } from '././accountTransactionLine';
import { AccountTransactionsResponsePagination } from '././accountTransactionsResponsePagination';

export class AccountTransactionsResponse {
    /**
    * Organisation\'s base currency code (ISO 4217).
    */
    'currencyCode': string;
    /**
    * Maximum journal number included in this result set. Captured at the first request and held constant across all pages for consistency. 
    */
    'maxJournalNumber': number;
    /**
    * Transaction lines for this page (max 200).
    */
    'lines': Array<AccountTransactionLine>;
    'pagination'?: AccountTransactionsResponsePagination;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "currencyCode",
            "baseName": "currencyCode",
            "type": "string"
        },
        {
            "name": "maxJournalNumber",
            "baseName": "maxJournalNumber",
            "type": "number"
        },
        {
            "name": "lines",
            "baseName": "lines",
            "type": "Array<AccountTransactionLine>"
        },
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "AccountTransactionsResponsePagination"
        }    ];

    static getAttributeTypeMap() {
        return AccountTransactionsResponse.attributeTypeMap;
    }
}

