import { ReportWithRow } from './reportWithRow';
export declare class ReportWithRows {
    'reports'?: Array<ReportWithRow>;
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
