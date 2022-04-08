
export class EmployeeStatutoryLeaveBalance {
    /**
    * The type of statutory leave
    */
    'leaveType'?: EmployeeStatutoryLeaveBalance.LeaveTypeEnum;
    /**
    * The balance remaining for the corresponding leave type as of specified date.
    */
    'balanceRemaining'?: number;
    /**
    * The units will be \"Hours\"
    */
    'units'?: EmployeeStatutoryLeaveBalance.UnitsEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveType",
            "baseName": "leaveType",
            "type": "EmployeeStatutoryLeaveBalance.LeaveTypeEnum"
        }        {
            "name": "balanceRemaining",
            "baseName": "balanceRemaining",
            "type": "number"
        }        {
            "name": "units",
            "baseName": "units",
            "type": "EmployeeStatutoryLeaveBalance.UnitsEnum"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeStatutoryLeaveBalance.attributeTypeMap;
    }
}

export namespace EmployeeStatutoryLeaveBalance {
    export enum LeaveTypeEnum {
        Sick = <any> 'Sick',
        Adoption = <any> 'Adoption',
        Maternity = <any> 'Maternity',
        Paternity = <any> 'Paternity',
        Sharedparental = <any> 'Sharedparental'
    }
    export enum UnitsEnum {
        Hours = <any> 'Hours'
    }
}
