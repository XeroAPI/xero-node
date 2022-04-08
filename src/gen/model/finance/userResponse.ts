import { HistoryRecordResponse } from '././historyRecordResponse';
import { PracticeResponse } from '././practiceResponse';

export class UserResponse {
    /**
    * The Xero identifier for the user
    */
    'userId'?: string;
    /**
    * Timestamp of user creation.
    */
    'userCreatedDateUtc'?: Date;
    /**
    * Timestamp of user last login
    */
    'lastLoginDateUtc'?: Date;
    /**
    * User is external partner.
    */
    'isExternalPartner'?: boolean;
    /**
    * User has Accountant role.
    */
    'hasAccountantRole'?: boolean;
    /**
    * Month period in format  yyyy-MM.
    */
    'monthPeriod'?: string;
    /**
    * Number of times the user has logged in.
    */
    'numberOfLogins'?: number;
    /**
    * Number of documents created.
    */
    'numberOfDocumentsCreated'?: number;
    /**
    * Net value of documents created.
    */
    'netValueDocumentsCreated'?: number;
    /**
    * Absolute value of documents created.
    */
    'absoluteValueDocumentsCreated'?: number;
    'attachedPractices'?: Array<PracticeResponse>;
    'historyRecords'?: Array<HistoryRecordResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "userId",
            "baseName": "userId",
            "type": "string"
        }        {
            "name": "userCreatedDateUtc",
            "baseName": "userCreatedDateUtc",
            "type": "Date"
        }        {
            "name": "lastLoginDateUtc",
            "baseName": "lastLoginDateUtc",
            "type": "Date"
        }        {
            "name": "isExternalPartner",
            "baseName": "isExternalPartner",
            "type": "boolean"
        }        {
            "name": "hasAccountantRole",
            "baseName": "hasAccountantRole",
            "type": "boolean"
        }        {
            "name": "monthPeriod",
            "baseName": "monthPeriod",
            "type": "string"
        }        {
            "name": "numberOfLogins",
            "baseName": "numberOfLogins",
            "type": "number"
        }        {
            "name": "numberOfDocumentsCreated",
            "baseName": "numberOfDocumentsCreated",
            "type": "number"
        }        {
            "name": "netValueDocumentsCreated",
            "baseName": "netValueDocumentsCreated",
            "type": "number"
        }        {
            "name": "absoluteValueDocumentsCreated",
            "baseName": "absoluteValueDocumentsCreated",
            "type": "number"
        }        {
            "name": "attachedPractices",
            "baseName": "attachedPractices",
            "type": "Array<PracticeResponse>"
        }        {
            "name": "historyRecords",
            "baseName": "historyRecords",
            "type": "Array<HistoryRecordResponse>"
        }    ];

    static getAttributeTypeMap() {
        return UserResponse.attributeTypeMap;
    }
}

