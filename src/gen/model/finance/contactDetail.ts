import { ContactTotalDetail } from '././contactTotalDetail';
import { ContactTotalOther } from '././contactTotalOther';

export class ContactDetail {
    /**
    * ID of the contact associated with the transactions.    Transactions with no contact will be grouped under the special ID: 86793108-198C-46D8-90A3-43C1D12686CE.    Transactions that are receive or spend bank transfers will be grouped under the special ID: 207322B3-6A58-4BE7-80F1-430123914AD6
    */
    'contactId'?: string;
    /**
    * Name of the contact associated with the transactions.    If no contact is associated with the transactions this will appear as “None Provided”,    For receive or spend bank transfer transactions, this will appear as “Bank Transfer”.
    */
    'name'?: string;
    /**
    * Total value for the contact
    */
    'total'?: number;
    'totalDetail'?: ContactTotalDetail;
    'totalOther'?: ContactTotalOther;
    /**
    * A list of account codes involved in transactions.
    */
    'accountCodes'?: Array<string>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "contactId",
            "baseName": "contactId",
            "type": "string"
        },
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
            "name": "totalDetail",
            "baseName": "totalDetail",
            "type": "ContactTotalDetail"
        },
        {
            "name": "totalOther",
            "baseName": "totalOther",
            "type": "ContactTotalOther"
        },
        {
            "name": "accountCodes",
            "baseName": "accountCodes",
            "type": "Array<string>"
        }    ];

    static getAttributeTypeMap() {
        return ContactDetail.attributeTypeMap;
    }
}

