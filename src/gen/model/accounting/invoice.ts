import { Attachment } from '././attachment';
import { Contact } from '././contact';
import { CreditNote } from '././creditNote';
import { CurrencyCode } from '././currencyCode';
import { InvoiceAddress } from '././invoiceAddress';
import { LineAmountTypes } from '././lineAmountTypes';
import { LineItem } from '././lineItem';
import { Overpayment } from '././overpayment';
import { Payment } from '././payment';
import { Prepayment } from '././prepayment';
import { ValidationError } from '././validationError';

export class Invoice {
    /**
    * See Invoice Types
    */
    'type'?: Invoice.TypeEnum;
    'contact'?: Contact;
    /**
    * See LineItems
    */
    'lineItems'?: Array<LineItem>;
    /**
    * Date invoice was issued – YYYY-MM-DD. If the Date element is not specified it will default to the current date based on the timezone setting of the organisation
    */
    'date'?: string;
    /**
    * Date invoice is due – YYYY-MM-DD
    */
    'dueDate'?: string;
    'lineAmountTypes'?: LineAmountTypes;
    /**
    * ACCREC – Unique alpha numeric code identifying invoice (when missing will auto-generate from your Organisation Invoice Settings) (max length = 255)
    */
    'invoiceNumber'?: string;
    /**
    * ACCREC only – additional reference number
    */
    'reference'?: string;
    /**
    * See BrandingThemes
    */
    'brandingThemeID'?: string;
    /**
    * URL link to a source document – shown as “Go to [appName]” in the Xero app
    */
    'url'?: string;
    'currencyCode'?: CurrencyCode;
    /**
    * The currency rate for a multicurrency invoice. If no rate is specified, the XE.com day rate is used. (max length = [18].[6])
    */
    'currencyRate'?: number;
    /**
    * See Invoice Status Codes
    */
    'status'?: Invoice.StatusEnum;
    /**
    * Boolean to set whether the invoice in the Xero app should be marked as “sent”. This can be set only on invoices that have been approved
    */
    'sentToContact'?: boolean;
    /**
    * Shown on sales invoices (Accounts Receivable) when this has been set
    */
    'expectedPaymentDate'?: string;
    /**
    * Shown on bills (Accounts Payable) when this has been set
    */
    'plannedPaymentDate'?: string;
    /**
    * CIS deduction for UK contractors
    */
    'cISDeduction'?: number;
    /**
    * CIS Deduction rate for the organisation
    */
    'cISRate'?: number;
    /**
    * Total of invoice excluding taxes
    */
    'subTotal'?: number;
    /**
    * Total tax on invoice
    */
    'totalTax'?: number;
    /**
    * Total of Invoice tax inclusive (i.e. SubTotal + TotalTax). This will be ignored if it doesn’t equal the sum of the LineAmounts
    */
    'total'?: number;
    /**
    * Total of discounts applied on the invoice line items
    */
    'totalDiscount'?: number;
    /**
    * Xero generated unique identifier for invoice
    */
    'invoiceID'?: string;
    /**
    * Xero generated unique identifier for repeating invoices
    */
    'repeatingInvoiceID'?: string;
    /**
    * boolean to indicate if an invoice has an attachment
    */
    'hasAttachments'?: boolean;
    /**
    * boolean to indicate if an invoice has a discount
    */
    'isDiscounted'?: boolean;
    /**
    * See Payments
    */
    'payments'?: Array<Payment>;
    /**
    * See Prepayments
    */
    'prepayments'?: Array<Prepayment>;
    /**
    * See Overpayments
    */
    'overpayments'?: Array<Overpayment>;
    /**
    * Amount remaining to be paid on invoice
    */
    'amountDue'?: number;
    /**
    * Sum of payments received for invoice
    */
    'amountPaid'?: number;
    /**
    * The date the invoice was fully paid. Only returned on fully paid invoices
    */
    'fullyPaidOnDate'?: string;
    /**
    * Sum of all credit notes, over-payments and pre-payments applied to invoice
    */
    'amountCredited'?: number;
    /**
    * Last modified date UTC format
    */
    'updatedDateUTC'?: Date;
    /**
    * Details of credit notes that have been applied to an invoice
    */
    'creditNotes'?: Array<CreditNote>;
    /**
    * Displays array of attachments from the API
    */
    'attachments'?: Array<Attachment>;
    /**
    * A boolean to indicate if a invoice has an validation errors
    */
    'hasErrors'?: boolean;
    /**
    * A string to indicate if a invoice status
    */
    'statusAttributeString'?: string;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;
    /**
    * Displays array of warning messages from the API
    */
    'warnings'?: Array<ValidationError>;
    /**
    * An array of addresses used to auto calculate sales tax
    */
    'invoiceAddresses'?: Array<InvoiceAddress>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "Type",
            "type": "Invoice.TypeEnum"
        },
        {
            "name": "contact",
            "baseName": "Contact",
            "type": "Contact"
        },
        {
            "name": "lineItems",
            "baseName": "LineItems",
            "type": "Array<LineItem>"
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
            "name": "lineAmountTypes",
            "baseName": "LineAmountTypes",
            "type": "LineAmountTypes"
        },
        {
            "name": "invoiceNumber",
            "baseName": "InvoiceNumber",
            "type": "string"
        },
        {
            "name": "reference",
            "baseName": "Reference",
            "type": "string"
        },
        {
            "name": "brandingThemeID",
            "baseName": "BrandingThemeID",
            "type": "string"
        },
        {
            "name": "url",
            "baseName": "Url",
            "type": "string"
        },
        {
            "name": "currencyCode",
            "baseName": "CurrencyCode",
            "type": "CurrencyCode"
        },
        {
            "name": "currencyRate",
            "baseName": "CurrencyRate",
            "type": "number"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "Invoice.StatusEnum"
        },
        {
            "name": "sentToContact",
            "baseName": "SentToContact",
            "type": "boolean"
        },
        {
            "name": "expectedPaymentDate",
            "baseName": "ExpectedPaymentDate",
            "type": "string"
        },
        {
            "name": "plannedPaymentDate",
            "baseName": "PlannedPaymentDate",
            "type": "string"
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
            "name": "totalDiscount",
            "baseName": "TotalDiscount",
            "type": "number"
        },
        {
            "name": "invoiceID",
            "baseName": "InvoiceID",
            "type": "string"
        },
        {
            "name": "repeatingInvoiceID",
            "baseName": "RepeatingInvoiceID",
            "type": "string"
        },
        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        },
        {
            "name": "isDiscounted",
            "baseName": "IsDiscounted",
            "type": "boolean"
        },
        {
            "name": "payments",
            "baseName": "Payments",
            "type": "Array<Payment>"
        },
        {
            "name": "prepayments",
            "baseName": "Prepayments",
            "type": "Array<Prepayment>"
        },
        {
            "name": "overpayments",
            "baseName": "Overpayments",
            "type": "Array<Overpayment>"
        },
        {
            "name": "amountDue",
            "baseName": "AmountDue",
            "type": "number"
        },
        {
            "name": "amountPaid",
            "baseName": "AmountPaid",
            "type": "number"
        },
        {
            "name": "fullyPaidOnDate",
            "baseName": "FullyPaidOnDate",
            "type": "string"
        },
        {
            "name": "amountCredited",
            "baseName": "AmountCredited",
            "type": "number"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "creditNotes",
            "baseName": "CreditNotes",
            "type": "Array<CreditNote>"
        },
        {
            "name": "attachments",
            "baseName": "Attachments",
            "type": "Array<Attachment>"
        },
        {
            "name": "hasErrors",
            "baseName": "HasErrors",
            "type": "boolean"
        },
        {
            "name": "statusAttributeString",
            "baseName": "StatusAttributeString",
            "type": "string"
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
        },
        {
            "name": "invoiceAddresses",
            "baseName": "InvoiceAddresses",
            "type": "Array<InvoiceAddress>"
        }    ];

    static getAttributeTypeMap() {
        return Invoice.attributeTypeMap;
    }
}

export namespace Invoice {
    export enum TypeEnum {
        ACCPAY = <any> 'ACCPAY',
        ACCPAYCREDIT = <any> 'ACCPAYCREDIT',
        APOVERPAYMENT = <any> 'APOVERPAYMENT',
        APPREPAYMENT = <any> 'APPREPAYMENT',
        ACCREC = <any> 'ACCREC',
        ACCRECCREDIT = <any> 'ACCRECCREDIT',
        AROVERPAYMENT = <any> 'AROVERPAYMENT',
        ARPREPAYMENT = <any> 'ARPREPAYMENT'
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
