export declare class ExternalLink {
    'linkType'?: ExternalLink.LinkTypeEnum;
    'url'?: string;
    'description'?: string;
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
export declare namespace ExternalLink {
    enum LinkTypeEnum {
        Facebook,
        GooglePlus,
        LinkedIn,
        Twitter,
        Website
    }
}
