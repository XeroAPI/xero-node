import { AccountType } from './accountType';
import { CurrencyCode } from './currencyCode';
import { ValidationError } from './validationError';
export declare class Account {
    'code'?: string;
    'name'?: string;
    'accountID'?: string;
    'type'?: AccountType;
    'bankAccountNumber'?: string;
    'status'?: Account.StatusEnum;
    'description'?: string;
    'bankAccountType'?: Account.BankAccountTypeEnum;
    'currencyCode'?: CurrencyCode;
    'taxType'?: string;
    'enablePaymentsToAccount'?: boolean;
    'showInExpenseClaims'?: boolean;
    '_class'?: Account.ClassEnum;
    'systemAccount'?: Account.SystemAccountEnum;
    'reportingCode'?: string;
    'reportingCodeName'?: string;
    'hasAttachments'?: boolean;
    'updatedDateUTC'?: Date;
    'addToWatchlist'?: boolean;
    'validationErrors'?: Array<ValidationError>;
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
export declare namespace Account {
    enum StatusEnum {
        ACTIVE,
        ARCHIVED,
        DELETED
    }
    enum BankAccountTypeEnum {
        BANK,
        CREDITCARD,
        PAYPAL,
        NONE,
        Empty
    }
    enum ClassEnum {
        ASSET,
        EQUITY,
        EXPENSE,
        LIABILITY,
        REVENUE
    }
    enum SystemAccountEnum {
        DEBTORS,
        CREDITORS,
        BANKCURRENCYGAIN,
        GST,
        GSTONIMPORTS,
        HISTORICAL,
        REALISEDCURRENCYGAIN,
        RETAINEDEARNINGS,
        ROUNDING,
        TRACKINGTRANSFERS,
        UNPAIDEXPCLM,
        UNREALISEDCURRENCYGAIN,
        WAGEPAYABLES,
        Empty
    }
}
