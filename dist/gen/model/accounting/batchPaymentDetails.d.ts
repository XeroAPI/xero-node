export declare class BatchPaymentDetails {
    'bankAccountNumber'?: string;
    'bankAccountName'?: string;
    'details'?: string;
    'code'?: string;
    'reference'?: string;
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
