import { WorkingWeek } from '././workingWeek';

export class EmployeeWorkingPatternWithWorkingWeeksRequest {
    /**
    * The effective date of the corresponding salary and wages
    */
    'effectiveFrom': string;
    'workingWeeks': Array<WorkingWeek>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
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
        return EmployeeWorkingPatternWithWorkingWeeksRequest.attributeTypeMap;
    }
}

