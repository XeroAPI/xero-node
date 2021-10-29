export * from '././account';
export * from '././accountType';
export * from '././accounts';
export * from '././accountsPayable';
export * from '././accountsReceivable';
export * from '././action';
export * from '././actions';
export * from '././address';
export * from '././addressForOrganisation';
export * from '././allocation';
export * from '././allocations';
export * from '././attachment';
export * from '././attachments';
export * from '././balanceDetails';
export * from '././balances';
export * from '././bankTransaction';
export * from '././bankTransactions';
export * from '././bankTransfer';
export * from '././bankTransfers';
export * from '././batchPayment';
export * from '././batchPaymentDetails';
export * from '././batchPayments';
export * from '././bill';
export * from '././brandingTheme';
export * from '././brandingThemes';
export * from '././budget';
export * from '././budgetBalance';
export * from '././budgetLine';
export * from '././budgets';
export * from '././cISOrgSetting';
export * from '././cISOrgSettings';
export * from '././cISSetting';
export * from '././cISSettings';
export * from '././contact';
export * from '././contactGroup';
export * from '././contactGroups';
export * from '././contactPerson';
export * from '././contacts';
export * from '././conversionBalances';
export * from '././conversionDate';
export * from '././countryCode';
export * from '././creditNote';
export * from '././creditNotes';
export * from '././currencies';
export * from '././currency';
export * from '././currencyCode';
export * from '././element';
export * from '././employee';
export * from '././employees';
export * from '././expenseClaim';
export * from '././expenseClaims';
export * from '././externalLink';
export * from '././historyRecord';
export * from '././historyRecords';
export * from '././importSummary';
export * from '././importSummaryAccounts';
export * from '././importSummaryObject';
export * from '././importSummaryOrganisation';
export * from '././invoice';
export * from '././invoiceReminder';
export * from '././invoiceReminders';
export * from '././invoices';
export * from '././item';
export * from '././items';
export * from '././journal';
export * from '././journalLine';
export * from '././journals';
export * from '././lineAmountTypes';
export * from '././lineItem';
export * from '././lineItemTracking';
export * from '././linkedTransaction';
export * from '././linkedTransactions';
export * from '././manualJournal';
export * from '././manualJournalLine';
export * from '././manualJournals';
export * from '././modelError';
export * from '././onlineInvoice';
export * from '././onlineInvoices';
export * from '././organisation';
export * from '././organisations';
export * from '././overpayment';
export * from '././overpayments';
export * from '././payment';
export * from '././paymentDelete';
export * from '././paymentService';
export * from '././paymentServices';
export * from '././paymentTerm';
export * from '././paymentTermType';
export * from '././payments';
export * from '././phone';
export * from '././prepayment';
export * from '././prepayments';
export * from '././purchase';
export * from '././purchaseOrder';
export * from '././purchaseOrders';
export * from '././quote';
export * from '././quoteLineAmountTypes';
export * from '././quoteStatusCodes';
export * from '././quotes';
export * from '././receipt';
export * from '././receipts';
export * from '././repeatingInvoice';
export * from '././repeatingInvoices';
export * from '././report';
export * from '././reportAttribute';
export * from '././reportCell';
export * from '././reportFields';
export * from '././reportRow';
export * from '././reportRows';
export * from '././reportWithRow';
export * from '././reportWithRows';
export * from '././reports';
export * from '././requestEmpty';
export * from '././rowType';
export * from '././salesTrackingCategory';
export * from '././schedule';
export * from '././setup';
export * from '././taxComponent';
export * from '././taxRate';
export * from '././taxRates';
export * from '././taxType';
export * from '././tenNinetyNineContact';
export * from '././timeZone';
export * from '././trackingCategories';
export * from '././trackingCategory';
export * from '././trackingOption';
export * from '././trackingOptions';
export * from '././user';
export * from '././users';
export * from '././validationError';

import localVarRequest = require('request');

import { Account } from '././account';
import { AccountType } from '././accountType';
import { Accounts } from '././accounts';
import { AccountsPayable } from '././accountsPayable';
import { AccountsReceivable } from '././accountsReceivable';
import { Action } from '././action';
import { Actions } from '././actions';
import { Address } from '././address';
import { AddressForOrganisation } from '././addressForOrganisation';
import { Allocation } from '././allocation';
import { Allocations } from '././allocations';
import { Attachment } from '././attachment';
import { Attachments } from '././attachments';
import { BalanceDetails } from '././balanceDetails';
import { Balances } from '././balances';
import { BankTransaction } from '././bankTransaction';
import { BankTransactions } from '././bankTransactions';
import { BankTransfer } from '././bankTransfer';
import { BankTransfers } from '././bankTransfers';
import { BatchPayment } from '././batchPayment';
import { BatchPaymentDetails } from '././batchPaymentDetails';
import { BatchPayments } from '././batchPayments';
import { Bill } from '././bill';
import { BrandingTheme } from '././brandingTheme';
import { BrandingThemes } from '././brandingThemes';
import { Budget } from '././budget';
import { BudgetBalance } from '././budgetBalance';
import { BudgetLine } from '././budgetLine';
import { Budgets } from '././budgets';
import { CISOrgSetting } from '././cISOrgSetting';
import { CISOrgSettings } from '././cISOrgSettings';
import { CISSetting } from '././cISSetting';
import { CISSettings } from '././cISSettings';
import { Contact } from '././contact';
import { ContactGroup } from '././contactGroup';
import { ContactGroups } from '././contactGroups';
import { ContactPerson } from '././contactPerson';
import { Contacts } from '././contacts';
import { ConversionBalances } from '././conversionBalances';
import { ConversionDate } from '././conversionDate';
import { CountryCode } from '././countryCode';
import { CreditNote } from '././creditNote';
import { CreditNotes } from '././creditNotes';
import { Currencies } from '././currencies';
import { Currency } from '././currency';
import { CurrencyCode } from '././currencyCode';
import { Element } from '././element';
import { Employee } from '././employee';
import { Employees } from '././employees';
import { ExpenseClaim } from '././expenseClaim';
import { ExpenseClaims } from '././expenseClaims';
import { ExternalLink } from '././externalLink';
import { HistoryRecord } from '././historyRecord';
import { HistoryRecords } from '././historyRecords';
import { ImportSummary } from '././importSummary';
import { ImportSummaryAccounts } from '././importSummaryAccounts';
import { ImportSummaryObject } from '././importSummaryObject';
import { ImportSummaryOrganisation } from '././importSummaryOrganisation';
import { Invoice } from '././invoice';
import { InvoiceReminder } from '././invoiceReminder';
import { InvoiceReminders } from '././invoiceReminders';
import { Invoices } from '././invoices';
import { Item } from '././item';
import { Items } from '././items';
import { Journal } from '././journal';
import { JournalLine } from '././journalLine';
import { Journals } from '././journals';
import { LineAmountTypes } from '././lineAmountTypes';
import { LineItem } from '././lineItem';
import { LineItemTracking } from '././lineItemTracking';
import { LinkedTransaction } from '././linkedTransaction';
import { LinkedTransactions } from '././linkedTransactions';
import { ManualJournal } from '././manualJournal';
import { ManualJournalLine } from '././manualJournalLine';
import { ManualJournals } from '././manualJournals';
import { ModelError } from '././modelError';
import { OnlineInvoice } from '././onlineInvoice';
import { OnlineInvoices } from '././onlineInvoices';
import { Organisation } from '././organisation';
import { Organisations } from '././organisations';
import { Overpayment } from '././overpayment';
import { Overpayments } from '././overpayments';
import { Payment } from '././payment';
import { PaymentDelete } from '././paymentDelete';
import { PaymentService } from '././paymentService';
import { PaymentServices } from '././paymentServices';
import { PaymentTerm } from '././paymentTerm';
import { PaymentTermType } from '././paymentTermType';
import { Payments } from '././payments';
import { Phone } from '././phone';
import { Prepayment } from '././prepayment';
import { Prepayments } from '././prepayments';
import { Purchase } from '././purchase';
import { PurchaseOrder } from '././purchaseOrder';
import { PurchaseOrders } from '././purchaseOrders';
import { Quote } from '././quote';
import { QuoteLineAmountTypes } from '././quoteLineAmountTypes';
import { QuoteStatusCodes } from '././quoteStatusCodes';
import { Quotes } from '././quotes';
import { Receipt } from '././receipt';
import { Receipts } from '././receipts';
import { RepeatingInvoice } from '././repeatingInvoice';
import { RepeatingInvoices } from '././repeatingInvoices';
import { Report } from '././report';
import { ReportAttribute } from '././reportAttribute';
import { ReportCell } from '././reportCell';
import { ReportFields } from '././reportFields';
import { ReportRow } from '././reportRow';
import { ReportRows } from '././reportRows';
import { ReportWithRow } from '././reportWithRow';
import { ReportWithRows } from '././reportWithRows';
import { Reports } from '././reports';
import { RequestEmpty } from '././requestEmpty';
import { RowType } from '././rowType';
import { SalesTrackingCategory } from '././salesTrackingCategory';
import { Schedule } from '././schedule';
import { Setup } from '././setup';
import { TaxComponent } from '././taxComponent';
import { TaxRate } from '././taxRate';
import { TaxRates } from '././taxRates';
import { TaxType } from '././taxType';
import { TenNinetyNineContact } from '././tenNinetyNineContact';
import { TimeZone } from '././timeZone';
import { TrackingCategories } from '././trackingCategories';
import { TrackingCategory } from '././trackingCategory';
import { TrackingOption } from '././trackingOption';
import { TrackingOptions } from '././trackingOptions';
import { User } from '././user';
import { Users } from '././users';
import { ValidationError } from '././validationError';

/* tslint:disable:no-unused-variable */
let primitives = [
                    "string",
                    "boolean",
                    "double",
                    "integer",
                    "long",
                    "float",
                    "number",
                    "any"
                 ];
                 
let enumsMap: {[index: string]: any} = {
        "Account.StatusEnum": Account.StatusEnum,
        "Account.BankAccountTypeEnum": Account.BankAccountTypeEnum,
        "Account.ClassEnum": Account.ClassEnum,
        "Account.SystemAccountEnum": Account.SystemAccountEnum,
        "AccountType": AccountType,
        "Action.StatusEnum": Action.StatusEnum,
        "Address.AddressTypeEnum": Address.AddressTypeEnum,
        "AddressForOrganisation.AddressTypeEnum": AddressForOrganisation.AddressTypeEnum,
        "BankTransaction.TypeEnum": BankTransaction.TypeEnum,
        "BankTransaction.StatusEnum": BankTransaction.StatusEnum,
        "BatchPayment.TypeEnum": BatchPayment.TypeEnum,
        "BatchPayment.StatusEnum": BatchPayment.StatusEnum,
        "BrandingTheme.TypeEnum": BrandingTheme.TypeEnum,
        "Budget.TypeEnum": Budget.TypeEnum,
        "Contact.ContactStatusEnum": Contact.ContactStatusEnum,
        "Contact.SalesDefaultLineAmountTypeEnum": Contact.SalesDefaultLineAmountTypeEnum,
        "Contact.PurchasesDefaultLineAmountTypeEnum": Contact.PurchasesDefaultLineAmountTypeEnum,
        "ContactGroup.StatusEnum": ContactGroup.StatusEnum,
        "CountryCode": CountryCode,
        "CreditNote.TypeEnum": CreditNote.TypeEnum,
        "CreditNote.StatusEnum": CreditNote.StatusEnum,
        "CurrencyCode": CurrencyCode,
        "Employee.StatusEnum": Employee.StatusEnum,
        "ExpenseClaim.StatusEnum": ExpenseClaim.StatusEnum,
        "ExternalLink.LinkTypeEnum": ExternalLink.LinkTypeEnum,
        "Invoice.TypeEnum": Invoice.TypeEnum,
        "Invoice.StatusEnum": Invoice.StatusEnum,
        "Journal.SourceTypeEnum": Journal.SourceTypeEnum,
        "LineAmountTypes": LineAmountTypes,
        "LinkedTransaction.StatusEnum": LinkedTransaction.StatusEnum,
        "LinkedTransaction.TypeEnum": LinkedTransaction.TypeEnum,
        "LinkedTransaction.SourceTransactionTypeCodeEnum": LinkedTransaction.SourceTransactionTypeCodeEnum,
        "ManualJournal.StatusEnum": ManualJournal.StatusEnum,
        "Organisation.VersionEnum": Organisation.VersionEnum,
        "Organisation.OrganisationTypeEnum": Organisation.OrganisationTypeEnum,
        "Organisation.SalesTaxBasisEnum": Organisation.SalesTaxBasisEnum,
        "Organisation.SalesTaxPeriodEnum": Organisation.SalesTaxPeriodEnum,
        "Organisation.OrganisationEntityTypeEnum": Organisation.OrganisationEntityTypeEnum,
        "Organisation.ClassEnum": Organisation.ClassEnum,
        "Organisation.EditionEnum": Organisation.EditionEnum,
        "Overpayment.TypeEnum": Overpayment.TypeEnum,
        "Overpayment.StatusEnum": Overpayment.StatusEnum,
        "Payment.StatusEnum": Payment.StatusEnum,
        "Payment.PaymentTypeEnum": Payment.PaymentTypeEnum,
        "PaymentTermType": PaymentTermType,
        "Phone.PhoneTypeEnum": Phone.PhoneTypeEnum,
        "Prepayment.TypeEnum": Prepayment.TypeEnum,
        "Prepayment.StatusEnum": Prepayment.StatusEnum,
        "PurchaseOrder.StatusEnum": PurchaseOrder.StatusEnum,
        "QuoteLineAmountTypes": QuoteLineAmountTypes,
        "QuoteStatusCodes": QuoteStatusCodes,
        "Receipt.StatusEnum": Receipt.StatusEnum,
        "RepeatingInvoice.TypeEnum": RepeatingInvoice.TypeEnum,
        "RepeatingInvoice.StatusEnum": RepeatingInvoice.StatusEnum,
        "Report.ReportTypeEnum": Report.ReportTypeEnum,
        "RowType": RowType,
        "Schedule.UnitEnum": Schedule.UnitEnum,
        "Schedule.DueDateTypeEnum": Schedule.DueDateTypeEnum,
        "TaxRate.StatusEnum": TaxRate.StatusEnum,
        "TaxRate.ReportTaxTypeEnum": TaxRate.ReportTaxTypeEnum,
        "TaxType": TaxType,
        "TimeZone": TimeZone,
        "TrackingCategory.StatusEnum": TrackingCategory.StatusEnum,
        "TrackingOption.StatusEnum": TrackingOption.StatusEnum,
        "User.OrganisationRoleEnum": User.OrganisationRoleEnum,
}

let typeMap: {[index: string]: any} = {
    "Account": Account,
    "Accounts": Accounts,
    "AccountsPayable": AccountsPayable,
    "AccountsReceivable": AccountsReceivable,
    "Action": Action,
    "Actions": Actions,
    "Address": Address,
    "AddressForOrganisation": AddressForOrganisation,
    "Allocation": Allocation,
    "Allocations": Allocations,
    "Attachment": Attachment,
    "Attachments": Attachments,
    "BalanceDetails": BalanceDetails,
    "Balances": Balances,
    "BankTransaction": BankTransaction,
    "BankTransactions": BankTransactions,
    "BankTransfer": BankTransfer,
    "BankTransfers": BankTransfers,
    "BatchPayment": BatchPayment,
    "BatchPaymentDetails": BatchPaymentDetails,
    "BatchPayments": BatchPayments,
    "Bill": Bill,
    "BrandingTheme": BrandingTheme,
    "BrandingThemes": BrandingThemes,
    "Budget": Budget,
    "BudgetBalance": BudgetBalance,
    "BudgetLine": BudgetLine,
    "Budgets": Budgets,
    "CISOrgSetting": CISOrgSetting,
    "CISOrgSettings": CISOrgSettings,
    "CISSetting": CISSetting,
    "CISSettings": CISSettings,
    "Contact": Contact,
    "ContactGroup": ContactGroup,
    "ContactGroups": ContactGroups,
    "ContactPerson": ContactPerson,
    "Contacts": Contacts,
    "ConversionBalances": ConversionBalances,
    "ConversionDate": ConversionDate,
    "CreditNote": CreditNote,
    "CreditNotes": CreditNotes,
    "Currencies": Currencies,
    "Currency": Currency,
    "Element": Element,
    "Employee": Employee,
    "Employees": Employees,
    "ExpenseClaim": ExpenseClaim,
    "ExpenseClaims": ExpenseClaims,
    "ExternalLink": ExternalLink,
    "HistoryRecord": HistoryRecord,
    "HistoryRecords": HistoryRecords,
    "ImportSummary": ImportSummary,
    "ImportSummaryAccounts": ImportSummaryAccounts,
    "ImportSummaryObject": ImportSummaryObject,
    "ImportSummaryOrganisation": ImportSummaryOrganisation,
    "Invoice": Invoice,
    "InvoiceReminder": InvoiceReminder,
    "InvoiceReminders": InvoiceReminders,
    "Invoices": Invoices,
    "Item": Item,
    "Items": Items,
    "Journal": Journal,
    "JournalLine": JournalLine,
    "Journals": Journals,
    "LineItem": LineItem,
    "LineItemTracking": LineItemTracking,
    "LinkedTransaction": LinkedTransaction,
    "LinkedTransactions": LinkedTransactions,
    "ManualJournal": ManualJournal,
    "ManualJournalLine": ManualJournalLine,
    "ManualJournals": ManualJournals,
    "ModelError": ModelError,
    "OnlineInvoice": OnlineInvoice,
    "OnlineInvoices": OnlineInvoices,
    "Organisation": Organisation,
    "Organisations": Organisations,
    "Overpayment": Overpayment,
    "Overpayments": Overpayments,
    "Payment": Payment,
    "PaymentDelete": PaymentDelete,
    "PaymentService": PaymentService,
    "PaymentServices": PaymentServices,
    "PaymentTerm": PaymentTerm,
    "Payments": Payments,
    "Phone": Phone,
    "Prepayment": Prepayment,
    "Prepayments": Prepayments,
    "Purchase": Purchase,
    "PurchaseOrder": PurchaseOrder,
    "PurchaseOrders": PurchaseOrders,
    "Quote": Quote,
    "Quotes": Quotes,
    "Receipt": Receipt,
    "Receipts": Receipts,
    "RepeatingInvoice": RepeatingInvoice,
    "RepeatingInvoices": RepeatingInvoices,
    "Report": Report,
    "ReportAttribute": ReportAttribute,
    "ReportCell": ReportCell,
    "ReportFields": ReportFields,
    "ReportRow": ReportRow,
    "ReportRows": ReportRows,
    "ReportWithRow": ReportWithRow,
    "ReportWithRows": ReportWithRows,
    "Reports": Reports,
    "RequestEmpty": RequestEmpty,
    "SalesTrackingCategory": SalesTrackingCategory,
    "Schedule": Schedule,
    "Setup": Setup,
    "TaxComponent": TaxComponent,
    "TaxRate": TaxRate,
    "TaxRates": TaxRates,
    "TenNinetyNineContact": TenNinetyNineContact,
    "TrackingCategories": TrackingCategories,
    "TrackingCategory": TrackingCategory,
    "TrackingOption": TrackingOption,
    "TrackingOptions": TrackingOptions,
    "User": User,
    "Users": Users,
    "ValidationError": ValidationError,
}

export class ObjectSerializer {
    public static findCorrectType(data: any, expectedType: string) {
        if (data == undefined) {
            return expectedType;
        } else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        } else if (expectedType === "Date") {
            return expectedType;
        } else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }

            if (!typeMap[expectedType]) {
                return expectedType; // w/e we don't know the type
            }

            // Check the discriminator
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType; // the type does not have a discriminator. use it.
            } else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if(typeMap[discriminatorType]){
                        return discriminatorType; // use the type given in the discriminator
                    } else {
                        return expectedType; // discriminator did not map to a type
                    }
                } else {
                    return expectedType; // discriminator was not present (or an empty string)
                }
            }
        }
    }

    public static serialize(data: any, type: string) {
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            if(subType === 'string') {
                return transformedData.join(',')
            } else {
                return transformedData
            }
        } else if (type === "Date") {
            return data.toISOString();
        } else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) { // in case we dont know the type
                return data;
            }
            
            // Get the actual type of this object
            type = this.findCorrectType(data, type);

            // get the map for the correct type.
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance: {[index: string]: any} = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }

    public static deserializeDateFormats(type: string, data: any) {
        const isDate = new Date(data)
        if (isNaN(isDate.getTime())) {
            const re = /-?\d+/;
            const m = re.exec(data);
            return new Date(parseInt(m[0], 10));
        } else {
            return isDate
        }
    }

    public static deserialize(data: any, type: string) {
        // polymorphism may change the actual type.
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        } else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            if (type === "string" && data.toString().substring(0, 6) === "/Date(") {
                return this.deserializeDateFormats(type, data) // For MS dates that are of type 'string'
            }
            else {
                return data;
            }
        } else if (type.lastIndexOf("Array<", 0) === 0) { // string.startsWith pre es6
            let subType: string = type.replace("Array<", ""); // Array<Type> => Type>
            subType = subType.substring(0, subType.length - 1); // Type> => Type
            let transformedData: any[] = [];
            // Asset API returns string even for Array<Model>
            const dataFormatted = typeof data == 'string' ? JSON.parse(data) : data
            for (let index in dataFormatted) {
                let currentData = dataFormatted[index];
                transformedData.push(ObjectSerializer.deserialize(currentData, subType));
            }
            return transformedData;
        } else if (type === "Date") {
            return this.deserializeDateFormats(type, data)
        } else {
            if (enumsMap[type]) {// is Enum
                return data;
            }

            if (!typeMap[type]) { // dont know the type
                return data;
            }
            let instance = new typeMap[type]();
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.name] = ObjectSerializer.deserialize(data[attributeType.baseName], attributeType.type);
            }
            return instance;
        }
    }
}

export interface Authentication {
    /**
    * Apply authentication settings to header and query params.
    */
    applyToRequest(requestOptions: localVarRequest.Options): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (this.location == "query") {
            (<any>requestOptions.qs)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: localVarRequest.Options): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_: localVarRequest.Options): void {
        // Do nothing
    }
}