import { CashflowType } from '././cashflowType';

export class CashflowActivity {
    /**
    * Name of the cashflow activity type. It will be either Operating Activities, Investing Activities or Financing Activities
    */
    'name'?: string;
    /**
    * Total value of the activity type
    */
    'total'?: number;
    'cashflowTypes'?: Array<CashflowType>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "name",
            "baseName": "name",
            "type": "string"
        },
        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        },
        {
            "name": "cashflowTypes",
            "baseName": "cashflowTypes",
            "type": "Array<CashflowType>"
        }    ];

    static getAttributeTypeMap() {
        return CashflowActivity.attributeTypeMap;
    }
}

