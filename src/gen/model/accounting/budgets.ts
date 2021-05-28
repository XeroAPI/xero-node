import { Budget } from '././budget';

export class Budgets {
    'budgets'?: Array<Budget>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "budgets",
            "baseName": "Budgets",
            "type": "Array<Budget>"
        }    ];

    static getAttributeTypeMap() {
        return Budgets.attributeTypeMap;
    }
}

