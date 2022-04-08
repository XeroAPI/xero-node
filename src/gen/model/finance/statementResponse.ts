import { StatementLineResponse } from '././statementLineResponse';

export class StatementResponse {
    /**
    * Xero Identifier of statement
    */
    'statementId'?: string;
    /**
    * Start date of statement
    */
    'startDate'?: string;
    /**
    * End date of statement
    */
    'endDate'?: string;
    /**
    * Utc date time of when the statement was imported in Xero
    */
    'importedDateTimeUtc'?: Date;
    /**
    * Import source of statement (STMTIMPORTSRC/MANUAL, STMTIMPORTSRC/CSV, STMTIMPORTSRC/QIF, STMTIMPORTSRC/OFX, XeroApi)
    */
    'importSource'?: string;
    /**
    * List of statement lines
    */
    'statementLines'?: Array<StatementLineResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "statementId",
            "baseName": "statementId",
            "type": "string"
        }        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        }        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        }        {
            "name": "importedDateTimeUtc",
            "baseName": "importedDateTimeUtc",
            "type": "Date"
        }        {
            "name": "importSource",
            "baseName": "importSource",
            "type": "string"
        }        {
            "name": "statementLines",
            "baseName": "statementLines",
            "type": "Array<StatementLineResponse>"
        }    ];

    static getAttributeTypeMap() {
        return StatementResponse.attributeTypeMap;
    }
}

