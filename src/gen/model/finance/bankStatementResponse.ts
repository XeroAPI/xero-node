import { CurrentStatementResponse } from '././currentStatementResponse';
import { StatementLinesResponse } from '././statementLinesResponse';

export class BankStatementResponse {
    'statementLines'?: StatementLinesResponse;
    'currentStatement'?: CurrentStatementResponse;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "statementLines",
            "baseName": "statementLines",
            "type": "StatementLinesResponse"
        },
        {
            "name": "currentStatement",
            "baseName": "currentStatement",
            "type": "CurrentStatementResponse"
        }    ];

    static getAttributeTypeMap() {
        return BankStatementResponse.attributeTypeMap;
    }
}

