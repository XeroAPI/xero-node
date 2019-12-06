export declare class HistoryRecord {
    'details'?: string;
    'changes'?: string;
    'user'?: string;
    'dateUTC'?: Date;
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
