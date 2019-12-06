"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReportAttribute {
    static getAttributeTypeMap() {
        return ReportAttribute.attributeTypeMap;
    }
}
exports.ReportAttribute = ReportAttribute;
ReportAttribute.discriminator = undefined;
ReportAttribute.attributeTypeMap = [
    {
        "name": "id",
        "baseName": "Id",
        "type": "string"
    },
    {
        "name": "value",
        "baseName": "Value",
        "type": "string"
    }
];
//# sourceMappingURL=reportAttribute.js.map