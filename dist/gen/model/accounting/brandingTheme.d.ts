export declare class BrandingTheme {
    'brandingThemeID'?: string;
    'name'?: string;
    'logoUrl'?: string;
    'type'?: BrandingTheme.TypeEnum;
    'sortOrder'?: number;
    'createdDateUTC'?: Date;
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
export declare namespace BrandingTheme {
    enum TypeEnum {
        INVOICE
    }
}
