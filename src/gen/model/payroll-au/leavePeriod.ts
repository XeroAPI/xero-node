import { LeavePeriodStatus } from '././leavePeriodStatus';

export class LeavePeriod {
    /**
    * The Number of Units for the leave
    */
    'numberOfUnits'?: number;
    /**
    * The Pay Period End Date (YYYY-MM-DD)
    */
    'payPeriodEndDate'?: string;
    /**
    * The Pay Period Start Date (YYYY-MM-DD)
    */
    'payPeriodStartDate'?: string;
    'leavePeriodStatus'?: LeavePeriodStatus;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "numberOfUnits",
            "baseName": "NumberOfUnits",
            "type": "number"
        },
        {
            "name": "payPeriodEndDate",
            "baseName": "PayPeriodEndDate",
            "type": "string"
        },
        {
            "name": "payPeriodStartDate",
            "baseName": "PayPeriodStartDate",
            "type": "string"
        },
        {
            "name": "leavePeriodStatus",
            "baseName": "LeavePeriodStatus",
            "type": "LeavePeriodStatus"
        }    ];

    static getAttributeTypeMap() {
        return LeavePeriod.attributeTypeMap;
    }
}

