"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CISSettings {
    static getAttributeTypeMap() {
        return CISSettings.attributeTypeMap;
    }
}
exports.CISSettings = CISSettings;
CISSettings.discriminator = undefined;
CISSettings.attributeTypeMap = [
    {
        "name": "cISSettings",
        "baseName": "CISSettings",
        "type": "Array<CISSetting>"
    }
];
//# sourceMappingURL=cISSettings.js.map