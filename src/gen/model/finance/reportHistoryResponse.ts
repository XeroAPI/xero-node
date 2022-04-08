import { ReportHistoryModel } from '././reportHistoryModel';

export class ReportHistoryResponse {
    /**
    * The requested Organisation to which the data pertains
    */
    'organisationId'?: string;
    /**
    * The end date of the report
    */
    'endDate'?: string;
    'reports'?: Array<ReportHistoryModel>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "organisationId",
            "baseName": "organisationId",
            "type": "string"
        }        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        }        {
            "name": "reports",
            "baseName": "reports",
            "type": "Array<ReportHistoryModel>"
        }    ];

    static getAttributeTypeMap() {
        return ReportHistoryResponse.attributeTypeMap;
    }
}

