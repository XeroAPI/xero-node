import { LeaveApplication } from '././leaveApplication';

export class LeaveApplications {
    'leaveApplications'?: Array<LeaveApplication>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "leaveApplications",
            "baseName": "LeaveApplications",
            "type": "Array<LeaveApplication>"
        }    ];

    static getAttributeTypeMap() {
        return LeaveApplications.attributeTypeMap;
    }
}

