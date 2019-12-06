"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportRows {
    static getAttributeTypeMap() {
        return ReportRows.attributeTypeMap;
    }
}
exports.ReportRows = ReportRows;
ReportRows.discriminator = undefined;
ReportRows.attributeTypeMap = [
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
    },
    {
        "name": "rows",
        "baseName": "Rows",
        "type": "Array<ReportRow>"
    }
];
//# sourceMappingURL=reportRows.js.map