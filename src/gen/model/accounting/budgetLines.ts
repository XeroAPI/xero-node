
export class BudgetLines {
    /**
    * Period the amount applies to (e.g. “2019-08”)
    */
    'period'?: string;
    /**
    * LineItem Quantity
    */
    'amount'?: number;
    /**
    * Budgeted amount
    */
    'unitAmount'?: number;
    /**
    * Any footnotes associated with this balance
    */
    'notes'?: string;

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
        },
        {
            "name": "unitAmount",
            "baseName": "UnitAmount",
            "type": "number"
        },
        {
            "name": "notes",
            "baseName": "Notes",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return BudgetLines.attributeTypeMap;
    }
}

