import { Timesheet } from '././timesheet';

export class Timesheets {
    'timesheets'?: Array<Timesheet>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "timesheets",
            "baseName": "Timesheets",
            "type": "Array<Timesheet>"
        }    ];

    static getAttributeTypeMap() {
        return Timesheets.attributeTypeMap;
    }
}

