"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Account {
    static getAttributeTypeMap() {
        return Account.attributeTypeMap;
    }
}
exports.Account = Account;
Account.discriminator = undefined;
Account.attributeTypeMap = [
    {
        "name": "code",
        "baseName": "Code",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "accountID",
        "baseName": "AccountID",
        "type": "string"
    },
    {
        "name": "type",
        "baseName": "Type",
        "type": "AccountType"
    },
    {
        "name": "bankAccountNumber",
        "baseName": "BankAccountNumber",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "Account.StatusEnum"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    },
    {
        "name": "bankAccountType",
        "baseName": "BankAccountType",
        "type": "Account.BankAccountTypeEnum"
    },
    {
        "name": "currencyCode",
        "baseName": "CurrencyCode",
        "type": "CurrencyCode"
    },
    {
        "name": "taxType",
        "baseName": "TaxType",
        "type": "string"
    },
    {
        "name": "enablePaymentsToAccount",
        "baseName": "EnablePaymentsToAccount",
        "type": "boolean"
    },
    {
        "name": "showInExpenseClaims",
        "baseName": "ShowInExpenseClaims",
        "type": "boolean"
    },
    {
        "name": "_class",
        "baseName": "Class",
        "type": "Account.ClassEnum"
    },
    {
        "name": "systemAccount",
        "baseName": "SystemAccount",
        "type": "Account.SystemAccountEnum"
    },
    {
        "name": "reportingCode",
        "baseName": "ReportingCode",
        "type": "string"
    },
    {
        "name": "reportingCodeName",
        "baseName": "ReportingCodeName",
        "type": "string"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "addToWatchlist",
        "baseName": "AddToWatchlist",
        "type": "boolean"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    }
];
(function (Account) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["ARCHIVED"] = 'ARCHIVED'] = "ARCHIVED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
    })(StatusEnum = Account.StatusEnum || (Account.StatusEnum = {}));
    let BankAccountTypeEnum;
    (function (BankAccountTypeEnum) {
        BankAccountTypeEnum[BankAccountTypeEnum["BANK"] = 'BANK'] = "BANK";
        BankAccountTypeEnum[BankAccountTypeEnum["CREDITCARD"] = 'CREDITCARD'] = "CREDITCARD";
        BankAccountTypeEnum[BankAccountTypeEnum["PAYPAL"] = 'PAYPAL'] = "PAYPAL";
        BankAccountTypeEnum[BankAccountTypeEnum["NONE"] = 'NONE'] = "NONE";
        BankAccountTypeEnum[BankAccountTypeEnum["Empty"] = ''] = "Empty";
    })(BankAccountTypeEnum = Account.BankAccountTypeEnum || (Account.BankAccountTypeEnum = {}));
    let ClassEnum;
    (function (ClassEnum) {
        ClassEnum[ClassEnum["ASSET"] = 'ASSET'] = "ASSET";
        ClassEnum[ClassEnum["EQUITY"] = 'EQUITY'] = "EQUITY";
        ClassEnum[ClassEnum["EXPENSE"] = 'EXPENSE'] = "EXPENSE";
        ClassEnum[ClassEnum["LIABILITY"] = 'LIABILITY'] = "LIABILITY";
        ClassEnum[ClassEnum["REVENUE"] = 'REVENUE'] = "REVENUE";
    })(ClassEnum = Account.ClassEnum || (Account.ClassEnum = {}));
    let SystemAccountEnum;
    (function (SystemAccountEnum) {
        SystemAccountEnum[SystemAccountEnum["DEBTORS"] = 'DEBTORS'] = "DEBTORS";
        SystemAccountEnum[SystemAccountEnum["CREDITORS"] = 'CREDITORS'] = "CREDITORS";
        SystemAccountEnum[SystemAccountEnum["BANKCURRENCYGAIN"] = 'BANKCURRENCYGAIN'] = "BANKCURRENCYGAIN";
        SystemAccountEnum[SystemAccountEnum["GST"] = 'GST'] = "GST";
        SystemAccountEnum[SystemAccountEnum["GSTONIMPORTS"] = 'GSTONIMPORTS'] = "GSTONIMPORTS";
        SystemAccountEnum[SystemAccountEnum["HISTORICAL"] = 'HISTORICAL'] = "HISTORICAL";
        SystemAccountEnum[SystemAccountEnum["REALISEDCURRENCYGAIN"] = 'REALISEDCURRENCYGAIN'] = "REALISEDCURRENCYGAIN";
        SystemAccountEnum[SystemAccountEnum["RETAINEDEARNINGS"] = 'RETAINEDEARNINGS'] = "RETAINEDEARNINGS";
        SystemAccountEnum[SystemAccountEnum["ROUNDING"] = 'ROUNDING'] = "ROUNDING";
        SystemAccountEnum[SystemAccountEnum["TRACKINGTRANSFERS"] = 'TRACKINGTRANSFERS'] = "TRACKINGTRANSFERS";
        SystemAccountEnum[SystemAccountEnum["UNPAIDEXPCLM"] = 'UNPAIDEXPCLM'] = "UNPAIDEXPCLM";
        SystemAccountEnum[SystemAccountEnum["UNREALISEDCURRENCYGAIN"] = 'UNREALISEDCURRENCYGAIN'] = "UNREALISEDCURRENCYGAIN";
        SystemAccountEnum[SystemAccountEnum["WAGEPAYABLES"] = 'WAGEPAYABLES'] = "WAGEPAYABLES";
        SystemAccountEnum[SystemAccountEnum["Empty"] = ''] = "Empty";
    })(SystemAccountEnum = Account.SystemAccountEnum || (Account.SystemAccountEnum = {}));
})(Account = exports.Account || (exports.Account = {}));
//# sourceMappingURL=account.js.map