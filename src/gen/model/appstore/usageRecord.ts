
export class UsageRecord {
    /**
    * The quantity recorded
    */
    'quantity': number;
    /**
    * The unique identifier of the Subscription.
    */
    'subscriptionId': string;
    /**
    * The unique identifier of the SubscriptionItem.
    */
    'subscriptionItemId': string;
    /**
    * If the subscription is a test subscription
    */
    'testMode': boolean;
    /**
    * The time when this usage was recorded in UTC
    */
    'recordedAt': Date;
    /**
    * The unique identifier of the usageRecord.
    */
    'usageRecordId': string;
    /**
    * The price per unit
    */
    'pricePerUnit': number;
    /**
    * The unique identifier of the linked Product
    */
    'productId': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "quantity",
            "baseName": "quantity",
            "type": "number"
        },
        {
            "name": "subscriptionId",
            "baseName": "subscriptionId",
            "type": "string"
        },
        {
            "name": "subscriptionItemId",
            "baseName": "subscriptionItemId",
            "type": "string"
        },
        {
            "name": "testMode",
            "baseName": "testMode",
            "type": "boolean"
        },
        {
            "name": "recordedAt",
            "baseName": "recordedAt",
            "type": "Date"
        },
        {
            "name": "usageRecordId",
            "baseName": "usageRecordId",
            "type": "string"
        },
        {
            "name": "pricePerUnit",
            "baseName": "pricePerUnit",
            "type": "number"
        },
        {
            "name": "productId",
            "baseName": "productId",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return UsageRecord.attributeTypeMap;
    }
}

