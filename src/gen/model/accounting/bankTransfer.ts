import { Account } from '././account';
import { TrackingReference } from '././trackingReference';
import { ValidationError } from '././validationError';

export class BankTransfer {
    'fromBankAccount': Account;
    'toBankAccount': Account;
    /**
    * amount of the transaction
    */
    'amount': number;
    /**
    * The date of the Transfer YYYY-MM-DD
    */
    'date'?: string;
    /**
    * The identifier of the Bank Transfer
    */
    'bankTransferID'?: string;
    /**
    * The currency rate
    */
    'currencyRate'?: number;
    /**
    * The Bank Transaction ID for the source account
    */
    'fromBankTransactionID'?: string;
    /**
    * The Bank Transaction ID for the destination account
    */
    'toBankTransactionID'?: string;
    /**
    * The Bank Transaction boolean to show if it is reconciled for the source account
    */
    'fromIsReconciled'?: boolean;
    /**
    * The Bank Transaction boolean to show if it is reconciled for the destination account
    */
    'toIsReconciled'?: boolean;
    /**
    * Reference for the transactions.
    */
    'reference'?: string;
    /**
    * Boolean to indicate if a Bank Transfer has an attachment
    */
    'hasAttachments'?: boolean;
    /**
    * UTC timestamp of creation date of bank transfer
    */
    'createdDateUTC'?: Date;
    /**
    * AUTHORISED or DELETED (read-only). New bank transfers will have a status of AUTHORISED.
    */
    'status'?: BankTransfer.StatusEnum;
    /**
    * Optional Tracking Category for the source account – see Tracking. A bank transfer can have a maximum of 2 tracking categories per account.
    */
    'fromTracking'?: Array<TrackingReference>;
    /**
    * Optional Tracking Category for the destination account – see Tracking. A bank transfer can have a maximum of 2 tracking categories per account.
    */
    'toTracking'?: Array<TrackingReference>;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "fromBankAccount",
            "baseName": "FromBankAccount",
            "type": "Account"
        },
        {
            "name": "toBankAccount",
            "baseName": "ToBankAccount",
            "type": "Account"
        },
        {
            "name": "amount",
            "baseName": "Amount",
            "type": "number"
        },
        {
            "name": "date",
            "baseName": "Date",
            "type": "string"
        },
        {
            "name": "bankTransferID",
            "baseName": "BankTransferID",
            "type": "string"
        },
        {
            "name": "currencyRate",
            "baseName": "CurrencyRate",
            "type": "number"
        },
        {
            "name": "fromBankTransactionID",
            "baseName": "FromBankTransactionID",
            "type": "string"
        },
        {
            "name": "toBankTransactionID",
            "baseName": "ToBankTransactionID",
            "type": "string"
        },
        {
            "name": "fromIsReconciled",
            "baseName": "FromIsReconciled",
            "type": "boolean"
        },
        {
            "name": "toIsReconciled",
            "baseName": "ToIsReconciled",
            "type": "boolean"
        },
        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        },
        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        },
        {
            "name": "createdDateUTC",
            "baseName": "CreatedDateUTC",
            "type": "Date"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "BankTransfer.StatusEnum"
        },
        {
            "name": "fromTracking",
            "baseName": "FromTracking",
            "type": "Array<TrackingReference>"
        },
        {
            "name": "toTracking",
            "baseName": "ToTracking",
            "type": "Array<TrackingReference>"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransfer.attributeTypeMap;
    }
}

export namespace BankTransfer {
    export enum StatusEnum {
        AUTHORISED = <any> 'AUTHORISED',
        DELETED = <any> 'DELETED'
    }
}
