import { Product } from '././product';

export class SubscriptionItem {
    /**
    * Date when the subscription to this product will end
    */
    'endDate'?: Date;
    /**
    * The unique identifier of the subscription item.
    */
    'id': string;
    /**
    * The price of the product subscribed to.
    */
    'price': number;
    'product': Product;
    /**
    * Date the subscription started, or will start. Note: this could be in the future for downgrades or reduced number of seats that haven\'t taken effect yet. 
    */
    'startDate': Date;
    /**
    * If the subscription is a test subscription
    */
    'testMode'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "Date"
        },
        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        },
        {
            "name": "price",
            "baseName": "price",
            "type": "number"
        },
        {
            "name": "product",
            "baseName": "product",
            "type": "Product"
        },
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "Date"
        },
        {
            "name": "testMode",
            "baseName": "testMode",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return SubscriptionItem.attributeTypeMap;
    }
}

