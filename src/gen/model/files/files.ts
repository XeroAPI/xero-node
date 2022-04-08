import { FileObject } from '././fileObject';

export class Files {
    'totalCount'?: number;
    'page'?: number;
    'perPage'?: number;
    'items'?: Array<FileObject>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "totalCount",
            "baseName": "TotalCount",
            "type": "number"
        },
        {
            "name": "page",
            "baseName": "Page",
            "type": "number"
        },
        {
            "name": "perPage",
            "baseName": "PerPage",
            "type": "number"
        },
        {
            "name": "items",
            "baseName": "Items",
            "type": "Array<FileObject>"
        }    ];

    static getAttributeTypeMap() {
        return Files.attributeTypeMap;
    }
}

