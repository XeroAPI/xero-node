
export class Product {
    /**
    * The unique identifier for the product
    */
    'id'?: string;
    /**
    * The name of the product
    */
    'name'?: string;
    /**
    * The unit of the per seat product. e.g. \"user\", \"organisation\", \"SMS\", etc
    */
    'seatUnit'?: string;
    /**
    * The pricing model of the product: * FIXED: Customers are charged a fixed amount for each billing period * PER_SEAT: Customers are charged based on the number of units they purchase * METERED: Customers are charged per use of this product 
    */
    'type'?: Product.TypeEnum;
    /**
    * The unit of the usage product. e.g. \"user\", \"minutes\", \"SMS\", etc
    */
    'usageUnit'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        }        {
            "name": "seatUnit",
            "baseName": "seatUnit",
            "type": "string"
        }        {
            "name": "type",
            "baseName": "type",
            "type": "Product.TypeEnum"
        }        {
            "name": "usageUnit",
            "baseName": "usageUnit",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Product.attributeTypeMap;
    }
}

export namespace Product {
    export enum TypeEnum {
        Fixed = <any> 'FIXED',
        PerSeat = <any> 'PER_SEAT',
        Metered = <any> 'METERED'
    }
}
