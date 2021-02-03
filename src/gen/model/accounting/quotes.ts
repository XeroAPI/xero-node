import { Quote } from '././quote';

export class Quotes {
    'quotes'?: Array<Quote>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "quotes",
            "baseName": "Quotes",
            "type": "Array<Quote>"
        }    ];

    static getAttributeTypeMap() {
        return Quotes.attributeTypeMap;
    }
}

