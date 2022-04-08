import { UserResponse } from '././userResponse';

export class UserActivitiesResponse {
    /**
    * The requested Organisation to which the data pertains
    */
    'organisationId'?: string;
    /**
    * The month of the report
    */
    'dataMonth'?: string;
    'users'?: Array<UserResponse>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "organisationId",
            "baseName": "organisationId",
            "type": "string"
        }        {
            "name": "dataMonth",
            "baseName": "dataMonth",
            "type": "string"
        }        {
            "name": "users",
            "baseName": "users",
            "type": "Array<UserResponse>"
        }    ];

    static getAttributeTypeMap() {
        return UserActivitiesResponse.attributeTypeMap;
    }
}

