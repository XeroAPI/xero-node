import { Address } from './address';
import { CountryCode } from './countryCode';
import { CurrencyCode } from './currencyCode';
import { ExternalLink } from './externalLink';
import { PaymentTerm } from './paymentTerm';
import { Phone } from './phone';
import { TimeZone } from './timeZone';
export declare class Organisation {
    'organisationID'?: string;
    'aPIKey'?: string;
    'name'?: string;
    'legalName'?: string;
    'paysTax'?: boolean;
    'version'?: Organisation.VersionEnum;
    'organisationType'?: Organisation.OrganisationTypeEnum;
    'baseCurrency'?: CurrencyCode;
    'countryCode'?: CountryCode;
    'isDemoCompany'?: boolean;
    'organisationStatus'?: string;
    'registrationNumber'?: string;
    'taxNumber'?: string;
    'financialYearEndDay'?: number;
    'financialYearEndMonth'?: number;
    'salesTaxBasis'?: Organisation.SalesTaxBasisEnum;
    'salesTaxPeriod'?: Organisation.SalesTaxPeriodEnum;
    'defaultSalesTax'?: string;
    'defaultPurchasesTax'?: string;
    'periodLockDate'?: string;
    'endOfYearLockDate'?: string;
    'createdDateUTC'?: Date;
    'timezone'?: TimeZone;
    'organisationEntityType'?: Organisation.OrganisationEntityTypeEnum;
    'shortCode'?: string;
    '_class'?: Organisation.ClassEnum;
    'edition'?: Organisation.EditionEnum;
    'lineOfBusiness'?: string;
    'addresses'?: Array<Address>;
    'phones'?: Array<Phone>;
    'externalLinks'?: Array<ExternalLink>;
    'paymentTerms'?: PaymentTerm;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare namespace Organisation {
    enum VersionEnum {
        AU,
        NZ,
        GLOBAL,
        UK,
        US,
        AUONRAMP,
        NZONRAMP,
        GLOBALONRAMP,
        UKONRAMP,
        USONRAMP
    }
    enum OrganisationTypeEnum {
        ACCOUNTINGPRACTICE,
        COMPANY,
        CHARITY,
        CLUBORSOCIETY,
        LOOKTHROUGHCOMPANY,
        NOTFORPROFIT,
        PARTNERSHIP,
        SCORPORATION,
        SELFMANAGEDSUPERANNUATIONFUND,
        SOLETRADER,
        SUPERANNUATIONFUND,
        TRUST
    }
    enum SalesTaxBasisEnum {
        PAYMENTS,
        INVOICE,
        NONE,
        CASH,
        ACCRUAL,
        FLATRATECASH,
        FLATRATEACCRUAL,
        ACCRUALS
    }
    enum SalesTaxPeriodEnum {
        MONTHLY,
        QUARTERLY1,
        QUARTERLY2,
        QUARTERLY3,
        ANNUALLY,
        ONEMONTHS,
        TWOMONTHS,
        SIXMONTHS,
        _1MONTHLY,
        _2MONTHLY,
        _3MONTHLY,
        _6MONTHLY,
        QUARTERLY,
        YEARLY
    }
    enum OrganisationEntityTypeEnum {
        ACCOUNTINGPRACTICE,
        COMPANY,
        CHARITY,
        CLUBORSOCIETY,
        LOOKTHROUGHCOMPANY,
        NOTFORPROFIT,
        PARTNERSHIP,
        SCORPORATION,
        SELFMANAGEDSUPERANNUATIONFUND,
        SOLETRADER,
        SUPERANNUATIONFUND,
        TRUST
    }
    enum ClassEnum {
        DEMO,
        TRIAL,
        STARTER,
        STANDARD,
        PREMIUM,
        PREMIUM20,
        PREMIUM50,
        PREMIUM100,
        LEDGER,
        GSTCASHBOOK,
        NONGSTCASHBOOK
    }
    enum EditionEnum {
        BUSINESS,
        PARTNER
    }
}
