import { Currency } from '././currency';

export class Currencies {
    'currencies'?: Array<Currency>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "currencies",
            "baseName": "Currencies",
            "type": "Array<Currency>"
        }    ];

    static getAttributeTypeMap() {
        return Currencies.attributeTypeMap;
    }
}

