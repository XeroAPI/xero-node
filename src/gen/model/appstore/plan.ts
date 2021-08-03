import { SubscriptionItem } from '././subscriptionItem';

export class Plan {
    /**
    * The unique identifier of the plan
    */
    'id': string;
    /**
    * The name of the plan. It is used in the invoice line item description. 
    */
    'name': string;
    /**
    * Status of the plan. Available statuses are ACTIVE, PENDING_ACTIVATION. 
    */
    'status': Plan.StatusEnum;
    /**
    * List of the subscription items belonging to the plan. It does not include cancelled subscription items. 
    */
    'subscriptionItems': Array<SubscriptionItem>;

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
            "name": "status",
            "baseName": "status",
            "type": "Plan.StatusEnum"
        },
        {
            "name": "subscriptionItems",
            "baseName": "subscriptionItems",
            "type": "Array<SubscriptionItem>"
        }    ];

    static getAttributeTypeMap() {
        return Plan.attributeTypeMap;
    }
}

export namespace Plan {
    export enum StatusEnum {
        ACTIVE = <any> 'ACTIVE',
        PENDINGACTIVATION = <any> 'PENDING_ACTIVATION'
    }
}
