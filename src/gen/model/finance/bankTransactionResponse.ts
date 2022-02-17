import { ContactResponse } from '././contactResponse';
import { LineItemResponse } from '././lineItemResponse';

export class BankTransactionResponse {
    /**
    * Xero Identifier of transaction
    */
    'bankTransactionId'?: string;
    /**
    * Xero Identifier of batch payment. Present if the transaction is part of a batch.
    */
    'batchPaymentId'?: string;
    'contact'?: ContactResponse;
    /**
    * Date of transaction - YYYY-MM-DD
    */
    'date'?: Date;
    /**
    * Amount of transaction
    */
    'amount'?: number;
    /**
    * The LineItems element can contain any number of individual LineItem sub-elements. Not included in summary mode
    */
    'lineItems'?: Array<LineItemResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "bankTransactionId",
            "baseName": "bankTransactionId",
            "type": "string"
        },
        {
            "name": "batchPaymentId",
            "baseName": "batchPaymentId",
            "type": "string"
        },
        {
            "name": "contact",
            "baseName": "contact",
            "type": "ContactResponse"
        },
        {
            "name": "date",
            "baseName": "date",
            "type": "Date"
        },
        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        },
        {
            "name": "lineItems",
            "baseName": "lineItems",
            "type": "Array<LineItemResponse>"
        }    ];

    static getAttributeTypeMap() {
        return BankTransactionResponse.attributeTypeMap;
    }
}

