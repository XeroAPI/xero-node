import { PayRun } from '././payRun';

export class PayRuns {
    'payRuns'?: Array<PayRun>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payRuns",
            "baseName": "PayRuns",
            "type": "Array<PayRun>"
        }    ];

    static getAttributeTypeMap() {
        return PayRuns.attributeTypeMap;
    }
}

