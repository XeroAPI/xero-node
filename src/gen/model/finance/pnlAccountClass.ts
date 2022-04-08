import { PnlAccountType } from '././pnlAccountType';

export class PnlAccountClass {
    /**
    * Total revenue/expense value
    */
    'total'?: number;
    /**
    * Contains trading income and other income for revenue section / operating expenses and direct cost for expense section if the data is available for each section. Refer to the account type element below
    */
    'accountTypes'?: Array<PnlAccountType>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        },
        {
            "name": "accountTypes",
            "baseName": "accountTypes",
            "type": "Array<PnlAccountType>"
        }    ];

    static getAttributeTypeMap() {
        return PnlAccountClass.attributeTypeMap;
    }
}

