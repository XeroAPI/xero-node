import { AddressForOrganisation } from '././addressForOrganisation';
import { CountryCode } from '././countryCode';
import { CurrencyCode } from '././currencyCode';
import { ExternalLink } from '././externalLink';
import { PaymentTerm } from '././paymentTerm';
import { Phone } from '././phone';
import { TimeZone } from '././timeZone';

export class Organisation {
    /**
    * Unique Xero identifier
    */
    'organisationID'?: string;
    /**
    * Display a unique key used for Xero-to-Xero transactions
    */
    'aPIKey'?: string;
    /**
    * Display name of organisation shown in Xero
    */
    'name'?: string;
    /**
    * Organisation name shown on Reports
    */
    'legalName'?: string;
    /**
    * Boolean to describe if organisation is registered with a local tax authority i.e. true, false
    */
    'paysTax'?: boolean;
    /**
    * See Version Types
    */
    'version'?: Organisation.VersionEnum;
    /**
    * Organisation Type
    */
    'organisationType'?: Organisation.OrganisationTypeEnum;
    'baseCurrency'?: CurrencyCode;
    'countryCode'?: CountryCode;
    /**
    * Boolean to describe if organisation is a demo company.
    */
    'isDemoCompany'?: boolean;
    /**
    * Will be set to ACTIVE if you can connect to organisation via the Xero API
    */
    'organisationStatus'?: string;
    /**
    * Shows for New Zealand, Australian and UK organisations
    */
    'registrationNumber'?: string;
    /**
    * Shown if set. US Only.
    */
    'employerIdentificationNumber'?: string;
    /**
    * Shown if set. Displays in the Xero UI as Tax File Number (AU), GST Number (NZ), VAT Number (UK) and Tax ID Number (US & Global).
    */
    'taxNumber'?: string;
    /**
    * Calendar day e.g. 0-31
    */
    'financialYearEndDay'?: number;
    /**
    * Calendar Month e.g. 1-12
    */
    'financialYearEndMonth'?: number;
    /**
    * The accounting basis used for tax returns. See Sales Tax Basis
    */
    'salesTaxBasis'?: Organisation.SalesTaxBasisEnum;
    /**
    * The frequency with which tax returns are processed. See Sales Tax Period
    */
    'salesTaxPeriod'?: Organisation.SalesTaxPeriodEnum;
    /**
    * The default for LineAmountTypes on sales transactions
    */
    'defaultSalesTax'?: string;
    /**
    * The default for LineAmountTypes on purchase transactions
    */
    'defaultPurchasesTax'?: string;
    /**
    * Shown if set. See lock dates
    */
    'periodLockDate'?: string;
    /**
    * Shown if set. See lock dates
    */
    'endOfYearLockDate'?: string;
    /**
    * Timestamp when the organisation was created in Xero
    */
    'createdDateUTC'?: Date;
    'timezone'?: TimeZone;
    /**
    * Organisation Entity Type
    */
    'organisationEntityType'?: Organisation.OrganisationEntityTypeEnum;
    /**
    * A unique identifier for the organisation. Potential uses.
    */
    'shortCode'?: string;
    /**
    * Organisation Classes describe which plan the Xero organisation is on (e.g. DEMO, TRIAL, PREMIUM)
    */
    '_class'?: Organisation.ClassEnum;
    /**
    * BUSINESS or PARTNER. Partner edition organisations are sold exclusively through accounting partners and have restricted functionality (e.g. no access to invoicing)
    */
    'edition'?: Organisation.EditionEnum;
    /**
    * Description of business type as defined in Organisation settings
    */
    'lineOfBusiness'?: string;
    /**
    * Address details for organisation – see Addresses
    */
    'addresses'?: Array<AddressForOrganisation>;
    /**
    * Phones details for organisation – see Phones
    */
    'phones'?: Array<Phone>;
    /**
    * Organisation profile links for popular services such as Facebook,Twitter, GooglePlus and LinkedIn. You can also add link to your website here. Shown if Organisation settings  is updated in Xero. See ExternalLinks below
    */
    'externalLinks'?: Array<ExternalLink>;
    'paymentTerms'?: PaymentTerm;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
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
            "name": "employerIdentificationNumber",
            "baseName": "EmployerIdentificationNumber",
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
            "type": "Array<AddressForOrganisation>"
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
        }    ];

    static getAttributeTypeMap() {
        return Organisation.attributeTypeMap;
    }
}

export namespace Organisation {
    export enum VersionEnum {
        AU = <any> 'AU',
        NZ = <any> 'NZ',
        GLOBAL = <any> 'GLOBAL',
        UK = <any> 'UK',
        US = <any> 'US',
        AUONRAMP = <any> 'AUONRAMP',
        NZONRAMP = <any> 'NZONRAMP',
        GLOBALONRAMP = <any> 'GLOBALONRAMP',
        UKONRAMP = <any> 'UKONRAMP',
        USONRAMP = <any> 'USONRAMP'
    }
    export enum OrganisationTypeEnum {
        ACCOUNTINGPRACTICE = <any> 'ACCOUNTING_PRACTICE',
        COMPANY = <any> 'COMPANY',
        CHARITY = <any> 'CHARITY',
        CLUBORSOCIETY = <any> 'CLUB_OR_SOCIETY',
        INDIVIDUAL = <any> 'INDIVIDUAL',
        LOOKTHROUGHCOMPANY = <any> 'LOOK_THROUGH_COMPANY',
        NOTFORPROFIT = <any> 'NOT_FOR_PROFIT',
        PARTNERSHIP = <any> 'PARTNERSHIP',
        SCORPORATION = <any> 'S_CORPORATION',
        SELFMANAGEDSUPERANNUATIONFUND = <any> 'SELF_MANAGED_SUPERANNUATION_FUND',
        SOLETRADER = <any> 'SOLE_TRADER',
        SUPERANNUATIONFUND = <any> 'SUPERANNUATION_FUND',
        TRUST = <any> 'TRUST'
    }
    export enum SalesTaxBasisEnum {
        PAYMENTS = <any> 'PAYMENTS',
        INVOICE = <any> 'INVOICE',
        NONE = <any> 'NONE',
        CASH = <any> 'CASH',
        ACCRUAL = <any> 'ACCRUAL',
        FLATRATECASH = <any> 'FLATRATECASH',
        FLATRATEACCRUAL = <any> 'FLATRATEACCRUAL',
        ACCRUALS = <any> 'ACCRUALS'
    }
    export enum SalesTaxPeriodEnum {
        MONTHLY = <any> 'MONTHLY',
        QUARTERLY1 = <any> 'QUARTERLY1',
        QUARTERLY2 = <any> 'QUARTERLY2',
        QUARTERLY3 = <any> 'QUARTERLY3',
        ANNUALLY = <any> 'ANNUALLY',
        ONEMONTHS = <any> 'ONEMONTHS',
        TWOMONTHS = <any> 'TWOMONTHS',
        SIXMONTHS = <any> 'SIXMONTHS',
        _1MONTHLY = <any> '1MONTHLY',
        _2MONTHLY = <any> '2MONTHLY',
        _3MONTHLY = <any> '3MONTHLY',
        _6MONTHLY = <any> '6MONTHLY',
        QUARTERLY = <any> 'QUARTERLY',
        YEARLY = <any> 'YEARLY',
        NONE = <any> 'NONE'
    }
    export enum OrganisationEntityTypeEnum {
        ACCOUNTINGPRACTICE = <any> 'ACCOUNTING_PRACTICE',
        COMPANY = <any> 'COMPANY',
        CHARITY = <any> 'CHARITY',
        CLUBORSOCIETY = <any> 'CLUB_OR_SOCIETY',
        INDIVIDUAL = <any> 'INDIVIDUAL',
        LOOKTHROUGHCOMPANY = <any> 'LOOK_THROUGH_COMPANY',
        NOTFORPROFIT = <any> 'NOT_FOR_PROFIT',
        PARTNERSHIP = <any> 'PARTNERSHIP',
        SCORPORATION = <any> 'S_CORPORATION',
        SELFMANAGEDSUPERANNUATIONFUND = <any> 'SELF_MANAGED_SUPERANNUATION_FUND',
        SOLETRADER = <any> 'SOLE_TRADER',
        SUPERANNUATIONFUND = <any> 'SUPERANNUATION_FUND',
        TRUST = <any> 'TRUST'
    }
    export enum ClassEnum {
        DEMO = <any> 'DEMO',
        TRIAL = <any> 'TRIAL',
        STARTER = <any> 'STARTER',
        STANDARD = <any> 'STANDARD',
        PREMIUM = <any> 'PREMIUM',
        PREMIUM20 = <any> 'PREMIUM_20',
        PREMIUM50 = <any> 'PREMIUM_50',
        PREMIUM100 = <any> 'PREMIUM_100',
        LEDGER = <any> 'LEDGER',
        GSTCASHBOOK = <any> 'GST_CASHBOOK',
        NONGSTCASHBOOK = <any> 'NON_GST_CASHBOOK',
        ULTIMATE = <any> 'ULTIMATE',
        LITE = <any> 'LITE',
        IGNITE = <any> 'IGNITE',
        GROW = <any> 'GROW',
        COMPREHENSIVE = <any> 'COMPREHENSIVE'
    }
    export enum EditionEnum {
        BUSINESS = <any> 'BUSINESS',
        PARTNER = <any> 'PARTNER'
    }
}
