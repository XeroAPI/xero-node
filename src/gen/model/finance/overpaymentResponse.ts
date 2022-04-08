import { ContactResponse } from '././contactResponse';
import { LineItemResponse } from '././lineItemResponse';

export class OverpaymentResponse {
    /**
    * Xero Identifier of overpayment
    */
    'overpaymentId'?: string;
    'contact'?: ContactResponse;
    /**
    * Total of Invoice tax inclusive (i.e. SubTotal + TotalTax); Not included in summary mode
    */
    'total'?: number;
    /**
    * Not included in summary mode
    */
    'lineItems'?: Array<LineItemResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "overpaymentId",
            "baseName": "overpaymentId",
            "type": "string"
        }        {
            "name": "contact",
            "baseName": "contact",
            "type": "ContactResponse"
        }        {
            "name": "total",
            "baseName": "total",
            "type": "number"
        }        {
            "name": "lineItems",
            "baseName": "lineItems",
            "type": "Array<LineItemResponse>"
        }    ];

    static getAttributeTypeMap() {
        return OverpaymentResponse.attributeTypeMap;
    }
}

