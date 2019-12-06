"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Element {
    static getAttributeTypeMap() {
        return Element.attributeTypeMap;
    }
}
exports.Element = Element;
Element.discriminator = undefined;
Element.attributeTypeMap = [
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
//# sourceMappingURL=element.js.map