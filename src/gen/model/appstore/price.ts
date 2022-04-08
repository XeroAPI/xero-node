
export class Price {
    /**
    * The net (before tax) amount.
    */
    'amount': number;
    /**
    * The currency of the price.
    */
    'currency': string;
    /**
    * The unique identifier of the price.
    */
    'id': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }        {
            "name": "currency",
            "baseName": "currency",
            "type": "string"
        }        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Price.attributeTypeMap;
    }
}

