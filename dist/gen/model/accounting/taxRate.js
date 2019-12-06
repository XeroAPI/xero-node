"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TaxRate {
    static getAttributeTypeMap() {
        return TaxRate.attributeTypeMap;
    }
}
exports.TaxRate = TaxRate;
TaxRate.discriminator = undefined;
TaxRate.attributeTypeMap = [
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "taxType",
        "baseName": "TaxType",
        "type": "string"
    },
    {
        "name": "taxComponents",
        "baseName": "TaxComponents",
        "type": "Array<TaxComponent>"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "TaxRate.StatusEnum"
    },
    {
        "name": "reportTaxType",
        "baseName": "ReportTaxType",
        "type": "TaxRate.ReportTaxTypeEnum"
    },
    {
        "name": "canApplyToAssets",
        "baseName": "CanApplyToAssets",
        "type": "boolean"
    },
    {
        "name": "canApplyToEquity",
        "baseName": "CanApplyToEquity",
        "type": "boolean"
    },
    {
        "name": "canApplyToExpenses",
        "baseName": "CanApplyToExpenses",
        "type": "boolean"
    },
    {
        "name": "canApplyToLiabilities",
        "baseName": "CanApplyToLiabilities",
        "type": "boolean"
    },
    {
        "name": "canApplyToRevenue",
        "baseName": "CanApplyToRevenue",
        "type": "boolean"
    },
    {
        "name": "displayTaxRate",
        "baseName": "DisplayTaxRate",
        "type": "number"
    },
    {
        "name": "effectiveRate",
        "baseName": "EffectiveRate",
        "type": "number"
    }
];
(function (TaxRate) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
        StatusEnum[StatusEnum["ARCHIVED"] = 'ARCHIVED'] = "ARCHIVED";
        StatusEnum[StatusEnum["PENDING"] = 'PENDING'] = "PENDING";
    })(StatusEnum = TaxRate.StatusEnum || (TaxRate.StatusEnum = {}));
    let ReportTaxTypeEnum;
    (function (ReportTaxTypeEnum) {
        ReportTaxTypeEnum[ReportTaxTypeEnum["AVALARA"] = 'AVALARA'] = "AVALARA";
        ReportTaxTypeEnum[ReportTaxTypeEnum["BASEXCLUDED"] = 'BASEXCLUDED'] = "BASEXCLUDED";
        ReportTaxTypeEnum[ReportTaxTypeEnum["CAPITALSALESOUTPUT"] = 'CAPITALSALESOUTPUT'] = "CAPITALSALESOUTPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["CAPITALEXPENSESINPUT"] = 'CAPITALEXPENSESINPUT'] = "CAPITALEXPENSESINPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["ECOUTPUT"] = 'ECOUTPUT'] = "ECOUTPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["ECOUTPUTSERVICES"] = 'ECOUTPUTSERVICES'] = "ECOUTPUTSERVICES";
        ReportTaxTypeEnum[ReportTaxTypeEnum["ECINPUT"] = 'ECINPUT'] = "ECINPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["ECACQUISITIONS"] = 'ECACQUISITIONS'] = "ECACQUISITIONS";
        ReportTaxTypeEnum[ReportTaxTypeEnum["EXEMPTEXPENSES"] = 'EXEMPTEXPENSES'] = "EXEMPTEXPENSES";
        ReportTaxTypeEnum[ReportTaxTypeEnum["EXEMPTINPUT"] = 'EXEMPTINPUT'] = "EXEMPTINPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["EXEMPTOUTPUT"] = 'EXEMPTOUTPUT'] = "EXEMPTOUTPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["GSTONIMPORTS"] = 'GSTONIMPORTS'] = "GSTONIMPORTS";
        ReportTaxTypeEnum[ReportTaxTypeEnum["INPUT"] = 'INPUT'] = "INPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["INPUTTAXED"] = 'INPUTTAXED'] = "INPUTTAXED";
        ReportTaxTypeEnum[ReportTaxTypeEnum["MOSSSALES"] = 'MOSSSALES'] = "MOSSSALES";
        ReportTaxTypeEnum[ReportTaxTypeEnum["NONE"] = 'NONE'] = "NONE";
        ReportTaxTypeEnum[ReportTaxTypeEnum["NONEOUTPUT"] = 'NONEOUTPUT'] = "NONEOUTPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["OUTPUT"] = 'OUTPUT'] = "OUTPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["PURCHASESINPUT"] = 'PURCHASESINPUT'] = "PURCHASESINPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["SALESOUTPUT"] = 'SALESOUTPUT'] = "SALESOUTPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["EXEMPTCAPITAL"] = 'EXEMPTCAPITAL'] = "EXEMPTCAPITAL";
        ReportTaxTypeEnum[ReportTaxTypeEnum["EXEMPTEXPORT"] = 'EXEMPTEXPORT'] = "EXEMPTEXPORT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["CAPITALEXINPUT"] = 'CAPITALEXINPUT'] = "CAPITALEXINPUT";
        ReportTaxTypeEnum[ReportTaxTypeEnum["GSTONCAPIMPORTS"] = 'GSTONCAPIMPORTS'] = "GSTONCAPIMPORTS";
        ReportTaxTypeEnum[ReportTaxTypeEnum["REVERSECHARGES"] = 'REVERSECHARGES'] = "REVERSECHARGES";
        ReportTaxTypeEnum[ReportTaxTypeEnum["PAYMENTS"] = 'PAYMENTS'] = "PAYMENTS";
        ReportTaxTypeEnum[ReportTaxTypeEnum["INVOICE"] = 'INVOICE'] = "INVOICE";
        ReportTaxTypeEnum[ReportTaxTypeEnum["CASH"] = 'CASH'] = "CASH";
        ReportTaxTypeEnum[ReportTaxTypeEnum["ACCRUAL"] = 'ACCRUAL'] = "ACCRUAL";
        ReportTaxTypeEnum[ReportTaxTypeEnum["FLATRATECASH"] = 'FLATRATECASH'] = "FLATRATECASH";
        ReportTaxTypeEnum[ReportTaxTypeEnum["FLATRATEACCRUAL"] = 'FLATRATEACCRUAL'] = "FLATRATEACCRUAL";
        ReportTaxTypeEnum[ReportTaxTypeEnum["ACCRUALS"] = 'ACCRUALS'] = "ACCRUALS";
    })(ReportTaxTypeEnum = TaxRate.ReportTaxTypeEnum || (TaxRate.ReportTaxTypeEnum = {}));
})(TaxRate = exports.TaxRate || (exports.TaxRate = {}));
//# sourceMappingURL=taxRate.js.map