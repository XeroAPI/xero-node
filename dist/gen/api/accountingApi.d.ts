/// <reference types="node" />
import http = require('http');
import fs = require('fs');
import { Account } from '../model/accounting/account';
import { Accounts } from '../model/accounting/accounts';
import { Allocation } from '../model/accounting/allocation';
import { Allocations } from '../model/accounting/allocations';
import { Attachments } from '../model/accounting/attachments';
import { BankTransaction } from '../model/accounting/bankTransaction';
import { BankTransactions } from '../model/accounting/bankTransactions';
import { BankTransfers } from '../model/accounting/bankTransfers';
import { BatchPayments } from '../model/accounting/batchPayments';
import { BrandingThemes } from '../model/accounting/brandingThemes';
import { CISOrgSetting } from '../model/accounting/cISOrgSetting';
import { CISSettings } from '../model/accounting/cISSettings';
import { Contact } from '../model/accounting/contact';
import { ContactGroups } from '../model/accounting/contactGroups';
import { Contacts } from '../model/accounting/contacts';
import { CreditNote } from '../model/accounting/creditNote';
import { CreditNotes } from '../model/accounting/creditNotes';
import { Currencies } from '../model/accounting/currencies';
import { Currency } from '../model/accounting/currency';
import { Employee } from '../model/accounting/employee';
import { Employees } from '../model/accounting/employees';
import { ExpenseClaims } from '../model/accounting/expenseClaims';
import { HistoryRecords } from '../model/accounting/historyRecords';
import { Invoice } from '../model/accounting/invoice';
import { InvoiceReminders } from '../model/accounting/invoiceReminders';
import { Invoices } from '../model/accounting/invoices';
import { Item } from '../model/accounting/item';
import { Items } from '../model/accounting/items';
import { Journals } from '../model/accounting/journals';
import { LinkedTransaction } from '../model/accounting/linkedTransaction';
import { LinkedTransactions } from '../model/accounting/linkedTransactions';
import { ManualJournal } from '../model/accounting/manualJournal';
import { ManualJournals } from '../model/accounting/manualJournals';
import { OnlineInvoices } from '../model/accounting/onlineInvoices';
import { Organisations } from '../model/accounting/organisations';
import { Overpayments } from '../model/accounting/overpayments';
import { Payment } from '../model/accounting/payment';
import { PaymentService } from '../model/accounting/paymentService';
import { PaymentServices } from '../model/accounting/paymentServices';
import { Payments } from '../model/accounting/payments';
import { Prepayments } from '../model/accounting/prepayments';
import { PurchaseOrder } from '../model/accounting/purchaseOrder';
import { PurchaseOrders } from '../model/accounting/purchaseOrders';
import { Quotes } from '../model/accounting/quotes';
import { Receipts } from '../model/accounting/receipts';
import { RepeatingInvoices } from '../model/accounting/repeatingInvoices';
import { ReportWithRows } from '../model/accounting/reportWithRows';
import { Reports } from '../model/accounting/reports';
import { RequestEmpty } from '../model/accounting/requestEmpty';
import { TaxRate } from '../model/accounting/taxRate';
import { TaxRates } from '../model/accounting/taxRates';
import { TrackingCategories } from '../model/accounting/trackingCategories';
import { TrackingCategory } from '../model/accounting/trackingCategory';
import { TrackingOption } from '../model/accounting/trackingOption';
import { TrackingOptions } from '../model/accounting/trackingOptions';
import { Users } from '../model/accounting/users';
import { Authentication } from '../model/accounting/models';
import { OAuth } from '../model/accounting/models';
export declare enum AccountingApiApiKeys {
}
export declare class AccountingApi {
    protected _basePath: string;
    protected defaultHeaders: any;
    protected _useQuerystring: boolean;
    protected binaryHeaders: any;
    protected authentications: {
        'default': Authentication;
        'OAuth2': OAuth;
    };
    constructor(basePath?: string);
    set useQuerystring(value: boolean);
    set basePath(basePath: string);
    get basePath(): string;
    setDefaultAuthentication(auth: Authentication): void;
    setApiKey(key: AccountingApiApiKeys, value: string): void;
    set accessToken(token: string);
    createAccount(xeroTenantId: string, account: Account, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Accounts;
    }>;
    createAccountAttachmentByFileName(xeroTenantId: string, accountID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createBankTransaction(xeroTenantId: string, bankTransaction: BankTransaction, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransactions;
    }>;
    createBankTransactionAttachmentByFileName(xeroTenantId: string, bankTransactionID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createBankTransactionHistoryRecord(xeroTenantId: string, bankTransactionID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createBankTransactions(xeroTenantId: string, bankTransactions: BankTransactions, summarizeErrors?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransactions;
    }>;
    createBankTransfer(xeroTenantId: string, bankTransfers: BankTransfers, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransfers;
    }>;
    createBankTransferAttachmentByFileName(xeroTenantId: string, bankTransferID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createBankTransferHistoryRecord(xeroTenantId: string, bankTransferID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createBatchPayment(xeroTenantId: string, batchPayments: BatchPayments, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BatchPayments;
    }>;
    createBatchPaymentHistoryRecord(xeroTenantId: string, batchPaymentID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createBrandingThemePaymentServices(xeroTenantId: string, brandingThemeID: string, paymentService: PaymentService, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PaymentServices;
    }>;
    createContact(xeroTenantId: string, contact: Contact, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Contacts;
    }>;
    createContactAttachmentByFileName(xeroTenantId: string, contactID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createContactGroup(xeroTenantId: string, contactGroups: ContactGroups, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ContactGroups;
    }>;
    createContactGroupContacts(xeroTenantId: string, contactGroupID: string, contacts: Contacts, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Contacts;
    }>;
    createContactHistory(xeroTenantId: string, contactID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createContacts(xeroTenantId: string, contacts: Contacts, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Contacts;
    }>;
    createCreditNote(xeroTenantId: string, creditNote: CreditNote, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CreditNotes;
    }>;
    createCreditNoteAllocation(xeroTenantId: string, creditNoteID: string, allocations: Allocations, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Allocations;
    }>;
    createCreditNoteAttachmentByFileName(xeroTenantId: string, creditNoteID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createCreditNoteHistory(xeroTenantId: string, creditNoteID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createCreditNotes(xeroTenantId: string, creditNotes: CreditNotes, summarizeErrors?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CreditNotes;
    }>;
    createCurrency(xeroTenantId: string, currency: Currency, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Currencies;
    }>;
    createEmployee(xeroTenantId: string, employee: Employee, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Employees;
    }>;
    createEmployees(xeroTenantId: string, employees: Employees, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Employees;
    }>;
    createExpenseClaimHistory(xeroTenantId: string, expenseClaimID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createExpenseClaims(xeroTenantId: string, expenseClaims: ExpenseClaims, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ExpenseClaims;
    }>;
    createInvoice(xeroTenantId: string, invoice: Invoice, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Invoices;
    }>;
    createInvoiceAttachmentByFileName(xeroTenantId: string, invoiceID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createInvoiceHistory(xeroTenantId: string, invoiceID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createInvoices(xeroTenantId: string, invoices: Invoices, summarizeErrors?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Invoices;
    }>;
    createItem(xeroTenantId: string, item: Item, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Items;
    }>;
    createItemHistory(xeroTenantId: string, itemID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createItems(xeroTenantId: string, items: Items, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Items;
    }>;
    createLinkedTransaction(xeroTenantId: string, linkedTransaction: LinkedTransaction, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: LinkedTransactions;
    }>;
    createLinkedTransactions(xeroTenantId: string, linkedTransactions: LinkedTransactions, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: LinkedTransactions;
    }>;
    createManualJournal(xeroTenantId: string, manualJournal: ManualJournal, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ManualJournals;
    }>;
    createManualJournalAttachmentByFileName(xeroTenantId: string, manualJournalID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createManualJournals(xeroTenantId: string, manualJournals: ManualJournals, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ManualJournals;
    }>;
    createOverpaymentAllocation(xeroTenantId: string, overpaymentID: string, allocation: Allocation, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Allocations;
    }>;
    createOverpaymentAllocations(xeroTenantId: string, overpaymentID: string, allocations: Allocations, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Allocations;
    }>;
    createOverpaymentHistory(xeroTenantId: string, overpaymentID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createPayment(xeroTenantId: string, payment: Payment, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Payments;
    }>;
    createPaymentHistory(xeroTenantId: string, paymentID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createPaymentService(xeroTenantId: string, paymentServices: PaymentServices, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PaymentServices;
    }>;
    createPayments(xeroTenantId: string, payments: Payments, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Payments;
    }>;
    createPrepaymentAllocation(xeroTenantId: string, prepaymentID: string, allocations: Allocations, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Allocations;
    }>;
    createPrepaymentHistory(xeroTenantId: string, prepaymentID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createPurchaseOrder(xeroTenantId: string, purchaseOrder: PurchaseOrder, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PurchaseOrders;
    }>;
    createPurchaseOrderHistory(xeroTenantId: string, purchaseOrderID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createPurchaseOrders(xeroTenantId: string, purchaseOrders: PurchaseOrders, summarizeErrors?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PurchaseOrders;
    }>;
    createReceipt(xeroTenantId: string, receipts: Receipts, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Receipts;
    }>;
    createReceiptAttachmentByFileName(xeroTenantId: string, receiptID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createReceiptHistory(xeroTenantId: string, receiptID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createRepeatingInvoiceAttachmentByFileName(xeroTenantId: string, repeatingInvoiceID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    createRepeatingInvoiceHistory(xeroTenantId: string, repeatingInvoiceID: string, historyRecords: HistoryRecords, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    createTaxRate(xeroTenantId: string, taxRate: TaxRate, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TaxRates;
    }>;
    createTaxRates(xeroTenantId: string, taxRates: TaxRates, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TaxRates;
    }>;
    createTrackingCategory(xeroTenantId: string, trackingCategory: TrackingCategory, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingCategories;
    }>;
    createTrackingOptions(xeroTenantId: string, trackingCategoryID: string, trackingOption: TrackingOption, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingOptions;
    }>;
    deleteAccount(xeroTenantId: string, accountID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Accounts;
    }>;
    deleteContactGroupContact(xeroTenantId: string, contactGroupID: string, contactID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteContactGroupContacts(xeroTenantId: string, contactGroupID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteItem(xeroTenantId: string, itemID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deleteLinkedTransaction(xeroTenantId: string, linkedTransactionID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    deletePayment(xeroTenantId: string, paymentID: string, payments: Payments, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Payments;
    }>;
    deleteTrackingCategory(xeroTenantId: string, trackingCategoryID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingCategories;
    }>;
    deleteTrackingOptions(xeroTenantId: string, trackingCategoryID: string, trackingOptionID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingOptions;
    }>;
    emailInvoice(xeroTenantId: string, invoiceID: string, requestEmpty: RequestEmpty, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body?: any;
    }>;
    getAccount(xeroTenantId: string, accountID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Accounts;
    }>;
    getAccountAttachmentByFileName(xeroTenantId: string, accountID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getAccountAttachmentById(xeroTenantId: string, accountID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getAccountAttachments(xeroTenantId: string, accountID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getAccounts(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Accounts;
    }>;
    getBankTransaction(xeroTenantId: string, bankTransactionID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransactions;
    }>;
    getBankTransactionAttachmentByFileName(xeroTenantId: string, bankTransactionID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getBankTransactionAttachmentById(xeroTenantId: string, bankTransactionID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getBankTransactionAttachments(xeroTenantId: string, bankTransactionID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getBankTransactions(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, page?: number, unitdp?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransactions;
    }>;
    getBankTransactionsHistory(xeroTenantId: string, bankTransactionID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getBankTransfer(xeroTenantId: string, bankTransferID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransfers;
    }>;
    getBankTransferAttachmentByFileName(xeroTenantId: string, bankTransferID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getBankTransferAttachmentById(xeroTenantId: string, bankTransferID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getBankTransferAttachments(xeroTenantId: string, bankTransferID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getBankTransferHistory(xeroTenantId: string, bankTransferID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getBankTransfers(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransfers;
    }>;
    getBatchPaymentHistory(xeroTenantId: string, batchPaymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getBatchPayments(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BatchPayments;
    }>;
    getBrandingTheme(xeroTenantId: string, brandingThemeID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BrandingThemes;
    }>;
    getBrandingThemePaymentServices(xeroTenantId: string, brandingThemeID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PaymentServices;
    }>;
    getBrandingThemes(xeroTenantId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BrandingThemes;
    }>;
    getContact(xeroTenantId: string, contactID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Contacts;
    }>;
    getContactAttachmentByFileName(xeroTenantId: string, contactID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getContactAttachmentById(xeroTenantId: string, contactID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getContactAttachments(xeroTenantId: string, contactID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getContactCISSettings(xeroTenantId: string, contactID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CISSettings;
    }>;
    getContactGroup(xeroTenantId: string, contactGroupID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ContactGroups;
    }>;
    getContactGroups(xeroTenantId: string, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ContactGroups;
    }>;
    getContactHistory(xeroTenantId: string, contactID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getContacts(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, iDs?: Array<string>, page?: number, includeArchived?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Contacts;
    }>;
    getCreditNote(xeroTenantId: string, creditNoteID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CreditNotes;
    }>;
    getCreditNoteAsPdf(xeroTenantId: string, creditNoteID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getCreditNoteAttachmentByFileName(xeroTenantId: string, creditNoteID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getCreditNoteAttachmentById(xeroTenantId: string, creditNoteID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getCreditNoteAttachments(xeroTenantId: string, creditNoteID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getCreditNoteHistory(xeroTenantId: string, creditNoteID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getCreditNotes(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, page?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CreditNotes;
    }>;
    getCurrencies(xeroTenantId: string, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Currencies;
    }>;
    getEmployee(xeroTenantId: string, employeeID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Employees;
    }>;
    getEmployees(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Employees;
    }>;
    getExpenseClaim(xeroTenantId: string, expenseClaimID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ExpenseClaims;
    }>;
    getExpenseClaimHistory(xeroTenantId: string, expenseClaimID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getExpenseClaims(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ExpenseClaims;
    }>;
    getInvoice(xeroTenantId: string, invoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Invoices;
    }>;
    getInvoiceAsPdf(xeroTenantId: string, invoiceID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getInvoiceAttachmentByFileName(xeroTenantId: string, invoiceID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getInvoiceAttachmentById(xeroTenantId: string, invoiceID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getInvoiceAttachments(xeroTenantId: string, invoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getInvoiceHistory(xeroTenantId: string, invoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getInvoiceReminders(xeroTenantId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: InvoiceReminders;
    }>;
    getInvoices(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, iDs?: Array<string>, invoiceNumbers?: Array<string>, contactIDs?: Array<string>, statuses?: Array<string>, page?: number, includeArchived?: boolean, createdByMyApp?: boolean, unitdp?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Invoices;
    }>;
    getItem(xeroTenantId: string, itemID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Items;
    }>;
    getItemHistory(xeroTenantId: string, itemID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getItems(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, unitdp?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Items;
    }>;
    getJournal(xeroTenantId: string, journalID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Journals;
    }>;
    getJournals(xeroTenantId: string, ifModifiedSince?: Date, offset?: number, paymentsOnly?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Journals;
    }>;
    getLinkedTransaction(xeroTenantId: string, linkedTransactionID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: LinkedTransactions;
    }>;
    getLinkedTransactions(xeroTenantId: string, page?: number, linkedTransactionID?: string, sourceTransactionID?: string, contactID?: string, status?: string, targetTransactionID?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: LinkedTransactions;
    }>;
    getManualJournal(xeroTenantId: string, manualJournalID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ManualJournals;
    }>;
    getManualJournalAttachmentByFileName(xeroTenantId: string, manualJournalID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getManualJournalAttachmentById(xeroTenantId: string, manualJournalID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getManualJournalAttachments(xeroTenantId: string, manualJournalID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getManualJournals(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, page?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ManualJournals;
    }>;
    getOnlineInvoice(xeroTenantId: string, invoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: OnlineInvoices;
    }>;
    getOrganisationCISSettings(xeroTenantId: string, organisationID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CISOrgSetting;
    }>;
    getOrganisations(xeroTenantId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Organisations;
    }>;
    getOverpayment(xeroTenantId: string, overpaymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Overpayments;
    }>;
    getOverpaymentHistory(xeroTenantId: string, overpaymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getOverpayments(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, page?: number, unitdp?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Overpayments;
    }>;
    getPayment(xeroTenantId: string, paymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Payments;
    }>;
    getPaymentHistory(xeroTenantId: string, paymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getPaymentServices(xeroTenantId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PaymentServices;
    }>;
    getPayments(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Payments;
    }>;
    getPrepayment(xeroTenantId: string, prepaymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Prepayments;
    }>;
    getPrepaymentHistory(xeroTenantId: string, prepaymentID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getPrepayments(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, page?: number, unitdp?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Prepayments;
    }>;
    getPurchaseOrder(xeroTenantId: string, purchaseOrderID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PurchaseOrders;
    }>;
    getPurchaseOrderHistory(xeroTenantId: string, purchaseOrderID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getPurchaseOrders(xeroTenantId: string, ifModifiedSince?: Date, status?: 'DRAFT' | 'SUBMITTED' | 'AUTHORISED' | 'BILLED' | 'DELETED', dateFrom?: string, dateTo?: string, order?: string, page?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PurchaseOrders;
    }>;
    getQuote(xeroTenantId: string, quoteID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Quotes;
    }>;
    getQuotes(xeroTenantId: string, ifModifiedSince?: Date, dateFrom?: string, dateTo?: string, expiryDateFrom?: string, expiryDateTo?: string, contactID?: string, status?: string, page?: number, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Quotes;
    }>;
    getReceipt(xeroTenantId: string, receiptID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Receipts;
    }>;
    getReceiptAttachmentByFileName(xeroTenantId: string, receiptID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getReceiptAttachmentById(xeroTenantId: string, receiptID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getReceiptAttachments(xeroTenantId: string, receiptID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getReceiptHistory(xeroTenantId: string, receiptID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getReceipts(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, unitdp?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Receipts;
    }>;
    getRepeatingInvoice(xeroTenantId: string, repeatingInvoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: RepeatingInvoices;
    }>;
    getRepeatingInvoiceAttachmentByFileName(xeroTenantId: string, repeatingInvoiceID: string, fileName: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getRepeatingInvoiceAttachmentById(xeroTenantId: string, repeatingInvoiceID: string, attachmentID: string, contentType: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Buffer;
    }>;
    getRepeatingInvoiceAttachments(xeroTenantId: string, repeatingInvoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    getRepeatingInvoiceHistory(xeroTenantId: string, repeatingInvoiceID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: HistoryRecords;
    }>;
    getRepeatingInvoices(xeroTenantId: string, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: RepeatingInvoices;
    }>;
    getReportAgedPayablesByContact(xeroTenantId: string, contactId: string, date?: string, fromDate?: string, toDate?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportAgedReceivablesByContact(xeroTenantId: string, contactId: string, date?: string, fromDate?: string, toDate?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportBASorGST(xeroTenantId: string, reportID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportBASorGSTList(xeroTenantId: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportBalanceSheet(xeroTenantId: string, date?: string, periods?: number, timeframe?: 'MONTH' | 'QUARTER' | 'YEAR', trackingOptionID1?: string, trackingOptionID2?: string, standardLayout?: boolean, paymentsOnly?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportBankSummary(xeroTenantId: string, date?: string, period?: number, timeframe?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportBudgetSummary(xeroTenantId: string, date?: string, period?: number, timeframe?: number, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportExecutiveSummary(xeroTenantId: string, date?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportProfitAndLoss(xeroTenantId: string, fromDate?: string, toDate?: string, periods?: number, timeframe?: 'MONTH' | 'QUARTER' | 'YEAR', trackingCategoryID?: string, trackingCategoryID2?: string, trackingOptionID?: string, trackingOptionID2?: string, standardLayout?: boolean, paymentsOnly?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getReportTenNinetyNine(xeroTenantId: string, reportYear?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Reports;
    }>;
    getReportTrialBalance(xeroTenantId: string, date?: string, paymentsOnly?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ReportWithRows;
    }>;
    getTaxRates(xeroTenantId: string, where?: string, order?: string, taxType?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TaxRates;
    }>;
    getTrackingCategories(xeroTenantId: string, where?: string, order?: string, includeArchived?: boolean, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingCategories;
    }>;
    getTrackingCategory(xeroTenantId: string, trackingCategoryID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingCategories;
    }>;
    getUser(xeroTenantId: string, userID: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Users;
    }>;
    getUsers(xeroTenantId: string, ifModifiedSince?: Date, where?: string, order?: string, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Users;
    }>;
    updateAccount(xeroTenantId: string, accountID: string, accounts: Accounts, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Accounts;
    }>;
    updateAccountAttachmentByFileName(xeroTenantId: string, accountID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateBankTransaction(xeroTenantId: string, bankTransactionID: string, bankTransactions: BankTransactions, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: BankTransactions;
    }>;
    updateBankTransactionAttachmentByFileName(xeroTenantId: string, bankTransactionID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateBankTransferAttachmentByFileName(xeroTenantId: string, bankTransferID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateContact(xeroTenantId: string, contactID: string, contacts: Contacts, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Contacts;
    }>;
    updateContactAttachmentByFileName(xeroTenantId: string, contactID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateContactGroup(xeroTenantId: string, contactGroupID: string, contactGroups: ContactGroups, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ContactGroups;
    }>;
    updateCreditNote(xeroTenantId: string, creditNoteID: string, creditNotes: CreditNotes, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: CreditNotes;
    }>;
    updateCreditNoteAttachmentByFileName(xeroTenantId: string, creditNoteID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateEmployee(xeroTenantId: string, employeeID: string, employees: Employees, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Employees;
    }>;
    updateExpenseClaim(xeroTenantId: string, expenseClaimID: string, expenseClaims: ExpenseClaims, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ExpenseClaims;
    }>;
    updateInvoice(xeroTenantId: string, invoiceID: string, invoices: Invoices, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Invoices;
    }>;
    updateInvoiceAttachmentByFileName(xeroTenantId: string, invoiceID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateItem(xeroTenantId: string, itemID: string, items: Items, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Items;
    }>;
    updateLinkedTransaction(xeroTenantId: string, linkedTransactionID: string, linkedTransactions: LinkedTransactions, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: LinkedTransactions;
    }>;
    updateManualJournal(xeroTenantId: string, manualJournalID: string, manualJournals: ManualJournals, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: ManualJournals;
    }>;
    updateManualJournalAttachmentByFileName(xeroTenantId: string, manualJournalID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updatePurchaseOrder(xeroTenantId: string, purchaseOrderID: string, purchaseOrders: PurchaseOrders, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: PurchaseOrders;
    }>;
    updateReceipt(xeroTenantId: string, receiptID: string, receipts: Receipts, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Receipts;
    }>;
    updateReceiptAttachmentByFileName(xeroTenantId: string, receiptID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateRepeatingInvoiceAttachmentByFileName(xeroTenantId: string, repeatingInvoiceID: string, fileName: string, body: fs.ReadStream, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: Attachments;
    }>;
    updateTaxRate(xeroTenantId: string, taxRates: TaxRates, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TaxRates;
    }>;
    updateTrackingCategory(xeroTenantId: string, trackingCategoryID: string, trackingCategory: TrackingCategory, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingCategories;
    }>;
    updateTrackingOptions(xeroTenantId: string, trackingCategoryID: string, trackingOptionID: string, trackingOption: TrackingOption, options?: {
        headers: {
            [name: string]: string;
        };
    }): Promise<{
        response: http.IncomingMessage;
        body: TrackingOptions;
    }>;
}
