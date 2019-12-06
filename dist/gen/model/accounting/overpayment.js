"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Overpayment {
    static getAttributeTypeMap() {
        return Overpayment.attributeTypeMap;
    }
}
exports.Overpayment = Overpayment;
Overpayment.discriminator = undefined;
Overpayment.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "Type",
        "type": "Overpayment.TypeEnum"
    },
    {
        "name": "contact",
        "baseName": "Contact",
        "type": "Contact"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "Overpayment.StatusEnum"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
    },
    {
        "name": "lineItems",
        "baseName": "LineItems",
        "type": "Array<LineItem>"
    },
    {
        "name": "subTotal",
        "baseName": "SubTotal",
        "type": "number"
    },
    {
        "name": "totalTax",
        "baseName": "TotalTax",
        "type": "number"
    },
    {
        "name": "total",
        "baseName": "Total",
        "type": "number"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "currencyCode",
        "baseName": "CurrencyCode",
        "type": "CurrencyCode"
    },
    {
        "name": "overpaymentID",
        "baseName": "OverpaymentID",
        "type": "string"
    },
    {
        "name": "currencyRate",
        "baseName": "CurrencyRate",
        "type": "number"
    },
    {
        "name": "remainingCredit",
        "baseName": "RemainingCredit",
        "type": "number"
    },
    {
        "name": "allocations",
        "baseName": "Allocations",
        "type": "Array<Allocation>"
    },
    {
        "name": "payments",
        "baseName": "Payments",
        "type": "Array<Payment>"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    }
];
(function (Overpayment) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["RECEIVEOVERPAYMENT"] = 'RECEIVE-OVERPAYMENT'] = "RECEIVEOVERPAYMENT";
        TypeEnum[TypeEnum["SPENDOVERPAYMENT"] = 'SPEND-OVERPAYMENT'] = "SPENDOVERPAYMENT";
        TypeEnum[TypeEnum["AROVERPAYMENT"] = 'AROVERPAYMENT'] = "AROVERPAYMENT";
    })(TypeEnum = Overpayment.TypeEnum || (Overpayment.TypeEnum = {}));
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["PAID"] = 'PAID'] = "PAID";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = Overpayment.StatusEnum || (Overpayment.StatusEnum = {}));
})(Overpayment = exports.Overpayment || (exports.Overpayment = {}));
//# sourceMappingURL=overpayment.js.map