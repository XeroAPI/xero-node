import { PayOutType } from '././payOutType';

export class LeaveEarningsLine {
    /**
    * Xero identifier
    */
    'earningsRateID'?: string;
    /**
    * Rate per unit of the EarningsLine.
    */
    'ratePerUnit'?: number;
    /**
    * Earnings rate number of units.
    */
    'numberOfUnits'?: number;
    'payOutType'?: PayOutType;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "earningsRateID",
            "baseName": "EarningsRateID",
            "type": "string"
        },
        {
            "name": "ratePerUnit",
            "baseName": "RatePerUnit",
            "type": "number"
        },
        {
            "name": "numberOfUnits",
            "baseName": "NumberOfUnits",
            "type": "number"
        },
        {
            "name": "payOutType",
            "baseName": "PayOutType",
            "type": "PayOutType"
        }    ];

    static getAttributeTypeMap() {
        return LeaveEarningsLine.attributeTypeMap;
    }
}

