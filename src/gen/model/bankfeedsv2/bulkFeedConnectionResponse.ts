import { BulkFeedConnectionResult } from '././bulkFeedConnectionResult';

/**
* One result per request item, in request order.
*/
export class BulkFeedConnectionResponse {
    'items'?: Array<BulkFeedConnectionResult>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<BulkFeedConnectionResult>"
        }    ];

    static getAttributeTypeMap() {
        return BulkFeedConnectionResponse.attributeTypeMap;
    }
}

