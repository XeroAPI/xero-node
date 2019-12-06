export declare class TrackingOption {
    'trackingOptionID'?: string;
    'name'?: string;
    'status'?: TrackingOption.StatusEnum;
    'trackingCategoryID'?: string;
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
export declare namespace TrackingOption {
    enum StatusEnum {
        ACTIVE,
        ARCHIVED,
        DELETED
    }
}
