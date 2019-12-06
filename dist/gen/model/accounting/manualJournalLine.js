"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManualJournalLine {
    static getAttributeTypeMap() {
        return ManualJournalLine.attributeTypeMap;
    }
}
exports.ManualJournalLine = ManualJournalLine;
ManualJournalLine.discriminator = undefined;
ManualJournalLine.attributeTypeMap = [
    {
        "name": "lineAmount",
        "baseName": "LineAmount",
        "type": "number"
    },
    {
        "name": "accountCode",
        "baseName": "AccountCode",
        "type": "string"
    },
    {
        "name": "description",
        "baseName": "Description",
        "type": "string"
    },
    {
        "name": "taxType",
        "baseName": "TaxType",
        "type": "string"
    },
    {
        "name": "tracking",
        "baseName": "Tracking",
        "type": "Array<TrackingCategory>"
    },
    {
        "name": "taxAmount",
        "baseName": "TaxAmount",
        "type": "number"
    },
    {
        "name": "isBlank",
        "baseName": "IsBlank",
        "type": "boolean"
    }
];
//# sourceMappingURL=manualJournalLine.js.map