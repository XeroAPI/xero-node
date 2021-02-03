import { SuperFundProduct } from '././superFundProduct';

export class SuperFundProducts {
    'superFundProducts'?: Array<SuperFundProduct>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "superFundProducts",
            "baseName": "SuperFundProducts",
            "type": "Array<SuperFundProduct>"
        }    ];

    static getAttributeTypeMap() {
        return SuperFundProducts.attributeTypeMap;
    }
}

