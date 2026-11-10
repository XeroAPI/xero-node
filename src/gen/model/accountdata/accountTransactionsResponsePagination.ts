
/**
* Pagination metadata. `null` on the last page, including when there are no results.
*/
export class AccountTransactionsResponsePagination {
    'pageSize': number;
    /**
    * Opaque continuation token for the next page. Send it as the `token` query parameter to retrieve the next page.
    */
    'nextToken': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pageSize",
            "baseName": "pageSize",
            "type": "number"
        },
        {
            "name": "nextToken",
            "baseName": "nextToken",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return AccountTransactionsResponsePagination.attributeTypeMap;
    }
}

