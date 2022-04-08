import { Price } from '././price';
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
    'price': Price;
    'product': Product;
    /**
    * The quantity of the item. For a fixed product, it is 1. For a per-seat product, it is a positive integer. For metered products, it is always null.
    */
    'quantity'?: number;
    /**
    * Date the subscription started, or will start. Note: this could be in the future for downgrades or reduced number of seats that haven\'t taken effect yet. 
    */
    'startDate': Date;
    /**
    * Status of the subscription item. Available statuses are ACTIVE, CANCELED, and PENDING_ACTIVATION. 
    */
    'status': SubscriptionItem.StatusEnum;
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
        }        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }        {
            "name": "price",
            "baseName": "price",
            "type": "Price"
        }        {
            "name": "product",
            "baseName": "product",
            "type": "Product"
        }        {
            "name": "quantity",
            "baseName": "quantity",
            "type": "number"
        }        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "Date"
        }        {
            "name": "status",
            "baseName": "status",
            "type": "SubscriptionItem.StatusEnum"
        }        {
            "name": "testMode",
            "baseName": "testMode",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return SubscriptionItem.attributeTypeMap;
    }
}

export namespace SubscriptionItem {
    export enum StatusEnum {
        Active = <any> 'ACTIVE',
        Canceled = <any> 'CANCELED',
        PendingActivation = <any> 'PENDING_ACTIVATION'
    }
}
