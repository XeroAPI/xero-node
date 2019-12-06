"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportWithRow {
    static getAttributeTypeMap() {
        return ReportWithRow.attributeTypeMap;
    }
}
exports.ReportWithRow = ReportWithRow;
ReportWithRow.discriminator = undefined;
ReportWithRow.attributeTypeMap = [
    {
        "name": "reportID",
        "baseName": "ReportID",
        "type": "string"
    },
    {
        "name": "reportName",
        "baseName": "ReportName",
        "type": "string"
    },
    {
        "name": "reportTitle",
        "baseName": "ReportTitle",
        "type": "string"
    },
    {
        "name": "reportType",
        "baseName": "ReportType",
        "type": "string"
    },
    {
        "name": "reportTitles",
        "baseName": "ReportTitles",
        "type": "Array<string>"
    },
    {
        "name": "reportDate",
        "baseName": "ReportDate",
        "type": "string"
    },
    {
        "name": "rows",
        "baseName": "Rows",
        "type": "Array<ReportRows>"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "fields",
        "baseName": "Fields",
        "type": "Array<ReportFields>"
    }
];
//# sourceMappingURL=reportWithRow.js.map