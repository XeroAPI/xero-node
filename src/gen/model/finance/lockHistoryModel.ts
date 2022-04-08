
export class LockHistoryModel {
    /**
    * Date the account hard lock was set
    */
    'hardLockDate'?: string;
    /**
    * Date the account soft lock was set
    */
    'softLockDate'?: string;
    /**
    * The system date time that the lock was updated
    */
    'updatedDateUtc'?: Date;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "hardLockDate",
            "baseName": "hardLockDate",
            "type": "string"
        }        {
            "name": "softLockDate",
            "baseName": "softLockDate",
            "type": "string"
        }        {
            "name": "updatedDateUtc",
            "baseName": "updatedDateUtc",
            "type": "Date"
        }    ];

    static getAttributeTypeMap() {
        return LockHistoryModel.attributeTypeMap;
    }
}

