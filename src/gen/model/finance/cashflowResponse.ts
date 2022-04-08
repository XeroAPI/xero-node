import { CashBalance } from '././cashBalance';
import { CashflowActivity } from '././cashflowActivity';

export class CashflowResponse {
    /**
    * Start date of the report
    */
    'startDate'?: string;
    /**
    * End date of the report
    */
    'endDate'?: string;
    'cashBalance'?: CashBalance;
    /**
    * Break down of cash and cash equivalents for the period
    */
    'cashflowActivities'?: Array<CashflowActivity>;

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
            "name": "cashBalance",
            "baseName": "cashBalance",
            "type": "CashBalance"
        }        {
            "name": "cashflowActivities",
            "baseName": "cashflowActivities",
            "type": "Array<CashflowActivity>"
        }    ];

    static getAttributeTypeMap() {
        return CashflowResponse.attributeTypeMap;
    }
}

