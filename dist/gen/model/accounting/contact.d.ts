import { Address } from './address';
import { Attachment } from './attachment';
import { Balances } from './balances';
import { BatchPaymentDetails } from './batchPaymentDetails';
import { BrandingTheme } from './brandingTheme';
import { ContactGroup } from './contactGroup';
import { ContactPerson } from './contactPerson';
import { CurrencyCode } from './currencyCode';
import { PaymentTerm } from './paymentTerm';
import { Phone } from './phone';
import { SalesTrackingCategory } from './salesTrackingCategory';
import { ValidationError } from './validationError';
export declare class Contact {
    'contactID'?: string;
    'contactNumber'?: string;
    'accountNumber'?: string;
    'contactStatus'?: Contact.ContactStatusEnum;
    'name'?: string;
    'firstName'?: string;
    'lastName'?: string;
    'emailAddress'?: string;
    'skypeUserName'?: string;
    'contactPersons'?: Array<ContactPerson>;
    'bankAccountDetails'?: string;
    'taxNumber'?: string;
    'accountsReceivableTaxType'?: string;
    'accountsPayableTaxType'?: string;
    'addresses'?: Array<Address>;
    'phones'?: Array<Phone>;
    'isSupplier'?: boolean;
    'isCustomer'?: boolean;
    'defaultCurrency'?: CurrencyCode;
    'xeroNetworkKey'?: string;
    'salesDefaultAccountCode'?: string;
    'purchasesDefaultAccountCode'?: string;
    'salesTrackingCategories'?: Array<SalesTrackingCategory>;
    'purchasesTrackingCategories'?: Array<SalesTrackingCategory>;
    'trackingCategoryName'?: string;
    'trackingCategoryOption'?: string;
    'paymentTerms'?: PaymentTerm;
    'updatedDateUTC'?: Date;
    'contactGroups'?: Array<ContactGroup>;
    'website'?: string;
    'brandingTheme'?: BrandingTheme;
    'batchPayments'?: BatchPaymentDetails;
    'discount'?: number;
    'balances'?: Balances;
    'attachments'?: Array<Attachment>;
    'hasAttachments'?: boolean;
    'validationErrors'?: Array<ValidationError>;
    'hasValidationErrors'?: boolean;
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
export declare namespace Contact {
    enum ContactStatusEnum {
        ACTIVE,
        ARCHIVED,
        GDPRREQUEST
    }
}
