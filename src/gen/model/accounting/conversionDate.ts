
/**
* The date when the organisation starts using Xero
*/
export class ConversionDate {
    /**
    * The month the organisation starts using Xero. Value is an integer between 1 and 12
    */
    'month'?: number;
    /**
    * The year the organisation starts using Xero. Value is an integer greater than 2006
    */
    'year'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "month",
            "baseName": "Month",
            "type": "number"
        },
        {
            "name": "year",
            "baseName": "Year",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return ConversionDate.attributeTypeMap;
    }
}

