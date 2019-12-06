"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Organisation {
    static getAttributeTypeMap() {
        return Organisation.attributeTypeMap;
    }
}
exports.Organisation = Organisation;
Organisation.discriminator = undefined;
Organisation.attributeTypeMap = [
    {
        "name": "organisationID",
        "baseName": "OrganisationID",
        "type": "string"
    },
    {
        "name": "aPIKey",
        "baseName": "APIKey",
        "type": "string"
    },
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "legalName",
        "baseName": "LegalName",
        "type": "string"
    },
    {
        "name": "paysTax",
        "baseName": "PaysTax",
        "type": "boolean"
    },
    {
        "name": "version",
        "baseName": "Version",
        "type": "Organisation.VersionEnum"
    },
    {
        "name": "organisationType",
        "baseName": "OrganisationType",
        "type": "Organisation.OrganisationTypeEnum"
    },
    {
        "name": "baseCurrency",
        "baseName": "BaseCurrency",
        "type": "CurrencyCode"
    },
    {
        "name": "countryCode",
        "baseName": "CountryCode",
        "type": "CountryCode"
    },
    {
        "name": "isDemoCompany",
        "baseName": "IsDemoCompany",
        "type": "boolean"
    },
    {
        "name": "organisationStatus",
        "baseName": "OrganisationStatus",
        "type": "string"
    },
    {
        "name": "registrationNumber",
        "baseName": "RegistrationNumber",
        "type": "string"
    },
    {
        "name": "taxNumber",
        "baseName": "TaxNumber",
        "type": "string"
    },
    {
        "name": "financialYearEndDay",
        "baseName": "FinancialYearEndDay",
        "type": "number"
    },
    {
        "name": "financialYearEndMonth",
        "baseName": "FinancialYearEndMonth",
        "type": "number"
    },
    {
        "name": "salesTaxBasis",
        "baseName": "SalesTaxBasis",
        "type": "Organisation.SalesTaxBasisEnum"
    },
    {
        "name": "salesTaxPeriod",
        "baseName": "SalesTaxPeriod",
        "type": "Organisation.SalesTaxPeriodEnum"
    },
    {
        "name": "defaultSalesTax",
        "baseName": "DefaultSalesTax",
        "type": "string"
    },
    {
        "name": "defaultPurchasesTax",
        "baseName": "DefaultPurchasesTax",
        "type": "string"
    },
    {
        "name": "periodLockDate",
        "baseName": "PeriodLockDate",
        "type": "string"
    },
    {
        "name": "endOfYearLockDate",
        "baseName": "EndOfYearLockDate",
        "type": "string"
    },
    {
        "name": "createdDateUTC",
        "baseName": "CreatedDateUTC",
        "type": "Date"
    },
    {
        "name": "timezone",
        "baseName": "Timezone",
        "type": "TimeZone"
    },
    {
        "name": "organisationEntityType",
        "baseName": "OrganisationEntityType",
        "type": "Organisation.OrganisationEntityTypeEnum"
    },
    {
        "name": "shortCode",
        "baseName": "ShortCode",
        "type": "string"
    },
    {
        "name": "_class",
        "baseName": "Class",
        "type": "Organisation.ClassEnum"
    },
    {
        "name": "edition",
        "baseName": "Edition",
        "type": "Organisation.EditionEnum"
    },
    {
        "name": "lineOfBusiness",
        "baseName": "LineOfBusiness",
        "type": "string"
    },
    {
        "name": "addresses",
        "baseName": "Addresses",
        "type": "Array<Address>"
    },
    {
        "name": "phones",
        "baseName": "Phones",
        "type": "Array<Phone>"
    },
    {
        "name": "externalLinks",
        "baseName": "ExternalLinks",
        "type": "Array<ExternalLink>"
    },
    {
        "name": "paymentTerms",
        "baseName": "PaymentTerms",
        "type": "PaymentTerm"
    }
];
(function (Organisation) {
    let VersionEnum;
    (function (VersionEnum) {
        VersionEnum[VersionEnum["AU"] = 'AU'] = "AU";
        VersionEnum[VersionEnum["NZ"] = 'NZ'] = "NZ";
        VersionEnum[VersionEnum["GLOBAL"] = 'GLOBAL'] = "GLOBAL";
        VersionEnum[VersionEnum["UK"] = 'UK'] = "UK";
        VersionEnum[VersionEnum["US"] = 'US'] = "US";
        VersionEnum[VersionEnum["AUONRAMP"] = 'AUONRAMP'] = "AUONRAMP";
        VersionEnum[VersionEnum["NZONRAMP"] = 'NZONRAMP'] = "NZONRAMP";
        VersionEnum[VersionEnum["GLOBALONRAMP"] = 'GLOBALONRAMP'] = "GLOBALONRAMP";
        VersionEnum[VersionEnum["UKONRAMP"] = 'UKONRAMP'] = "UKONRAMP";
        VersionEnum[VersionEnum["USONRAMP"] = 'USONRAMP'] = "USONRAMP";
    })(VersionEnum = Organisation.VersionEnum || (Organisation.VersionEnum = {}));
    let OrganisationTypeEnum;
    (function (OrganisationTypeEnum) {
        OrganisationTypeEnum[OrganisationTypeEnum["ACCOUNTINGPRACTICE"] = 'ACCOUNTING_PRACTICE'] = "ACCOUNTINGPRACTICE";
        OrganisationTypeEnum[OrganisationTypeEnum["COMPANY"] = 'COMPANY'] = "COMPANY";
        OrganisationTypeEnum[OrganisationTypeEnum["CHARITY"] = 'CHARITY'] = "CHARITY";
        OrganisationTypeEnum[OrganisationTypeEnum["CLUBORSOCIETY"] = 'CLUB_OR_SOCIETY'] = "CLUBORSOCIETY";
        OrganisationTypeEnum[OrganisationTypeEnum["LOOKTHROUGHCOMPANY"] = 'LOOK_THROUGH_COMPANY'] = "LOOKTHROUGHCOMPANY";
        OrganisationTypeEnum[OrganisationTypeEnum["NOTFORPROFIT"] = 'NOT_FOR_PROFIT'] = "NOTFORPROFIT";
        OrganisationTypeEnum[OrganisationTypeEnum["PARTNERSHIP"] = 'PARTNERSHIP'] = "PARTNERSHIP";
        OrganisationTypeEnum[OrganisationTypeEnum["SCORPORATION"] = 'S_CORPORATION'] = "SCORPORATION";
        OrganisationTypeEnum[OrganisationTypeEnum["SELFMANAGEDSUPERANNUATIONFUND"] = 'SELF_MANAGED_SUPERANNUATION_FUND'] = "SELFMANAGEDSUPERANNUATIONFUND";
        OrganisationTypeEnum[OrganisationTypeEnum["SOLETRADER"] = 'SOLE_TRADER'] = "SOLETRADER";
        OrganisationTypeEnum[OrganisationTypeEnum["SUPERANNUATIONFUND"] = 'SUPERANNUATION_FUND'] = "SUPERANNUATIONFUND";
        OrganisationTypeEnum[OrganisationTypeEnum["TRUST"] = 'TRUST'] = "TRUST";
    })(OrganisationTypeEnum = Organisation.OrganisationTypeEnum || (Organisation.OrganisationTypeEnum = {}));
    let SalesTaxBasisEnum;
    (function (SalesTaxBasisEnum) {
        SalesTaxBasisEnum[SalesTaxBasisEnum["PAYMENTS"] = 'PAYMENTS'] = "PAYMENTS";
        SalesTaxBasisEnum[SalesTaxBasisEnum["INVOICE"] = 'INVOICE'] = "INVOICE";
        SalesTaxBasisEnum[SalesTaxBasisEnum["NONE"] = 'NONE'] = "NONE";
        SalesTaxBasisEnum[SalesTaxBasisEnum["CASH"] = 'CASH'] = "CASH";
        SalesTaxBasisEnum[SalesTaxBasisEnum["ACCRUAL"] = 'ACCRUAL'] = "ACCRUAL";
        SalesTaxBasisEnum[SalesTaxBasisEnum["FLATRATECASH"] = 'FLATRATECASH'] = "FLATRATECASH";
        SalesTaxBasisEnum[SalesTaxBasisEnum["FLATRATEACCRUAL"] = 'FLATRATEACCRUAL'] = "FLATRATEACCRUAL";
        SalesTaxBasisEnum[SalesTaxBasisEnum["ACCRUALS"] = 'ACCRUALS'] = "ACCRUALS";
    })(SalesTaxBasisEnum = Organisation.SalesTaxBasisEnum || (Organisation.SalesTaxBasisEnum = {}));
    let SalesTaxPeriodEnum;
    (function (SalesTaxPeriodEnum) {
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["MONTHLY"] = 'MONTHLY'] = "MONTHLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["QUARTERLY1"] = 'QUARTERLY1'] = "QUARTERLY1";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["QUARTERLY2"] = 'QUARTERLY2'] = "QUARTERLY2";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["QUARTERLY3"] = 'QUARTERLY3'] = "QUARTERLY3";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["ANNUALLY"] = 'ANNUALLY'] = "ANNUALLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["ONEMONTHS"] = 'ONEMONTHS'] = "ONEMONTHS";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["TWOMONTHS"] = 'TWOMONTHS'] = "TWOMONTHS";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["SIXMONTHS"] = 'SIXMONTHS'] = "SIXMONTHS";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["_1MONTHLY"] = '1MONTHLY'] = "_1MONTHLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["_2MONTHLY"] = '2MONTHLY'] = "_2MONTHLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["_3MONTHLY"] = '3MONTHLY'] = "_3MONTHLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["_6MONTHLY"] = '6MONTHLY'] = "_6MONTHLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["QUARTERLY"] = 'QUARTERLY'] = "QUARTERLY";
        SalesTaxPeriodEnum[SalesTaxPeriodEnum["YEARLY"] = 'YEARLY'] = "YEARLY";
    })(SalesTaxPeriodEnum = Organisation.SalesTaxPeriodEnum || (Organisation.SalesTaxPeriodEnum = {}));
    let OrganisationEntityTypeEnum;
    (function (OrganisationEntityTypeEnum) {
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["ACCOUNTINGPRACTICE"] = 'ACCOUNTING_PRACTICE'] = "ACCOUNTINGPRACTICE";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["COMPANY"] = 'COMPANY'] = "COMPANY";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["CHARITY"] = 'CHARITY'] = "CHARITY";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["CLUBORSOCIETY"] = 'CLUB_OR_SOCIETY'] = "CLUBORSOCIETY";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["LOOKTHROUGHCOMPANY"] = 'LOOK_THROUGH_COMPANY'] = "LOOKTHROUGHCOMPANY";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["NOTFORPROFIT"] = 'NOT_FOR_PROFIT'] = "NOTFORPROFIT";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["PARTNERSHIP"] = 'PARTNERSHIP'] = "PARTNERSHIP";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["SCORPORATION"] = 'S_CORPORATION'] = "SCORPORATION";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["SELFMANAGEDSUPERANNUATIONFUND"] = 'SELF_MANAGED_SUPERANNUATION_FUND'] = "SELFMANAGEDSUPERANNUATIONFUND";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["SOLETRADER"] = 'SOLE_TRADER'] = "SOLETRADER";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["SUPERANNUATIONFUND"] = 'SUPERANNUATION_FUND'] = "SUPERANNUATIONFUND";
        OrganisationEntityTypeEnum[OrganisationEntityTypeEnum["TRUST"] = 'TRUST'] = "TRUST";
    })(OrganisationEntityTypeEnum = Organisation.OrganisationEntityTypeEnum || (Organisation.OrganisationEntityTypeEnum = {}));
    let ClassEnum;
    (function (ClassEnum) {
        ClassEnum[ClassEnum["DEMO"] = 'DEMO'] = "DEMO";
        ClassEnum[ClassEnum["TRIAL"] = 'TRIAL'] = "TRIAL";
        ClassEnum[ClassEnum["STARTER"] = 'STARTER'] = "STARTER";
        ClassEnum[ClassEnum["STANDARD"] = 'STANDARD'] = "STANDARD";
        ClassEnum[ClassEnum["PREMIUM"] = 'PREMIUM'] = "PREMIUM";
        ClassEnum[ClassEnum["PREMIUM20"] = 'PREMIUM_20'] = "PREMIUM20";
        ClassEnum[ClassEnum["PREMIUM50"] = 'PREMIUM_50'] = "PREMIUM50";
        ClassEnum[ClassEnum["PREMIUM100"] = 'PREMIUM_100'] = "PREMIUM100";
        ClassEnum[ClassEnum["LEDGER"] = 'LEDGER'] = "LEDGER";
        ClassEnum[ClassEnum["GSTCASHBOOK"] = 'GST_CASHBOOK'] = "GSTCASHBOOK";
        ClassEnum[ClassEnum["NONGSTCASHBOOK"] = 'NON_GST_CASHBOOK'] = "NONGSTCASHBOOK";
    })(ClassEnum = Organisation.ClassEnum || (Organisation.ClassEnum = {}));
    let EditionEnum;
    (function (EditionEnum) {
        EditionEnum[EditionEnum["BUSINESS"] = 'BUSINESS'] = "BUSINESS";
        EditionEnum[EditionEnum["PARTNER"] = 'PARTNER'] = "PARTNER";
    })(EditionEnum = Organisation.EditionEnum || (Organisation.EditionEnum = {}));
})(Organisation = exports.Organisation || (exports.Organisation = {}));
//# sourceMappingURL=organisation.js.map