"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BankTransaction {
    static getAttributeTypeMap() {
        return BankTransaction.attributeTypeMap;
    }
}
exports.BankTransaction = BankTransaction;
BankTransaction.discriminator = undefined;
BankTransaction.attributeTypeMap = [
    {
        "name": "type",
        "baseName": "Type",
        "type": "BankTransaction.TypeEnum"
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
        "name": "bankAccount",
        "baseName": "BankAccount",
        "type": "Account"
    },
    {
        "name": "isReconciled",
        "baseName": "IsReconciled",
        "type": "boolean"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    },
    {
        "name": "reference",
        "baseName": "Reference",
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
        "name": "url",
        "baseName": "Url",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "BankTransaction.StatusEnum"
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
        "name": "bankTransactionID",
        "baseName": "BankTransactionID",
        "type": "string"
    },
    {
        "name": "prepaymentID",
        "baseName": "PrepaymentID",
        "type": "string"
    },
    {
        "name": "overpaymentID",
        "baseName": "OverpaymentID",
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
(function (BankTransaction) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["RECEIVE"] = 'RECEIVE'] = "RECEIVE";
        TypeEnum[TypeEnum["RECEIVEOVERPAYMENT"] = 'RECEIVE-OVERPAYMENT'] = "RECEIVEOVERPAYMENT";
        TypeEnum[TypeEnum["RECEIVEPREPAYMENT"] = 'RECEIVE-PREPAYMENT'] = "RECEIVEPREPAYMENT";
        TypeEnum[TypeEnum["SPEND"] = 'SPEND'] = "SPEND";
        TypeEnum[TypeEnum["SPENDOVERPAYMENT"] = 'SPEND-OVERPAYMENT'] = "SPENDOVERPAYMENT";
        TypeEnum[TypeEnum["SPENDPREPAYMENT"] = 'SPEND-PREPAYMENT'] = "SPENDPREPAYMENT";
        TypeEnum[TypeEnum["RECEIVETRANSFER"] = 'RECEIVE-TRANSFER'] = "RECEIVETRANSFER";
        TypeEnum[TypeEnum["SPENDTRANSFER"] = 'SPEND-TRANSFER'] = "SPENDTRANSFER";
    })(TypeEnum = BankTransaction.TypeEnum || (BankTransaction.TypeEnum = {}));
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = BankTransaction.StatusEnum || (BankTransaction.StatusEnum = {}));
})(BankTransaction = exports.BankTransaction || (exports.BankTransaction = {}));
//# sourceMappingURL=bankTransaction.js.map