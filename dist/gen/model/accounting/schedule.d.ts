export declare class Schedule {
    'period'?: number;
    'unit'?: Schedule.UnitEnum;
    'dueDate'?: number;
    'dueDateType'?: Schedule.DueDateTypeEnum;
    'startDate'?: string;
    'nextScheduledDate'?: string;
    'endDate'?: string;
    static discriminator: string | undefined;
    static attributeTypeMap: Array<{
        name: string;
        baseName: string;
        type: string;
    }>;
    static getAttributeTypeMap(): {
        name: string;
        baseName: string;
        type: string;
    }[];
}
export declare namespace Schedule {
    enum UnitEnum {
        WEEKLY,
        MONTHLY
    }
    enum DueDateTypeEnum {
        DAYSAFTERBILLDATE,
        DAYSAFTERBILLMONTH,
        OFCURRENTMONTH,
        OFFOLLOWINGMONTH
    }
}
