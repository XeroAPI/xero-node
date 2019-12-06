"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LinkedTransaction {
    static getAttributeTypeMap() {
        return LinkedTransaction.attributeTypeMap;
    }
}
exports.LinkedTransaction = LinkedTransaction;
LinkedTransaction.discriminator = undefined;
LinkedTransaction.attributeTypeMap = [
    {
        "name": "sourceTransactionID",
        "baseName": "SourceTransactionID",
        "type": "string"
    },
    {
        "name": "sourceLineItemID",
        "baseName": "SourceLineItemID",
        "type": "string"
    },
    {
        "name": "contactID",
        "baseName": "ContactID",
        "type": "string"
    },
    {
        "name": "targetTransactionID",
        "baseName": "TargetTransactionID",
        "type": "string"
    },
    {
        "name": "targetLineItemID",
        "baseName": "TargetLineItemID",
        "type": "string"
    },
    {
        "name": "linkedTransactionID",
        "baseName": "LinkedTransactionID",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "LinkedTransaction.StatusEnum"
    },
    {
        "name": "type",
        "baseName": "Type",
        "type": "LinkedTransaction.TypeEnum"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "sourceTransactionTypeCode",
        "baseName": "SourceTransactionTypeCode",
        "type": "LinkedTransaction.SourceTransactionTypeCodeEnum"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
(function (LinkedTransaction) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["APPROVED"] = 'APPROVED'] = "APPROVED";
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["ONDRAFT"] = 'ONDRAFT'] = "ONDRAFT";
        StatusEnum[StatusEnum["BILLED"] = 'BILLED'] = "BILLED";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = LinkedTransaction.StatusEnum || (LinkedTransaction.StatusEnum = {}));
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["BILLABLEEXPENSE"] = 'BILLABLEEXPENSE'] = "BILLABLEEXPENSE";
    })(TypeEnum = LinkedTransaction.TypeEnum || (LinkedTransaction.TypeEnum = {}));
    let SourceTransactionTypeCodeEnum;
    (function (SourceTransactionTypeCodeEnum) {
        SourceTransactionTypeCodeEnum[SourceTransactionTypeCodeEnum["ACCPAY"] = 'ACCPAY'] = "ACCPAY";
        SourceTransactionTypeCodeEnum[SourceTransactionTypeCodeEnum["SPEND"] = 'SPEND'] = "SPEND";
    })(SourceTransactionTypeCodeEnum = LinkedTransaction.SourceTransactionTypeCodeEnum || (LinkedTransaction.SourceTransactionTypeCodeEnum = {}));
})(LinkedTransaction = exports.LinkedTransaction || (exports.LinkedTransaction = {}));
//# sourceMappingURL=linkedTransaction.js.map