"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportCell {
    static getAttributeTypeMap() {
        return ReportCell.attributeTypeMap;
    }
}
exports.ReportCell = ReportCell;
ReportCell.discriminator = undefined;
ReportCell.attributeTypeMap = [
    {
        "name": "value",
        "baseName": "Value",
        "type": "string"
    },
    {
        "name": "attributes",
        "baseName": "Attributes",
        "type": "Array<ReportAttribute>"
    }
];
//# sourceMappingURL=reportCell.js.map