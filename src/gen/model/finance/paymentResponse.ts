import { CreditNoteResponse } from '././creditNoteResponse';
import { InvoiceResponse } from '././invoiceResponse';
import { OverpaymentResponse } from '././overpaymentResponse';
import { PrepaymentResponse } from '././prepaymentResponse';

export class PaymentResponse {
    /**
    * Xero Identifier of payment
    */
    'paymentId'?: string;
    /**
    * Xero Identifier of batch payment. Present if the payment was created as part of a batch.
    */
    'batchPaymentId'?: string;
    /**
    * Date the payment is being made (YYYY-MM-DD) e.g. 2009-09-06
    */
    'date'?: string;
    /**
    * The amount of the payment
    */
    'amount'?: number;
    /**
    * The bank amount of the payment
    */
    'bankAmount'?: number;
    /**
    * Exchange rate when payment is received. Only used for non base currency invoices and credit notes e.g. 0.7500
    */
    'currencyRate'?: number;
    'invoice'?: InvoiceResponse;
    'creditNote'?: CreditNoteResponse;
    'prepayment'?: PrepaymentResponse;
    'overpayment'?: OverpaymentResponse;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "paymentId",
            "baseName": "paymentId",
            "type": "string"
        }        {
            "name": "batchPaymentId",
            "baseName": "batchPaymentId",
            "type": "string"
        }        {
            "name": "date",
            "baseName": "date",
            "type": "string"
        }        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }        {
            "name": "bankAmount",
            "baseName": "bankAmount",
            "type": "number"
        }        {
            "name": "currencyRate",
            "baseName": "currencyRate",
            "type": "number"
        }        {
            "name": "invoice",
            "baseName": "invoice",
            "type": "InvoiceResponse"
        }        {
            "name": "creditNote",
            "baseName": "creditNote",
            "type": "CreditNoteResponse"
        }        {
            "name": "prepayment",
            "baseName": "prepayment",
            "type": "PrepaymentResponse"
        }        {
            "name": "overpayment",
            "baseName": "overpayment",
            "type": "OverpaymentResponse"
        }    ];

    static getAttributeTypeMap() {
        return PaymentResponse.attributeTypeMap;
    }
}

