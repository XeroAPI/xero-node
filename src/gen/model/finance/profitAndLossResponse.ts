import { PnlAccountClass } from '././pnlAccountClass';

export class ProfitAndLossResponse {
    /**
    * Start date of the report
    */
    'startDate'?: string;
    /**
    * End date of the report
    */
    'endDate'?: string;
    /**
    * Net profit loss value
    */
    'netProfitLoss'?: number;
    'revenue'?: PnlAccountClass;
    'expense'?: PnlAccountClass;

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
            "name": "netProfitLoss",
            "baseName": "netProfitLoss",
            "type": "number"
        }        {
            "name": "revenue",
            "baseName": "revenue",
            "type": "PnlAccountClass"
        }        {
            "name": "expense",
            "baseName": "expense",
            "type": "PnlAccountClass"
        }    ];

    static getAttributeTypeMap() {
        return ProfitAndLossResponse.attributeTypeMap;
    }
}

