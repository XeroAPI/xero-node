import { PayrollCalendar } from '././payrollCalendar';

export class PayrollCalendars {
    'payrollCalendars'?: Array<PayrollCalendar>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payrollCalendars",
            "baseName": "PayrollCalendars",
            "type": "Array<PayrollCalendar>"
        }    ];

    static getAttributeTypeMap() {
        return PayrollCalendars.attributeTypeMap;
    }
}

