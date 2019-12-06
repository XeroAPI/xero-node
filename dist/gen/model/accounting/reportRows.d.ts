import { ReportCell } from './reportCell';
import { ReportRow } from './reportRow';
import { RowType } from './rowType';
export declare class ReportRows {
    'rowType'?: RowType;
    'title'?: string;
    'cells'?: Array<ReportCell>;
    'rows'?: Array<ReportRow>;
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
