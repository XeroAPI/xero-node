import { User } from '././user';

export class Users {
    'users'?: Array<User>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "users",
            "baseName": "Users",
            "type": "Array<User>"
        }    ];

    static getAttributeTypeMap() {
        return Users.attributeTypeMap;
    }
}

