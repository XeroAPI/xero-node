import { ReportCell } from './reportCell';
import { RowType } from './rowType';
export declare class ReportRow {
    'rowType'?: RowType;
    'title'?: string;
    'cells'?: Array<ReportCell>;
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
