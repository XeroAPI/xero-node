import { FeedConnectionToDelete } from '././feedConnectionToDelete';

export class DeleteFeedConnectionsRequest {
    /**
    * Between 1 and 50 Feed Connections to terminate. No element may be null, and no identifier may appear twice. 
    */
    'items': Array<FeedConnectionToDelete>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<FeedConnectionToDelete>"
        }    ];

    static getAttributeTypeMap() {
        return DeleteFeedConnectionsRequest.attributeTypeMap;
    }
}

