export * from '././createUsageRecord';
export * from '././plan';
export * from '././price';
export * from '././problemDetails';
export * from '././product';
export * from '././subscription';
export * from '././subscriptionItem';
export * from '././updateUsageRecord';
export * from '././usageRecord';
export * from '././usageRecordsList';
import { AxiosRequestConfig } from 'axios';
import { CreateUsageRecord } from '././createUsageRecord';
import { Plan } from '././plan';
import { Price } from '././price';
import { ProblemDetails } from '././problemDetails';
import { Product } from '././product';
import { Subscription } from '././subscription';
import { SubscriptionItem } from '././subscriptionItem';
import { UpdateUsageRecord } from '././updateUsageRecord';
import { UsageRecord } from '././usageRecord';
import { UsageRecordsList } from '././usageRecordsList';

import * as fs from 'fs';
import { Readable } from "stream";

export interface RequestDetailedFile {
    value: Buffer;
    options?: {
        filename?: string;
        contentType?: string;
    }
}

export type RequestFile = string | Buffer | fs.ReadStream | RequestDetailedFile | Readable;

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
        "Plan.StatusEnum": Plan.StatusEnum,
        "Product.TypeEnum": Product.TypeEnum,
        "Subscription.StatusEnum": Subscription.StatusEnum,
        "SubscriptionItem.StatusEnum": SubscriptionItem.StatusEnum,
}

let typeMap: {[index: string]: any} = {
    "CreateUsageRecord": CreateUsageRecord,
    "Plan": Plan,
    "Price": Price,
    "ProblemDetails": ProblemDetails,
    "Product": Product,
    "Subscription": Subscription,
    "SubscriptionItem": SubscriptionItem,
    "UpdateUsageRecord": UpdateUsageRecord,
    "UsageRecord": UsageRecord,
    "UsageRecordsList": UsageRecordsList,
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
    applyToRequest(requestOptions: AxiosRequestConfig): Promise<void> | void;
}

export class HttpBasicAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(requestOptions: AxiosRequestConfig): void {
        requestOptions.auth = {
            username: this.username, password: this.password
        }
    }
}

export class ApiKeyAuth implements Authentication {
    public apiKey: string = '';

    constructor(private location: string, private paramName: string) {
    }

    applyToRequest(requestOptions: AxiosRequestConfig): void {
        if (this.location == "query") {
            (<any>requestOptions.params)[this.paramName] = this.apiKey;
        } else if (this.location == "header" && requestOptions && requestOptions.headers) {
            requestOptions.headers[this.paramName] = this.apiKey;
        }
    }
}

export class OAuth implements Authentication {
    public accessToken: string = '';

    applyToRequest(requestOptions: AxiosRequestConfig): void {
        if (requestOptions && requestOptions.headers) {
            requestOptions.headers["Authorization"] = "Bearer " + this.accessToken;
        }
    }
}

export class VoidAuth implements Authentication {
    public username: string = '';
    public password: string = '';

    applyToRequest(_): void {
        // Do nothing
    }
}
