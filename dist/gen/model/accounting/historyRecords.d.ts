import { HistoryRecord } from './historyRecord';
export declare class HistoryRecords {
    'historyRecords'?: Array<HistoryRecord>;
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
