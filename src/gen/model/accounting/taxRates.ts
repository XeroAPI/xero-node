import { TaxRate } from '././taxRate';

export class TaxRates {
    'taxRates'?: Array<TaxRate>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "taxRates",
            "baseName": "TaxRates",
            "type": "Array<TaxRate>"
        }    ];

    static getAttributeTypeMap() {
        return TaxRates.attributeTypeMap;
    }
}

