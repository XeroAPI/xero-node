"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Organisations {
    static getAttributeTypeMap() {
        return Organisations.attributeTypeMap;
    }
}
exports.Organisations = Organisations;
Organisations.discriminator = undefined;
Organisations.attributeTypeMap = [
    {
        "name": "organisations",
        "baseName": "Organisations",
        "type": "Array<Organisation>"
    }
];
//# sourceMappingURL=organisations.js.map