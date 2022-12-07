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
    * Indicates the source of the statement data. Either imported from 1) direct bank feed OR 2) manual customer entry or upload. Manual import sources are STMTIMPORTSRC/MANUAL, STMTIMPORTSRC/CSV, STMTIMPORTSRC/OFX, Ofx or STMTIMPORTSRC/QIF. All other import sources are direct and, depending on the direct solution, may contain the name of the financial institution.
    */
    'importSource'?: string;
    /**
    * Opening balance sourced from imported bank statements (if supplied). Note, for manually uploaded statements, this balance is also manual and usually not supplied. Where not supplied, the value will be 0.
    */
    'startBalance'?: number;
    /**
    * Closing balance sourced from imported bank statements (if supplied). Note, for manually uploaded statements, this balance is also manual and usually not supplied. Where not supplied, the value will be 0.
    */
    'endBalance'?: number;
    /**
    * Opening statement balance calculated in Xero (= bank account conversion balance plus sum of imported bank statement lines). Note: If indicative statement balance doesn\'t match imported statement balance for the same date, either the conversion (opening at inception) balance in Xero is wrong or there\'s an error in the bank statement lines in Xero. Ref: https://central.xero.com/s/article/Compare-the-statement-balance-in-Xero-to-your-actual-bank-balance?userregion=true 
    */
    'indicativeStartBalance'?: number;
    /**
    * Closing statement balance calculated in Xero (= bank account conversion balance plus sum of imported bank statement lines). Note: If indicative statement balance doesn\'t match imported statement balance for the same date, either the conversion (opening at inception) balance in Xero is wrong or there\'s an error in the bank statement lines in Xero. Ref: https://central.xero.com/s/article/Compare-the-statement-balance-in-Xero-to-your-actual-bank-balance?userregion=true  
    */
    'indicativeEndBalance'?: number;
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
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        },
        {
            "name": "importedDateTimeUtc",
            "baseName": "importedDateTimeUtc",
            "type": "Date"
        },
        {
            "name": "importSource",
            "baseName": "importSource",
            "type": "string"
        },
        {
            "name": "startBalance",
            "baseName": "startBalance",
            "type": "number"
        },
        {
            "name": "endBalance",
            "baseName": "endBalance",
            "type": "number"
        },
        {
            "name": "indicativeStartBalance",
            "baseName": "indicativeStartBalance",
            "type": "number"
        },
        {
            "name": "indicativeEndBalance",
            "baseName": "indicativeEndBalance",
            "type": "number"
        },
        {
            "name": "statementLines",
            "baseName": "statementLines",
            "type": "Array<StatementLineResponse>"
        }    ];

    static getAttributeTypeMap() {
        return StatementResponse.attributeTypeMap;
    }
}

