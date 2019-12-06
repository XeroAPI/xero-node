"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Journals {
    static getAttributeTypeMap() {
        return Journals.attributeTypeMap;
    }
}
exports.Journals = Journals;
Journals.discriminator = undefined;
Journals.attributeTypeMap = [
    {
        "name": "journals",
        "baseName": "Journals",
        "type": "Array<Journal>"
    }
];
//# sourceMappingURL=journals.js.map