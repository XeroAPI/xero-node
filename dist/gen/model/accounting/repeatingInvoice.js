"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RepeatingInvoice {
    static getAttributeTypeMap() {
        return RepeatingInvoice.attributeTypeMap;
    }
}
exports.RepeatingInvoice = RepeatingInvoice;
RepeatingInvoice.discriminator = undefined;
RepeatingInvoice.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "Type",
        "type": "RepeatingInvoice.TypeEnum"
    },
    {
        "name": "contact",
        "baseName": "Contact",
        "type": "Contact"
    },
    {
        "name": "schedule",
        "baseName": "Schedule",
        "type": "Schedule"
    },
    {
        "name": "lineItems",
        "baseName": "LineItems",
        "type": "Array<LineItem>"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "brandingThemeID",
        "baseName": "BrandingThemeID",
        "type": "string"
    },
    {
        "name": "currencyCode",
        "baseName": "CurrencyCode",
        "type": "CurrencyCode"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "RepeatingInvoice.StatusEnum"
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
        "name": "repeatingInvoiceID",
        "baseName": "RepeatingInvoiceID",
        "type": "string"
    },
    {
        "name": "ID",
        "baseName": "ID",
        "type": "string"
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
(function (RepeatingInvoice) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["ACCPAY"] = 'ACCPAY'] = "ACCPAY";
        TypeEnum[TypeEnum["ACCREC"] = 'ACCREC'] = "ACCREC";
    })(TypeEnum = RepeatingInvoice.TypeEnum || (RepeatingInvoice.TypeEnum = {}));
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
    })(StatusEnum = RepeatingInvoice.StatusEnum || (RepeatingInvoice.StatusEnum = {}));
})(RepeatingInvoice = exports.RepeatingInvoice || (exports.RepeatingInvoice = {}));
//# sourceMappingURL=repeatingInvoice.js.map