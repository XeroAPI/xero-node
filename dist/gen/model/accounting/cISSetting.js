"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CISSetting {
    static getAttributeTypeMap() {
        return CISSetting.attributeTypeMap;
    }
}
exports.CISSetting = CISSetting;
CISSetting.discriminator = undefined;
CISSetting.attributeTypeMap = [
    {
        "name": "cISEnabled",
        "baseName": "CISEnabled",
        "type": "boolean"
    },
    {
        "name": "rate",
        "baseName": "Rate",
        "type": "number"
    }
];
//# sourceMappingURL=cISSetting.js.map