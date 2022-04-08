import { AccountType } from '././accountType';
import { CurrencyCode } from '././currencyCode';
import { ValidationError } from '././validationError';

export class Account {
    /**
    * Customer defined alpha numeric account code e.g 200 or SALES (max length = 10)
    */
    'code'?: string;
    /**
    * Name of account (max length = 150)
    */
    'name'?: string;
    /**
    * The Xero identifier for an account – specified as a string following  the endpoint name   e.g. /297c2dc5-cc47-4afd-8ec8-74990b8761e9
    */
    'accountID'?: string;
    'type'?: AccountType;
    /**
    * For bank accounts only (Account Type BANK)
    */
    'bankAccountNumber'?: string;
    /**
    * Accounts with a status of ACTIVE can be updated to ARCHIVED. See Account Status Codes
    */
    'status'?: Account.StatusEnum;
    /**
    * Description of the Account. Valid for all types of accounts except bank accounts (max length = 4000)
    */
    'description'?: string;
    /**
    * For bank accounts only. See Bank Account types
    */
    'bankAccountType'?: Account.BankAccountTypeEnum;
    'currencyCode'?: CurrencyCode;
    /**
    * The tax type from TaxRates
    */
    'taxType'?: string;
    /**
    * Boolean – describes whether account can have payments applied to it
    */
    'enablePaymentsToAccount'?: boolean;
    /**
    * Boolean – describes whether account code is available for use with expense claims
    */
    'showInExpenseClaims'?: boolean;
    /**
    * See Account Class Types
    */
    '_class'?: Account.ClassEnum;
    /**
    * If this is a system account then this element is returned. See System Account types. Note that non-system accounts may have this element set as either “” or null.
    */
    'systemAccount'?: Account.SystemAccountEnum;
    /**
    * Shown if set
    */
    'reportingCode'?: string;
    /**
    * Shown if set
    */
    'reportingCodeName'?: string;
    /**
    * boolean to indicate if an account has an attachment (read only)
    */
    'hasAttachments'?: boolean;
    /**
    * Last modified date UTC format
    */
    'updatedDateUTC'?: Date;
    /**
    * Boolean – describes whether the account is shown in the watchlist widget on the dashboard
    */
    'addToWatchlist'?: boolean;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "Code",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        }        {
            "name": "accountID",
            "baseName": "AccountID",
            "type": "string"
        }        {
            "name": "type",
            "baseName": "Type",
            "type": "AccountType"
        }        {
            "name": "bankAccountNumber",
            "baseName": "BankAccountNumber",
            "type": "string"
        }        {
            "name": "status",
            "baseName": "Status",
            "type": "Account.StatusEnum"
        }        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        }        {
            "name": "bankAccountType",
            "baseName": "BankAccountType",
            "type": "Account.BankAccountTypeEnum"
        }        {
            "name": "currencyCode",
            "baseName": "CurrencyCode",
            "type": "CurrencyCode"
        }        {
            "name": "taxType",
            "baseName": "TaxType",
            "type": "string"
        }        {
            "name": "enablePaymentsToAccount",
            "baseName": "EnablePaymentsToAccount",
            "type": "boolean"
        }        {
            "name": "showInExpenseClaims",
            "baseName": "ShowInExpenseClaims",
            "type": "boolean"
        }        {
            "name": "_class",
            "baseName": "Class",
            "type": "Account.ClassEnum"
        }        {
            "name": "systemAccount",
            "baseName": "SystemAccount",
            "type": "Account.SystemAccountEnum"
        }        {
            "name": "reportingCode",
            "baseName": "ReportingCode",
            "type": "string"
        }        {
            "name": "reportingCodeName",
            "baseName": "ReportingCodeName",
            "type": "string"
        }        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        }        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        }        {
            "name": "addToWatchlist",
            "baseName": "AddToWatchlist",
            "type": "boolean"
        }        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return Account.attributeTypeMap;
    }
}

export namespace Account {
    export enum StatusEnum {
        Active = <any> 'ACTIVE',
        Archived = <any> 'ARCHIVED',
        Deleted = <any> 'DELETED'
    }
    export enum BankAccountTypeEnum {
        Bank = <any> 'BANK',
        Creditcard = <any> 'CREDITCARD',
        Paypal = <any> 'PAYPAL',
        None = <any> 'NONE',
        Empty = <any> ''
    }
    export enum ClassEnum {
        Asset = <any> 'ASSET',
        Equity = <any> 'EQUITY',
        Expense = <any> 'EXPENSE',
        Liability = <any> 'LIABILITY',
        Revenue = <any> 'REVENUE'
    }
    export enum SystemAccountEnum {
        Debtors = <any> 'DEBTORS',
        Creditors = <any> 'CREDITORS',
        Bankcurrencygain = <any> 'BANKCURRENCYGAIN',
        Gst = <any> 'GST',
        Gstonimports = <any> 'GSTONIMPORTS',
        Historical = <any> 'HISTORICAL',
        Realisedcurrencygain = <any> 'REALISEDCURRENCYGAIN',
        Retainedearnings = <any> 'RETAINEDEARNINGS',
        Rounding = <any> 'ROUNDING',
        Trackingtransfers = <any> 'TRACKINGTRANSFERS',
        Unpaidexpclm = <any> 'UNPAIDEXPCLM',
        Unrealisedcurrencygain = <any> 'UNREALISEDCURRENCYGAIN',
        Wagepayables = <any> 'WAGEPAYABLES',
        Cisassets = <any> 'CISASSETS',
        Cisasset = <any> 'CISASSET',
        Cislabour = <any> 'CISLABOUR',
        Cislabourexpense = <any> 'CISLABOUREXPENSE',
        Cislabourincome = <any> 'CISLABOURINCOME',
        Cisliability = <any> 'CISLIABILITY',
        Cismaterials = <any> 'CISMATERIALS',
        Empty = <any> ''
    }
}
