import { Payslip } from '././payslip';

export class Payslips {
    'payslips'?: Array<Payslip>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payslips",
            "baseName": "Payslips",
            "type": "Array<Payslip>"
        }    ];

    static getAttributeTypeMap() {
        return Payslips.attributeTypeMap;
    }
}

