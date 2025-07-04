/**
 * Xero Assets API
 * The Assets API exposes fixed asset related functions of the Xero Accounting application and can be used for a variety of purposes such as creating assets, retrieving asset valuations etc.
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
import { Asset } from '../model/assets/asset';
import { AssetStatusQueryParam } from '../model/assets/assetStatusQueryParam';
import { AssetType } from '../model/assets/assetType';
import { Assets } from '../model/assets/assets';
import { Setting } from '../model/assets/setting';

import { ObjectSerializer, Authentication, VoidAuth } from '../model/assets/models';
import { ApiError } from '../../model/ApiError';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Readable } from "stream";
import { OAuth } from '../model/assets/models';

let defaultBasePath = 'https://api.xero.com/assets.xro/1.0';

// ===============================================
// This file is autogenerated - Please do not edit
// ===============================================

export enum AssetApiApiKeys {
}

export class AssetApi {
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

    public setApiKey(key: AssetApiApiKeys, value: string) {
        (this.authentications as any)[AssetApiApiKeys[key]].apiKey = value;
    }

    set accessToken(token: string) {
        this.authentications.OAuth2.accessToken = token;
    }

    /**
     * Adds an asset to the system
     * @summary adds a fixed asset
     * @param xeroTenantId Xero identifier for Tenant
     * @param asset Fixed asset you are creating
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async createAsset (xeroTenantId: string, asset: Asset, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Asset;  }> {
        const localVarPath = this.basePath + '/Assets';
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
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createAsset.');
        }

        // verify required parameter 'asset' is not null or undefined
        if (asset === null || asset === undefined) {
            throw new Error('Required parameter asset was null or undefined when calling createAsset.');
        }

        localVarHeaderParams['xero-tenant-id'] = ObjectSerializer.serialize(xeroTenantId, "string");
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
            data: ObjectSerializer.serialize(asset, "Asset"),
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
            return new Promise<{ response: AxiosResponse; body: Asset;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Asset");
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
     * Adds an fixed asset type to the system
     * @summary adds a fixed asset type
     * @param xeroTenantId Xero identifier for Tenant
     * @param assetType Asset type to add
     * @param idempotencyKey This allows you to safely retry requests without the risk of duplicate processing. 128 character max.
     */     
    public async createAssetType (xeroTenantId: string, assetType: AssetType, idempotencyKey?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: AssetType;  }> {
        const localVarPath = this.basePath + '/AssetTypes';
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
            throw new Error('Required parameter xeroTenantId was null or undefined when calling createAssetType.');
        }

        // verify required parameter 'assetType' is not null or undefined
        if (assetType === null || assetType === undefined) {
            throw new Error('Required parameter assetType was null or undefined when calling createAssetType.');
        }

        localVarHeaderParams['xero-tenant-id'] = ObjectSerializer.serialize(xeroTenantId, "string");
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
            data: ObjectSerializer.serialize(assetType, "AssetType"),
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
            return new Promise<{ response: AxiosResponse; body: AssetType;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "AssetType");
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
     * By passing in the appropriate asset id, you can search for a specific fixed asset in the system 
     * @summary Retrieves fixed asset by id
     * @param xeroTenantId Xero identifier for Tenant
     * @param id fixed asset id for single object
     */     
    public async getAssetById (xeroTenantId: string, id: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Asset;  }> {
        const localVarPath = this.basePath + '/Assets/{id}'
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
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAssetById.');
        }

        // verify required parameter 'id' is not null or undefined
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getAssetById.');
        }

        localVarHeaderParams['xero-tenant-id'] = ObjectSerializer.serialize(xeroTenantId, "string");
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
            return new Promise<{ response: AxiosResponse; body: Asset;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Asset");
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
     * By passing in the appropriate options, you can search for available fixed asset types in the system
     * @summary searches fixed asset settings
     * @param xeroTenantId Xero identifier for Tenant
     */     
    public async getAssetSettings (xeroTenantId: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Setting;  }> {
        const localVarPath = this.basePath + '/Settings';
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
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAssetSettings.');
        }

        localVarHeaderParams['xero-tenant-id'] = ObjectSerializer.serialize(xeroTenantId, "string");
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
            return new Promise<{ response: AxiosResponse; body: Setting;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Setting");
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
     * By passing in the appropriate options, you can search for available fixed asset types in the system
     * @summary searches fixed asset types
     * @param xeroTenantId Xero identifier for Tenant
     */     
    public async getAssetTypes (xeroTenantId: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Array<AssetType>;  }> {
        const localVarPath = this.basePath + '/AssetTypes';
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
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAssetTypes.');
        }

        localVarHeaderParams['xero-tenant-id'] = ObjectSerializer.serialize(xeroTenantId, "string");
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
            return new Promise<{ response: AxiosResponse; body: Array<AssetType>;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Array<AssetType>");
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
     * By passing in the appropriate options, you can search for available fixed asset in the system
     * @summary searches fixed asset
     * @param xeroTenantId Xero identifier for Tenant
     * @param status Required when retrieving a collection of assets. See Asset Status Codes
     * @param page Results are paged. This specifies which page of the results to return. The default page is 1.
     * @param pageSize The number of records returned per page. By default the number of records returned is 10.
     * @param orderBy Requests can be ordered by AssetType, AssetName, AssetNumber, PurchaseDate and PurchasePrice. If the asset status is DISPOSED it also allows DisposalDate and DisposalPrice.
     * @param sortDirection ASC or DESC
     * @param filterBy A string that can be used to filter the list to only return assets containing the text. Checks it against the AssetName, AssetNumber, Description and AssetTypeName fields.
     */     
    public async getAssets (xeroTenantId: string, status: AssetStatusQueryParam, page?: number, pageSize?: number, orderBy?: 'AssetType' | 'AssetName' | 'AssetNumber' | 'PurchaseDate' | 'PurchasePrice' | 'DisposalDate' | 'DisposalPrice', sortDirection?: 'asc' | 'desc', filterBy?: string, options: {headers: {[name: string]: string}} = {headers: {}}) : Promise<{ response: AxiosResponse; body: Assets;  }> {
        const localVarPath = this.basePath + '/Assets';
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
            throw new Error('Required parameter xeroTenantId was null or undefined when calling getAssets.');
        }

        // verify required parameter 'status' is not null or undefined
        if (status === null || status === undefined) {
            throw new Error('Required parameter status was null or undefined when calling getAssets.');
        }

        if (status !== undefined) {
            localVarQueryParameters['status'] = ObjectSerializer.serialize(status, "AssetStatusQueryParam");
        }

        if (page !== undefined) {
            localVarQueryParameters['page'] = ObjectSerializer.serialize(page, "number");
        }

        if (pageSize !== undefined) {
            localVarQueryParameters['pageSize'] = ObjectSerializer.serialize(pageSize, "number");
        }

        if (orderBy !== undefined) {
            localVarQueryParameters['orderBy'] = ObjectSerializer.serialize(orderBy, "'AssetType' | 'AssetName' | 'AssetNumber' | 'PurchaseDate' | 'PurchasePrice' | 'DisposalDate' | 'DisposalPrice'");
        }

        if (sortDirection !== undefined) {
            localVarQueryParameters['sortDirection'] = ObjectSerializer.serialize(sortDirection, "'asc' | 'desc'");
        }

        if (filterBy !== undefined) {
            localVarQueryParameters['filterBy'] = ObjectSerializer.serialize(filterBy, "string");
        }

        localVarHeaderParams['xero-tenant-id'] = ObjectSerializer.serialize(xeroTenantId, "string");
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
            return new Promise<{ response: AxiosResponse; body: Assets;  }>(async (resolve, reject) => {
            let body = null
            try {
                const response = await axios(localVarRequestOptions)
                         body = ObjectSerializer.deserialize(response.data, "Assets");
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
