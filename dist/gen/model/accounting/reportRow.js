"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportRow {
    static getAttributeTypeMap() {
        return ReportRow.attributeTypeMap;
    }
}
exports.ReportRow = ReportRow;
ReportRow.discriminator = undefined;
ReportRow.attributeTypeMap = [
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
    }
];
//# sourceMappingURL=reportRow.js.map