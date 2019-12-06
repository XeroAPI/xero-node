import { ValidationError } from './validationError';
export declare class PaymentService {
    'paymentServiceID'?: string;
    'paymentServiceName'?: string;
    'paymentServiceUrl'?: string;
    'payNowText'?: string;
    'paymentServiceType'?: string;
    'validationErrors'?: Array<ValidationError>;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
