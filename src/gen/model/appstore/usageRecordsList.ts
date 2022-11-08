import { UsageRecord } from '././usageRecord';

/**
* Response to get usage record
*/
export class UsageRecordsList {
    /**
    * A collection of usage records
    */
    'usageRecords': Array<UsageRecord>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "usageRecords",
            "baseName": "usageRecords",
            "type": "Array<UsageRecord>"
        }    ];

    static getAttributeTypeMap() {
        return UsageRecordsList.attributeTypeMap;
    }
}

