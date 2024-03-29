import { Attachment } from '././attachment';
import { Contact } from '././contact';
import { CurrencyCode } from '././currencyCode';
import { LineAmountTypes } from '././lineAmountTypes';
import { LineItem } from '././lineItem';
import { Schedule } from '././schedule';

export class RepeatingInvoice {
    /**
    * See Invoice Types
    */
    'type'?: RepeatingInvoice.TypeEnum;
    'contact'?: Contact;
    'schedule'?: Schedule;
    /**
    * See LineItems
    */
    'lineItems'?: Array<LineItem>;
    'lineAmountTypes'?: LineAmountTypes;
    /**
    * ACCREC only – additional reference number
    */
    'reference'?: string;
    /**
    * See BrandingThemes
    */
    'brandingThemeID'?: string;
    'currencyCode'?: CurrencyCode;
    /**
    * One of the following - DRAFT or AUTHORISED – See Invoice Status Codes
    */
    'status'?: RepeatingInvoice.StatusEnum;
    /**
    * Total of invoice excluding taxes
    */
    'subTotal'?: number;
    /**
    * Total tax on invoice
    */
    'totalTax'?: number;
    /**
    * Total of Invoice tax inclusive (i.e. SubTotal + TotalTax)
    */
    'total'?: number;
    /**
    * Xero generated unique identifier for repeating invoice template
    */
    'repeatingInvoiceID'?: string;
    /**
    * Xero generated unique identifier for repeating invoice template
    */
    'iD'?: string;
    /**
    * Boolean to indicate if an invoice has an attachment
    */
    'hasAttachments'?: boolean;
    /**
    * Displays array of attachments from the API
    */
    'attachments'?: Array<Attachment>;
    /**
    * Boolean to indicate whether the invoice has been approved for sending
    */
    'approvedForSending'?: boolean;
    /**
    * Boolean to indicate whether a copy is sent to sender\'s email
    */
    'sendCopy'?: boolean;
    /**
    * Boolean to indicate whether the invoice in the Xero app displays as \"sent\"
    */
    'markAsSent'?: boolean;
    /**
    * Boolean to indicate whether to include PDF attachment
    */
    'includePDF'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "Type",
            "type": "RepeatingInvoice.TypeEnum"
        },
        {
            "name": "contact",
            "baseName": "Contact",
            "type": "Contact"
        },
        {
            "name": "schedule",
            "baseName": "Schedule",
            "type": "Schedule"
        },
        {
            "name": "lineItems",
            "baseName": "LineItems",
            "type": "Array<LineItem>"
        },
        {
            "name": "lineAmountTypes",
            "baseName": "LineAmountTypes",
            "type": "LineAmountTypes"
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
            "name": "currencyCode",
            "baseName": "CurrencyCode",
            "type": "CurrencyCode"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "RepeatingInvoice.StatusEnum"
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
            "name": "repeatingInvoiceID",
            "baseName": "RepeatingInvoiceID",
            "type": "string"
        },
        {
            "name": "iD",
            "baseName": "ID",
            "type": "string"
        },
        {
            "name": "hasAttachments",
            "baseName": "HasAttachments",
            "type": "boolean"
        },
        {
            "name": "attachments",
            "baseName": "Attachments",
            "type": "Array<Attachment>"
        },
        {
            "name": "approvedForSending",
            "baseName": "ApprovedForSending",
            "type": "boolean"
        },
        {
            "name": "sendCopy",
            "baseName": "SendCopy",
            "type": "boolean"
        },
        {
            "name": "markAsSent",
            "baseName": "MarkAsSent",
            "type": "boolean"
        },
        {
            "name": "includePDF",
            "baseName": "IncludePDF",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return RepeatingInvoice.attributeTypeMap;
    }
}

export namespace RepeatingInvoice {
    export enum TypeEnum {
        ACCPAY = <any> 'ACCPAY',
        ACCREC = <any> 'ACCREC'
    }
    export enum StatusEnum {
        DRAFT = <any> 'DRAFT',
        AUTHORISED = <any> 'AUTHORISED',
        DELETED = <any> 'DELETED'
    }
}
