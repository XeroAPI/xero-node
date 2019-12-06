"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CISOrgSetting {
    static getAttributeTypeMap() {
        return CISOrgSetting.attributeTypeMap;
    }
}
exports.CISOrgSetting = CISOrgSetting;
CISOrgSetting.discriminator = undefined;
CISOrgSetting.attributeTypeMap = [
    {
        "name": "cISContractorEnabled",
        "baseName": "CISContractorEnabled",
        "type": "boolean"
    },
    {
        "name": "cISSubContractorEnabled",
        "baseName": "CISSubContractorEnabled",
        "type": "boolean"
    },
    {
        "name": "rate",
        "baseName": "Rate",
        "type": "number"
    }
];
//# sourceMappingURL=cISOrgSetting.js.map