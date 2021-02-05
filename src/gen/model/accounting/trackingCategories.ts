import { TrackingCategory } from '././trackingCategory';

export class TrackingCategories {
    'trackingCategories'?: Array<TrackingCategory>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "trackingCategories",
            "baseName": "TrackingCategories",
            "type": "Array<TrackingCategory>"
        }    ];

    static getAttributeTypeMap() {
        return TrackingCategories.attributeTypeMap;
    }
}

