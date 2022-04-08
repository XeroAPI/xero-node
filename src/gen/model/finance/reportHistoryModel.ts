
export class ReportHistoryModel {
    /**
    * Report code or report title
    */
    'reportName'?: string;
    /**
    * The date or date range of the report
    */
    'reportDateText'?: string;
    /**
    * The system date time that the report was published
    */
    'publishedDateUtc'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "reportName",
            "baseName": "reportName",
            "type": "string"
        }        {
            "name": "reportDateText",
            "baseName": "reportDateText",
            "type": "string"
        }        {
            "name": "publishedDateUtc",
            "baseName": "publishedDateUtc",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return ReportHistoryModel.attributeTypeMap;
    }
}

