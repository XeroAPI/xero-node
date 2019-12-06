"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Contact {
    static getAttributeTypeMap() {
        return Contact.attributeTypeMap;
    }
}
exports.Contact = Contact;
Contact.discriminator = undefined;
Contact.attributeTypeMap = [
    {
        "name": "contactID",
        "baseName": "ContactID",
        "type": "string"
    },
    {
        "name": "contactNumber",
        "baseName": "ContactNumber",
        "type": "string"
    },
    {
        "name": "accountNumber",
        "baseName": "AccountNumber",
        "type": "string"
    },
    {
        "name": "contactStatus",
        "baseName": "ContactStatus",
        "type": "Contact.ContactStatusEnum"
    },
    {
        "name": "name",
        "baseName": "Name",
        "type": "string"
    },
    {
        "name": "firstName",
        "baseName": "FirstName",
        "type": "string"
    },
    {
        "name": "lastName",
        "baseName": "LastName",
        "type": "string"
    },
    {
        "name": "emailAddress",
        "baseName": "EmailAddress",
        "type": "string"
    },
    {
        "name": "skypeUserName",
        "baseName": "SkypeUserName",
        "type": "string"
    },
    {
        "name": "contactPersons",
        "baseName": "ContactPersons",
        "type": "Array<ContactPerson>"
    },
    {
        "name": "bankAccountDetails",
        "baseName": "BankAccountDetails",
        "type": "string"
    },
    {
        "name": "taxNumber",
        "baseName": "TaxNumber",
        "type": "string"
    },
    {
        "name": "accountsReceivableTaxType",
        "baseName": "AccountsReceivableTaxType",
        "type": "string"
    },
    {
        "name": "accountsPayableTaxType",
        "baseName": "AccountsPayableTaxType",
        "type": "string"
    },
    {
        "name": "addresses",
        "baseName": "Addresses",
        "type": "Array<Address>"
    },
    {
        "name": "phones",
        "baseName": "Phones",
        "type": "Array<Phone>"
    },
    {
        "name": "isSupplier",
        "baseName": "IsSupplier",
        "type": "boolean"
    },
    {
        "name": "isCustomer",
        "baseName": "IsCustomer",
        "type": "boolean"
    },
    {
        "name": "defaultCurrency",
        "baseName": "DefaultCurrency",
        "type": "CurrencyCode"
    },
    {
        "name": "xeroNetworkKey",
        "baseName": "XeroNetworkKey",
        "type": "string"
    },
    {
        "name": "salesDefaultAccountCode",
        "baseName": "SalesDefaultAccountCode",
        "type": "string"
    },
    {
        "name": "purchasesDefaultAccountCode",
        "baseName": "PurchasesDefaultAccountCode",
        "type": "string"
    },
    {
        "name": "salesTrackingCategories",
        "baseName": "SalesTrackingCategories",
        "type": "Array<SalesTrackingCategory>"
    },
    {
        "name": "purchasesTrackingCategories",
        "baseName": "PurchasesTrackingCategories",
        "type": "Array<SalesTrackingCategory>"
    },
    {
        "name": "trackingCategoryName",
        "baseName": "TrackingCategoryName",
        "type": "string"
    },
    {
        "name": "trackingCategoryOption",
        "baseName": "TrackingCategoryOption",
        "type": "string"
    },
    {
        "name": "paymentTerms",
        "baseName": "PaymentTerms",
        "type": "PaymentTerm"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    },
    {
        "name": "contactGroups",
        "baseName": "ContactGroups",
        "type": "Array<ContactGroup>"
    },
    {
        "name": "website",
        "baseName": "Website",
        "type": "string"
    },
    {
        "name": "brandingTheme",
        "baseName": "BrandingTheme",
        "type": "BrandingTheme"
    },
    {
        "name": "batchPayments",
        "baseName": "BatchPayments",
        "type": "BatchPaymentDetails"
    },
    {
        "name": "discount",
        "baseName": "Discount",
        "type": "number"
    },
    {
        "name": "balances",
        "baseName": "Balances",
        "type": "Balances"
    },
    {
        "name": "attachments",
        "baseName": "Attachments",
        "type": "Array<Attachment>"
    },
    {
        "name": "hasAttachments",
        "baseName": "HasAttachments",
        "type": "boolean"
    },
    {
        "name": "validationErrors",
        "baseName": "ValidationErrors",
        "type": "Array<ValidationError>"
    },
    {
        "name": "hasValidationErrors",
        "baseName": "HasValidationErrors",
        "type": "boolean"
    }
];
(function (Contact) {
    let ContactStatusEnum;
    (function (ContactStatusEnum) {
        ContactStatusEnum[ContactStatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        ContactStatusEnum[ContactStatusEnum["ARCHIVED"] = 'ARCHIVED'] = "ARCHIVED";
        ContactStatusEnum[ContactStatusEnum["GDPRREQUEST"] = 'GDPRREQUEST'] = "GDPRREQUEST";
    })(ContactStatusEnum = Contact.ContactStatusEnum || (Contact.ContactStatusEnum = {}));
})(Contact = exports.Contact || (exports.Contact = {}));
//# sourceMappingURL=contact.js.map