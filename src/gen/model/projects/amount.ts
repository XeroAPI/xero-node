import { CurrencyCode } from '././currencyCode';

export class Amount {
    'currency'?: CurrencyCode;
    'value'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "currency",
            "baseName": "currency",
            "type": "CurrencyCode"
        }        {
            "name": "value",
            "baseName": "value",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return Amount.attributeTypeMap;
    }
}

