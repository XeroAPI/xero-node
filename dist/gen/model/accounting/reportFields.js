"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportFields {
    static getAttributeTypeMap() {
        return ReportFields.attributeTypeMap;
    }
}
exports.ReportFields = ReportFields;
ReportFields.discriminator = undefined;
ReportFields.attributeTypeMap = [
    {
        "name": "fieldID",
        "baseName": "FieldID",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    },
    {
        "name": "value",
        "baseName": "Value",
        "type": "string"
    }
];
//# sourceMappingURL=reportFields.js.map