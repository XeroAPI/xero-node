export declare class CISOrgSetting {
    'cISContractorEnabled'?: boolean;
    'cISSubContractorEnabled'?: boolean;
    'rate'?: number;
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
