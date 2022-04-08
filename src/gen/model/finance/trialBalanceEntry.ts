
export class TrialBalanceEntry {
    /**
    * Net movement or net balance in the account
    */
    'value'?: number;
    /**
    * Sign (Debit/Credit) of the movement of balance in the account
    */
    'entryType'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "value",
            "baseName": "value",
            "type": "number"
        }        {
            "name": "entryType",
            "baseName": "entryType",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return TrialBalanceEntry.attributeTypeMap;
    }
}

