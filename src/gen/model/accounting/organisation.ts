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
        }        {
            "name": "aPIKey",
            "baseName": "APIKey",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "legalName",
            "baseName": "LegalName",
            "type": "string"
        }        {
            "name": "paysTax",
            "baseName": "PaysTax",
            "type": "boolean"
        }        {
            "name": "version",
            "baseName": "Version",
            "type": "Organisation.VersionEnum"
        }        {
            "name": "organisationType",
            "baseName": "OrganisationType",
            "type": "Organisation.OrganisationTypeEnum"
        }        {
            "name": "baseCurrency",
            "baseName": "BaseCurrency",
            "type": "CurrencyCode"
        }        {
            "name": "countryCode",
            "baseName": "CountryCode",
            "type": "CountryCode"
        }        {
            "name": "isDemoCompany",
            "baseName": "IsDemoCompany",
            "type": "boolean"
        }        {
            "name": "organisationStatus",
            "baseName": "OrganisationStatus",
            "type": "string"
        }        {
            "name": "registrationNumber",
            "baseName": "RegistrationNumber",
            "type": "string"
        }        {
            "name": "employerIdentificationNumber",
            "baseName": "EmployerIdentificationNumber",
            "type": "string"
        }        {
            "name": "taxNumber",
            "baseName": "TaxNumber",
            "type": "string"
        }        {
            "name": "financialYearEndDay",
            "baseName": "FinancialYearEndDay",
            "type": "number"
        }        {
            "name": "financialYearEndMonth",
            "baseName": "FinancialYearEndMonth",
            "type": "number"
        }        {
            "name": "salesTaxBasis",
            "baseName": "SalesTaxBasis",
            "type": "Organisation.SalesTaxBasisEnum"
        }        {
            "name": "salesTaxPeriod",
            "baseName": "SalesTaxPeriod",
            "type": "Organisation.SalesTaxPeriodEnum"
        }        {
            "name": "defaultSalesTax",
            "baseName": "DefaultSalesTax",
            "type": "string"
        }        {
            "name": "defaultPurchasesTax",
            "baseName": "DefaultPurchasesTax",
            "type": "string"
        }        {
            "name": "periodLockDate",
            "baseName": "PeriodLockDate",
            "type": "string"
        }        {
            "name": "endOfYearLockDate",
            "baseName": "EndOfYearLockDate",
            "type": "string"
        }        {
            "name": "createdDateUTC",
            "baseName": "CreatedDateUTC",
            "type": "Date"
        }        {
            "name": "timezone",
            "baseName": "Timezone",
            "type": "TimeZone"
        }        {
            "name": "organisationEntityType",
            "baseName": "OrganisationEntityType",
            "type": "Organisation.OrganisationEntityTypeEnum"
        }        {
            "name": "shortCode",
            "baseName": "ShortCode",
            "type": "string"
        }        {
            "name": "_class",
            "baseName": "Class",
            "type": "Organisation.ClassEnum"
        }        {
            "name": "edition",
            "baseName": "Edition",
            "type": "Organisation.EditionEnum"
        }        {
            "name": "lineOfBusiness",
            "baseName": "LineOfBusiness",
            "type": "string"
        }        {
            "name": "addresses",
            "baseName": "Addresses",
            "type": "Array<AddressForOrganisation>"
        }        {
            "name": "phones",
            "baseName": "Phones",
            "type": "Array<Phone>"
        }        {
            "name": "externalLinks",
            "baseName": "ExternalLinks",
            "type": "Array<ExternalLink>"
        }        {
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
        Au = <any> 'AU',
        Nz = <any> 'NZ',
        Global = <any> 'GLOBAL',
        Uk = <any> 'UK',
        Us = <any> 'US',
        Auonramp = <any> 'AUONRAMP',
        Nzonramp = <any> 'NZONRAMP',
        Globalonramp = <any> 'GLOBALONRAMP',
        Ukonramp = <any> 'UKONRAMP',
        Usonramp = <any> 'USONRAMP'
    }
    export enum OrganisationTypeEnum {
        AccountingPractice = <any> 'ACCOUNTING_PRACTICE',
        Company = <any> 'COMPANY',
        Charity = <any> 'CHARITY',
        ClubOrSociety = <any> 'CLUB_OR_SOCIETY',
        Individual = <any> 'INDIVIDUAL',
        LookThroughCompany = <any> 'LOOK_THROUGH_COMPANY',
        NotForProfit = <any> 'NOT_FOR_PROFIT',
        Partnership = <any> 'PARTNERSHIP',
        SCorporation = <any> 'S_CORPORATION',
        SelfManagedSuperannuationFund = <any> 'SELF_MANAGED_SUPERANNUATION_FUND',
        SoleTrader = <any> 'SOLE_TRADER',
        SuperannuationFund = <any> 'SUPERANNUATION_FUND',
        Trust = <any> 'TRUST'
    }
    export enum SalesTaxBasisEnum {
        Payments = <any> 'PAYMENTS',
        Invoice = <any> 'INVOICE',
        None = <any> 'NONE',
        Cash = <any> 'CASH',
        Accrual = <any> 'ACCRUAL',
        Flatratecash = <any> 'FLATRATECASH',
        Flatrateaccrual = <any> 'FLATRATEACCRUAL',
        Accruals = <any> 'ACCRUALS'
    }
    export enum SalesTaxPeriodEnum {
        Monthly = <any> 'MONTHLY',
        Quarterly1 = <any> 'QUARTERLY1',
        Quarterly2 = <any> 'QUARTERLY2',
        Quarterly3 = <any> 'QUARTERLY3',
        Annually = <any> 'ANNUALLY',
        Onemonths = <any> 'ONEMONTHS',
        Twomonths = <any> 'TWOMONTHS',
        Sixmonths = <any> 'SIXMONTHS',
        _1Monthly = <any> '1MONTHLY',
        _2Monthly = <any> '2MONTHLY',
        _3Monthly = <any> '3MONTHLY',
        _6Monthly = <any> '6MONTHLY',
        Quarterly = <any> 'QUARTERLY',
        Yearly = <any> 'YEARLY',
        None = <any> 'NONE'
    }
    export enum OrganisationEntityTypeEnum {
        AccountingPractice = <any> 'ACCOUNTING_PRACTICE',
        Company = <any> 'COMPANY',
        Charity = <any> 'CHARITY',
        ClubOrSociety = <any> 'CLUB_OR_SOCIETY',
        Individual = <any> 'INDIVIDUAL',
        LookThroughCompany = <any> 'LOOK_THROUGH_COMPANY',
        NotForProfit = <any> 'NOT_FOR_PROFIT',
        Partnership = <any> 'PARTNERSHIP',
        SCorporation = <any> 'S_CORPORATION',
        SelfManagedSuperannuationFund = <any> 'SELF_MANAGED_SUPERANNUATION_FUND',
        SoleTrader = <any> 'SOLE_TRADER',
        SuperannuationFund = <any> 'SUPERANNUATION_FUND',
        Trust = <any> 'TRUST'
    }
    export enum ClassEnum {
        Demo = <any> 'DEMO',
        Trial = <any> 'TRIAL',
        Starter = <any> 'STARTER',
        Standard = <any> 'STANDARD',
        Premium = <any> 'PREMIUM',
        Premium20 = <any> 'PREMIUM_20',
        Premium50 = <any> 'PREMIUM_50',
        Premium100 = <any> 'PREMIUM_100',
        Ledger = <any> 'LEDGER',
        GstCashbook = <any> 'GST_CASHBOOK',
        NonGstCashbook = <any> 'NON_GST_CASHBOOK'
    }
    export enum EditionEnum {
        Business = <any> 'BUSINESS',
        Partner = <any> 'PARTNER'
    }
}
