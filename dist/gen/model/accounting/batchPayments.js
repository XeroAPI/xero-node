"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BatchPayments {
    static getAttributeTypeMap() {
        return BatchPayments.attributeTypeMap;
    }
}
exports.BatchPayments = BatchPayments;
BatchPayments.discriminator = undefined;
BatchPayments.attributeTypeMap = [
    {
        "name": "batchPayments",
        "baseName": "BatchPayments",
        "type": "Array<BatchPayment>"
    }
];
//# sourceMappingURL=batchPayments.js.map