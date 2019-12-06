"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./account"));
__export(require("./accountType"));
__export(require("./accounts"));
__export(require("./accountsPayable"));
__export(require("./accountsReceivable"));
__export(require("./address"));
__export(require("./allocation"));
__export(require("./allocations"));
__export(require("./attachment"));
__export(require("./attachments"));
__export(require("./balances"));
__export(require("./bankTransaction"));
__export(require("./bankTransactions"));
__export(require("./bankTransfer"));
__export(require("./bankTransfers"));
__export(require("./batchPayment"));
__export(require("./batchPaymentDetails"));
__export(require("./batchPayments"));
__export(require("./bill"));
__export(require("./brandingTheme"));
__export(require("./brandingThemes"));
__export(require("./cISOrgSetting"));
__export(require("./cISSetting"));
__export(require("./cISSettings"));
__export(require("./contact"));
__export(require("./contactGroup"));
__export(require("./contactGroups"));
__export(require("./contactPerson"));
__export(require("./contacts"));
__export(require("./countryCode"));
__export(require("./creditNote"));
__export(require("./creditNotes"));
__export(require("./currencies"));
__export(require("./currency"));
__export(require("./currencyCode"));
__export(require("./element"));
__export(require("./employee"));
__export(require("./employees"));
__export(require("./expenseClaim"));
__export(require("./expenseClaims"));
__export(require("./externalLink"));
__export(require("./historyRecord"));
__export(require("./historyRecords"));
__export(require("./invoice"));
__export(require("./invoiceReminder"));
__export(require("./invoiceReminders"));
__export(require("./invoices"));
__export(require("./item"));
__export(require("./items"));
__export(require("./journal"));
__export(require("./journalLine"));
__export(require("./journals"));
__export(require("./lineAmountTypes"));
__export(require("./lineItem"));
__export(require("./lineItemTracking"));
__export(require("./linkedTransaction"));
__export(require("./linkedTransactions"));
__export(require("./manualJournal"));
__export(require("./manualJournalLine"));
__export(require("./manualJournals"));
__export(require("./modelError"));
__export(require("./onlineInvoice"));
__export(require("./onlineInvoices"));
__export(require("./organisation"));
__export(require("./organisations"));
__export(require("./overpayment"));
__export(require("./overpayments"));
__export(require("./payment"));
__export(require("./paymentService"));
__export(require("./paymentServices"));
__export(require("./paymentTerm"));
__export(require("./paymentTermType"));
__export(require("./payments"));
__export(require("./phone"));
__export(require("./prepayment"));
__export(require("./prepayments"));
__export(require("./purchase"));
__export(require("./purchaseOrder"));
__export(require("./purchaseOrders"));
__export(require("./quote"));
__export(require("./quoteStatusCodes"));
__export(require("./quotes"));
__export(require("./receipt"));
__export(require("./receipts"));
__export(require("./repeatingInvoice"));
__export(require("./repeatingInvoices"));
__export(require("./report"));
__export(require("./reportAttribute"));
__export(require("./reportCell"));
__export(require("./reportFields"));
__export(require("./reportRow"));
__export(require("./reportRows"));
__export(require("./reportWithRow"));
__export(require("./reportWithRows"));
__export(require("./reports"));
__export(require("./requestEmpty"));
__export(require("./rowType"));
__export(require("./salesTrackingCategory"));
__export(require("./schedule"));
__export(require("./taxComponent"));
__export(require("./taxRate"));
__export(require("./taxRates"));
__export(require("./taxType"));
__export(require("./tenNinteyNineContact"));
__export(require("./timeZone"));
__export(require("./trackingCategories"));
__export(require("./trackingCategory"));
__export(require("./trackingOption"));
__export(require("./trackingOptions"));
__export(require("./user"));
__export(require("./users"));
__export(require("./validationError"));
const account_1 = require("./account");
const accountType_1 = require("./accountType");
const accounts_1 = require("./accounts");
const accountsPayable_1 = require("./accountsPayable");
const accountsReceivable_1 = require("./accountsReceivable");
const address_1 = require("./address");
const allocation_1 = require("./allocation");
const allocations_1 = require("./allocations");
const attachment_1 = require("./attachment");
const attachments_1 = require("./attachments");
const balances_1 = require("./balances");
const bankTransaction_1 = require("./bankTransaction");
const bankTransactions_1 = require("./bankTransactions");
const bankTransfer_1 = require("./bankTransfer");
const bankTransfers_1 = require("./bankTransfers");
const batchPayment_1 = require("./batchPayment");
const batchPaymentDetails_1 = require("./batchPaymentDetails");
const batchPayments_1 = require("./batchPayments");
const bill_1 = require("./bill");
const brandingTheme_1 = require("./brandingTheme");
const brandingThemes_1 = require("./brandingThemes");
const cISOrgSetting_1 = require("./cISOrgSetting");
const cISSetting_1 = require("./cISSetting");
const cISSettings_1 = require("./cISSettings");
const contact_1 = require("./contact");
const contactGroup_1 = require("./contactGroup");
const contactGroups_1 = require("./contactGroups");
const contactPerson_1 = require("./contactPerson");
const contacts_1 = require("./contacts");
const countryCode_1 = require("./countryCode");
const creditNote_1 = require("./creditNote");
const creditNotes_1 = require("./creditNotes");
const currencies_1 = require("./currencies");
const currency_1 = require("./currency");
const currencyCode_1 = require("./currencyCode");
const element_1 = require("./element");
const employee_1 = require("./employee");
const employees_1 = require("./employees");
const expenseClaim_1 = require("./expenseClaim");
const expenseClaims_1 = require("./expenseClaims");
const externalLink_1 = require("./externalLink");
const historyRecord_1 = require("./historyRecord");
const historyRecords_1 = require("./historyRecords");
const invoice_1 = require("./invoice");
const invoiceReminder_1 = require("./invoiceReminder");
const invoiceReminders_1 = require("./invoiceReminders");
const invoices_1 = require("./invoices");
const item_1 = require("./item");
const items_1 = require("./items");
const journal_1 = require("./journal");
const journalLine_1 = require("./journalLine");
const journals_1 = require("./journals");
const lineAmountTypes_1 = require("./lineAmountTypes");
const lineItem_1 = require("./lineItem");
const lineItemTracking_1 = require("./lineItemTracking");
const linkedTransaction_1 = require("./linkedTransaction");
const linkedTransactions_1 = require("./linkedTransactions");
const manualJournal_1 = require("./manualJournal");
const manualJournalLine_1 = require("./manualJournalLine");
const manualJournals_1 = require("./manualJournals");
const modelError_1 = require("./modelError");
const onlineInvoice_1 = require("./onlineInvoice");
const onlineInvoices_1 = require("./onlineInvoices");
const organisation_1 = require("./organisation");
const organisations_1 = require("./organisations");
const overpayment_1 = require("./overpayment");
const overpayments_1 = require("./overpayments");
const payment_1 = require("./payment");
const paymentService_1 = require("./paymentService");
const paymentServices_1 = require("./paymentServices");
const paymentTerm_1 = require("./paymentTerm");
const paymentTermType_1 = require("./paymentTermType");
const payments_1 = require("./payments");
const phone_1 = require("./phone");
const prepayment_1 = require("./prepayment");
const prepayments_1 = require("./prepayments");
const purchase_1 = require("./purchase");
const purchaseOrder_1 = require("./purchaseOrder");
const purchaseOrders_1 = require("./purchaseOrders");
const quote_1 = require("./quote");
const quoteStatusCodes_1 = require("./quoteStatusCodes");
const quotes_1 = require("./quotes");
const receipt_1 = require("./receipt");
const receipts_1 = require("./receipts");
const repeatingInvoice_1 = require("./repeatingInvoice");
const repeatingInvoices_1 = require("./repeatingInvoices");
const report_1 = require("./report");
const reportAttribute_1 = require("./reportAttribute");
const reportCell_1 = require("./reportCell");
const reportFields_1 = require("./reportFields");
const reportRow_1 = require("./reportRow");
const reportRows_1 = require("./reportRows");
const reportWithRow_1 = require("./reportWithRow");
const reportWithRows_1 = require("./reportWithRows");
const reports_1 = require("./reports");
const requestEmpty_1 = require("./requestEmpty");
const rowType_1 = require("./rowType");
const salesTrackingCategory_1 = require("./salesTrackingCategory");
const schedule_1 = require("./schedule");
const taxComponent_1 = require("./taxComponent");
const taxRate_1 = require("./taxRate");
const taxRates_1 = require("./taxRates");
const taxType_1 = require("./taxType");
const tenNinteyNineContact_1 = require("./tenNinteyNineContact");
const timeZone_1 = require("./timeZone");
const trackingCategories_1 = require("./trackingCategories");
const trackingCategory_1 = require("./trackingCategory");
const trackingOption_1 = require("./trackingOption");
const trackingOptions_1 = require("./trackingOptions");
const user_1 = require("./user");
const users_1 = require("./users");
const validationError_1 = require("./validationError");
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
let enumsMap = {
    "Account.StatusEnum": account_1.Account.StatusEnum,
    "Account.BankAccountTypeEnum": account_1.Account.BankAccountTypeEnum,
    "Account.ClassEnum": account_1.Account.ClassEnum,
    "Account.SystemAccountEnum": account_1.Account.SystemAccountEnum,
    "AccountType": accountType_1.AccountType,
    "Address.AddressTypeEnum": address_1.Address.AddressTypeEnum,
    "BankTransaction.TypeEnum": bankTransaction_1.BankTransaction.TypeEnum,
    "BankTransaction.StatusEnum": bankTransaction_1.BankTransaction.StatusEnum,
    "BatchPayment.TypeEnum": batchPayment_1.BatchPayment.TypeEnum,
    "BrandingTheme.TypeEnum": brandingTheme_1.BrandingTheme.TypeEnum,
    "Contact.ContactStatusEnum": contact_1.Contact.ContactStatusEnum,
    "ContactGroup.StatusEnum": contactGroup_1.ContactGroup.StatusEnum,
    "CountryCode": countryCode_1.CountryCode,
    "CreditNote.TypeEnum": creditNote_1.CreditNote.TypeEnum,
    "CreditNote.StatusEnum": creditNote_1.CreditNote.StatusEnum,
    "CurrencyCode": currencyCode_1.CurrencyCode,
    "Employee.StatusEnum": employee_1.Employee.StatusEnum,
    "ExpenseClaim.StatusEnum": expenseClaim_1.ExpenseClaim.StatusEnum,
    "ExternalLink.LinkTypeEnum": externalLink_1.ExternalLink.LinkTypeEnum,
    "Invoice.TypeEnum": invoice_1.Invoice.TypeEnum,
    "Invoice.StatusEnum": invoice_1.Invoice.StatusEnum,
    "Journal.SourceTypeEnum": journal_1.Journal.SourceTypeEnum,
    "LineAmountTypes": lineAmountTypes_1.LineAmountTypes,
    "LinkedTransaction.StatusEnum": linkedTransaction_1.LinkedTransaction.StatusEnum,
    "LinkedTransaction.TypeEnum": linkedTransaction_1.LinkedTransaction.TypeEnum,
    "LinkedTransaction.SourceTransactionTypeCodeEnum": linkedTransaction_1.LinkedTransaction.SourceTransactionTypeCodeEnum,
    "ManualJournal.StatusEnum": manualJournal_1.ManualJournal.StatusEnum,
    "Organisation.VersionEnum": organisation_1.Organisation.VersionEnum,
    "Organisation.OrganisationTypeEnum": organisation_1.Organisation.OrganisationTypeEnum,
    "Organisation.SalesTaxBasisEnum": organisation_1.Organisation.SalesTaxBasisEnum,
    "Organisation.SalesTaxPeriodEnum": organisation_1.Organisation.SalesTaxPeriodEnum,
    "Organisation.OrganisationEntityTypeEnum": organisation_1.Organisation.OrganisationEntityTypeEnum,
    "Organisation.ClassEnum": organisation_1.Organisation.ClassEnum,
    "Organisation.EditionEnum": organisation_1.Organisation.EditionEnum,
    "Overpayment.TypeEnum": overpayment_1.Overpayment.TypeEnum,
    "Overpayment.StatusEnum": overpayment_1.Overpayment.StatusEnum,
    "Payment.StatusEnum": payment_1.Payment.StatusEnum,
    "Payment.PaymentTypeEnum": payment_1.Payment.PaymentTypeEnum,
    "PaymentTermType": paymentTermType_1.PaymentTermType,
    "Phone.PhoneTypeEnum": phone_1.Phone.PhoneTypeEnum,
    "Prepayment.TypeEnum": prepayment_1.Prepayment.TypeEnum,
    "Prepayment.StatusEnum": prepayment_1.Prepayment.StatusEnum,
    "PurchaseOrder.StatusEnum": purchaseOrder_1.PurchaseOrder.StatusEnum,
    "QuoteStatusCodes": quoteStatusCodes_1.QuoteStatusCodes,
    "Receipt.StatusEnum": receipt_1.Receipt.StatusEnum,
    "RepeatingInvoice.TypeEnum": repeatingInvoice_1.RepeatingInvoice.TypeEnum,
    "RepeatingInvoice.StatusEnum": repeatingInvoice_1.RepeatingInvoice.StatusEnum,
    "Report.ReportTypeEnum": report_1.Report.ReportTypeEnum,
    "RowType": rowType_1.RowType,
    "Schedule.UnitEnum": schedule_1.Schedule.UnitEnum,
    "Schedule.DueDateTypeEnum": schedule_1.Schedule.DueDateTypeEnum,
    "TaxRate.StatusEnum": taxRate_1.TaxRate.StatusEnum,
    "TaxRate.ReportTaxTypeEnum": taxRate_1.TaxRate.ReportTaxTypeEnum,
    "TaxType": taxType_1.TaxType,
    "TimeZone": timeZone_1.TimeZone,
    "TrackingCategory.StatusEnum": trackingCategory_1.TrackingCategory.StatusEnum,
    "TrackingOption.StatusEnum": trackingOption_1.TrackingOption.StatusEnum,
    "User.OrganisationRoleEnum": user_1.User.OrganisationRoleEnum,
};
let typeMap = {
    "Account": account_1.Account,
    "Accounts": accounts_1.Accounts,
    "AccountsPayable": accountsPayable_1.AccountsPayable,
    "AccountsReceivable": accountsReceivable_1.AccountsReceivable,
    "Address": address_1.Address,
    "Allocation": allocation_1.Allocation,
    "Allocations": allocations_1.Allocations,
    "Attachment": attachment_1.Attachment,
    "Attachments": attachments_1.Attachments,
    "Balances": balances_1.Balances,
    "BankTransaction": bankTransaction_1.BankTransaction,
    "BankTransactions": bankTransactions_1.BankTransactions,
    "BankTransfer": bankTransfer_1.BankTransfer,
    "BankTransfers": bankTransfers_1.BankTransfers,
    "BatchPayment": batchPayment_1.BatchPayment,
    "BatchPaymentDetails": batchPaymentDetails_1.BatchPaymentDetails,
    "BatchPayments": batchPayments_1.BatchPayments,
    "Bill": bill_1.Bill,
    "BrandingTheme": brandingTheme_1.BrandingTheme,
    "BrandingThemes": brandingThemes_1.BrandingThemes,
    "CISOrgSetting": cISOrgSetting_1.CISOrgSetting,
    "CISSetting": cISSetting_1.CISSetting,
    "CISSettings": cISSettings_1.CISSettings,
    "Contact": contact_1.Contact,
    "ContactGroup": contactGroup_1.ContactGroup,
    "ContactGroups": contactGroups_1.ContactGroups,
    "ContactPerson": contactPerson_1.ContactPerson,
    "Contacts": contacts_1.Contacts,
    "CreditNote": creditNote_1.CreditNote,
    "CreditNotes": creditNotes_1.CreditNotes,
    "Currencies": currencies_1.Currencies,
    "Currency": currency_1.Currency,
    "Element": element_1.Element,
    "Employee": employee_1.Employee,
    "Employees": employees_1.Employees,
    "ExpenseClaim": expenseClaim_1.ExpenseClaim,
    "ExpenseClaims": expenseClaims_1.ExpenseClaims,
    "ExternalLink": externalLink_1.ExternalLink,
    "HistoryRecord": historyRecord_1.HistoryRecord,
    "HistoryRecords": historyRecords_1.HistoryRecords,
    "Invoice": invoice_1.Invoice,
    "InvoiceReminder": invoiceReminder_1.InvoiceReminder,
    "InvoiceReminders": invoiceReminders_1.InvoiceReminders,
    "Invoices": invoices_1.Invoices,
    "Item": item_1.Item,
    "Items": items_1.Items,
    "Journal": journal_1.Journal,
    "JournalLine": journalLine_1.JournalLine,
    "Journals": journals_1.Journals,
    "LineItem": lineItem_1.LineItem,
    "LineItemTracking": lineItemTracking_1.LineItemTracking,
    "LinkedTransaction": linkedTransaction_1.LinkedTransaction,
    "LinkedTransactions": linkedTransactions_1.LinkedTransactions,
    "ManualJournal": manualJournal_1.ManualJournal,
    "ManualJournalLine": manualJournalLine_1.ManualJournalLine,
    "ManualJournals": manualJournals_1.ManualJournals,
    "ModelError": modelError_1.ModelError,
    "OnlineInvoice": onlineInvoice_1.OnlineInvoice,
    "OnlineInvoices": onlineInvoices_1.OnlineInvoices,
    "Organisation": organisation_1.Organisation,
    "Organisations": organisations_1.Organisations,
    "Overpayment": overpayment_1.Overpayment,
    "Overpayments": overpayments_1.Overpayments,
    "Payment": payment_1.Payment,
    "PaymentService": paymentService_1.PaymentService,
    "PaymentServices": paymentServices_1.PaymentServices,
    "PaymentTerm": paymentTerm_1.PaymentTerm,
    "Payments": payments_1.Payments,
    "Phone": phone_1.Phone,
    "Prepayment": prepayment_1.Prepayment,
    "Prepayments": prepayments_1.Prepayments,
    "Purchase": purchase_1.Purchase,
    "PurchaseOrder": purchaseOrder_1.PurchaseOrder,
    "PurchaseOrders": purchaseOrders_1.PurchaseOrders,
    "Quote": quote_1.Quote,
    "Quotes": quotes_1.Quotes,
    "Receipt": receipt_1.Receipt,
    "Receipts": receipts_1.Receipts,
    "RepeatingInvoice": repeatingInvoice_1.RepeatingInvoice,
    "RepeatingInvoices": repeatingInvoices_1.RepeatingInvoices,
    "Report": report_1.Report,
    "ReportAttribute": reportAttribute_1.ReportAttribute,
    "ReportCell": reportCell_1.ReportCell,
    "ReportFields": reportFields_1.ReportFields,
    "ReportRow": reportRow_1.ReportRow,
    "ReportRows": reportRows_1.ReportRows,
    "ReportWithRow": reportWithRow_1.ReportWithRow,
    "ReportWithRows": reportWithRows_1.ReportWithRows,
    "Reports": reports_1.Reports,
    "RequestEmpty": requestEmpty_1.RequestEmpty,
    "SalesTrackingCategory": salesTrackingCategory_1.SalesTrackingCategory,
    "Schedule": schedule_1.Schedule,
    "TaxComponent": taxComponent_1.TaxComponent,
    "TaxRate": taxRate_1.TaxRate,
    "TaxRates": taxRates_1.TaxRates,
    "TenNinteyNineContact": tenNinteyNineContact_1.TenNinteyNineContact,
    "TrackingCategories": trackingCategories_1.TrackingCategories,
    "TrackingCategory": trackingCategory_1.TrackingCategory,
    "TrackingOption": trackingOption_1.TrackingOption,
    "TrackingOptions": trackingOptions_1.TrackingOptions,
    "User": user_1.User,
    "Users": users_1.Users,
    "ValidationError": validationError_1.ValidationError,
};
class ObjectSerializer {
    static findCorrectType(data, expectedType) {
        if (data == undefined) {
            return expectedType;
        }
        else if (primitives.indexOf(expectedType.toLowerCase()) !== -1) {
            return expectedType;
        }
        else if (expectedType === "Date") {
            return expectedType;
        }
        else {
            if (enumsMap[expectedType]) {
                return expectedType;
            }
            if (!typeMap[expectedType]) {
                return expectedType;
            }
            let discriminatorProperty = typeMap[expectedType].discriminator;
            if (discriminatorProperty == null) {
                return expectedType;
            }
            else {
                if (data[discriminatorProperty]) {
                    var discriminatorType = data[discriminatorProperty];
                    if (typeMap[discriminatorType]) {
                        return discriminatorType;
                    }
                    else {
                        return expectedType;
                    }
                }
                else {
                    return expectedType;
                }
            }
        }
    }
    static serialize(data, type) {
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            let subType = type.replace("Array<", "");
            subType = subType.substring(0, subType.length - 1);
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.serialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return data.toISOString();
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
                return data;
            }
            type = this.findCorrectType(data, type);
            let attributeTypes = typeMap[type].getAttributeTypeMap();
            let instance = {};
            for (let index in attributeTypes) {
                let attributeType = attributeTypes[index];
                instance[attributeType.baseName] = ObjectSerializer.serialize(data[attributeType.name], attributeType.type);
            }
            return instance;
        }
    }
    static deserialize(data, type) {
        type = ObjectSerializer.findCorrectType(data, type);
        if (data == undefined) {
            return data;
        }
        else if (primitives.indexOf(type.toLowerCase()) !== -1) {
            return data;
        }
        else if (type.lastIndexOf("Array<", 0) === 0) {
            let subType = type.replace("Array<", "");
            subType = subType.substring(0, subType.length - 1);
            let transformedData = [];
            for (let index in data) {
                let date = data[index];
                transformedData.push(ObjectSerializer.deserialize(date, subType));
            }
            return transformedData;
        }
        else if (type === "Date") {
            return new Date(data);
        }
        else {
            if (enumsMap[type]) {
                return data;
            }
            if (!typeMap[type]) {
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
exports.ObjectSerializer = ObjectSerializer;
class HttpBasicAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(requestOptions) {
        requestOptions.auth = {
            username: this.username, password: this.password
        };
    }
}
exports.HttpBasicAuth = HttpBasicAuth;
class ApiKeyAuth {
    constructor(location, paramName) {
        this.location = location;
        this.paramName = paramName;
        this.apiKey = '';
    }
    applyToRequest(requestOptions) {
        if (this.location == "query") {
            requestOptions.qs[this.paramName] = this.apiKey;
        }
        else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}
exports.ApiKeyAuth = ApiKeyAuth;
class OAuth {
    constructor() {
        this.accessToken = '';
    }
    applyToRequest(requestOptions) {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}
exports.OAuth = OAuth;
class VoidAuth {
    constructor() {
        this.username = '';
        this.password = '';
    }
    applyToRequest(_) {
    }
}
exports.VoidAuth = VoidAuth;
//# sourceMappingURL=models.js.map