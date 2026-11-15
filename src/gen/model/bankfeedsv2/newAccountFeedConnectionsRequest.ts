import { NewAccountFeedConnection } from '././newAccountFeedConnection';

export class NewAccountFeedConnectionsRequest {
    /**
    * Between 1 and 50 Feed Connections to create. No element may be null.
    */
    'items': Array<NewAccountFeedConnection>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<NewAccountFeedConnection>"
        }    ];

    static getAttributeTypeMap() {
        return NewAccountFeedConnectionsRequest.attributeTypeMap;
    }
}

