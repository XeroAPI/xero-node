"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const localVarRequest = require("request");
const models_1 = require("../model/accounting/models");
const models_2 = require("../model/accounting/models");
let defaultBasePath = 'https://api.xero.com/api.xro/2.0';
var AccountingApiApiKeys;
(function (AccountingApiApiKeys) {
})(AccountingApiApiKeys = exports.AccountingApiApiKeys || (exports.AccountingApiApiKeys = {}));
class AccountingApi {
    constructor(basePathOrUsername, password, basePath) {
        this._basePath = defaultBasePath;
        this.defaultHeaders = {};
        this._useQuerystring = false;
        this.binaryHeaders = {};
        this.authentications = {
            'default': new models_1.VoidAuth(),
            'OAuth2': new models_2.OAuth(),
        };
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        }
        else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername;
            }
        }
    }
    set useQuerystring(value) {
        this._useQuerystring = value;
    }
    set basePath(basePath) {
        this._basePath = basePath;
    }
    get basePath() {
        return this._basePath;
    }
    setDefaultAuthentication(auth) {
        this.authentications.default = auth;
    }
    setApiKey(key, value) {
        this.authentications[AccountingApiApiKeys[key]].apiKey = value;
    }
    set accessToken(token) {
        this.authentications.OAuth2.accessToken = token;
    }
    async createAccount(xeroTenantId, account, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createAccount.');
        }
        if (account === null || account === undefined) {
            throw new Error('Required parameter account was null or undefined when calling createAccount.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(account, "Account")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Accounts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createAccountAttachmentByFileName(xeroTenantId, accountID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}/Attachments/{FileName}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createAccountAttachmentByFileName.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling createAccountAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createAccountAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createAccountAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransaction(xeroTenantId, bankTransaction, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransaction.');
        }
        if (bankTransaction === null || bankTransaction === undefined) {
            throw new Error('Required parameter bankTransaction was null or undefined when calling createBankTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(bankTransaction, "BankTransaction")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransactionAttachmentByFileName(xeroTenantId, bankTransactionID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/Attachments/{FileName}'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransactionAttachmentByFileName.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling createBankTransactionAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createBankTransactionAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createBankTransactionAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransactionHistoryRecord(xeroTenantId, bankTransactionID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/History'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransactionHistoryRecord.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling createBankTransactionHistoryRecord.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createBankTransactionHistoryRecord.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransactions(xeroTenantId, bankTransactions, summarizeErrors, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransactions.');
        }
        if (bankTransactions === null || bankTransactions === undefined) {
            throw new Error('Required parameter bankTransactions was null or undefined when calling createBankTransactions.');
        }
        if (summarizeErrors !== undefined) {
            localVarQueryParameters['SummarizeErrors'] = models_1.ObjectSerializer.serialize(summarizeErrors, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(bankTransactions, "BankTransactions")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransfer(xeroTenantId, bankTransfers, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransfer.');
        }
        if (bankTransfers === null || bankTransfers === undefined) {
            throw new Error('Required parameter bankTransfers was null or undefined when calling createBankTransfer.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(bankTransfers, "BankTransfers")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransfers");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransferAttachmentByFileName(xeroTenantId, bankTransferID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/Attachments/{FileName}'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransferAttachmentByFileName.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling createBankTransferAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createBankTransferAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createBankTransferAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBankTransferHistoryRecord(xeroTenantId, bankTransferID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/History'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBankTransferHistoryRecord.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling createBankTransferHistoryRecord.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createBankTransferHistoryRecord.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBatchPayment(xeroTenantId, batchPayments, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BatchPayments';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBatchPayment.');
        }
        if (batchPayments === null || batchPayments === undefined) {
            throw new Error('Required parameter batchPayments was null or undefined when calling createBatchPayment.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(batchPayments, "BatchPayments")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BatchPayments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBatchPaymentHistoryRecord(xeroTenantId, batchPaymentID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BatchPayments/{BatchPaymentID}/History'
            .replace('{' + 'BatchPaymentID' + '}', encodeURIComponent(String(batchPaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBatchPaymentHistoryRecord.');
        }
        if (batchPaymentID === null || batchPaymentID === undefined) {
            throw new Error('Required parameter batchPaymentID was null or undefined when calling createBatchPaymentHistoryRecord.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createBatchPaymentHistoryRecord.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createBrandingThemePaymentServices(xeroTenantId, brandingThemeID, paymentService, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BrandingThemes/{BrandingThemeID}/PaymentServices'
            .replace('{' + 'BrandingThemeID' + '}', encodeURIComponent(String(brandingThemeID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createBrandingThemePaymentServices.');
        }
        if (brandingThemeID === null || brandingThemeID === undefined) {
            throw new Error('Required parameter brandingThemeID was null or undefined when calling createBrandingThemePaymentServices.');
        }
        if (paymentService === null || paymentService === undefined) {
            throw new Error('Required parameter paymentService was null or undefined when calling createBrandingThemePaymentServices.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(paymentService, "PaymentService")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PaymentServices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createContact(xeroTenantId, contact, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createContact.');
        }
        if (contact === null || contact === undefined) {
            throw new Error('Required parameter contact was null or undefined when calling createContact.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(contact, "Contact")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Contacts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createContactAttachmentByFileName(xeroTenantId, contactID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/Attachments/{FileName}'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createContactAttachmentByFileName.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling createContactAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createContactAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createContactAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createContactGroup(xeroTenantId, contactGroups, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createContactGroup.');
        }
        if (contactGroups === null || contactGroups === undefined) {
            throw new Error('Required parameter contactGroups was null or undefined when calling createContactGroup.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(contactGroups, "ContactGroups")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ContactGroups");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createContactGroupContacts(xeroTenantId, contactGroupID, contacts, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups/{ContactGroupID}/Contacts'
            .replace('{' + 'ContactGroupID' + '}', encodeURIComponent(String(contactGroupID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createContactGroupContacts.');
        }
        if (contactGroupID === null || contactGroupID === undefined) {
            throw new Error('Required parameter contactGroupID was null or undefined when calling createContactGroupContacts.');
        }
        if (contacts === null || contacts === undefined) {
            throw new Error('Required parameter contacts was null or undefined when calling createContactGroupContacts.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(contacts, "Contacts")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Contacts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createContactHistory(xeroTenantId, contactID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/History'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createContactHistory.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling createContactHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createContactHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createContacts(xeroTenantId, contacts, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createContacts.');
        }
        if (contacts === null || contacts === undefined) {
            throw new Error('Required parameter contacts was null or undefined when calling createContacts.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(contacts, "Contacts")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Contacts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createCreditNote(xeroTenantId, creditNote, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createCreditNote.');
        }
        if (creditNote === null || creditNote === undefined) {
            throw new Error('Required parameter creditNote was null or undefined when calling createCreditNote.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(creditNote, "CreditNote")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CreditNotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createCreditNoteAllocation(xeroTenantId, creditNoteID, allocations, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/Allocations'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createCreditNoteAllocation.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling createCreditNoteAllocation.');
        }
        if (allocations === null || allocations === undefined) {
            throw new Error('Required parameter allocations was null or undefined when calling createCreditNoteAllocation.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(allocations, "Allocations")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Allocations");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createCreditNoteAttachmentByFileName(xeroTenantId, creditNoteID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/Attachments/{FileName}'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createCreditNoteAttachmentByFileName.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling createCreditNoteAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createCreditNoteAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createCreditNoteAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createCreditNoteHistory(xeroTenantId, creditNoteID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/History'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createCreditNoteHistory.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling createCreditNoteHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createCreditNoteHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createCreditNotes(xeroTenantId, creditNotes, summarizeErrors, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createCreditNotes.');
        }
        if (creditNotes === null || creditNotes === undefined) {
            throw new Error('Required parameter creditNotes was null or undefined when calling createCreditNotes.');
        }
        if (summarizeErrors !== undefined) {
            localVarQueryParameters['SummarizeErrors'] = models_1.ObjectSerializer.serialize(summarizeErrors, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(creditNotes, "CreditNotes")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CreditNotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createCurrency(xeroTenantId, currency, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Currencies';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createCurrency.');
        }
        if (currency === null || currency === undefined) {
            throw new Error('Required parameter currency was null or undefined when calling createCurrency.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(currency, "Currency")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Currencies");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createEmployee(xeroTenantId, employee, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Employees';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createEmployee.');
        }
        if (employee === null || employee === undefined) {
            throw new Error('Required parameter employee was null or undefined when calling createEmployee.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(employee, "Employee")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Employees");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createEmployees(xeroTenantId, employees, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Employees#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createEmployees.');
        }
        if (employees === null || employees === undefined) {
            throw new Error('Required parameter employees was null or undefined when calling createEmployees.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(employees, "Employees")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Employees");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createExpenseClaimHistory(xeroTenantId, expenseClaimID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ExpenseClaims/{ExpenseClaimID}/History'
            .replace('{' + 'ExpenseClaimID' + '}', encodeURIComponent(String(expenseClaimID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createExpenseClaimHistory.');
        }
        if (expenseClaimID === null || expenseClaimID === undefined) {
            throw new Error('Required parameter expenseClaimID was null or undefined when calling createExpenseClaimHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createExpenseClaimHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createExpenseClaims(xeroTenantId, expenseClaims, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ExpenseClaims';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createExpenseClaims.');
        }
        if (expenseClaims === null || expenseClaims === undefined) {
            throw new Error('Required parameter expenseClaims was null or undefined when calling createExpenseClaims.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(expenseClaims, "ExpenseClaims")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ExpenseClaims");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createInvoice(xeroTenantId, invoice, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createInvoice.');
        }
        if (invoice === null || invoice === undefined) {
            throw new Error('Required parameter invoice was null or undefined when calling createInvoice.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(invoice, "Invoice")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Invoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createInvoiceAttachmentByFileName(xeroTenantId, invoiceID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/Attachments/{FileName}'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createInvoiceAttachmentByFileName.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling createInvoiceAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createInvoiceAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createInvoiceAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createInvoiceHistory(xeroTenantId, invoiceID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/History'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createInvoiceHistory.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling createInvoiceHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createInvoiceHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createInvoices(xeroTenantId, invoices, summarizeErrors, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createInvoices.');
        }
        if (invoices === null || invoices === undefined) {
            throw new Error('Required parameter invoices was null or undefined when calling createInvoices.');
        }
        if (summarizeErrors !== undefined) {
            localVarQueryParameters['SummarizeErrors'] = models_1.ObjectSerializer.serialize(summarizeErrors, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(invoices, "Invoices")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Invoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createItem(xeroTenantId, item, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createItem.');
        }
        if (item === null || item === undefined) {
            throw new Error('Required parameter item was null or undefined when calling createItem.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(item, "Item")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Items");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createItemHistory(xeroTenantId, itemID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items/{ItemID}/History'
            .replace('{' + 'ItemID' + '}', encodeURIComponent(String(itemID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createItemHistory.');
        }
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling createItemHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createItemHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createItems(xeroTenantId, items, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createItems.');
        }
        if (items === null || items === undefined) {
            throw new Error('Required parameter items was null or undefined when calling createItems.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(items, "Items")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Items");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createLinkedTransaction(xeroTenantId, linkedTransaction, options = { headers: {} }) {
        const localVarPath = this.basePath + '/LinkedTransactions';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createLinkedTransaction.');
        }
        if (linkedTransaction === null || linkedTransaction === undefined) {
            throw new Error('Required parameter linkedTransaction was null or undefined when calling createLinkedTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(linkedTransaction, "LinkedTransaction")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "LinkedTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createLinkedTransactions(xeroTenantId, linkedTransactions, options = { headers: {} }) {
        const localVarPath = this.basePath + '/LinkedTransactions#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createLinkedTransactions.');
        }
        if (linkedTransactions === null || linkedTransactions === undefined) {
            throw new Error('Required parameter linkedTransactions was null or undefined when calling createLinkedTransactions.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(linkedTransactions, "LinkedTransactions")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "LinkedTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createManualJournal(xeroTenantId, manualJournal, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createManualJournal.');
        }
        if (manualJournal === null || manualJournal === undefined) {
            throw new Error('Required parameter manualJournal was null or undefined when calling createManualJournal.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(manualJournal, "ManualJournal")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ManualJournals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createManualJournalAttachmentByFileName(xeroTenantId, manualJournalID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}/Attachments/{FileName}'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createManualJournalAttachmentByFileName.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling createManualJournalAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createManualJournalAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createManualJournalAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createManualJournals(xeroTenantId, manualJournals, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createManualJournals.');
        }
        if (manualJournals === null || manualJournals === undefined) {
            throw new Error('Required parameter manualJournals was null or undefined when calling createManualJournals.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(manualJournals, "ManualJournals")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ManualJournals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createOverpaymentAllocation(xeroTenantId, overpaymentID, allocation, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Overpayments/{OverpaymentID}/Allocations'
            .replace('{' + 'OverpaymentID' + '}', encodeURIComponent(String(overpaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createOverpaymentAllocation.');
        }
        if (overpaymentID === null || overpaymentID === undefined) {
            throw new Error('Required parameter overpaymentID was null or undefined when calling createOverpaymentAllocation.');
        }
        if (allocation === null || allocation === undefined) {
            throw new Error('Required parameter allocation was null or undefined when calling createOverpaymentAllocation.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(allocation, "Allocation")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Allocations");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createOverpaymentAllocations(xeroTenantId, overpaymentID, allocations, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Overpayments/{OverpaymentID}/Allocations#bulk'
            .replace('{' + 'OverpaymentID' + '}', encodeURIComponent(String(overpaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createOverpaymentAllocations.');
        }
        if (overpaymentID === null || overpaymentID === undefined) {
            throw new Error('Required parameter overpaymentID was null or undefined when calling createOverpaymentAllocations.');
        }
        if (allocations === null || allocations === undefined) {
            throw new Error('Required parameter allocations was null or undefined when calling createOverpaymentAllocations.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(allocations, "Allocations")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Allocations");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createOverpaymentHistory(xeroTenantId, overpaymentID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Overpayments/{OverpaymentID}/History'
            .replace('{' + 'OverpaymentID' + '}', encodeURIComponent(String(overpaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createOverpaymentHistory.');
        }
        if (overpaymentID === null || overpaymentID === undefined) {
            throw new Error('Required parameter overpaymentID was null or undefined when calling createOverpaymentHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createOverpaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPayment(xeroTenantId, payment, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPayment.');
        }
        if (payment === null || payment === undefined) {
            throw new Error('Required parameter payment was null or undefined when calling createPayment.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(payment, "Payment")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Payments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPaymentHistory(xeroTenantId, paymentID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments/{PaymentID}/History'
            .replace('{' + 'PaymentID' + '}', encodeURIComponent(String(paymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPaymentHistory.');
        }
        if (paymentID === null || paymentID === undefined) {
            throw new Error('Required parameter paymentID was null or undefined when calling createPaymentHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createPaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPaymentService(xeroTenantId, paymentServices, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PaymentServices';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPaymentService.');
        }
        if (paymentServices === null || paymentServices === undefined) {
            throw new Error('Required parameter paymentServices was null or undefined when calling createPaymentService.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(paymentServices, "PaymentServices")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PaymentServices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPayments(xeroTenantId, payments, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPayments.');
        }
        if (payments === null || payments === undefined) {
            throw new Error('Required parameter payments was null or undefined when calling createPayments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(payments, "Payments")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Payments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPrepaymentAllocation(xeroTenantId, prepaymentID, allocations, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Prepayments/{PrepaymentID}/Allocations'
            .replace('{' + 'PrepaymentID' + '}', encodeURIComponent(String(prepaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPrepaymentAllocation.');
        }
        if (prepaymentID === null || prepaymentID === undefined) {
            throw new Error('Required parameter prepaymentID was null or undefined when calling createPrepaymentAllocation.');
        }
        if (allocations === null || allocations === undefined) {
            throw new Error('Required parameter allocations was null or undefined when calling createPrepaymentAllocation.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(allocations, "Allocations")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Allocations");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPrepaymentHistory(xeroTenantId, prepaymentID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Prepayments/{PrepaymentID}/History'
            .replace('{' + 'PrepaymentID' + '}', encodeURIComponent(String(prepaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPrepaymentHistory.');
        }
        if (prepaymentID === null || prepaymentID === undefined) {
            throw new Error('Required parameter prepaymentID was null or undefined when calling createPrepaymentHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createPrepaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPurchaseOrder(xeroTenantId, purchaseOrder, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPurchaseOrder.');
        }
        if (purchaseOrder === null || purchaseOrder === undefined) {
            throw new Error('Required parameter purchaseOrder was null or undefined when calling createPurchaseOrder.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(purchaseOrder, "PurchaseOrder")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PurchaseOrders");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPurchaseOrderHistory(xeroTenantId, purchaseOrderID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders/{PurchaseOrderID}/History'
            .replace('{' + 'PurchaseOrderID' + '}', encodeURIComponent(String(purchaseOrderID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPurchaseOrderHistory.');
        }
        if (purchaseOrderID === null || purchaseOrderID === undefined) {
            throw new Error('Required parameter purchaseOrderID was null or undefined when calling createPurchaseOrderHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createPurchaseOrderHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createPurchaseOrders(xeroTenantId, purchaseOrders, summarizeErrors, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createPurchaseOrders.');
        }
        if (purchaseOrders === null || purchaseOrders === undefined) {
            throw new Error('Required parameter purchaseOrders was null or undefined when calling createPurchaseOrders.');
        }
        if (summarizeErrors !== undefined) {
            localVarQueryParameters['SummarizeErrors'] = models_1.ObjectSerializer.serialize(summarizeErrors, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(purchaseOrders, "PurchaseOrders")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PurchaseOrders");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createReceipt(xeroTenantId, receipts, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createReceipt.');
        }
        if (receipts === null || receipts === undefined) {
            throw new Error('Required parameter receipts was null or undefined when calling createReceipt.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(receipts, "Receipts")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Receipts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createReceiptAttachmentByFileName(xeroTenantId, receiptID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/Attachments/{FileName}'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createReceiptAttachmentByFileName.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling createReceiptAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createReceiptAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createReceiptAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createReceiptHistory(xeroTenantId, receiptID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/History'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createReceiptHistory.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling createReceiptHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createReceiptHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createRepeatingInvoiceAttachmentByFileName(xeroTenantId, repeatingInvoiceID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createRepeatingInvoiceAttachmentByFileName.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling createRepeatingInvoiceAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling createRepeatingInvoiceAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling createRepeatingInvoiceAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createRepeatingInvoiceHistory(xeroTenantId, repeatingInvoiceID, historyRecords, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/History'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createRepeatingInvoiceHistory.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling createRepeatingInvoiceHistory.');
        }
        if (historyRecords === null || historyRecords === undefined) {
            throw new Error('Required parameter historyRecords was null or undefined when calling createRepeatingInvoiceHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(historyRecords, "HistoryRecords")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createTaxRate(xeroTenantId, taxRate, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TaxRates';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createTaxRate.');
        }
        if (taxRate === null || taxRate === undefined) {
            throw new Error('Required parameter taxRate was null or undefined when calling createTaxRate.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(taxRate, "TaxRate")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TaxRates");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createTaxRates(xeroTenantId, taxRates, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TaxRates#bulk';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createTaxRates.');
        }
        if (taxRates === null || taxRates === undefined) {
            throw new Error('Required parameter taxRates was null or undefined when calling createTaxRates.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(taxRates, "TaxRates")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TaxRates");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createTrackingCategory(xeroTenantId, trackingCategory, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createTrackingCategory.');
        }
        if (trackingCategory === null || trackingCategory === undefined) {
            throw new Error('Required parameter trackingCategory was null or undefined when calling createTrackingCategory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(trackingCategory, "TrackingCategory")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingCategories");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async createTrackingOptions(xeroTenantId, trackingCategoryID, trackingOption, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories/{TrackingCategoryID}/Options'
            .replace('{' + 'TrackingCategoryID' + '}', encodeURIComponent(String(trackingCategoryID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createTrackingOptions.');
        }
        if (trackingCategoryID === null || trackingCategoryID === undefined) {
            throw new Error('Required parameter trackingCategoryID was null or undefined when calling createTrackingOptions.');
        }
        if (trackingOption === null || trackingOption === undefined) {
            throw new Error('Required parameter trackingOption was null or undefined when calling createTrackingOptions.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'PUT',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(trackingOption, "TrackingOption")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingOptions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteAccount(xeroTenantId, accountID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteAccount.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling deleteAccount.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Accounts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteContactGroupContact(xeroTenantId, contactGroupID, contactID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups/{ContactGroupID}/Contacts/{ContactID}'
            .replace('{' + 'ContactGroupID' + '}', encodeURIComponent(String(contactGroupID)))
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteContactGroupContact.');
        }
        if (contactGroupID === null || contactGroupID === undefined) {
            throw new Error('Required parameter contactGroupID was null or undefined when calling deleteContactGroupContact.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling deleteContactGroupContact.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteContactGroupContacts(xeroTenantId, contactGroupID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups/{ContactGroupID}/Contacts'
            .replace('{' + 'ContactGroupID' + '}', encodeURIComponent(String(contactGroupID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteContactGroupContacts.');
        }
        if (contactGroupID === null || contactGroupID === undefined) {
            throw new Error('Required parameter contactGroupID was null or undefined when calling deleteContactGroupContacts.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteItem(xeroTenantId, itemID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items/{ItemID}'
            .replace('{' + 'ItemID' + '}', encodeURIComponent(String(itemID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteItem.');
        }
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling deleteItem.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteLinkedTransaction(xeroTenantId, linkedTransactionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/LinkedTransactions/{LinkedTransactionID}'
            .replace('{' + 'LinkedTransactionID' + '}', encodeURIComponent(String(linkedTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteLinkedTransaction.');
        }
        if (linkedTransactionID === null || linkedTransactionID === undefined) {
            throw new Error('Required parameter linkedTransactionID was null or undefined when calling deleteLinkedTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deletePayment(xeroTenantId, paymentID, payments, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments/{PaymentID}'
            .replace('{' + 'PaymentID' + '}', encodeURIComponent(String(paymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deletePayment.');
        }
        if (paymentID === null || paymentID === undefined) {
            throw new Error('Required parameter paymentID was null or undefined when calling deletePayment.');
        }
        if (payments === null || payments === undefined) {
            throw new Error('Required parameter payments was null or undefined when calling deletePayment.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(payments, "Payments")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Payments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteTrackingCategory(xeroTenantId, trackingCategoryID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories/{TrackingCategoryID}'
            .replace('{' + 'TrackingCategoryID' + '}', encodeURIComponent(String(trackingCategoryID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteTrackingCategory.');
        }
        if (trackingCategoryID === null || trackingCategoryID === undefined) {
            throw new Error('Required parameter trackingCategoryID was null or undefined when calling deleteTrackingCategory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingCategories");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async deleteTrackingOptions(xeroTenantId, trackingCategoryID, trackingOptionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories/{TrackingCategoryID}/Options/{TrackingOptionID}'
            .replace('{' + 'TrackingCategoryID' + '}', encodeURIComponent(String(trackingCategoryID)))
            .replace('{' + 'TrackingOptionID' + '}', encodeURIComponent(String(trackingOptionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteTrackingOptions.');
        }
        if (trackingCategoryID === null || trackingCategoryID === undefined) {
            throw new Error('Required parameter trackingCategoryID was null or undefined when calling deleteTrackingOptions.');
        }
        if (trackingOptionID === null || trackingOptionID === undefined) {
            throw new Error('Required parameter trackingOptionID was null or undefined when calling deleteTrackingOptions.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'DELETE',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingOptions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async emailInvoice(xeroTenantId, invoiceID, requestEmpty, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/Email'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling emailInvoice.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling emailInvoice.');
        }
        if (requestEmpty === null || requestEmpty === undefined) {
            throw new Error('Required parameter requestEmpty was null or undefined when calling emailInvoice.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            body: models_1.ObjectSerializer.serialize(requestEmpty, "RequestEmpty")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getAccount(xeroTenantId, accountID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAccount.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling getAccount.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Accounts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getAccountAttachmentByFileName(xeroTenantId, accountID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}/Attachments/{FileName}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAccountAttachmentByFileName.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling getAccountAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getAccountAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getAccountAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getAccountAttachmentById(xeroTenantId, accountID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}/Attachments/{AttachmentID}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAccountAttachmentById.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling getAccountAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getAccountAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getAccountAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getAccountAttachments(xeroTenantId, accountID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}/Attachments'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAccountAttachments.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling getAccountAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getAccounts(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAccounts.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Accounts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransaction(xeroTenantId, bankTransactionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransaction.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling getBankTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransactionAttachmentByFileName(xeroTenantId, bankTransactionID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/Attachments/{FileName}'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransactionAttachmentByFileName.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling getBankTransactionAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getBankTransactionAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getBankTransactionAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransactionAttachmentById(xeroTenantId, bankTransactionID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/Attachments/{AttachmentID}'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransactionAttachmentById.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling getBankTransactionAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getBankTransactionAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getBankTransactionAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransactionAttachments(xeroTenantId, bankTransactionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/Attachments'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransactionAttachments.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling getBankTransactionAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransactions(xeroTenantId, ifModifiedSince, where, order, page, unitdp, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransactions.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (unitdp !== undefined) {
            localVarQueryParameters['unitdp'] = models_1.ObjectSerializer.serialize(unitdp, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransactionsHistory(xeroTenantId, bankTransactionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/History'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransactionsHistory.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling getBankTransactionsHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransfer(xeroTenantId, bankTransferID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransfer.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling getBankTransfer.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransfers");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransferAttachmentByFileName(xeroTenantId, bankTransferID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/Attachments/{FileName}'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransferAttachmentByFileName.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling getBankTransferAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getBankTransferAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getBankTransferAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransferAttachmentById(xeroTenantId, bankTransferID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/Attachments/{AttachmentID}'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransferAttachmentById.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling getBankTransferAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getBankTransferAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getBankTransferAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransferAttachments(xeroTenantId, bankTransferID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/Attachments'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransferAttachments.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling getBankTransferAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransferHistory(xeroTenantId, bankTransferID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/History'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransferHistory.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling getBankTransferHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBankTransfers(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBankTransfers.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransfers");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBatchPaymentHistory(xeroTenantId, batchPaymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BatchPayments/{BatchPaymentID}/History'
            .replace('{' + 'BatchPaymentID' + '}', encodeURIComponent(String(batchPaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBatchPaymentHistory.');
        }
        if (batchPaymentID === null || batchPaymentID === undefined) {
            throw new Error('Required parameter batchPaymentID was null or undefined when calling getBatchPaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBatchPayments(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BatchPayments';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBatchPayments.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BatchPayments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBrandingTheme(xeroTenantId, brandingThemeID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BrandingThemes/{BrandingThemeID}'
            .replace('{' + 'BrandingThemeID' + '}', encodeURIComponent(String(brandingThemeID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBrandingTheme.');
        }
        if (brandingThemeID === null || brandingThemeID === undefined) {
            throw new Error('Required parameter brandingThemeID was null or undefined when calling getBrandingTheme.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BrandingThemes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBrandingThemePaymentServices(xeroTenantId, brandingThemeID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BrandingThemes/{BrandingThemeID}/PaymentServices'
            .replace('{' + 'BrandingThemeID' + '}', encodeURIComponent(String(brandingThemeID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBrandingThemePaymentServices.');
        }
        if (brandingThemeID === null || brandingThemeID === undefined) {
            throw new Error('Required parameter brandingThemeID was null or undefined when calling getBrandingThemePaymentServices.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PaymentServices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getBrandingThemes(xeroTenantId, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BrandingThemes';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getBrandingThemes.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BrandingThemes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContact(xeroTenantId, contactID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContact.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling getContact.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Contacts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactAttachmentByFileName(xeroTenantId, contactID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/Attachments/{FileName}'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactAttachmentByFileName.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling getContactAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getContactAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getContactAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactAttachmentById(xeroTenantId, contactID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/Attachments/{AttachmentID}'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactAttachmentById.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling getContactAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getContactAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getContactAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactAttachments(xeroTenantId, contactID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/Attachments'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactAttachments.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling getContactAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactCISSettings(xeroTenantId, contactID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/CISSettings'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactCISSettings.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling getContactCISSettings.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CISSettings");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactGroup(xeroTenantId, contactGroupID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups/{ContactGroupID}'
            .replace('{' + 'ContactGroupID' + '}', encodeURIComponent(String(contactGroupID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactGroup.');
        }
        if (contactGroupID === null || contactGroupID === undefined) {
            throw new Error('Required parameter contactGroupID was null or undefined when calling getContactGroup.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ContactGroups");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactGroups(xeroTenantId, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactGroups.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ContactGroups");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContactHistory(xeroTenantId, contactID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/History'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContactHistory.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling getContactHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getContacts(xeroTenantId, ifModifiedSince, where, order, iDs, page, includeArchived, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getContacts.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (iDs !== undefined) {
            localVarQueryParameters['IDs'] = models_1.ObjectSerializer.serialize(iDs, "Array<string>");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (includeArchived !== undefined) {
            localVarQueryParameters['includeArchived'] = models_1.ObjectSerializer.serialize(includeArchived, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Contacts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNote(xeroTenantId, creditNoteID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNote.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling getCreditNote.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CreditNotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNoteAsPdf(xeroTenantId, creditNoteID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/pdf'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNoteAsPdf.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling getCreditNoteAsPdf.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getCreditNoteAsPdf.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNoteAttachmentByFileName(xeroTenantId, creditNoteID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/Attachments/{FileName}'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNoteAttachmentByFileName.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling getCreditNoteAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getCreditNoteAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getCreditNoteAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNoteAttachmentById(xeroTenantId, creditNoteID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/Attachments/{AttachmentID}'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNoteAttachmentById.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling getCreditNoteAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getCreditNoteAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getCreditNoteAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNoteAttachments(xeroTenantId, creditNoteID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/Attachments'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNoteAttachments.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling getCreditNoteAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNoteHistory(xeroTenantId, creditNoteID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/History'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNoteHistory.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling getCreditNoteHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCreditNotes(xeroTenantId, ifModifiedSince, where, order, page, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCreditNotes.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CreditNotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getCurrencies(xeroTenantId, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Currencies';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getCurrencies.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Currencies");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getEmployee(xeroTenantId, employeeID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Employees/{EmployeeID}'
            .replace('{' + 'EmployeeID' + '}', encodeURIComponent(String(employeeID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getEmployee.');
        }
        if (employeeID === null || employeeID === undefined) {
            throw new Error('Required parameter employeeID was null or undefined when calling getEmployee.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Employees");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getEmployees(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Employees';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getEmployees.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Employees");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getExpenseClaim(xeroTenantId, expenseClaimID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ExpenseClaims/{ExpenseClaimID}'
            .replace('{' + 'ExpenseClaimID' + '}', encodeURIComponent(String(expenseClaimID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getExpenseClaim.');
        }
        if (expenseClaimID === null || expenseClaimID === undefined) {
            throw new Error('Required parameter expenseClaimID was null or undefined when calling getExpenseClaim.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ExpenseClaims");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getExpenseClaimHistory(xeroTenantId, expenseClaimID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ExpenseClaims/{ExpenseClaimID}/History'
            .replace('{' + 'ExpenseClaimID' + '}', encodeURIComponent(String(expenseClaimID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getExpenseClaimHistory.');
        }
        if (expenseClaimID === null || expenseClaimID === undefined) {
            throw new Error('Required parameter expenseClaimID was null or undefined when calling getExpenseClaimHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getExpenseClaims(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ExpenseClaims';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getExpenseClaims.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ExpenseClaims");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoice(xeroTenantId, invoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoice.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getInvoice.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Invoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoiceAsPdf(xeroTenantId, invoiceID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/pdf'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoiceAsPdf.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getInvoiceAsPdf.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getInvoiceAsPdf.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoiceAttachmentByFileName(xeroTenantId, invoiceID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/Attachments/{FileName}'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoiceAttachmentByFileName.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getInvoiceAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getInvoiceAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getInvoiceAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoiceAttachmentById(xeroTenantId, invoiceID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/Attachments/{AttachmentID}'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoiceAttachmentById.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getInvoiceAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getInvoiceAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getInvoiceAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoiceAttachments(xeroTenantId, invoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/Attachments'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoiceAttachments.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getInvoiceAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoiceHistory(xeroTenantId, invoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/History'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoiceHistory.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getInvoiceHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoiceReminders(xeroTenantId, options = { headers: {} }) {
        const localVarPath = this.basePath + '/InvoiceReminders/Settings';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoiceReminders.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "InvoiceReminders");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getInvoices(xeroTenantId, ifModifiedSince, where, order, iDs, invoiceNumbers, contactIDs, statuses, page, includeArchived, createdByMyApp, unitdp, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getInvoices.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (iDs !== undefined) {
            localVarQueryParameters['IDs'] = models_1.ObjectSerializer.serialize(iDs, "Array<string>");
        }
        if (invoiceNumbers !== undefined) {
            localVarQueryParameters['InvoiceNumbers'] = models_1.ObjectSerializer.serialize(invoiceNumbers, "Array<string>");
        }
        if (contactIDs !== undefined) {
            localVarQueryParameters['ContactIDs'] = models_1.ObjectSerializer.serialize(contactIDs, "Array<string>");
        }
        if (statuses !== undefined) {
            localVarQueryParameters['Statuses'] = models_1.ObjectSerializer.serialize(statuses, "Array<string>");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (includeArchived !== undefined) {
            localVarQueryParameters['includeArchived'] = models_1.ObjectSerializer.serialize(includeArchived, "boolean");
        }
        if (createdByMyApp !== undefined) {
            localVarQueryParameters['createdByMyApp'] = models_1.ObjectSerializer.serialize(createdByMyApp, "boolean");
        }
        if (unitdp !== undefined) {
            localVarQueryParameters['unitdp'] = models_1.ObjectSerializer.serialize(unitdp, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Invoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getItem(xeroTenantId, itemID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items/{ItemID}'
            .replace('{' + 'ItemID' + '}', encodeURIComponent(String(itemID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getItem.');
        }
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling getItem.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Items");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getItemHistory(xeroTenantId, itemID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items/{ItemID}/History'
            .replace('{' + 'ItemID' + '}', encodeURIComponent(String(itemID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getItemHistory.');
        }
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling getItemHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getItems(xeroTenantId, ifModifiedSince, where, order, unitdp, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getItems.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (unitdp !== undefined) {
            localVarQueryParameters['unitdp'] = models_1.ObjectSerializer.serialize(unitdp, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Items");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getJournal(xeroTenantId, journalID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Journals/{JournalID}'
            .replace('{' + 'JournalID' + '}', encodeURIComponent(String(journalID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getJournal.');
        }
        if (journalID === null || journalID === undefined) {
            throw new Error('Required parameter journalID was null or undefined when calling getJournal.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Journals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getJournals(xeroTenantId, ifModifiedSince, offset, paymentsOnly, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Journals';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getJournals.');
        }
        if (offset !== undefined) {
            localVarQueryParameters['offset'] = models_1.ObjectSerializer.serialize(offset, "number");
        }
        if (paymentsOnly !== undefined) {
            localVarQueryParameters['paymentsOnly'] = models_1.ObjectSerializer.serialize(paymentsOnly, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Journals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getLinkedTransaction(xeroTenantId, linkedTransactionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/LinkedTransactions/{LinkedTransactionID}'
            .replace('{' + 'LinkedTransactionID' + '}', encodeURIComponent(String(linkedTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getLinkedTransaction.');
        }
        if (linkedTransactionID === null || linkedTransactionID === undefined) {
            throw new Error('Required parameter linkedTransactionID was null or undefined when calling getLinkedTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "LinkedTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getLinkedTransactions(xeroTenantId, page, linkedTransactionID, sourceTransactionID, contactID, status, targetTransactionID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/LinkedTransactions';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getLinkedTransactions.');
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (linkedTransactionID !== undefined) {
            localVarQueryParameters['LinkedTransactionID'] = models_1.ObjectSerializer.serialize(linkedTransactionID, "string");
        }
        if (sourceTransactionID !== undefined) {
            localVarQueryParameters['SourceTransactionID'] = models_1.ObjectSerializer.serialize(sourceTransactionID, "string");
        }
        if (contactID !== undefined) {
            localVarQueryParameters['ContactID'] = models_1.ObjectSerializer.serialize(contactID, "string");
        }
        if (status !== undefined) {
            localVarQueryParameters['Status'] = models_1.ObjectSerializer.serialize(status, "string");
        }
        if (targetTransactionID !== undefined) {
            localVarQueryParameters['TargetTransactionID'] = models_1.ObjectSerializer.serialize(targetTransactionID, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "LinkedTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getManualJournal(xeroTenantId, manualJournalID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getManualJournal.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling getManualJournal.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ManualJournals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getManualJournalAttachmentByFileName(xeroTenantId, manualJournalID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}/Attachments/{FileName}'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getManualJournalAttachmentByFileName.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling getManualJournalAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getManualJournalAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getManualJournalAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getManualJournalAttachmentById(xeroTenantId, manualJournalID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}/Attachments/{AttachmentID}'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getManualJournalAttachmentById.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling getManualJournalAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getManualJournalAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getManualJournalAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getManualJournalAttachments(xeroTenantId, manualJournalID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}/Attachments'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getManualJournalAttachments.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling getManualJournalAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getManualJournals(xeroTenantId, ifModifiedSince, where, order, page, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getManualJournals.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ManualJournals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getOnlineInvoice(xeroTenantId, invoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/OnlineInvoice'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getOnlineInvoice.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling getOnlineInvoice.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "OnlineInvoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getOrganisationCISSettings(xeroTenantId, organisationID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Organisation/{OrganisationID}/CISSettings'
            .replace('{' + 'OrganisationID' + '}', encodeURIComponent(String(organisationID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getOrganisationCISSettings.');
        }
        if (organisationID === null || organisationID === undefined) {
            throw new Error('Required parameter organisationID was null or undefined when calling getOrganisationCISSettings.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CISOrgSetting");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getOrganisations(xeroTenantId, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Organisation';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getOrganisations.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Organisations");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getOverpayment(xeroTenantId, overpaymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Overpayments/{OverpaymentID}'
            .replace('{' + 'OverpaymentID' + '}', encodeURIComponent(String(overpaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getOverpayment.');
        }
        if (overpaymentID === null || overpaymentID === undefined) {
            throw new Error('Required parameter overpaymentID was null or undefined when calling getOverpayment.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Overpayments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getOverpaymentHistory(xeroTenantId, overpaymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Overpayments/{OverpaymentID}/History'
            .replace('{' + 'OverpaymentID' + '}', encodeURIComponent(String(overpaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getOverpaymentHistory.');
        }
        if (overpaymentID === null || overpaymentID === undefined) {
            throw new Error('Required parameter overpaymentID was null or undefined when calling getOverpaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getOverpayments(xeroTenantId, ifModifiedSince, where, order, page, unitdp, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Overpayments';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getOverpayments.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (unitdp !== undefined) {
            localVarQueryParameters['unitdp'] = models_1.ObjectSerializer.serialize(unitdp, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Overpayments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPayment(xeroTenantId, paymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments/{PaymentID}'
            .replace('{' + 'PaymentID' + '}', encodeURIComponent(String(paymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPayment.');
        }
        if (paymentID === null || paymentID === undefined) {
            throw new Error('Required parameter paymentID was null or undefined when calling getPayment.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Payments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPaymentHistory(xeroTenantId, paymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments/{PaymentID}/History'
            .replace('{' + 'PaymentID' + '}', encodeURIComponent(String(paymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPaymentHistory.');
        }
        if (paymentID === null || paymentID === undefined) {
            throw new Error('Required parameter paymentID was null or undefined when calling getPaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPaymentServices(xeroTenantId, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PaymentServices';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPaymentServices.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PaymentServices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPayments(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Payments';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPayments.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Payments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPrepayment(xeroTenantId, prepaymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Prepayments/{PrepaymentID}'
            .replace('{' + 'PrepaymentID' + '}', encodeURIComponent(String(prepaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPrepayment.');
        }
        if (prepaymentID === null || prepaymentID === undefined) {
            throw new Error('Required parameter prepaymentID was null or undefined when calling getPrepayment.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Prepayments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPrepaymentHistory(xeroTenantId, prepaymentID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Prepayments/{PrepaymentID}/History'
            .replace('{' + 'PrepaymentID' + '}', encodeURIComponent(String(prepaymentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPrepaymentHistory.');
        }
        if (prepaymentID === null || prepaymentID === undefined) {
            throw new Error('Required parameter prepaymentID was null or undefined when calling getPrepaymentHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPrepayments(xeroTenantId, ifModifiedSince, where, order, page, unitdp, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Prepayments';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPrepayments.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (unitdp !== undefined) {
            localVarQueryParameters['unitdp'] = models_1.ObjectSerializer.serialize(unitdp, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Prepayments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPurchaseOrder(xeroTenantId, purchaseOrderID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders/{PurchaseOrderID}'
            .replace('{' + 'PurchaseOrderID' + '}', encodeURIComponent(String(purchaseOrderID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPurchaseOrder.');
        }
        if (purchaseOrderID === null || purchaseOrderID === undefined) {
            throw new Error('Required parameter purchaseOrderID was null or undefined when calling getPurchaseOrder.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PurchaseOrders");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPurchaseOrderHistory(xeroTenantId, purchaseOrderID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders/{PurchaseOrderID}/History'
            .replace('{' + 'PurchaseOrderID' + '}', encodeURIComponent(String(purchaseOrderID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPurchaseOrderHistory.');
        }
        if (purchaseOrderID === null || purchaseOrderID === undefined) {
            throw new Error('Required parameter purchaseOrderID was null or undefined when calling getPurchaseOrderHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getPurchaseOrders(xeroTenantId, ifModifiedSince, status, dateFrom, dateTo, order, page, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getPurchaseOrders.');
        }
        if (status !== undefined) {
            localVarQueryParameters['Status'] = models_1.ObjectSerializer.serialize(status, "'DRAFT' | 'SUBMITTED' | 'AUTHORISED' | 'BILLED' | 'DELETED'");
        }
        if (dateFrom !== undefined) {
            localVarQueryParameters['DateFrom'] = models_1.ObjectSerializer.serialize(dateFrom, "string");
        }
        if (dateTo !== undefined) {
            localVarQueryParameters['DateTo'] = models_1.ObjectSerializer.serialize(dateTo, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PurchaseOrders");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getQuote(xeroTenantId, quoteID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Quotes/{QuoteID}'
            .replace('{' + 'QuoteID' + '}', encodeURIComponent(String(quoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getQuote.');
        }
        if (quoteID === null || quoteID === undefined) {
            throw new Error('Required parameter quoteID was null or undefined when calling getQuote.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Quotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getQuotes(xeroTenantId, ifModifiedSince, dateFrom, dateTo, expiryDateFrom, expiryDateTo, contactID, status, page, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Quotes';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getQuotes.');
        }
        if (dateFrom !== undefined) {
            localVarQueryParameters['DateFrom'] = models_1.ObjectSerializer.serialize(dateFrom, "string");
        }
        if (dateTo !== undefined) {
            localVarQueryParameters['DateTo'] = models_1.ObjectSerializer.serialize(dateTo, "string");
        }
        if (expiryDateFrom !== undefined) {
            localVarQueryParameters['ExpiryDateFrom'] = models_1.ObjectSerializer.serialize(expiryDateFrom, "string");
        }
        if (expiryDateTo !== undefined) {
            localVarQueryParameters['ExpiryDateTo'] = models_1.ObjectSerializer.serialize(expiryDateTo, "string");
        }
        if (contactID !== undefined) {
            localVarQueryParameters['ContactID'] = models_1.ObjectSerializer.serialize(contactID, "string");
        }
        if (status !== undefined) {
            localVarQueryParameters['Status'] = models_1.ObjectSerializer.serialize(status, "string");
        }
        if (page !== undefined) {
            localVarQueryParameters['page'] = models_1.ObjectSerializer.serialize(page, "number");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Quotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReceipt(xeroTenantId, receiptID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReceipt.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling getReceipt.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Receipts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReceiptAttachmentByFileName(xeroTenantId, receiptID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/Attachments/{FileName}'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReceiptAttachmentByFileName.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling getReceiptAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getReceiptAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getReceiptAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReceiptAttachmentById(xeroTenantId, receiptID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/Attachments/{AttachmentID}'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReceiptAttachmentById.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling getReceiptAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getReceiptAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getReceiptAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReceiptAttachments(xeroTenantId, receiptID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/Attachments'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReceiptAttachments.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling getReceiptAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReceiptHistory(xeroTenantId, receiptID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/History'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReceiptHistory.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling getReceiptHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReceipts(xeroTenantId, ifModifiedSince, where, order, unitdp, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReceipts.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (unitdp !== undefined) {
            localVarQueryParameters['unitdp'] = models_1.ObjectSerializer.serialize(unitdp, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Receipts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getRepeatingInvoice(xeroTenantId, repeatingInvoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getRepeatingInvoice.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling getRepeatingInvoice.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "RepeatingInvoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getRepeatingInvoiceAttachmentByFileName(xeroTenantId, repeatingInvoiceID, fileName, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getRepeatingInvoiceAttachmentByFileName.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling getRepeatingInvoiceAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling getRepeatingInvoiceAttachmentByFileName.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getRepeatingInvoiceAttachmentByFileName.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getRepeatingInvoiceAttachmentById(xeroTenantId, repeatingInvoiceID, attachmentID, contentType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{AttachmentID}'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)))
            .replace('{' + 'AttachmentID' + '}', encodeURIComponent(String(attachmentID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getRepeatingInvoiceAttachmentById.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling getRepeatingInvoiceAttachmentById.');
        }
        if (attachmentID === null || attachmentID === undefined) {
            throw new Error('Required parameter attachmentID was null or undefined when calling getRepeatingInvoiceAttachmentById.');
        }
        if (contentType === null || contentType === undefined) {
            throw new Error('Required parameter contentType was null or undefined when calling getRepeatingInvoiceAttachmentById.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['contentType'] = models_1.ObjectSerializer.serialize(contentType, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            encoding: null,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Buffer");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getRepeatingInvoiceAttachments(xeroTenantId, repeatingInvoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/Attachments'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getRepeatingInvoiceAttachments.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling getRepeatingInvoiceAttachments.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getRepeatingInvoiceHistory(xeroTenantId, repeatingInvoiceID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/History'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getRepeatingInvoiceHistory.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling getRepeatingInvoiceHistory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "HistoryRecords");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getRepeatingInvoices(xeroTenantId, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getRepeatingInvoices.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "RepeatingInvoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportAgedPayablesByContact(xeroTenantId, contactId, date, fromDate, toDate, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/AgedPayablesByContact';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportAgedPayablesByContact.');
        }
        if (contactId === null || contactId === undefined) {
            throw new Error('Required parameter contactId was null or undefined when calling getReportAgedPayablesByContact.');
        }
        if (contactId !== undefined) {
            localVarQueryParameters['contactId'] = models_1.ObjectSerializer.serialize(contactId, "string");
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        if (fromDate !== undefined) {
            localVarQueryParameters['fromDate'] = models_1.ObjectSerializer.serialize(fromDate, "string");
        }
        if (toDate !== undefined) {
            localVarQueryParameters['toDate'] = models_1.ObjectSerializer.serialize(toDate, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportAgedReceivablesByContact(xeroTenantId, contactId, date, fromDate, toDate, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/AgedReceivablesByContact';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportAgedReceivablesByContact.');
        }
        if (contactId === null || contactId === undefined) {
            throw new Error('Required parameter contactId was null or undefined when calling getReportAgedReceivablesByContact.');
        }
        if (contactId !== undefined) {
            localVarQueryParameters['contactId'] = models_1.ObjectSerializer.serialize(contactId, "string");
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        if (fromDate !== undefined) {
            localVarQueryParameters['fromDate'] = models_1.ObjectSerializer.serialize(fromDate, "string");
        }
        if (toDate !== undefined) {
            localVarQueryParameters['toDate'] = models_1.ObjectSerializer.serialize(toDate, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportBASorGST(xeroTenantId, reportID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/{ReportID}'
            .replace('{' + 'ReportID' + '}', encodeURIComponent(String(reportID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportBASorGST.');
        }
        if (reportID === null || reportID === undefined) {
            throw new Error('Required parameter reportID was null or undefined when calling getReportBASorGST.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportBASorGSTList(xeroTenantId, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportBASorGSTList.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportBalanceSheet(xeroTenantId, date, periods, timeframe, trackingOptionID1, trackingOptionID2, standardLayout, paymentsOnly, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/BalanceSheet';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportBalanceSheet.');
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        if (periods !== undefined) {
            localVarQueryParameters['periods'] = models_1.ObjectSerializer.serialize(periods, "number");
        }
        if (timeframe !== undefined) {
            localVarQueryParameters['timeframe'] = models_1.ObjectSerializer.serialize(timeframe, "'MONTH' | 'QUARTER' | 'YEAR'");
        }
        if (trackingOptionID1 !== undefined) {
            localVarQueryParameters['trackingOptionID1'] = models_1.ObjectSerializer.serialize(trackingOptionID1, "string");
        }
        if (trackingOptionID2 !== undefined) {
            localVarQueryParameters['trackingOptionID2'] = models_1.ObjectSerializer.serialize(trackingOptionID2, "string");
        }
        if (standardLayout !== undefined) {
            localVarQueryParameters['standardLayout'] = models_1.ObjectSerializer.serialize(standardLayout, "boolean");
        }
        if (paymentsOnly !== undefined) {
            localVarQueryParameters['paymentsOnly'] = models_1.ObjectSerializer.serialize(paymentsOnly, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportBankSummary(xeroTenantId, date, period, timeframe, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/BankSummary';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportBankSummary.');
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        if (period !== undefined) {
            localVarQueryParameters['period'] = models_1.ObjectSerializer.serialize(period, "number");
        }
        if (timeframe !== undefined) {
            localVarQueryParameters['timeframe'] = models_1.ObjectSerializer.serialize(timeframe, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportBudgetSummary(xeroTenantId, date, period, timeframe, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/BudgetSummary';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportBudgetSummary.');
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        if (period !== undefined) {
            localVarQueryParameters['period'] = models_1.ObjectSerializer.serialize(period, "number");
        }
        if (timeframe !== undefined) {
            localVarQueryParameters['timeframe'] = models_1.ObjectSerializer.serialize(timeframe, "number");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportExecutiveSummary(xeroTenantId, date, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/ExecutiveSummary';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportExecutiveSummary.');
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportProfitAndLoss(xeroTenantId, fromDate, toDate, periods, timeframe, trackingCategoryID, trackingCategoryID2, trackingOptionID, trackingOptionID2, standardLayout, paymentsOnly, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/ProfitAndLoss';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportProfitAndLoss.');
        }
        if (fromDate !== undefined) {
            localVarQueryParameters['fromDate'] = models_1.ObjectSerializer.serialize(fromDate, "string");
        }
        if (toDate !== undefined) {
            localVarQueryParameters['toDate'] = models_1.ObjectSerializer.serialize(toDate, "string");
        }
        if (periods !== undefined) {
            localVarQueryParameters['periods'] = models_1.ObjectSerializer.serialize(periods, "number");
        }
        if (timeframe !== undefined) {
            localVarQueryParameters['timeframe'] = models_1.ObjectSerializer.serialize(timeframe, "'MONTH' | 'QUARTER' | 'YEAR'");
        }
        if (trackingCategoryID !== undefined) {
            localVarQueryParameters['trackingCategoryID'] = models_1.ObjectSerializer.serialize(trackingCategoryID, "string");
        }
        if (trackingCategoryID2 !== undefined) {
            localVarQueryParameters['trackingCategoryID2'] = models_1.ObjectSerializer.serialize(trackingCategoryID2, "string");
        }
        if (trackingOptionID !== undefined) {
            localVarQueryParameters['trackingOptionID'] = models_1.ObjectSerializer.serialize(trackingOptionID, "string");
        }
        if (trackingOptionID2 !== undefined) {
            localVarQueryParameters['trackingOptionID2'] = models_1.ObjectSerializer.serialize(trackingOptionID2, "string");
        }
        if (standardLayout !== undefined) {
            localVarQueryParameters['standardLayout'] = models_1.ObjectSerializer.serialize(standardLayout, "boolean");
        }
        if (paymentsOnly !== undefined) {
            localVarQueryParameters['paymentsOnly'] = models_1.ObjectSerializer.serialize(paymentsOnly, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportTenNinetyNine(xeroTenantId, reportYear, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/TenNinetyNine';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportTenNinetyNine.');
        }
        if (reportYear !== undefined) {
            localVarQueryParameters['reportYear'] = models_1.ObjectSerializer.serialize(reportYear, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Reports");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getReportTrialBalance(xeroTenantId, date, paymentsOnly, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Reports/TrialBalance';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getReportTrialBalance.');
        }
        if (date !== undefined) {
            localVarQueryParameters['date'] = models_1.ObjectSerializer.serialize(date, "string");
        }
        if (paymentsOnly !== undefined) {
            localVarQueryParameters['paymentsOnly'] = models_1.ObjectSerializer.serialize(paymentsOnly, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ReportWithRows");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getTaxRates(xeroTenantId, where, order, taxType, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TaxRates';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getTaxRates.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (taxType !== undefined) {
            localVarQueryParameters['TaxType'] = models_1.ObjectSerializer.serialize(taxType, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TaxRates");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getTrackingCategories(xeroTenantId, where, order, includeArchived, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getTrackingCategories.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        if (includeArchived !== undefined) {
            localVarQueryParameters['includeArchived'] = models_1.ObjectSerializer.serialize(includeArchived, "boolean");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingCategories");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getTrackingCategory(xeroTenantId, trackingCategoryID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories/{TrackingCategoryID}'
            .replace('{' + 'TrackingCategoryID' + '}', encodeURIComponent(String(trackingCategoryID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getTrackingCategory.');
        }
        if (trackingCategoryID === null || trackingCategoryID === undefined) {
            throw new Error('Required parameter trackingCategoryID was null or undefined when calling getTrackingCategory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingCategories");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getUser(xeroTenantId, userID, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Users/{UserID}'
            .replace('{' + 'UserID' + '}', encodeURIComponent(String(userID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getUser.');
        }
        if (userID === null || userID === undefined) {
            throw new Error('Required parameter userID was null or undefined when calling getUser.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Users");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async getUsers(xeroTenantId, ifModifiedSince, where, order, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Users';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getUsers.');
        }
        if (where !== undefined) {
            localVarQueryParameters['where'] = models_1.ObjectSerializer.serialize(where, "string");
        }
        if (order !== undefined) {
            localVarQueryParameters['order'] = models_1.ObjectSerializer.serialize(order, "string");
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['If-Modified-Since'] = models_1.ObjectSerializer.serialize(ifModifiedSince, "Date");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'GET',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Users");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateAccount(xeroTenantId, accountID, accounts, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateAccount.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling updateAccount.');
        }
        if (accounts === null || accounts === undefined) {
            throw new Error('Required parameter accounts was null or undefined when calling updateAccount.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(accounts, "Accounts")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Accounts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateAccountAttachmentByFileName(xeroTenantId, accountID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Accounts/{AccountID}/Attachments/{FileName}'
            .replace('{' + 'AccountID' + '}', encodeURIComponent(String(accountID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateAccountAttachmentByFileName.');
        }
        if (accountID === null || accountID === undefined) {
            throw new Error('Required parameter accountID was null or undefined when calling updateAccountAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateAccountAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateAccountAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateBankTransaction(xeroTenantId, bankTransactionID, bankTransactions, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateBankTransaction.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling updateBankTransaction.');
        }
        if (bankTransactions === null || bankTransactions === undefined) {
            throw new Error('Required parameter bankTransactions was null or undefined when calling updateBankTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(bankTransactions, "BankTransactions")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "BankTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateBankTransactionAttachmentByFileName(xeroTenantId, bankTransactionID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransactions/{BankTransactionID}/Attachments/{FileName}'
            .replace('{' + 'BankTransactionID' + '}', encodeURIComponent(String(bankTransactionID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateBankTransactionAttachmentByFileName.');
        }
        if (bankTransactionID === null || bankTransactionID === undefined) {
            throw new Error('Required parameter bankTransactionID was null or undefined when calling updateBankTransactionAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateBankTransactionAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateBankTransactionAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateBankTransferAttachmentByFileName(xeroTenantId, bankTransferID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/BankTransfers/{BankTransferID}/Attachments/{FileName}'
            .replace('{' + 'BankTransferID' + '}', encodeURIComponent(String(bankTransferID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateBankTransferAttachmentByFileName.');
        }
        if (bankTransferID === null || bankTransferID === undefined) {
            throw new Error('Required parameter bankTransferID was null or undefined when calling updateBankTransferAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateBankTransferAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateBankTransferAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateContact(xeroTenantId, contactID, contacts, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateContact.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling updateContact.');
        }
        if (contacts === null || contacts === undefined) {
            throw new Error('Required parameter contacts was null or undefined when calling updateContact.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(contacts, "Contacts")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Contacts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateContactAttachmentByFileName(xeroTenantId, contactID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Contacts/{ContactID}/Attachments/{FileName}'
            .replace('{' + 'ContactID' + '}', encodeURIComponent(String(contactID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateContactAttachmentByFileName.');
        }
        if (contactID === null || contactID === undefined) {
            throw new Error('Required parameter contactID was null or undefined when calling updateContactAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateContactAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateContactAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateContactGroup(xeroTenantId, contactGroupID, contactGroups, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ContactGroups/{ContactGroupID}'
            .replace('{' + 'ContactGroupID' + '}', encodeURIComponent(String(contactGroupID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateContactGroup.');
        }
        if (contactGroupID === null || contactGroupID === undefined) {
            throw new Error('Required parameter contactGroupID was null or undefined when calling updateContactGroup.');
        }
        if (contactGroups === null || contactGroups === undefined) {
            throw new Error('Required parameter contactGroups was null or undefined when calling updateContactGroup.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(contactGroups, "ContactGroups")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ContactGroups");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateCreditNote(xeroTenantId, creditNoteID, creditNotes, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateCreditNote.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling updateCreditNote.');
        }
        if (creditNotes === null || creditNotes === undefined) {
            throw new Error('Required parameter creditNotes was null or undefined when calling updateCreditNote.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(creditNotes, "CreditNotes")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "CreditNotes");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateCreditNoteAttachmentByFileName(xeroTenantId, creditNoteID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/CreditNotes/{CreditNoteID}/Attachments/{FileName}'
            .replace('{' + 'CreditNoteID' + '}', encodeURIComponent(String(creditNoteID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateCreditNoteAttachmentByFileName.');
        }
        if (creditNoteID === null || creditNoteID === undefined) {
            throw new Error('Required parameter creditNoteID was null or undefined when calling updateCreditNoteAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateCreditNoteAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateCreditNoteAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateEmployee(xeroTenantId, employeeID, employees, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Employees/{EmployeeID}'
            .replace('{' + 'EmployeeID' + '}', encodeURIComponent(String(employeeID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateEmployee.');
        }
        if (employeeID === null || employeeID === undefined) {
            throw new Error('Required parameter employeeID was null or undefined when calling updateEmployee.');
        }
        if (employees === null || employees === undefined) {
            throw new Error('Required parameter employees was null or undefined when calling updateEmployee.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(employees, "Employees")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Employees");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateExpenseClaim(xeroTenantId, expenseClaimID, expenseClaims, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ExpenseClaims/{ExpenseClaimID}'
            .replace('{' + 'ExpenseClaimID' + '}', encodeURIComponent(String(expenseClaimID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateExpenseClaim.');
        }
        if (expenseClaimID === null || expenseClaimID === undefined) {
            throw new Error('Required parameter expenseClaimID was null or undefined when calling updateExpenseClaim.');
        }
        if (expenseClaims === null || expenseClaims === undefined) {
            throw new Error('Required parameter expenseClaims was null or undefined when calling updateExpenseClaim.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(expenseClaims, "ExpenseClaims")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ExpenseClaims");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateInvoice(xeroTenantId, invoiceID, invoices, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateInvoice.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling updateInvoice.');
        }
        if (invoices === null || invoices === undefined) {
            throw new Error('Required parameter invoices was null or undefined when calling updateInvoice.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(invoices, "Invoices")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Invoices");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateInvoiceAttachmentByFileName(xeroTenantId, invoiceID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Invoices/{InvoiceID}/Attachments/{FileName}'
            .replace('{' + 'InvoiceID' + '}', encodeURIComponent(String(invoiceID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateInvoiceAttachmentByFileName.');
        }
        if (invoiceID === null || invoiceID === undefined) {
            throw new Error('Required parameter invoiceID was null or undefined when calling updateInvoiceAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateInvoiceAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateInvoiceAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateItem(xeroTenantId, itemID, items, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Items/{ItemID}'
            .replace('{' + 'ItemID' + '}', encodeURIComponent(String(itemID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateItem.');
        }
        if (itemID === null || itemID === undefined) {
            throw new Error('Required parameter itemID was null or undefined when calling updateItem.');
        }
        if (items === null || items === undefined) {
            throw new Error('Required parameter items was null or undefined when calling updateItem.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(items, "Items")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Items");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateLinkedTransaction(xeroTenantId, linkedTransactionID, linkedTransactions, options = { headers: {} }) {
        const localVarPath = this.basePath + '/LinkedTransactions/{LinkedTransactionID}'
            .replace('{' + 'LinkedTransactionID' + '}', encodeURIComponent(String(linkedTransactionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateLinkedTransaction.');
        }
        if (linkedTransactionID === null || linkedTransactionID === undefined) {
            throw new Error('Required parameter linkedTransactionID was null or undefined when calling updateLinkedTransaction.');
        }
        if (linkedTransactions === null || linkedTransactions === undefined) {
            throw new Error('Required parameter linkedTransactions was null or undefined when calling updateLinkedTransaction.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(linkedTransactions, "LinkedTransactions")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "LinkedTransactions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateManualJournal(xeroTenantId, manualJournalID, manualJournals, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateManualJournal.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling updateManualJournal.');
        }
        if (manualJournals === null || manualJournals === undefined) {
            throw new Error('Required parameter manualJournals was null or undefined when calling updateManualJournal.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(manualJournals, "ManualJournals")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "ManualJournals");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateManualJournalAttachmentByFileName(xeroTenantId, manualJournalID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/ManualJournals/{ManualJournalID}/Attachments/{FileName}'
            .replace('{' + 'ManualJournalID' + '}', encodeURIComponent(String(manualJournalID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateManualJournalAttachmentByFileName.');
        }
        if (manualJournalID === null || manualJournalID === undefined) {
            throw new Error('Required parameter manualJournalID was null or undefined when calling updateManualJournalAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateManualJournalAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateManualJournalAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updatePurchaseOrder(xeroTenantId, purchaseOrderID, purchaseOrders, options = { headers: {} }) {
        const localVarPath = this.basePath + '/PurchaseOrders/{PurchaseOrderID}'
            .replace('{' + 'PurchaseOrderID' + '}', encodeURIComponent(String(purchaseOrderID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updatePurchaseOrder.');
        }
        if (purchaseOrderID === null || purchaseOrderID === undefined) {
            throw new Error('Required parameter purchaseOrderID was null or undefined when calling updatePurchaseOrder.');
        }
        if (purchaseOrders === null || purchaseOrders === undefined) {
            throw new Error('Required parameter purchaseOrders was null or undefined when calling updatePurchaseOrder.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(purchaseOrders, "PurchaseOrders")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "PurchaseOrders");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateReceipt(xeroTenantId, receiptID, receipts, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateReceipt.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling updateReceipt.');
        }
        if (receipts === null || receipts === undefined) {
            throw new Error('Required parameter receipts was null or undefined when calling updateReceipt.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(receipts, "Receipts")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Receipts");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateReceiptAttachmentByFileName(xeroTenantId, receiptID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/Receipts/{ReceiptID}/Attachments/{FileName}'
            .replace('{' + 'ReceiptID' + '}', encodeURIComponent(String(receiptID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateReceiptAttachmentByFileName.');
        }
        if (receiptID === null || receiptID === undefined) {
            throw new Error('Required parameter receiptID was null or undefined when calling updateReceiptAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateReceiptAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateReceiptAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateRepeatingInvoiceAttachmentByFileName(xeroTenantId, repeatingInvoiceID, fileName, body, options = { headers: {} }) {
        const localVarPath = this.basePath + '/RepeatingInvoices/{RepeatingInvoiceID}/Attachments/{FileName}'
            .replace('{' + 'RepeatingInvoiceID' + '}', encodeURIComponent(String(repeatingInvoiceID)))
            .replace('{' + 'FileName' + '}', encodeURIComponent(String(fileName)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateRepeatingInvoiceAttachmentByFileName.');
        }
        if (repeatingInvoiceID === null || repeatingInvoiceID === undefined) {
            throw new Error('Required parameter repeatingInvoiceID was null or undefined when calling updateRepeatingInvoiceAttachmentByFileName.');
        }
        if (fileName === null || fileName === undefined) {
            throw new Error('Required parameter fileName was null or undefined when calling updateRepeatingInvoiceAttachmentByFileName.');
        }
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateRepeatingInvoiceAttachmentByFileName.');
        }
        this.binaryHeaders = { 'Accept': 'application/json' };
        Object.assign(localVarHeaderParams, this.binaryHeaders);
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(body, "string")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
        }).then(() => {
            return new Promise((resolve, reject) => {
                const fileContents = [];
                body.on('data', (chunk) => {
                    fileContents.push(chunk);
                });
                body.on('end', () => {
                    resolve(fileContents);
                });
                body.on('error', (err) => {
                    reject(err);
                });
            });
        }).then((fileContents) => {
            localVarRequestOptions.body = fileContents;
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "Attachments");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateTaxRate(xeroTenantId, taxRates, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TaxRates';
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateTaxRate.');
        }
        if (taxRates === null || taxRates === undefined) {
            throw new Error('Required parameter taxRates was null or undefined when calling updateTaxRate.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(taxRates, "TaxRates")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TaxRates");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateTrackingCategory(xeroTenantId, trackingCategoryID, trackingCategory, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories/{TrackingCategoryID}'
            .replace('{' + 'TrackingCategoryID' + '}', encodeURIComponent(String(trackingCategoryID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateTrackingCategory.');
        }
        if (trackingCategoryID === null || trackingCategoryID === undefined) {
            throw new Error('Required parameter trackingCategoryID was null or undefined when calling updateTrackingCategory.');
        }
        if (trackingCategory === null || trackingCategory === undefined) {
            throw new Error('Required parameter trackingCategory was null or undefined when calling updateTrackingCategory.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(trackingCategory, "TrackingCategory")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingCategories");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
    async updateTrackingOptions(xeroTenantId, trackingCategoryID, trackingOptionID, trackingOption, options = { headers: {} }) {
        const localVarPath = this.basePath + '/TrackingCategories/{TrackingCategoryID}/Options/{TrackingOptionID}'
            .replace('{' + 'TrackingCategoryID' + '}', encodeURIComponent(String(trackingCategoryID)))
            .replace('{' + 'TrackingOptionID' + '}', encodeURIComponent(String(trackingOptionID)));
        let localVarQueryParameters = {};
        let localVarHeaderParams = Object.assign({}, this.defaultHeaders);
        let localVarFormParams = {};
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling updateTrackingOptions.');
        }
        if (trackingCategoryID === null || trackingCategoryID === undefined) {
            throw new Error('Required parameter trackingCategoryID was null or undefined when calling updateTrackingOptions.');
        }
        if (trackingOptionID === null || trackingOptionID === undefined) {
            throw new Error('Required parameter trackingOptionID was null or undefined when calling updateTrackingOptions.');
        }
        if (trackingOption === null || trackingOption === undefined) {
            throw new Error('Required parameter trackingOption was null or undefined when calling updateTrackingOptions.');
        }
        localVarHeaderParams['Xero-Tenant-Id'] = models_1.ObjectSerializer.serialize(xeroTenantId, "string");
        Object.assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;
        let localVarRequestOptions = {
            method: 'POST',
            qs: localVarQueryParameters,
            headers: localVarHeaderParams,
            uri: localVarPath,
            useQuerystring: this._useQuerystring,
            json: true,
            body: models_1.ObjectSerializer.serialize(trackingOption, "TrackingOption")
        };
        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));
        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    localVarRequestOptions.formData = localVarFormParams;
                }
                else {
                    localVarRequestOptions.form = localVarFormParams;
                }
            }
            return new Promise((resolve, reject) => {
                localVarRequest(localVarRequestOptions, (error, response, body) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        body = models_1.ObjectSerializer.deserialize(body, "TrackingOptions");
                        if (response.statusCode && response.statusCode >= 200 && response.statusCode <= 299) {
                            resolve({ response: response, body: body });
                        }
                        else {
                            reject({ response: response, body: body });
                        }
                    }
                });
            });
        });
    }
}
exports.AccountingApi = AccountingApi;
//# sourceMappingURL=accountingApi.js.map