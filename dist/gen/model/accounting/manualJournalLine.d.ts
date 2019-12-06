import { TrackingCategory } from './trackingCategory';
export declare class ManualJournalLine {
    'lineAmount'?: number;
    'accountCode'?: string;
    'description'?: string;
    'taxType'?: string;
    'tracking'?: Array<TrackingCategory>;
    'taxAmount'?: number;
    'isBlank'?: boolean;
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
