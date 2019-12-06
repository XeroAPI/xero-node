import { TrackingCategory } from './trackingCategory';
export declare class TrackingCategories {
    'trackingCategories'?: Array<TrackingCategory>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
