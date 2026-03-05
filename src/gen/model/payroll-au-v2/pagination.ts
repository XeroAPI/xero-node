
export class Pagination {
    'page'?: number;
    'pageSize'?: number;
    'pageCount'?: number;
    'itemCount'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "page",
            "baseName": "page",
            "type": "number"
        },
        {
            "name": "pageSize",
            "baseName": "pageSize",
            "type": "number"
        },
        {
            "name": "pageCount",
            "baseName": "pageCount",
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

