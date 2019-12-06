"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelError {
    static getAttributeTypeMap() {
        return ModelError.attributeTypeMap;
    }
}
exports.ModelError = ModelError;
ModelError.discriminator = undefined;
ModelError.attributeTypeMap = [
    {
        "name": "errorNumber",
        "baseName": "ErrorNumber",
        "type": "number"
    },
    {
        "name": "type",
        "baseName": "Type",
        "type": "string"
    },
    {
        "name": "message",
        "baseName": "Message",
        "type": "string"
    },
    {
        "name": "elements",
        "baseName": "Elements",
        "type": "Array<Element>"
    }
];
//# sourceMappingURL=modelError.js.map