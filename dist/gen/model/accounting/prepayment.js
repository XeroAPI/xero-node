"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Prepayment {
    static getAttributeTypeMap() {
        return Prepayment.attributeTypeMap;
    }
}
exports.Prepayment = Prepayment;
Prepayment.discriminator = undefined;
Prepayment.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "Type",
        "type": "Prepayment.TypeEnum"
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
        "type": "Prepayment.StatusEnum"
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
        "name": "prepaymentID",
        "baseName": "PrepaymentID",
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
(function (Prepayment) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["RECEIVEPREPAYMENT"] = 'RECEIVE-PREPAYMENT'] = "RECEIVEPREPAYMENT";
        TypeEnum[TypeEnum["SPENDPREPAYMENT"] = 'SPEND-PREPAYMENT'] = "SPENDPREPAYMENT";
        TypeEnum[TypeEnum["ARPREPAYMENT"] = 'ARPREPAYMENT'] = "ARPREPAYMENT";
        TypeEnum[TypeEnum["APPREPAYMENT"] = 'APPREPAYMENT'] = "APPREPAYMENT";
    })(TypeEnum = Prepayment.TypeEnum || (Prepayment.TypeEnum = {}));
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["PAID"] = 'PAID'] = "PAID";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = Prepayment.StatusEnum || (Prepayment.StatusEnum = {}));
})(Prepayment = exports.Prepayment || (exports.Prepayment = {}));
//# sourceMappingURL=prepayment.js.map