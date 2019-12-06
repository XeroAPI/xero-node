"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class JournalLine {
    static getAttributeTypeMap() {
        return JournalLine.attributeTypeMap;
    }
}
exports.JournalLine = JournalLine;
JournalLine.discriminator = undefined;
JournalLine.attributeTypeMap = [
    {
        "name": "journalLineID",
        "baseName": "JournalLineID",
        "type": "string"
    },
    {
        "name": "accountID",
        "baseName": "AccountID",
        "type": "string"
    },
    {
        "name": "accountCode",
        "baseName": "AccountCode",
        "type": "string"
    },
    {
        "name": "accountType",
        "baseName": "AccountType",
        "type": "AccountType"
    },
    {
        "name": "accountName",
        "baseName": "AccountName",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    },
    {
        "name": "netAmount",
        "baseName": "NetAmount",
        "type": "number"
    },
    {
        "name": "grossAmount",
        "baseName": "GrossAmount",
        "type": "number"
    },
    {
        "name": "taxAmount",
        "baseName": "TaxAmount",
        "type": "number"
    },
    {
        "name": "taxType",
        "baseName": "TaxType",
        "type": "string"
    },
    {
        "name": "taxName",
        "baseName": "TaxName",
        "type": "string"
    },
    {
        "name": "trackingCategories",
        "baseName": "TrackingCategories",
        "type": "Array<TrackingCategory>"
    }
];
//# sourceMappingURL=journalLine.js.map