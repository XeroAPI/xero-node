import { SuperFund } from '././superFund';

export class SuperFunds {
    'superFunds'?: Array<SuperFund>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "superFunds",
            "baseName": "SuperFunds",
            "type": "Array<SuperFund>"
        }    ];

    static getAttributeTypeMap() {
        return SuperFunds.attributeTypeMap;
    }
}

