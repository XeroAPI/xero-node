
export class Pagination {
    /**
    * The page returned, echoing the request.
    */
    'page'?: number;
    /**
    * How many pages the collection spans in total.
    */
    'pageCount'?: number;
    /**
    * The page size used, echoing the request.
    */
    'pageSize'?: number;
    /**
    * How many Feed Connections are on this page. This is not the size of the whole collection, which is not returned. 
    */
    'itemCount'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "page",
            "baseName": "page",
            "type": "number"
        },
        {
            "name": "pageCount",
            "baseName": "pageCount",
            "type": "number"
        },
        {
            "name": "pageSize",
            "baseName": "pageSize",
            "type": "number"
        },
        {
            "name": "itemCount",
            "baseName": "itemCount",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return Pagination.attributeTypeMap;
    }
}

