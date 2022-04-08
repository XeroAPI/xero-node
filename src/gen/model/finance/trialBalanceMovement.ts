import { TrialBalanceEntry } from '././trialBalanceEntry';

export class TrialBalanceMovement {
    /**
    * Debit amount
    */
    'debits'?: number;
    /**
    * Credit amount
    */
    'credits'?: number;
    'movement'?: TrialBalanceEntry;
    /**
    * Value of movement. Expense and Asset accounts code debits as positive. Revenue, Liability, and Equity accounts code debits as negative
    */
    'signedMovement'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "debits",
            "baseName": "debits",
            "type": "number"
        },
        {
            "name": "credits",
            "baseName": "credits",
            "type": "number"
        },
        {
            "name": "movement",
            "baseName": "movement",
            "type": "TrialBalanceEntry"
        },
        {
            "name": "signedMovement",
            "baseName": "signedMovement",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return TrialBalanceMovement.attributeTypeMap;
    }
}

