
/**
* Data transfer object for public create usage end point
*/
export class CreateUsageRecord {
    /**
    * The initial quantity for the usage record. Must be a whole number that is greater than or equal to 0
    */
    'quantity': number;
    /**
    * DateTime in UTC of when the the product was consumed/used
    */
    'timestamp': Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "quantity",
            "baseName": "quantity",
            "type": "number"
        },
        {
            "name": "timestamp",
            "baseName": "timestamp",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return CreateUsageRecord.attributeTypeMap;
    }
}

