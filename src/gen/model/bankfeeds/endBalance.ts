import { CreditDebitIndicator } from '././creditDebitIndicator';

/**
* The StartBalance plus all the Statement Line Amounts should be equal to the EndBalance Amount.
*/
export class EndBalance {
    'amount'?: number;
    'creditDebitIndicator'?: CreditDebitIndicator;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        },
        {
            "name": "creditDebitIndicator",
            "baseName": "creditDebitIndicator",
            "type": "CreditDebitIndicator"
        }    ];

    static getAttributeTypeMap() {
        return EndBalance.attributeTypeMap;
    }
}

