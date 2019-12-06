export declare class Phone {
    'phoneType'?: Phone.PhoneTypeEnum;
    'phoneNumber'?: string;
    'phoneAreaCode'?: string;
    'phoneCountryCode'?: string;
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
export declare namespace Phone {
    enum PhoneTypeEnum {
        DEFAULT,
        DDI,
        MOBILE,
        FAX,
        OFFICE
    }
}
