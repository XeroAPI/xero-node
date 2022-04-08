import { TrialBalanceEntry } from '././trialBalanceEntry';
import { TrialBalanceMovement } from '././trialBalanceMovement';

export class TrialBalanceAccount {
    /**
    * ID of the account
    */
    'accountId'?: string;
    /**
    * The type of the account. See <a href=\'https://developer.xero.com/documentation/api/types#AccountTypes\'>Account Types</a>
    */
    'accountType'?: string;
    /**
    * Customer defined alpha numeric account code e.g 200 or SALES
    */
    'accountCode'?: string;
    /**
    * The class of the account. See <a href=\'https://developer.xero.com/documentation/api/types#AccountClassTypes\'>Account Class Types</a>
    */
    'accountClass'?: string;
    /**
    * Accounts with a status of ACTIVE can be updated to ARCHIVED. See <a href=\'https://developer.xero.com/documentation/api/types#AccountStatusCodes\'>Account Status Codes</a>
    */
    'status'?: string;
    /**
    * Reporting code (Shown if set)
    */
    'reportingCode'?: string;
    /**
    * Name of the account
    */
    'accountName'?: string;
    'balance'?: TrialBalanceEntry;
    /**
    * Value of balance. Expense and Asset accounts code debits as positive. Revenue, Liability, and Equity accounts code debits as negative
    */
    'signedBalance'?: number;
    'accountMovement'?: TrialBalanceMovement;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        }        {
            "name": "accountType",
            "baseName": "accountType",
            "type": "string"
        }        {
            "name": "accountCode",
            "baseName": "accountCode",
            "type": "string"
        }        {
            "name": "accountClass",
            "baseName": "accountClass",
            "type": "string"
        }        {
            "name": "status",
            "baseName": "status",
            "type": "string"
        }        {
            "name": "reportingCode",
            "baseName": "reportingCode",
            "type": "string"
        }        {
            "name": "accountName",
            "baseName": "accountName",
            "type": "string"
        }        {
            "name": "balance",
            "baseName": "balance",
            "type": "TrialBalanceEntry"
        }        {
            "name": "signedBalance",
            "baseName": "signedBalance",
            "type": "number"
        }        {
            "name": "accountMovement",
            "baseName": "accountMovement",
            "type": "TrialBalanceMovement"
        }    ];

    static getAttributeTypeMap() {
        return TrialBalanceAccount.attributeTypeMap;
    }
}

