import { NICategoryLetter } from '././nICategoryLetter';
import { NICategoryOneOf } from '././nICategoryOneOf';
import { NICategoryOneOf1 } from '././nICategoryOneOf1';

export class NICategory {
    /**
    * The start date of the NI category (YYYY-MM-DD)
    */
    'startDate'?: string;
    'niCategory': NICategoryLetter;
    /**
    * Xero unique identifier for the NI category
    */
    'niCategoryID'?: number;
    /**
    * The date in which the employee was first employed as a civilian (YYYY-MM-DD)
    */
    'dateFirstEmployedAsCivilian'?: string;
    /**
    * The workplace postcode
    */
    'workplacePostcode': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "niCategory",
            "baseName": "niCategory",
            "type": "NICategoryLetter"
        },
        {
            "name": "niCategoryID",
            "baseName": "niCategoryID",
            "type": "number"
        },
        {
            "name": "dateFirstEmployedAsCivilian",
            "baseName": "dateFirstEmployedAsCivilian",
            "type": "string"
        },
        {
            "name": "workplacePostcode",
            "baseName": "workplacePostcode",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return NICategory.attributeTypeMap;
    }
}

export namespace NICategory {
}
