"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreditNote {
    static getAttributeTypeMap() {
        return CreditNote.attributeTypeMap;
    }
}
exports.CreditNote = CreditNote;
CreditNote.discriminator = undefined;
CreditNote.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "Type",
        "type": "CreditNote.TypeEnum"
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
        "type": "CreditNote.StatusEnum"
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
        "name": "fullyPaidOnDate",
        "baseName": "FullyPaidOnDate",
        "type": "string"
    },
    {
        "name": "creditNoteID",
        "baseName": "CreditNoteID",
        "type": "string"
    },
    {
        "name": "creditNoteNumber",
        "baseName": "CreditNoteNumber",
        "type": "string"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "sentToContact",
        "baseName": "SentToContact",
        "type": "boolean"
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
        "name": "brandingThemeID",
        "baseName": "BrandingThemeID",
        "type": "string"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
(function (CreditNote) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["ACCPAYCREDIT"] = 'ACCPAYCREDIT'] = "ACCPAYCREDIT";
        TypeEnum[TypeEnum["ACCRECCREDIT"] = 'ACCRECCREDIT'] = "ACCRECCREDIT";
    })(TypeEnum = CreditNote.TypeEnum || (CreditNote.TypeEnum = {}));
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["SUBMITTED"] = 'SUBMITTED'] = "SUBMITTED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["PAID"] = 'PAID'] = "PAID";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = CreditNote.StatusEnum || (CreditNote.StatusEnum = {}));
})(CreditNote = exports.CreditNote || (exports.CreditNote = {}));
//# sourceMappingURL=creditNote.js.map