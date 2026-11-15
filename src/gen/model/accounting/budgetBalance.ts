
export class BudgetBalance {
    /**
    * Period the amount applies to (e.g. “2019-08”)
    */
    'period'?: string;
    /**
    * LineItem Quantity
    */
    'amount'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "period",
            "baseName": "Period",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "Amount",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return BudgetBalance.attributeTypeMap;
    }
}

