import { CurrencyCode } from '././currencyCode';

export class Currency {
    'code'?: CurrencyCode;
    /**
    * Name of Currency
    */
    'description'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "code",
            "baseName": "Code",
            "type": "CurrencyCode"
        }        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Currency.attributeTypeMap;
    }
}

