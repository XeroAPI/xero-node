"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Receipt {
    static getAttributeTypeMap() {
        return Receipt.attributeTypeMap;
    }
}
exports.Receipt = Receipt;
Receipt.discriminator = undefined;
Receipt.attributeTypeMap = [
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
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
        "name": "user",
        "baseName": "User",
        "type": "User"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
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
        "name": "receiptID",
        "baseName": "ReceiptID",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "Receipt.StatusEnum"
    },
    {
        "name": "receiptNumber",
        "baseName": "ReceiptNumber",
        "type": "string"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "url",
        "baseName": "Url",
        "type": "string"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    },
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    }
];
(function (Receipt) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["SUBMITTED"] = 'SUBMITTED'] = "SUBMITTED";
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["DECLINED"] = 'DECLINED'] = "DECLINED";
    })(StatusEnum = Receipt.StatusEnum || (Receipt.StatusEnum = {}));
})(Receipt = exports.Receipt || (exports.Receipt = {}));
//# sourceMappingURL=receipt.js.map