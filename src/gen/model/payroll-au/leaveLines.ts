import { LeaveLine } from '././leaveLine';

/**
* The leave type lines
*/
export class LeaveLines {
    'employee'?: Array<LeaveLine>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "employee",
            "baseName": "Employee",
            "type": "Array<LeaveLine>"
        }    ];

    static getAttributeTypeMap() {
        return LeaveLines.attributeTypeMap;
    }
}

