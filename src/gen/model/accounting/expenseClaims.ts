import { ExpenseClaim } from '././expenseClaim';

export class ExpenseClaims {
    'expenseClaims'?: Array<ExpenseClaim>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "expenseClaims",
            "baseName": "ExpenseClaims",
            "type": "Array<ExpenseClaim>"
        }    ];

    static getAttributeTypeMap() {
        return ExpenseClaims.attributeTypeMap;
    }
}

