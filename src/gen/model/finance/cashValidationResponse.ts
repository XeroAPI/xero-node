import { BankStatementResponse } from '././bankStatementResponse';
import { CashAccountResponse } from '././cashAccountResponse';
import { StatementBalanceResponse } from '././statementBalanceResponse';

export class CashValidationResponse {
    /**
    * The Xero identifier for an account
    */
    'accountId'?: string;
    'statementBalance'?: StatementBalanceResponse;
    /**
    * UTC Date when the last bank statement item was entered into Xero. This date is represented in ISO 8601 format.
    */
    'statementBalanceDate'?: string;
    'bankStatement'?: BankStatementResponse;
    'cashAccount'?: CashAccountResponse;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        }        {
            "name": "statementBalance",
            "baseName": "statementBalance",
            "type": "StatementBalanceResponse"
        }        {
            "name": "statementBalanceDate",
            "baseName": "statementBalanceDate",
            "type": "string"
        }        {
            "name": "bankStatement",
            "baseName": "bankStatement",
            "type": "BankStatementResponse"
        }        {
            "name": "cashAccount",
            "baseName": "cashAccount",
            "type": "CashAccountResponse"
        }    ];

    static getAttributeTypeMap() {
        return CashValidationResponse.attributeTypeMap;
    }
}

