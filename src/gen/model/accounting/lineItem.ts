import { LineItemItem } from '././lineItemItem';
import { LineItemTracking } from '././lineItemTracking';
import { TaxBreakdownComponent } from '././taxBreakdownComponent';

export class LineItem {
    /**
    * LineItem unique ID
    */
    'lineItemID'?: string;
    /**
    * Description needs to be at least 1 char long. A line item with just a description (i.e no unit amount or quantity) can be created by specifying just a <Description> element that contains at least 1 character
    */
    'description'?: string;
    /**
    * LineItem Quantity
    */
    'quantity'?: number;
    /**
    * LineItem Unit Amount
    */
    'unitAmount'?: number;
    /**
    * See Items
    */
    'itemCode'?: string;
    /**
    * See Accounts
    */
    'accountCode'?: string;
    /**
    * The associated account ID related to this line item
    */
    'accountID'?: string;
    /**
    * The tax type from TaxRates
    */
    'taxType'?: string;
    /**
    * The tax amount is auto calculated as a percentage of the line amount (see below) based on the tax rate. This value can be overriden if the calculated <TaxAmount> is not correct.
    */
    'taxAmount'?: number;
    'item'?: LineItemItem;
    /**
    * If you wish to omit either the Quantity or UnitAmount you can provide a LineAmount and Xero will calculate the missing amount for you. The line amount reflects the discounted price if either a DiscountRate or DiscountAmount has been used i.e. LineAmount = Quantity * Unit Amount * ((100 - DiscountRate)/100) or LineAmount = (Quantity * UnitAmount) - DiscountAmount
    */
    'lineAmount'?: number;
    /**
    * Optional Tracking Category – see Tracking.  Any LineItem can have a  maximum of 2 <TrackingCategory> elements.
    */
    'tracking'?: Array<LineItemTracking>;
    /**
    * Percentage discount being applied to a line item (only supported on  ACCREC invoices – ACC PAY invoices and credit notes in Xero do not support discounts
    */
    'discountRate'?: number;
    /**
    * Discount amount being applied to a line item. Only supported on ACCREC invoices and quotes. ACCPAY invoices and credit notes in Xero do not support discounts.
    */
    'discountAmount'?: number;
    /**
    * The Xero identifier for a Repeating Invoice
    */
    'repeatingInvoiceID'?: string;
    /**
    * The type of taxability
    */
    'taxability'?: LineItem.TaxabilityEnum;
    /**
    * The ID of the sales tax code
    */
    'salesTaxCodeId'?: number;
    /**
    * An array of tax components defined for this line item
    */
    'taxBreakdown'?: Array<TaxBreakdownComponent>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "lineItemID",
            "baseName": "LineItemID",
            "type": "string"
        },
        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        },
        {
            "name": "quantity",
            "baseName": "Quantity",
            "type": "number"
        },
        {
            "name": "unitAmount",
            "baseName": "UnitAmount",
            "type": "number"
        },
        {
            "name": "itemCode",
            "baseName": "ItemCode",
            "type": "string"
        },
        {
            "name": "accountCode",
            "baseName": "AccountCode",
            "type": "string"
        },
        {
            "name": "accountID",
            "baseName": "AccountID",
            "type": "string"
        },
        {
            "name": "taxType",
            "baseName": "TaxType",
            "type": "string"
        },
        {
            "name": "taxAmount",
            "baseName": "TaxAmount",
            "type": "number"
        },
        {
            "name": "item",
            "baseName": "Item",
            "type": "LineItemItem"
        },
        {
            "name": "lineAmount",
            "baseName": "LineAmount",
            "type": "number"
        },
        {
            "name": "tracking",
            "baseName": "Tracking",
            "type": "Array<LineItemTracking>"
        },
        {
            "name": "discountRate",
            "baseName": "DiscountRate",
            "type": "number"
        },
        {
            "name": "discountAmount",
            "baseName": "DiscountAmount",
            "type": "number"
        },
        {
            "name": "repeatingInvoiceID",
            "baseName": "RepeatingInvoiceID",
            "type": "string"
        },
        {
            "name": "taxability",
            "baseName": "Taxability",
            "type": "LineItem.TaxabilityEnum"
        },
        {
            "name": "salesTaxCodeId",
            "baseName": "SalesTaxCodeId",
            "type": "number"
        },
        {
            "name": "taxBreakdown",
            "baseName": "TaxBreakdown",
            "type": "Array<TaxBreakdownComponent>"
        }    ];

    static getAttributeTypeMap() {
        return LineItem.attributeTypeMap;
    }
}

export namespace LineItem {
    export enum TaxabilityEnum {
        TAXABLE = <any> 'TAXABLE',
        NONTAXABLE = <any> 'NON_TAXABLE',
        EXEMPT = <any> 'EXEMPT',
        PARTTAXABLE = <any> 'PART_TAXABLE',
        NOTAPPLICABLE = <any> 'NOT_APPLICABLE'
    }
}
