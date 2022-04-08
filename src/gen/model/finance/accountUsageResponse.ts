import { AccountUsage } from '././accountUsage';

export class AccountUsageResponse {
    /**
    * The requested Organisation to which the data pertains
    */
    'organisationId'?: string;
    /**
    * The start month of the report
    */
    'startMonth'?: string;
    /**
    * The end month of the report
    */
    'endMonth'?: string;
    'accountUsage'?: Array<AccountUsage>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "organisationId",
            "baseName": "organisationId",
            "type": "string"
        },
        {
            "name": "startMonth",
            "baseName": "startMonth",
            "type": "string"
        },
        {
            "name": "endMonth",
            "baseName": "endMonth",
            "type": "string"
        },
        {
            "name": "accountUsage",
            "baseName": "accountUsage",
            "type": "Array<AccountUsage>"
        }    ];

    static getAttributeTypeMap() {
        return AccountUsageResponse.attributeTypeMap;
    }
}

