import { ManualJournals } from '././manualJournals';
import { PageInfo } from '././pageInfo';

export class GetManualJournalsResponse {
    'id'?: string;
    'status'?: string;
    'providerName'?: string;
    'dateTimeUTC'?: string;
    'pageInfo'?: PageInfo;
    'manualJournals'?: Array<ManualJournals>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "Id",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "Status",
            "type": "string"
        },
        {
            "name": "providerName",
            "baseName": "ProviderName",
            "type": "string"
        },
        {
            "name": "dateTimeUTC",
            "baseName": "DateTimeUTC",
            "type": "string"
        },
        {
            "name": "pageInfo",
            "baseName": "PageInfo",
            "type": "PageInfo"
        },
        {
            "name": "manualJournals",
            "baseName": "ManualJournals",
            "type": "Array<ManualJournals>"
        }    ];

    static getAttributeTypeMap() {
        return GetManualJournalsResponse.attributeTypeMap;
    }
}

