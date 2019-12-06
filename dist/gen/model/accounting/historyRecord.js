"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HistoryRecord {
    static getAttributeTypeMap() {
        return HistoryRecord.attributeTypeMap;
    }
}
exports.HistoryRecord = HistoryRecord;
HistoryRecord.discriminator = undefined;
HistoryRecord.attributeTypeMap = [
    {
        "name": "details",
        "baseName": "Details",
        "type": "string"
    },
    {
        "name": "changes",
        "baseName": "Changes",
        "type": "string"
    },
    {
        "name": "user",
        "baseName": "User",
        "type": "string"
    },
    {
        "name": "dateUTC",
        "baseName": "DateUTC",
        "type": "Date"
    }
];
//# sourceMappingURL=historyRecord.js.map