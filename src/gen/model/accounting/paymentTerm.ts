import { Bill } from '././bill';

export class PaymentTerm {
    'bills'?: Bill;
    'sales'?: Bill;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bills",
            "baseName": "Bills",
            "type": "Bill"
        }        {
            "name": "sales",
            "baseName": "Sales",
            "type": "Bill"
        }    ];

    static getAttributeTypeMap() {
        return PaymentTerm.attributeTypeMap;
    }
}

