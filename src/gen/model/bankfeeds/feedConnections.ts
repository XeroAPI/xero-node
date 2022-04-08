import { FeedConnection } from '././feedConnection';
import { Pagination } from '././pagination';

export class FeedConnections {
    'pagination'?: Pagination;
    'items'?: Array<FeedConnection>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "items",
            "baseName": "items",
            "type": "Array<FeedConnection>"
        }    ];

    static getAttributeTypeMap() {
        return FeedConnections.attributeTypeMap;
    }
}

