import { LockHistoryModel } from '././lockHistoryModel';

export class LockHistoryResponse {
    /**
    * The requested Organisation to which the data pertains
    */
    'organisationId'?: string;
    /**
    * The end date of the report
    */
    'endDate'?: string;
    'lockDates'?: Array<LockHistoryModel>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "organisationId",
            "baseName": "organisationId",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        },
        {
            "name": "lockDates",
            "baseName": "lockDates",
            "type": "Array<LockHistoryModel>"
        }    ];

    static getAttributeTypeMap() {
        return LockHistoryResponse.attributeTypeMap;
    }
}

