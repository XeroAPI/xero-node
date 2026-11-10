
export class LedgerDecimal {
    /**
    * Amount value (always positive).
    */
    'value': number;
    'type': LedgerDecimal.TypeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "value",
            "baseName": "value",
            "type": "number"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "LedgerDecimal.TypeEnum"
        }    ];

    static getAttributeTypeMap() {
        return LedgerDecimal.attributeTypeMap;
    }
}

export namespace LedgerDecimal {
    export enum TypeEnum {
        DEBIT = <any> 'DEBIT',
        CREDIT = <any> 'CREDIT'
    }
}
