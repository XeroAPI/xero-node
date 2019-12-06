export declare class TaxComponent {
    'name'?: string;
    'rate'?: number;
    'isCompound'?: boolean;
    'isNonRecoverable'?: boolean;
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
