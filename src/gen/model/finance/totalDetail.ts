
export class TotalDetail {
    /**
    * Total paid invoice and cash value within the period.
    */
    'totalPaid'?: number;
    /**
    * Total outstanding invoice value within the period.
    */
    'totalOutstanding'?: number;
    /**
    * Total unapplied credited value within the period.
    */
    'totalCreditedUnApplied'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "totalPaid",
            "baseName": "totalPaid",
            "type": "number"
        },
        {
            "name": "totalOutstanding",
            "baseName": "totalOutstanding",
            "type": "number"
        },
        {
            "name": "totalCreditedUnApplied",
            "baseName": "totalCreditedUnApplied",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return TotalDetail.attributeTypeMap;
    }
}

