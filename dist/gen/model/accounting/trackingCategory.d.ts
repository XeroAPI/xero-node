import { TrackingOption } from './trackingOption';
export declare class TrackingCategory {
    'trackingCategoryID'?: string;
    'trackingOptionID'?: string;
    'name'?: string;
    'option'?: string;
    'status'?: TrackingCategory.StatusEnum;
    'options'?: Array<TrackingOption>;
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
export declare namespace TrackingCategory {
    enum StatusEnum {
        ACTIVE,
        ARCHIVED,
        DELETED
    }
}
