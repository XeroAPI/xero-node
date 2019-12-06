"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExpenseClaim {
    static getAttributeTypeMap() {
        return ExpenseClaim.attributeTypeMap;
    }
}
exports.ExpenseClaim = ExpenseClaim;
ExpenseClaim.discriminator = undefined;
ExpenseClaim.attributeTypeMap = [
    {
        "name": "expenseClaimID",
        "baseName": "ExpenseClaimID",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "ExpenseClaim.StatusEnum"
    },
    {
        "name": "payments",
        "baseName": "Payments",
        "type": "Array<Payment>"
    },
    {
        "name": "user",
        "baseName": "User",
        "type": "User"
    },
    {
        "name": "receipts",
        "baseName": "Receipts",
        "type": "Array<Receipt>"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "total",
        "baseName": "Total",
        "type": "number"
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
        "name": "paymentDueDate",
        "baseName": "PaymentDueDate",
        "type": "string"
    },
    {
        "name": "reportingDate",
        "baseName": "ReportingDate",
        "type": "string"
    },
    {
        "name": "receiptID",
        "baseName": "ReceiptID",
        "type": "string"
    }
];
(function (ExpenseClaim) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["SUBMITTED"] = 'SUBMITTED'] = "SUBMITTED";
        StatusEnum[StatusEnum["AUTHORISED"] = 'AUTHORISED'] = "AUTHORISED";
        StatusEnum[StatusEnum["PAID"] = 'PAID'] = "PAID";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = ExpenseClaim.StatusEnum || (ExpenseClaim.StatusEnum = {}));
})(ExpenseClaim = exports.ExpenseClaim || (exports.ExpenseClaim = {}));
//# sourceMappingURL=expenseClaim.js.map