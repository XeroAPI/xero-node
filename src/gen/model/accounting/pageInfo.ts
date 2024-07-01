
/**
* Pagination information
*/
export class PageInfo {
    'page'?: number;
    'pageSize'?: number;
    'totalPages'?: number;
    'totalRows'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "page",
            "baseName": "Page",
            "type": "number"
        },
        {
            "name": "pageSize",
            "baseName": "PageSize",
            "type": "number"
        },
        {
            "name": "totalPages",
            "baseName": "TotalPages",
            "type": "number"
        },
        {
            "name": "totalRows",
            "baseName": "TotalRows",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return PageInfo.attributeTypeMap;
    }
}

