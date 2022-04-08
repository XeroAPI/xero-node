
export class StatementBalanceResponse {
    /**
    * Total closing balance of the account. This includes both reconciled and unreconciled bank statement lines. The closing balance will always be represented as a positive number, with it’s debit/credit status defined in the statementBalanceDebitCredit field.
    */
    'value'?: number;
    /**
    * The DEBIT or CREDIT status of the account. Cash accounts in credit have a negative balance.
    */
    'type'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "value",
            "baseName": "value",
            "type": "number"
        }        {
            "name": "type",
            "baseName": "type",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return StatementBalanceResponse.attributeTypeMap;
    }
}

