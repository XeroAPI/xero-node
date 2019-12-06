export declare class Address {
    'addressType'?: Address.AddressTypeEnum;
    'addressLine1'?: string;
    'addressLine2'?: string;
    'addressLine3'?: string;
    'addressLine4'?: string;
    'city'?: string;
    'region'?: string;
    'postalCode'?: string;
    'country'?: string;
    'attentionTo'?: string;
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
export declare namespace Address {
    enum AddressTypeEnum {
        POBOX,
        STREET,
        DELIVERY
    }
}
