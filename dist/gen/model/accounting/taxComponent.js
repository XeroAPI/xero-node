"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaxComponent {
    static getAttributeTypeMap() {
        return TaxComponent.attributeTypeMap;
    }
}
exports.TaxComponent = TaxComponent;
TaxComponent.discriminator = undefined;
TaxComponent.attributeTypeMap = [
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "rate",
        "baseName": "Rate",
        "type": "number"
    },
    {
        "name": "isCompound",
        "baseName": "IsCompound",
        "type": "boolean"
    },
    {
        "name": "isNonRecoverable",
        "baseName": "IsNonRecoverable",
        "type": "boolean"
    }
];
//# sourceMappingURL=taxComponent.js.map