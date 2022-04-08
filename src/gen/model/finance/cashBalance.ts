
export class CashBalance {
    /**
    * Opening balance of cash and cash equivalents
    */
    'openingCashBalance'?: number;
    /**
    * Closing balance of cash and cash equivalents
    */
    'closingCashBalance'?: number;
    /**
    * Net movement of cash and cash equivalents for the period
    */
    'netCashMovement'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "openingCashBalance",
            "baseName": "openingCashBalance",
            "type": "number"
        }        {
            "name": "closingCashBalance",
            "baseName": "closingCashBalance",
            "type": "number"
        }        {
            "name": "netCashMovement",
            "baseName": "netCashMovement",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return CashBalance.attributeTypeMap;
    }
}

