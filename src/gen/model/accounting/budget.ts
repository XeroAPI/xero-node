import { BudgetLines } from '././budgetLines';
import { TrackingCategory } from '././trackingCategory';

export class Budget {
    /**
    * Xero identifier
    */
    'budgetID'?: string;
    /**
    * Type of Budget. OVERALL or TRACKING
    */
    'type'?: Budget.TypeEnum;
    /**
    * The Budget description
    */
    'description'?: string;
    /**
    * UTC timestamp of last update to budget
    */
    'updatedDateUTC'?: Date;
    'budgetLines'?: BudgetLines;
    'tracking'?: TrackingCategory;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "budgetID",
            "baseName": "BudgetID",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "Type",
            "type": "Budget.TypeEnum"
        },
        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "budgetLines",
            "baseName": "BudgetLines",
            "type": "BudgetLines"
        },
        {
            "name": "tracking",
            "baseName": "Tracking",
            "type": "TrackingCategory"
        }    ];

    static getAttributeTypeMap() {
        return Budget.attributeTypeMap;
    }
}

export namespace Budget {
    export enum TypeEnum {
        OVERALL = <any> 'OVERALL',
        TRACKING = <any> 'TRACKING'
    }
}
