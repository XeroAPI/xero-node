import { Plan } from '././plan';

export class Subscription {
    /**
    * End of the current period that the subscription has been invoiced for. 
    */
    'currentPeriodEnd': Date;
    /**
    * If the subscription has been canceled, this is the date when the subscription ends. If null, the subscription is active and has not been cancelled
    */
    'endDate'?: Date;
    /**
    * The unique identifier of the subscription
    */
    'id': string;
    /**
    * The Xero generated unique identifier for the organisation
    */
    'organisationId': string;
    /**
    * List of plans for the subscription.
    */
    'plans': Array<Plan>;
    /**
    * Date when the subscription was first created.
    */
    'startDate': Date;
    /**
    * Status of the subscription. Available statuses are ACTIVE, CANCELED, and PAST_DUE.
    */
    'status': Subscription.StatusEnum;
    /**
    * Boolean used to indicate if the subscription is in test mode
    */
    'testMode'?: boolean;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "currentPeriodEnd",
            "baseName": "currentPeriodEnd",
            "type": "Date"
        }        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "Date"
        }        {
            "name": "id",
            "baseName": "id",
            "type": "string"
        }        {
            "name": "organisationId",
            "baseName": "organisationId",
            "type": "string"
        }        {
            "name": "plans",
            "baseName": "plans",
            "type": "Array<Plan>"
        }        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "Date"
        }        {
            "name": "status",
            "baseName": "status",
            "type": "Subscription.StatusEnum"
        }        {
            "name": "testMode",
            "baseName": "testMode",
            "type": "boolean"
        }    ];

    static getAttributeTypeMap() {
        return Subscription.attributeTypeMap;
    }
}

export namespace Subscription {
    export enum StatusEnum {
        Active = <any> 'ACTIVE',
        Canceled = <any> 'CANCELED',
        PastDue = <any> 'PAST_DUE'
    }
}
