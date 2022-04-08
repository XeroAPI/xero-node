import { StatementResponse } from '././statementResponse';

export class BankStatementAccountingResponse {
    /**
    * Xero Identifier of bank account
    */
    'bankAccountId'?: string;
    /**
    * Name of bank account
    */
    'bankAccountName'?: string;
    /**
    * Currency code of the bank account
    */
    'bankAccountCurrencyCode'?: string;
    /**
    * List of bank statements and linked accounting data for the requested period
    */
    'statements'?: Array<StatementResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bankAccountId",
            "baseName": "bankAccountId",
            "type": "string"
        }        {
            "name": "bankAccountName",
            "baseName": "bankAccountName",
            "type": "string"
        }        {
            "name": "bankAccountCurrencyCode",
            "baseName": "bankAccountCurrencyCode",
            "type": "string"
        }        {
            "name": "statements",
            "baseName": "statements",
            "type": "Array<StatementResponse>"
        }    ];

    static getAttributeTypeMap() {
        return BankStatementAccountingResponse.attributeTypeMap;
    }
}

