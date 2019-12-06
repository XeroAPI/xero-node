"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OnlineInvoices {
    static getAttributeTypeMap() {
        return OnlineInvoices.attributeTypeMap;
    }
}
exports.OnlineInvoices = OnlineInvoices;
OnlineInvoices.discriminator = undefined;
OnlineInvoices.attributeTypeMap = [
    {
        "name": "onlineInvoices",
        "baseName": "OnlineInvoices",
        "type": "Array<OnlineInvoice>"
    }
];
//# sourceMappingURL=onlineInvoices.js.map