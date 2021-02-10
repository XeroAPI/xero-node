import { Pagination } from '././pagination';
import { Problem } from '././problem';
import { TrackingCategory } from '././trackingCategory';

export class TrackingCategories {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'trackingCategories'?: TrackingCategory;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        },
        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        },
        {
            "name": "trackingCategories",
            "baseName": "trackingCategories",
            "type": "TrackingCategory"
        }    ];

    static getAttributeTypeMap() {
        return TrackingCategories.attributeTypeMap;
    }
}

