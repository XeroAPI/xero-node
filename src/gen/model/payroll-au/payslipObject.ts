import { Payslip } from '././payslip';

export class PayslipObject {
    'payslip'?: Payslip;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payslip",
            "baseName": "Payslip",
            "type": "Payslip"
        }    ];

    static getAttributeTypeMap() {
        return PayslipObject.attributeTypeMap;
    }
}

