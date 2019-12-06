"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Invoice {
    static getAttributeTypeMap() {
        return Invoice.attributeTypeMap;
    }
}
exports.Invoice = Invoice;
Invoice.discriminator = undefined;
Invoice.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "Type",
        "type": "Invoice.TypeEnum"
    },
    {
        "name": "contact",
        "baseName": "Contact",
        "type": "Contact"
    },
    {
        "name": "lineItems",
        "baseName": "LineItems",
        "type": "Array<LineItem>"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    },
    {
        "name": "dueDate",
        "baseName": "DueDate",
        "type": "string"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
    },
    {
        "name": "invoiceNumber",
        "baseName": "InvoiceNumber",
        "type": "string"
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
        "name": "url",
        "baseName": "Url",
        "type": "string"
    },
    {
        "name": "currencyCode",
        "baseName": "CurrencyCode",
        "type": "CurrencyCode"
    },
    {
        "name": "currencyRate",
        "baseName": "CurrencyRate",
        "type": "number"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "Invoice.StatusEnum"
    },
    {
        "name": "sentToContact",
        "baseName": "SentToContact",
        "type": "boolean"
    },
    {
        "name": "expectedPaymentDate",
        "baseName": "ExpectedPaymentDate",
        "type": "string"
    },
    {
        "name": "plannedPaymentDate",
        "baseName": "PlannedPaymentDate",
        "type": "string"
    },
    {
        "name": "cISDeduction",
        "baseName": "CISDeduction",
        "type": "number"
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
        "name": "totalDiscount",
        "baseName": "TotalDiscount",
        "type": "number"
    },
    {
        "name": "invoiceID",
        "baseName": "InvoiceID",
        "type": "string"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "isDiscounted",
        "baseName": "IsDiscounted",
        "type": "boolean"
    },
    {
        "name": "payments",
        "baseName": "Payments",
        "type": "Array<Payment>"
    },
    {
        "name": "prepayments",
        "baseName": "Prepayments",
        "type": "Array<Prepayment>"
    },
    {
        "name": "overpayments",
        "baseName": "Overpayments",
        "type": "Array<Overpayment>"
    },
    {
        "name": "amountDue",
        "baseName": "AmountDue",
        "type": "number"
    },
    {
        "name": "amountPaid",
        "baseName": "AmountPaid",
        "type": "number"
    },
    {
        "name": "fullyPaidOnDate",
        "baseName": "FullyPaidOnDate",
        "type": "string"
    },
    {
        "name": "amountCredited",
        "baseName": "AmountCredited",
        "type": "number"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "creditNotes",
        "baseName": "CreditNotes",
        "type": "Array<CreditNote>"
    },
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    },
    {
        "name": "hasErrors",
        "baseName": "HasErrors",
        "type": "boolean"
    },
    {
        "name": "statusAttributeString",
        "baseName": "StatusAttributeString",
        "type": "string"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
(function (Invoice) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["ACCPAY"] = 'ACCPAY'] = "ACCPAY";
        TypeEnum[TypeEnum["ACCPAYCREDIT"] = 'ACCPAYCREDIT'] = "ACCPAYCREDIT";
        TypeEnum[TypeEnum["AROVERPAYMENT"] = 'AROVERPAYMENT'] = "AROVERPAYMENT";
        TypeEnum[TypeEnum["ACCREC"] = 'ACCREC'] = "ACCREC";
        TypeEnum[TypeEnum["ACCRECCREDIT"] = 'ACCRECCREDIT'] = "ACCRECCREDIT";
    })(TypeEnum = Invoice.TypeEnum || (Invoice.TypeEnum = {}));
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["SUBMITTED"] = 'SUBMITTED'] = "SUBMITTED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["PAID"] = 'PAID'] = "PAID";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = Invoice.StatusEnum || (Invoice.StatusEnum = {}));
})(Invoice = exports.Invoice || (exports.Invoice = {}));
//# sourceMappingURL=invoice.js.map