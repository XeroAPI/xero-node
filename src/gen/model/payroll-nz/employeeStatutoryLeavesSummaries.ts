import { EmployeeStatutoryLeaveSummary } from '././employeeStatutoryLeaveSummary';
import { Pagination } from '././pagination';
import { Problem } from '././problem';

export class EmployeeStatutoryLeavesSummaries {
    'pagination'?: Pagination;
    'problem'?: Problem;
    'statutoryLeaves'?: Array<EmployeeStatutoryLeaveSummary>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "pagination",
            "baseName": "pagination",
            "type": "Pagination"
        }        {
            "name": "problem",
            "baseName": "problem",
            "type": "Problem"
        }        {
            "name": "statutoryLeaves",
            "baseName": "statutoryLeaves",
            "type": "Array<EmployeeStatutoryLeaveSummary>"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeStatutoryLeavesSummaries.attributeTypeMap;
    }
}

