"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Schedule {
    static getAttributeTypeMap() {
        return Schedule.attributeTypeMap;
    }
}
exports.Schedule = Schedule;
Schedule.discriminator = undefined;
Schedule.attributeTypeMap = [
    {
        "name": "period",
        "baseName": "Period",
        "type": "number"
    },
    {
        "name": "unit",
        "baseName": "Unit",
        "type": "Schedule.UnitEnum"
    },
    {
        "name": "dueDate",
        "baseName": "DueDate",
        "type": "number"
    },
    {
        "name": "dueDateType",
        "baseName": "DueDateType",
        "type": "Schedule.DueDateTypeEnum"
    },
    {
        "name": "startDate",
        "baseName": "StartDate",
        "type": "string"
    },
    {
        "name": "nextScheduledDate",
        "baseName": "NextScheduledDate",
        "type": "string"
    },
    {
        "name": "endDate",
        "baseName": "EndDate",
        "type": "string"
    }
];
(function (Schedule) {
    let UnitEnum;
    (function (UnitEnum) {
        UnitEnum[UnitEnum["WEEKLY"] = 'WEEKLY'] = "WEEKLY";
        UnitEnum[UnitEnum["MONTHLY"] = 'MONTHLY'] = "MONTHLY";
    })(UnitEnum = Schedule.UnitEnum || (Schedule.UnitEnum = {}));
    let DueDateTypeEnum;
    (function (DueDateTypeEnum) {
        DueDateTypeEnum[DueDateTypeEnum["DAYSAFTERBILLDATE"] = 'DAYSAFTERBILLDATE'] = "DAYSAFTERBILLDATE";
        DueDateTypeEnum[DueDateTypeEnum["DAYSAFTERBILLMONTH"] = 'DAYSAFTERBILLMONTH'] = "DAYSAFTERBILLMONTH";
        DueDateTypeEnum[DueDateTypeEnum["OFCURRENTMONTH"] = 'OFCURRENTMONTH'] = "OFCURRENTMONTH";
        DueDateTypeEnum[DueDateTypeEnum["OFFOLLOWINGMONTH"] = 'OFFOLLOWINGMONTH'] = "OFFOLLOWINGMONTH";
    })(DueDateTypeEnum = Schedule.DueDateTypeEnum || (Schedule.DueDateTypeEnum = {}));
})(Schedule = exports.Schedule || (exports.Schedule = {}));
//# sourceMappingURL=schedule.js.map