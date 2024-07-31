
export class WorkingWeek {
    /**
    * The number of hours worked on a Monday
    */
    'monday': number;
    /**
    * The number of hours worked on a Tuesday
    */
    'tuesday': number;
    /**
    * The number of hours worked on a Wednesday
    */
    'wednesday': number;
    /**
    * The number of hours worked on a Thursday
    */
    'thursday': number;
    /**
    * The number of hours worked on a Friday
    */
    'friday': number;
    /**
    * The number of hours worked on a Saturday
    */
    'saturday': number;
    /**
    * The number of hours worked on a Sunday
    */
    'sunday': number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "monday",
            "baseName": "monday",
            "type": "number"
        },
        {
            "name": "tuesday",
            "baseName": "tuesday",
            "type": "number"
        },
        {
            "name": "wednesday",
            "baseName": "wednesday",
            "type": "number"
        },
        {
            "name": "thursday",
            "baseName": "thursday",
            "type": "number"
        },
        {
            "name": "friday",
            "baseName": "friday",
            "type": "number"
        },
        {
            "name": "saturday",
            "baseName": "saturday",
            "type": "number"
        },
        {
            "name": "sunday",
            "baseName": "sunday",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return WorkingWeek.attributeTypeMap;
    }
}

