import { ReportFields } from './reportFields';
import { ReportRows } from './reportRows';
export declare class ReportWithRow {
    'reportID'?: string;
    'reportName'?: string;
    'reportTitle'?: string;
    'reportType'?: string;
    'reportTitles'?: Array<string>;
    'reportDate'?: string;
    'rows'?: Array<ReportRows>;
    'updatedDateUTC'?: Date;
    'fields'?: Array<ReportFields>;
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
