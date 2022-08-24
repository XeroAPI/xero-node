export * from '././accountUsage';
export * from '././accountUsageResponse';
export * from '././balanceSheetAccountDetail';
export * from '././balanceSheetAccountGroup';
export * from '././balanceSheetAccountType';
export * from '././balanceSheetResponse';
export * from '././bankStatementAccountingResponse';
export * from '././bankStatementResponse';
export * from '././bankTransactionResponse';
export * from '././cashAccountResponse';
export * from '././cashBalance';
export * from '././cashValidationResponse';
export * from '././cashflowAccount';
export * from '././cashflowActivity';
export * from '././cashflowResponse';
export * from '././cashflowType';
export * from '././contactDetail';
export * from '././contactResponse';
export * from '././contactTotalDetail';
export * from '././contactTotalOther';
export * from '././creditNoteResponse';
export * from '././currentStatementResponse';
export * from '././dataSourceResponse';
export * from '././historyRecordResponse';
export * from '././incomeByContactResponse';
export * from '././invoiceResponse';
export * from '././lineItemResponse';
export * from '././lockHistoryModel';
export * from '././lockHistoryResponse';
export * from '././manualJournalTotal';
export * from '././overpaymentResponse';
export * from '././paymentResponse';
export * from '././pnlAccount';
export * from '././pnlAccountClass';
export * from '././pnlAccountType';
export * from '././practiceResponse';
export * from '././prepaymentResponse';
export * from '././problem';
export * from '././problemType';
export * from '././profitAndLossResponse';
export * from '././reportHistoryModel';
export * from '././reportHistoryResponse';
export * from '././statementBalanceResponse';
export * from '././statementLineResponse';
export * from '././statementLinesResponse';
export * from '././statementResponse';
export * from '././totalDetail';
export * from '././totalOther';
export * from '././trialBalanceAccount';
export * from '././trialBalanceEntry';
export * from '././trialBalanceMovement';
export * from '././trialBalanceResponse';
export * from '././userActivitiesResponse';
export * from '././userResponse';

import localVarRequest = require('request');

import { AccountUsage } from '././accountUsage';
import { AccountUsageResponse } from '././accountUsageResponse';
import { BalanceSheetAccountDetail } from '././balanceSheetAccountDetail';
import { BalanceSheetAccountGroup } from '././balanceSheetAccountGroup';
import { BalanceSheetAccountType } from '././balanceSheetAccountType';
import { BalanceSheetResponse } from '././balanceSheetResponse';
import { BankStatementAccountingResponse } from '././bankStatementAccountingResponse';
import { BankStatementResponse } from '././bankStatementResponse';
import { BankTransactionResponse } from '././bankTransactionResponse';
import { CashAccountResponse } from '././cashAccountResponse';
import { CashBalance } from '././cashBalance';
import { CashValidationResponse } from '././cashValidationResponse';
import { CashflowAccount } from '././cashflowAccount';
import { CashflowActivity } from '././cashflowActivity';
import { CashflowResponse } from '././cashflowResponse';
import { CashflowType } from '././cashflowType';
import { ContactDetail } from '././contactDetail';
import { ContactResponse } from '././contactResponse';
import { ContactTotalDetail } from '././contactTotalDetail';
import { ContactTotalOther } from '././contactTotalOther';
import { CreditNoteResponse } from '././creditNoteResponse';
import { CurrentStatementResponse } from '././currentStatementResponse';
import { DataSourceResponse } from '././dataSourceResponse';
import { HistoryRecordResponse } from '././historyRecordResponse';
import { IncomeByContactResponse } from '././incomeByContactResponse';
import { InvoiceResponse } from '././invoiceResponse';
import { LineItemResponse } from '././lineItemResponse';
import { LockHistoryModel } from '././lockHistoryModel';
import { LockHistoryResponse } from '././lockHistoryResponse';
import { ManualJournalTotal } from '././manualJournalTotal';
import { OverpaymentResponse } from '././overpaymentResponse';
import { PaymentResponse } from '././paymentResponse';
import { PnlAccount } from '././pnlAccount';
import { PnlAccountClass } from '././pnlAccountClass';
import { PnlAccountType } from '././pnlAccountType';
import { PracticeResponse } from '././practiceResponse';
import { PrepaymentResponse } from '././prepaymentResponse';
import { Problem } from '././problem';
import { ProblemType } from '././problemType';
import { ProfitAndLossResponse } from '././profitAndLossResponse';
import { ReportHistoryModel } from '././reportHistoryModel';
import { ReportHistoryResponse } from '././reportHistoryResponse';
import { StatementBalanceResponse } from '././statementBalanceResponse';
import { StatementLineResponse } from '././statementLineResponse';
import { StatementLinesResponse } from '././statementLinesResponse';
import { StatementResponse } from '././statementResponse';
import { TotalDetail } from '././totalDetail';
import { TotalOther } from '././totalOther';
import { TrialBalanceAccount } from '././trialBalanceAccount';
import { TrialBalanceEntry } from '././trialBalanceEntry';
import { TrialBalanceMovement } from '././trialBalanceMovement';
import { TrialBalanceResponse } from '././trialBalanceResponse';
import { UserActivitiesResponse } from '././userActivitiesResponse';
import { UserResponse } from '././userResponse';

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
        "ProblemType": ProblemType,
}

let typeMap: {[index: string]: any} = {
    "AccountUsage": AccountUsage,
    "AccountUsageResponse": AccountUsageResponse,
    "BalanceSheetAccountDetail": BalanceSheetAccountDetail,
    "BalanceSheetAccountGroup": BalanceSheetAccountGroup,
    "BalanceSheetAccountType": BalanceSheetAccountType,
    "BalanceSheetResponse": BalanceSheetResponse,
    "BankStatementAccountingResponse": BankStatementAccountingResponse,
    "BankStatementResponse": BankStatementResponse,
    "BankTransactionResponse": BankTransactionResponse,
    "CashAccountResponse": CashAccountResponse,
    "CashBalance": CashBalance,
    "CashValidationResponse": CashValidationResponse,
    "CashflowAccount": CashflowAccount,
    "CashflowActivity": CashflowActivity,
    "CashflowResponse": CashflowResponse,
    "CashflowType": CashflowType,
    "ContactDetail": ContactDetail,
    "ContactResponse": ContactResponse,
    "ContactTotalDetail": ContactTotalDetail,
    "ContactTotalOther": ContactTotalOther,
    "CreditNoteResponse": CreditNoteResponse,
    "CurrentStatementResponse": CurrentStatementResponse,
    "DataSourceResponse": DataSourceResponse,
    "HistoryRecordResponse": HistoryRecordResponse,
    "IncomeByContactResponse": IncomeByContactResponse,
    "InvoiceResponse": InvoiceResponse,
    "LineItemResponse": LineItemResponse,
    "LockHistoryModel": LockHistoryModel,
    "LockHistoryResponse": LockHistoryResponse,
    "ManualJournalTotal": ManualJournalTotal,
    "OverpaymentResponse": OverpaymentResponse,
    "PaymentResponse": PaymentResponse,
    "PnlAccount": PnlAccount,
    "PnlAccountClass": PnlAccountClass,
    "PnlAccountType": PnlAccountType,
    "PracticeResponse": PracticeResponse,
    "PrepaymentResponse": PrepaymentResponse,
    "Problem": Problem,
    "ProfitAndLossResponse": ProfitAndLossResponse,
    "ReportHistoryModel": ReportHistoryModel,
    "ReportHistoryResponse": ReportHistoryResponse,
    "StatementBalanceResponse": StatementBalanceResponse,
    "StatementLineResponse": StatementLineResponse,
    "StatementLinesResponse": StatementLinesResponse,
    "StatementResponse": StatementResponse,
    "TotalDetail": TotalDetail,
    "TotalOther": TotalOther,
    "TrialBalanceAccount": TrialBalanceAccount,
    "TrialBalanceEntry": TrialBalanceEntry,
    "TrialBalanceMovement": TrialBalanceMovement,
    "TrialBalanceResponse": TrialBalanceResponse,
    "UserActivitiesResponse": UserActivitiesResponse,
    "UserResponse": UserResponse,
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
            for (let [index, date] of Object.entries(data)) {                  
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
            for (let [index, attributeType] of Object.entries(attributeTypes)) {
                instance[attributeType['baseName']] = ObjectSerializer.serialize(data[attributeType['name']], attributeType['type']);
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
            for (let [index, currentData] of Object.entries(dataFormatted)) {
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
            for (let [index, attributeType] of Object.entries(attributeTypes)) {
                instance[attributeType['name']] = ObjectSerializer.deserialize(data[attributeType['baseName']], attributeType['type']);
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