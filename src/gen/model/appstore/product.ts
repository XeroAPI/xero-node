
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
    * The pricing model of the product: * FIXED: Customers are charged a fixed amount for each billing period * PER_SEAT: Customers are charged based on the number of units they purchase 
    */
    'type'?: Product.TypeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "Product.TypeEnum"
        }    ];

    static getAttributeTypeMap() {
        return Product.attributeTypeMap;
    }
}

export namespace Product {
    export enum TypeEnum {
        FIXED = <any> 'FIXED',
        PERSEAT = <any> 'PER_SEAT'
    }
}
