
export class EmployeeOpeningBalance {
    /**
    * The opening balance period end date.
    */
    'periodEndDate'?: string;
    /**
    * The paid number of days.
    */
    'daysPaid'?: number;
    /**
    * The number of unpaid weeks.
    */
    'unpaidWeeks'?: number;
    /**
    * The gross earnings during the period.
    */
    'grossEarnings'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "periodEndDate",
            "baseName": "periodEndDate",
            "type": "string"
        },
        {
            "name": "daysPaid",
            "baseName": "daysPaid",
            "type": "number"
        },
        {
            "name": "unpaidWeeks",
            "baseName": "unpaidWeeks",
            "type": "number"
        },
        {
            "name": "grossEarnings",
            "baseName": "grossEarnings",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return EmployeeOpeningBalance.attributeTypeMap;
    }
}

