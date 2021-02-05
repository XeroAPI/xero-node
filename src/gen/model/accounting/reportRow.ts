import { ReportCell } from '././reportCell';
import { RowType } from '././rowType';

export class ReportRow {
    'rowType'?: RowType;
    'title'?: string;
    'cells'?: Array<ReportCell>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "rowType",
            "baseName": "RowType",
            "type": "RowType"
        },
        {
            "name": "title",
            "baseName": "Title",
            "type": "string"
        },
        {
            "name": "cells",
            "baseName": "Cells",
            "type": "Array<ReportCell>"
        }    ];

    static getAttributeTypeMap() {
        return ReportRow.attributeTypeMap;
    }
}

