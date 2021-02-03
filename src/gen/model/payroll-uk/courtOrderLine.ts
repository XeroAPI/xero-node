
export class CourtOrderLine {
    /**
    * Xero identifier for payroll court order type
    */
    'courtOrderTypeID'?: string;
    /**
    * Amount
    */
    'amount'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "courtOrderTypeID",
            "baseName": "courtOrderTypeID",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return CourtOrderLine.attributeTypeMap;
    }
}

