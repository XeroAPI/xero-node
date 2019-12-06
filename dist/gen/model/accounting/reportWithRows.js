"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportWithRows {
    static getAttributeTypeMap() {
        return ReportWithRows.attributeTypeMap;
    }
}
exports.ReportWithRows = ReportWithRows;
ReportWithRows.discriminator = undefined;
ReportWithRows.attributeTypeMap = [
    {
        "name": "reports",
        "baseName": "Reports",
        "type": "Array<ReportWithRow>"
    }
];
//# sourceMappingURL=reportWithRows.js.map