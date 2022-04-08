import { Asset } from '././asset';
import { Pagination } from '././pagination';

export class Assets {
    'pagination'?: Pagination;
    'items'?: Array<Asset>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "items",
            "baseName": "items",
            "type": "Array<Asset>"
        }    ];

    static getAttributeTypeMap() {
        return Assets.attributeTypeMap;
    }
}

