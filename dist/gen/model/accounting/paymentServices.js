"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentServices {
    static getAttributeTypeMap() {
        return PaymentServices.attributeTypeMap;
    }
}
exports.PaymentServices = PaymentServices;
PaymentServices.discriminator = undefined;
PaymentServices.attributeTypeMap = [
    {
        "name": "paymentServices",
        "baseName": "PaymentServices",
        "type": "Array<PaymentService>"
    }
];
//# sourceMappingURL=paymentServices.js.map