"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ManualJournal {
    static getAttributeTypeMap() {
        return ManualJournal.attributeTypeMap;
    }
}
exports.ManualJournal = ManualJournal;
ManualJournal.discriminator = undefined;
ManualJournal.attributeTypeMap = [
    {
        "name": "narration",
        "baseName": "Narration",
        "type": "string"
    },
    {
        "name": "journalLines",
        "baseName": "JournalLines",
        "type": "Array<ManualJournalLine>"
    },
    {
        "name": "date",
        "baseName": "Date",
        "type": "string"
    },
    {
        "name": "lineAmountTypes",
        "baseName": "LineAmountTypes",
        "type": "LineAmountTypes"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "ManualJournal.StatusEnum"
    },
    {
        "name": "url",
        "baseName": "Url",
        "type": "string"
    },
    {
        "name": "showOnCashBasisReports",
        "baseName": "ShowOnCashBasisReports",
        "type": "boolean"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "manualJournalID",
        "baseName": "ManualJournalID",
        "type": "string"
    },
    {
        "name": "warnings",
        "baseName": "Warnings",
        "type": "Array<ValidationError>"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    },
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    }
];
(function (ManualJournal) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["DRAFT"] = 'DRAFT'] = "DRAFT";
        StatusEnum[StatusEnum["POSTED"] = 'POSTED'] = "POSTED";
        StatusEnum[StatusEnum["DELETED"] = 'DELETED'] = "DELETED";
        StatusEnum[StatusEnum["VOIDED"] = 'VOIDED'] = "VOIDED";
    })(StatusEnum = ManualJournal.StatusEnum || (ManualJournal.StatusEnum = {}));
})(ManualJournal = exports.ManualJournal || (exports.ManualJournal = {}));
//# sourceMappingURL=manualJournal.js.map