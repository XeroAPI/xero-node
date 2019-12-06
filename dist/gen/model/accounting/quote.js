"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Quote {
    static getAttributeTypeMap() {
        return Quote.attributeTypeMap;
    }
}
exports.Quote = Quote;
Quote.discriminator = undefined;
Quote.attributeTypeMap = [
    {
        "name": "quoteID",
        "baseName": "QuoteID",
        "type": "string"
    },
    {
        "name": "quoteNumber",
        "baseName": "QuoteNumber",
        "type": "string"
    },
    {
        "name": "reference",
        "baseName": "Reference",
        "type": "string"
    },
    {
        "name": "terms",
        "baseName": "Terms",
        "type": "string"
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
        "name": "dateString",
        "baseName": "DateString",
        "type": "string"
    },
    {
        "name": "expiryDate",
        "baseName": "ExpiryDate",
        "type": "string"
    },
    {
        "name": "expiryDateString",
        "baseName": "ExpiryDateString",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "QuoteStatusCodes"
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
        "name": "title",
        "baseName": "Title",
        "type": "string"
    },
    {
        "name": "summary",
        "baseName": "Summary",
        "type": "string"
    },
    {
        "name": "brandingThemeID",
        "baseName": "BrandingThemeID",
        "type": "string"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
    }
];
//# sourceMappingURL=quote.js.map