
export class TotalOther {
    /**
    * Total outstanding invoice value within the period where the invoices are more than 90 days old
    */
    'totalOutstandingAged'?: number;
    /**
    * Total voided value.
    */
    'totalVoided'?: number;
    /**
    * Total credited value.
    */
    'totalCredited'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "totalOutstandingAged",
            "baseName": "totalOutstandingAged",
            "type": "number"
        }        {
            "name": "totalVoided",
            "baseName": "totalVoided",
            "type": "number"
        }        {
            "name": "totalCredited",
            "baseName": "totalCredited",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return TotalOther.attributeTypeMap;
    }
}

