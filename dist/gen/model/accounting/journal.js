"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Journal {
    static getAttributeTypeMap() {
        return Journal.attributeTypeMap;
    }
}
exports.Journal = Journal;
Journal.discriminator = undefined;
Journal.attributeTypeMap = [
    {
        "name": "journalID",
        "baseName": "JournalID",
        "type": "string"
    },
    {
        "name": "journalDate",
        "baseName": "JournalDate",
        "type": "string"
    },
    {
        "name": "journalNumber",
        "baseName": "JournalNumber",
        "type": "string"
    },
    {
        "name": "createdDateUTC",
        "baseName": "CreatedDateUTC",
        "type": "Date"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "sourceID",
        "baseName": "SourceID",
        "type": "string"
    },
    {
        "name": "sourceType",
        "baseName": "SourceType",
        "type": "Journal.SourceTypeEnum"
    },
    {
        "name": "journalLines",
        "baseName": "JournalLines",
        "type": "Array<JournalLine>"
    }
];
(function (Journal) {
    let SourceTypeEnum;
    (function (SourceTypeEnum) {
        SourceTypeEnum[SourceTypeEnum["ACCREC"] = 'ACCREC'] = "ACCREC";
        SourceTypeEnum[SourceTypeEnum["ACCPAY"] = 'ACCPAY'] = "ACCPAY";
        SourceTypeEnum[SourceTypeEnum["ACCRECCREDIT"] = 'ACCRECCREDIT'] = "ACCRECCREDIT";
        SourceTypeEnum[SourceTypeEnum["ACCPAYCREDIT"] = 'ACCPAYCREDIT'] = "ACCPAYCREDIT";
        SourceTypeEnum[SourceTypeEnum["ACCRECPAYMENT"] = 'ACCRECPAYMENT'] = "ACCRECPAYMENT";
        SourceTypeEnum[SourceTypeEnum["ACCPAYPAYMENT"] = 'ACCPAYPAYMENT'] = "ACCPAYPAYMENT";
        SourceTypeEnum[SourceTypeEnum["ARCREDITPAYMENT"] = 'ARCREDITPAYMENT'] = "ARCREDITPAYMENT";
        SourceTypeEnum[SourceTypeEnum["APCREDITPAYMENT"] = 'APCREDITPAYMENT'] = "APCREDITPAYMENT";
        SourceTypeEnum[SourceTypeEnum["CASHREC"] = 'CASHREC'] = "CASHREC";
        SourceTypeEnum[SourceTypeEnum["CASHPAID"] = 'CASHPAID'] = "CASHPAID";
        SourceTypeEnum[SourceTypeEnum["TRANSFER"] = 'TRANSFER'] = "TRANSFER";
        SourceTypeEnum[SourceTypeEnum["ARPREPAYMENT"] = 'ARPREPAYMENT'] = "ARPREPAYMENT";
        SourceTypeEnum[SourceTypeEnum["APPREPAYMENT"] = 'APPREPAYMENT'] = "APPREPAYMENT";
        SourceTypeEnum[SourceTypeEnum["AROVERPAYMENT"] = 'AROVERPAYMENT'] = "AROVERPAYMENT";
        SourceTypeEnum[SourceTypeEnum["APOVERPAYMENT"] = 'APOVERPAYMENT'] = "APOVERPAYMENT";
        SourceTypeEnum[SourceTypeEnum["EXPCLAIM"] = 'EXPCLAIM'] = "EXPCLAIM";
        SourceTypeEnum[SourceTypeEnum["EXPPAYMENT"] = 'EXPPAYMENT'] = "EXPPAYMENT";
        SourceTypeEnum[SourceTypeEnum["MANJOURNAL"] = 'MANJOURNAL'] = "MANJOURNAL";
        SourceTypeEnum[SourceTypeEnum["PAYSLIP"] = 'PAYSLIP'] = "PAYSLIP";
        SourceTypeEnum[SourceTypeEnum["WAGEPAYABLE"] = 'WAGEPAYABLE'] = "WAGEPAYABLE";
        SourceTypeEnum[SourceTypeEnum["INTEGRATEDPAYROLLPE"] = 'INTEGRATEDPAYROLLPE'] = "INTEGRATEDPAYROLLPE";
        SourceTypeEnum[SourceTypeEnum["INTEGRATEDPAYROLLPT"] = 'INTEGRATEDPAYROLLPT'] = "INTEGRATEDPAYROLLPT";
        SourceTypeEnum[SourceTypeEnum["EXTERNALSPENDMONEY"] = 'EXTERNALSPENDMONEY'] = "EXTERNALSPENDMONEY";
        SourceTypeEnum[SourceTypeEnum["INTEGRATEDPAYROLLPTPAYMENT"] = 'INTEGRATEDPAYROLLPTPAYMENT'] = "INTEGRATEDPAYROLLPTPAYMENT";
        SourceTypeEnum[SourceTypeEnum["INTEGRATEDPAYROLLCN"] = 'INTEGRATEDPAYROLLCN'] = "INTEGRATEDPAYROLLCN";
    })(SourceTypeEnum = Journal.SourceTypeEnum || (Journal.SourceTypeEnum = {}));
})(Journal = exports.Journal || (exports.Journal = {}));
//# sourceMappingURL=journal.js.map