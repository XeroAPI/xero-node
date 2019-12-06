"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentService {
    static getAttributeTypeMap() {
        return PaymentService.attributeTypeMap;
    }
}
exports.PaymentService = PaymentService;
PaymentService.discriminator = undefined;
PaymentService.attributeTypeMap = [
    {
        "name": "paymentServiceID",
        "baseName": "PaymentServiceID",
        "type": "string"
    },
    {
        "name": "paymentServiceName",
        "baseName": "PaymentServiceName",
        "type": "string"
    },
    {
        "name": "paymentServiceUrl",
        "baseName": "PaymentServiceUrl",
        "type": "string"
    },
    {
        "name": "payNowText",
        "baseName": "PayNowText",
        "type": "string"
    },
    {
        "name": "paymentServiceType",
        "baseName": "PaymentServiceType",
        "type": "string"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
//# sourceMappingURL=paymentService.js.map