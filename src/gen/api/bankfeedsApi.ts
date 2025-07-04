/**
 * Xero Bank Feeds API
 * The Bank Feeds API is a closed API that is only available to financial institutions that have an established financial services partnership with Xero. If you\'re an existing financial services partner that wants access, contact your local Partner Manager. If you\'re a financial institution who wants to provide bank feeds to your business customers, contact us to become a financial services partner.
 *
 * The version of the OpenAPI document: 9.0.0
 * Contact: api@xero.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import http = require('http');
import fs = require('fs');

/* tslint:disable:no-unused-locals */
import { FeedConnection } from '../model/bankfeeds/feedConnection';
import { FeedConnections } from '../model/bankfeeds/feedConnections';
import { Statement } from '../model/bankfeeds/statement';
import { Statements } from '../model/bankfeeds/statements';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/bankfeeds/models';
import { ApiError } from '../../model/ApiError';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Readable } from "stream";
import { OAuth } from '../model/bankfeeds/models';

let defaultBasePath = 'https://api.xero.com/bankfeeds.xro/1.0';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum BankFeedsApiApiKeys {
}

export class BankFeedsApi {
    protected _basePath = defaultBasePath;
    protected defaultHeaders : any = {'user-agent': 'xero-node-13.0.0'};
    protected _useQuerystring : boolean = false;
    protected binaryHeaders : any = {};

    protected authentications = {
        'default': <Authentication>new VoidAuth(),
        'OAuth2': new OAuth(),
    }

    constructor(basePath?: string);
    constructor(basePathOrUsername: string, password?: string, basePath?: string) {
        if (password) {
            if (basePath) {
                this.basePath = basePath;
            }
        } else {
            if (basePathOrUsername) {
                this.basePath = basePathOrUsername
            }
        }
    }

    set useQuerystring(value: boolean) {
        this._useQuerystring = value;
    }

    set basePath(basePath: string) {
        this._basePath = basePath;
    }

    get basePath() {
        return this._basePath;
    }

    public setDefaultAuthentication(auth: Authentication) {
        this.authentications.default = auth;
    }

    public setApiKey(key: BankFeedsApiApiKeys, value: string) {
        (this.authentications as any)[BankFeedsApiApiKeys[key]].apiKey = value;
    }

    set accessToken(token: string) {
        this.authentications.OAuth2.accessToken = token;
    }

    /**
     * By passing in the FeedConnections array object in the body, you can create one or more new feed connections
     * @summary Create one or more new feed connection
     * @param xeroTenantId Xero identifier for Tenant
     * @param feedConnections Feed Connection(s) array object in the body
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async createFeedConnections (xeroTenantId: string, feedConnections: FeedConnections, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: FeedConnections;  }> {
        const localVarPath = this.basePath + '/FeedConnections';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createFeedConnections.');
        }

        // verify required parameter 'feedConnections' is not null or undefined
        if (feedConnections === null || feedConnections === undefined) {
            throw new Error('Required parameter feedConnections was null or undefined when calling createFeedConnections.');
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Idempotency-Key'] = ObjectSerializer.serialize(idempotencyKey, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'POST',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: ObjectSerializer.serialize(feedConnections, "FeedConnections"),
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: FeedConnections;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "FeedConnections");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
    /**
     * 
     * @summary Creates one or more new statements
     * @param xeroTenantId Xero identifier for Tenant
     * @param statements Statements array of objects in the body
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async createStatements (xeroTenantId: string, statements: Statements, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Statements;  }> {
        const localVarPath = this.basePath + '/Statements';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json",
                "application/problem+json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createStatements.');
        }

        // verify required parameter 'statements' is not null or undefined
        if (statements === null || statements === undefined) {
            throw new Error('Required parameter statements was null or undefined when calling createStatements.');
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Idempotency-Key'] = ObjectSerializer.serialize(idempotencyKey, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'POST',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: ObjectSerializer.serialize(statements, "Statements"),
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: Statements;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Statements");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
    /**
     * By passing in FeedConnections array object in the body, you can delete a feed connection.
     * @summary Delete an existing feed connection
     * @param xeroTenantId Xero identifier for Tenant
     * @param feedConnections Feed Connections array object in the body
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async deleteFeedConnections (xeroTenantId: string, feedConnections: FeedConnections, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: FeedConnections;  }> {
        const localVarPath = this.basePath + '/FeedConnections/DeleteRequests';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling deleteFeedConnections.');
        }

        // verify required parameter 'feedConnections' is not null or undefined
        if (feedConnections === null || feedConnections === undefined) {
            throw new Error('Required parameter feedConnections was null or undefined when calling deleteFeedConnections.');
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Idempotency-Key'] = ObjectSerializer.serialize(idempotencyKey, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'POST',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: ObjectSerializer.serialize(feedConnections, "FeedConnections"),
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: FeedConnections;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "FeedConnections");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
    /**
     * By passing in a FeedConnection Id options, you can search for matching feed connections
     * @summary Retrieve single feed connection based on a unique id provided
     * @param xeroTenantId Xero identifier for Tenant
     * @param id Unique identifier for retrieving single object
     */     
    public async getFeedConnection (xeroTenantId: string, id: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: FeedConnection;  }> {
        const localVarPath = this.basePath + '/FeedConnections/{id}'
            .replace('{' + 'id' + '}', encodeURIComponent(String(id)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getFeedConnection.');
        }

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getFeedConnection.');
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: {},
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: FeedConnection;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "FeedConnection");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
    /**
     * By passing in the appropriate options, you can search for available feed connections in the system.
     * @summary Searches for feed connections
     * @param xeroTenantId Xero identifier for Tenant
     * @param page Page number which specifies the set of records to retrieve. By default the number of the records per set is 10. Example - https://api.xero.com/bankfeeds.xro/1.0/FeedConnections?page&#x3D;1 to get the second set of the records. When page value is not a number or a negative number, by default, the first set of records is returned.
     * @param pageSize Page size which specifies how many records per page will be returned (default 10). Example - https://api.xero.com/bankfeeds.xro/1.0/FeedConnections?pageSize&#x3D;100 to specify page size of 100.
     */     
    public async getFeedConnections (xeroTenantId: string, page?: number, pageSize?: number, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: FeedConnections;  }> {
        const localVarPath = this.basePath + '/FeedConnections';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getFeedConnections.');
        }

        if (page !== undefined) {
            localVarQueryParameters['page'] = ObjectSerializer.serialize(page, "number");
        }

        if (pageSize !== undefined) {
            localVarQueryParameters['pageSize'] = ObjectSerializer.serialize(pageSize, "number");
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: {},
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: FeedConnections;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "FeedConnections");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
    /**
     * By passing in a statement id, you can search for matching statements
     * @summary Retrieve single statement based on unique id provided
     * @param xeroTenantId Xero identifier for Tenant
     * @param statementId statement id for single object
     */     
    public async getStatement (xeroTenantId: string, statementId: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Statement;  }> {
        const localVarPath = this.basePath + '/Statements/{statementId}'
            .replace('{' + 'statementId' + '}', encodeURIComponent(String(statementId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getStatement.');
        }

        // verify required parameter 'statementId' is not null or undefined
        if (statementId === null || statementId === undefined) {
            throw new Error('Required parameter statementId was null or undefined when calling getStatement.');
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: {},
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: Statement;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Statement");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
    /**
     * By passing in parameters, you can search for matching statements
     * @summary Retrieve all statements
     * @param xeroTenantId Xero identifier for Tenant
     * @param page unique id for single object
     * @param pageSize Page size which specifies how many records per page will be returned (default 10). Example - https://api.xero.com/bankfeeds.xro/1.0/Statements?pageSize&#x3D;100 to specify page size of 100.
     * @param xeroApplicationId 
     * @param xeroUserId 
     */     
    public async getStatements (xeroTenantId: string, page?: number, pageSize?: number, xeroApplicationId?: string, xeroUserId?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Statements;  }> {
        const localVarPath = this.basePath + '/Statements';
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json",
                "application/problem+json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'xeroTenantId' is not null or undefined
        if (xeroTenantId === null || xeroTenantId === undefined) {
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getStatements.');
        }

        if (page !== undefined) {
            localVarQueryParameters['page'] = ObjectSerializer.serialize(page, "number");
        }

        if (pageSize !== undefined) {
            localVarQueryParameters['pageSize'] = ObjectSerializer.serialize(pageSize, "number");
        }

        localVarHeaderParams['Xero-Tenant-Id'] = ObjectSerializer.serialize(xeroTenantId, "string");
        localVarHeaderParams['Xero-Application-Id'] = ObjectSerializer.serialize(xeroApplicationId, "string");
        localVarHeaderParams['Xero-User-Id'] = ObjectSerializer.serialize(xeroUserId, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'GET',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: {},
        };

        let authenticationPromise = Promise.resolve();
        authenticationPromise = authenticationPromise.then(() => this.authentications.OAuth2.applyToRequest(localVarRequestOptions));

        authenticationPromise = authenticationPromise.then(() => this.authentications.default.applyToRequest(localVarRequestOptions));
        return authenticationPromise.then(() => {
            if (Object.keys(localVarFormParams).length) {
                if (localVarUseFormData) {
                    (<any>localVarRequestOptions).data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'Content-Type': 'multipart/form-data' };
                } else {
                    localVarRequestOptions.data = localVarFormParams;
                    localVarRequestOptions.headers = { ...localVarRequestOptions.headers, 'content-type': 'application/x-www-form-urlencoded' };
                }
            }
            return new Promise<{ response: AxiosResponse; body: Statements;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Statements");
                        if (response.status && response.status >= 200 && response.status <= 299) {
                            resolve({ response: response, body: body });
                        } else {
                            reject({ response: response, body: body });
                        }
                }
                catch(error) {
                     const errorResponse = new ApiError(error)
					 reject(JSON.stringify(errorResponse.generateError()))
                }
            });
        });
    }
}
