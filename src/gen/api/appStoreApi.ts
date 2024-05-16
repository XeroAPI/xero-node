/**
 * Xero AppStore API
 * These endpoints are for Xero Partners to interact with the App Store Billing platform
 *
 * The version of the OpenAPI document: 3.0.3
 * Contact: api@xero.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import http = require('http');
import fs = require('fs');

/* tslint:disable:no-unused-locals */
import { CreateUsageRecord } from '../model/appstore/createUsageRecord';
import { ProblemDetails } from '../model/appstore/problemDetails';
import { Subscription } from '../model/appstore/subscription';
import { UpdateUsageRecord } from '../model/appstore/updateUsageRecord';
import { UsageRecord } from '../model/appstore/usageRecord';
import { UsageRecordsList } from '../model/appstore/usageRecordsList';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/appstore/models';
import { ApiError } from '../../model/ApiError';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Readable } from "stream";
import { OAuth } from '../model/appstore/models';

let defaultBasePath = 'https://api.xero.com/appstore/2.0';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum AppStoreApiApiKeys {
}

export class AppStoreApi {
    protected _basePath = defaultBasePath;
    protected defaultHeaders : any = {'user-agent': 'xero-node-6.0.0'};
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

    public setApiKey(key: AppStoreApiApiKeys, value: string) {
        (this.authentications as any)[AppStoreApiApiKeys[key]].apiKey = value;
    }

    set accessToken(token: string) {
        this.authentications.OAuth2.accessToken = token;
    }

    /**
     * 
     * @summary Retrieves a subscription for a given subscriptionId
     * @param subscriptionId Unique identifier for Subscription object
     */     
    public async getSubscription (subscriptionId: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Subscription;  }> {
        const localVarPath = this.basePath + '/subscriptions/{subscriptionId}'
            .replace('{' + 'subscriptionId' + '}', encodeURIComponent(String(subscriptionId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'subscriptionId' is not null or undefined
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling getSubscription.');
        }

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
            return new Promise<{ response: AxiosResponse; body: Subscription;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Subscription");
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
     * @summary Gets all usage records related to the subscription
     * @param subscriptionId Unique identifier for Subscription object
     */     
    public async getUsageRecords (subscriptionId: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: UsageRecordsList;  }> {
        const localVarPath = this.basePath + '/subscriptions/{subscriptionId}/usage-records'
            .replace('{' + 'subscriptionId' + '}', encodeURIComponent(String(subscriptionId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'subscriptionId' is not null or undefined
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling getUsageRecords.');
        }

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
            return new Promise<{ response: AxiosResponse; body: UsageRecordsList;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "UsageRecordsList");
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
     * @summary Send metered usage belonging to this subscription and subscription item
     * @param subscriptionId Unique identifier for Subscription object
     * @param subscriptionItemId The unique identifier of the subscriptionItem
     * @param createUsageRecord Contains the quantity for the usage record to create
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async postUsageRecords (subscriptionId: string, subscriptionItemId: string, createUsageRecord: CreateUsageRecord, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: UsageRecord;  }> {
        const localVarPath = this.basePath + '/subscriptions/{subscriptionId}/items/{subscriptionItemId}/usage-records'
            .replace('{' + 'subscriptionId' + '}', encodeURIComponent(String(subscriptionId)))
            .replace('{' + 'subscriptionItemId' + '}', encodeURIComponent(String(subscriptionItemId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'subscriptionId' is not null or undefined
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling postUsageRecords.');
        }

        // verify required parameter 'subscriptionItemId' is not null or undefined
        if (subscriptionItemId === null || subscriptionItemId === undefined) {
            throw new Error('Required parameter subscriptionItemId was null or undefined when calling postUsageRecords.');
        }

        // verify required parameter 'createUsageRecord' is not null or undefined
        if (createUsageRecord === null || createUsageRecord === undefined) {
            throw new Error('Required parameter createUsageRecord was null or undefined when calling postUsageRecords.');
        }

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
            data: ObjectSerializer.serialize(createUsageRecord, "CreateUsageRecord"),
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
            return new Promise<{ response: AxiosResponse; body: UsageRecord;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "UsageRecord");
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
     * @summary Update and existing metered usage belonging to this subscription and subscription item
     * @param subscriptionId Unique identifier for Subscription object
     * @param subscriptionItemId The unique identifier of the subscriptionItem
     * @param usageRecordId The unique identifier of the usage record
     * @param updateUsageRecord Contains the quantity for the usage record to update
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async putUsageRecords (subscriptionId: string, subscriptionItemId: string, usageRecordId: string, updateUsageRecord: UpdateUsageRecord, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: UsageRecord;  }> {
        const localVarPath = this.basePath + '/subscriptions/{subscriptionId}/items/{subscriptionItemId}/usage-records/{usageRecordId}'
            .replace('{' + 'subscriptionId' + '}', encodeURIComponent(String(subscriptionId)))
            .replace('{' + 'subscriptionItemId' + '}', encodeURIComponent(String(subscriptionItemId)))
            .replace('{' + 'usageRecordId' + '}', encodeURIComponent(String(usageRecordId)));
        let localVarQueryParameters: any = {};
        let localVarHeaderParams: any = (<any>Object).assign({}, this.defaultHeaders);
        let localVarFormParams: any = {};
        let acceptHeadersFromSpec = [
                "application/json"
            ];
        const isBufferType = acceptHeadersFromSpec.includes("application/pdf")|| acceptHeadersFromSpec.includes("application/octet-stream") || acceptHeadersFromSpec.includes("application/jpg");
		const responseTypeOption = isBufferType ? "arraybuffer" : "json";

        // verify required parameter 'subscriptionId' is not null or undefined
        if (subscriptionId === null || subscriptionId === undefined) {
            throw new Error('Required parameter subscriptionId was null or undefined when calling putUsageRecords.');
        }

        // verify required parameter 'subscriptionItemId' is not null or undefined
        if (subscriptionItemId === null || subscriptionItemId === undefined) {
            throw new Error('Required parameter subscriptionItemId was null or undefined when calling putUsageRecords.');
        }

        // verify required parameter 'usageRecordId' is not null or undefined
        if (usageRecordId === null || usageRecordId === undefined) {
            throw new Error('Required parameter usageRecordId was null or undefined when calling putUsageRecords.');
        }

        // verify required parameter 'updateUsageRecord' is not null or undefined
        if (updateUsageRecord === null || updateUsageRecord === undefined) {
            throw new Error('Required parameter updateUsageRecord was null or undefined when calling putUsageRecords.');
        }

        localVarHeaderParams['Idempotency-Key'] = ObjectSerializer.serialize(idempotencyKey, "string");
        localVarHeaderParams['Accept'] = acceptHeadersFromSpec.join();
        (<any>Object).assign(localVarHeaderParams, options.headers);
        let localVarUseFormData = false;

        let localVarRequestOptions: AxiosRequestConfig = {
            method: 'PUT',
            params: localVarQueryParameters,
            headers: localVarHeaderParams,
            url: localVarPath,
            responseType: responseTypeOption,
            data: ObjectSerializer.serialize(updateUsageRecord, "UpdateUsageRecord"),
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
            return new Promise<{ response: AxiosResponse; body: UsageRecord;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "UsageRecord");
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
