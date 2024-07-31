import { WorkingWeek } from '././workingWeek';

export class EmployeeWorkingPatternWithWorkingWeeks {
    /**
    * The Xero identifier for for Employee working pattern
    */
    'payeeWorkingPatternID': string;
    /**
    * The effective date of the corresponding salary and wages
    */
    'effectiveFrom': string;
    'workingWeeks'?: Array<WorkingWeek>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "payeeWorkingPatternID",
            "baseName": "payeeWorkingPatternID",
            "type": "string"
        },
        {
            "name": "effectiveFrom",
            "baseName": "effectiveFrom",
            "type": "string"
        },
        {
            "name": "workingWeeks",
            "baseName": "workingWeeks",
            "type": "Array<WorkingWeek>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeWorkingPatternWithWorkingWeeks.attributeTypeMap;
    }
}

