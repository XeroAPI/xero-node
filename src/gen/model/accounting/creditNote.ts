import { Allocation } from '././allocation';
import { Contact } from '././contact';
import { CurrencyCode } from '././currencyCode';
import { LineAmountTypes } from '././lineAmountTypes';
import { LineItem } from '././lineItem';
import { Payment } from '././payment';
import { ValidationError } from '././validationError';

export class CreditNote {
    /**
    * See Credit Note Types
    */
    'type'?: CreditNote.TypeEnum;
    'contact'?: Contact;
    /**
    * The date the credit note is issued YYYY-MM-DD. If the Date element is not specified then it will default to the current date based on the timezone setting of the organisation
    */
    'date'?: string;
    /**
    * Date invoice is due – YYYY-MM-DD
    */
    'dueDate'?: string;
    /**
    * See Credit Note Status Codes
    */
    'status'?: CreditNote.StatusEnum;
    'lineAmountTypes'?: LineAmountTypes;
    /**
    * See Invoice Line Items
    */
    'lineItems'?: Array<LineItem>;
    /**
    * The subtotal of the credit note excluding taxes
    */
    'subTotal'?: number;
    /**
    * The total tax on the credit note
    */
    'totalTax'?: number;
    /**
    * The total of the Credit Note(subtotal + total tax)
    */
    'total'?: number;
    /**
    * CIS deduction for UK contractors
    */
    'cISDeduction'?: number;
    /**
    * CIS Deduction rate for the organisation
    */
    'cISRate'?: number;
    /**
    * UTC timestamp of last update to the credit note
    */
    'updatedDateUTC'?: Date;
    'currencyCode'?: CurrencyCode;
    /**
    * Date when credit note was fully paid(UTC format)
    */
    'fullyPaidOnDate'?: string;
    /**
    * Xero generated unique identifier
    */
    'creditNoteID'?: string;
    /**
    * ACCRECCREDIT – Unique alpha numeric code identifying credit note (when missing will auto-generate from your Organisation Invoice Settings)
    */
    'creditNoteNumber'?: string;
    /**
    * ACCRECCREDIT only – additional reference number
    */
    'reference'?: string;
    /**
    * Boolean to set whether the credit note in the Xero app should be marked as “sent”. This can be set only on credit notes that have been approved
    */
    'sentToContact'?: boolean;
    /**
    * The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used
    */
    'currencyRate'?: number;
    /**
    * The remaining credit balance on the Credit Note
    */
    'remainingCredit'?: number;
    /**
    * See Allocations
    */
    'allocations'?: Array<Allocation>;
    /**
    * The amount of applied to an invoice
    */
    'appliedAmount'?: number;
    /**
    * See Payments
    */
    'payments'?: Array<Payment>;
    /**
    * See BrandingThemes
    */
    'brandingThemeID'?: string;
    /**
    * A string to indicate if a invoice status
    */
    'statusAttributeString'?: string;
    /**
    * boolean to indicate if a credit note has an attachment
    */
    'hasAttachments'?: boolean;
    /**
    * A boolean to indicate if a credit note has an validation errors
    */
    'hasErrors'?: boolean;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "Type",
            "type": "CreditNote.TypeEnum"
        },
        {
            "name": "contact",
            "baseName": "Contact",
            "type": "Contact"
        },
        {
            "name": "date",
            "baseName": "Date",
            "type": "string"
        },
        {
            "name": "dueDate",
            "baseName": "DueDate",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "CreditNote.StatusEnum"
        },
        {
            "name": "lineAmountTypes",
            "baseName": "LineAmountTypes",
            "type": "LineAmountTypes"
        },
        {
            "name": "lineItems",
            "baseName": "LineItems",
            "type": "Array<LineItem>"
        },
        {
            "name": "subTotal",
            "baseName": "SubTotal",
            "type": "number"
        },
        {
            "name": "totalTax",
            "baseName": "TotalTax",
            "type": "number"
        },
        {
            "name": "total",
            "baseName": "Total",
            "type": "number"
        },
        {
            "name": "cISDeduction",
            "baseName": "CISDeduction",
            "type": "number"
        },
        {
            "name": "cISRate",
            "baseName": "CISRate",
            "type": "number"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "currencyCode",
            "baseName": "CurrencyCode",
            "type": "CurrencyCode"
        },
        {
            "name": "fullyPaidOnDate",
            "baseName": "FullyPaidOnDate",
            "type": "string"
        },
        {
            "name": "creditNoteID",
            "baseName": "CreditNoteID",
            "type": "string"
        },
        {
            "name": "creditNoteNumber",
            "baseName": "CreditNoteNumber",
            "type": "string"
        },
        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        },
        {
            "name": "sentToContact",
            "baseName": "SentToContact",
            "type": "boolean"
        },
        {
            "name": "currencyRate",
            "baseName": "CurrencyRate",
            "type": "number"
        },
        {
            "name": "remainingCredit",
            "baseName": "RemainingCredit",
            "type": "number"
        },
        {
            "name": "allocations",
            "baseName": "Allocations",
            "type": "Array<Allocation>"
        },
        {
            "name": "appliedAmount",
            "baseName": "AppliedAmount",
            "type": "number"
        },
        {
            "name": "payments",
            "baseName": "Payments",
            "type": "Array<Payment>"
        },
        {
            "name": "brandingThemeID",
            "baseName": "BrandingThemeID",
            "type": "string"
        },
        {
            "name": "statusAttributeString",
            "baseName": "StatusAttributeString",
            "type": "string"
        },
        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        },
        {
            "name": "hasErrors",
            "baseName": "HasErrors",
            "type": "boolean"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        },
        {
            "name": "warnings",
            "baseName": "Warnings",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return CreditNote.attributeTypeMap;
    }
}

export namespace CreditNote {
    export enum TypeEnum {
        ACCPAYCREDIT = <any> 'ACCPAYCREDIT',
        ACCRECCREDIT = <any> 'ACCRECCREDIT'
    }
    export enum StatusEnum {
        DRAFT = <any> 'DRAFT',
        SUBMITTED = <any> 'SUBMITTED',
        DELETED = <any> 'DELETED',
        AUTHORISED = <any> 'AUTHORISED',
        PAID = <any> 'PAID',
        VOIDED = <any> 'VOIDED'
    }
}
