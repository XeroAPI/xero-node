import { HistoryRecord } from '././historyRecord';

export class HistoryRecords {
    'historyRecords'?: Array<HistoryRecord>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "historyRecords",
            "baseName": "HistoryRecords",
            "type": "Array<HistoryRecord>"
        }    ];

    static getAttributeTypeMap() {
        return HistoryRecords.attributeTypeMap;
    }
}

