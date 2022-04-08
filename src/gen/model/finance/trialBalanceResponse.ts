import { TrialBalanceAccount } from '././trialBalanceAccount';

export class TrialBalanceResponse {
    /**
    * Start date of the report
    */
    'startDate'?: string;
    /**
    * End date of the report
    */
    'endDate'?: string;
    /**
    * Refer to the accounts section below
    */
    'accounts'?: Array<TrialBalanceAccount>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        }        {
            "name": "endDate",
            "baseName": "endDate",
            "type": "string"
        }        {
            "name": "accounts",
            "baseName": "accounts",
            "type": "Array<TrialBalanceAccount>"
        }    ];

    static getAttributeTypeMap() {
        return TrialBalanceResponse.attributeTypeMap;
    }
}

