import { CreditDebitIndicator } from '././creditDebitIndicator';

/**
* The starting balance of the statement
*/
export class StartBalance {
    /**
    * decimal(19,4) unsigned Opening/closing balance amount.
    */
    'amount'?: number;
    'creditDebitIndicator'?: CreditDebitIndicator;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }        {
            "name": "creditDebitIndicator",
            "baseName": "creditDebitIndicator",
            "type": "CreditDebitIndicator"
        }    ];

    static getAttributeTypeMap() {
        return StartBalance.attributeTypeMap;
    }
}

