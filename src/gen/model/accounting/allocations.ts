import { Allocation } from '././allocation';

export class Allocations {
    'allocations'?: Array<Allocation>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "allocations",
            "baseName": "Allocations",
            "type": "Array<Allocation>"
        }    ];

    static getAttributeTypeMap() {
        return Allocations.attributeTypeMap;
    }
}

