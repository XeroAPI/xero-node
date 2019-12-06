"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BatchPayment {
    static getAttributeTypeMap() {
        return BatchPayment.attributeTypeMap;
    }
}
exports.BatchPayment = BatchPayment;
BatchPayment.discriminator = undefined;
BatchPayment.attributeTypeMap = [
    {
        "name": "account",
        "baseName": "Account",
        "type": "Account"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "particulars",
        "baseName": "Particulars",
        "type": "string"
    },
    {
        "name": "code",
        "baseName": "Code",
        "type": "string"
    },
    {
        "name": "details",
        "baseName": "Details",
        "type": "string"
    },
    {
        "name": "narrative",
        "baseName": "Narrative",
        "type": "string"
    },
    {
        "name": "batchPaymentID",
        "baseName": "BatchPaymentID",
        "type": "string"
    },
    {
        "name": "dateString",
        "baseName": "DateString",
        "type": "string"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    },
    {
        "name": "amount",
        "baseName": "Amount",
        "type": "number"
    },
    {
        "name": "payments",
        "baseName": "Payments",
        "type": "Array<Payment>"
    },
    {
        "name": "type",
        "baseName": "Type",
        "type": "BatchPayment.TypeEnum"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "string"
    },
    {
        "name": "totalAmount",
        "baseName": "TotalAmount",
        "type": "string"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "isReconciled",
        "baseName": "IsReconciled",
        "type": "string"
    }
];
(function (BatchPayment) {
    let TypeEnum;
    (function (TypeEnum) {
        TypeEnum[TypeEnum["PAYBATCH"] = 'PAYBATCH'] = "PAYBATCH";
        TypeEnum[TypeEnum["RECBATCH"] = 'RECBATCH'] = "RECBATCH";
    })(TypeEnum = BatchPayment.TypeEnum || (BatchPayment.TypeEnum = {}));
})(BatchPayment = exports.BatchPayment || (exports.BatchPayment = {}));
//# sourceMappingURL=batchPayment.js.map