"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkedTransactions {
    static getAttributeTypeMap() {
        return LinkedTransactions.attributeTypeMap;
    }
}
exports.LinkedTransactions = LinkedTransactions;
LinkedTransactions.discriminator = undefined;
LinkedTransactions.attributeTypeMap = [
    {
        "name": "linkedTransactions",
        "baseName": "LinkedTransactions",
        "type": "Array<LinkedTransaction>"
    }
];
//# sourceMappingURL=linkedTransactions.js.map