"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    static getAttributeTypeMap() {
        return Employee.attributeTypeMap;
    }
}
exports.Employee = Employee;
Employee.discriminator = undefined;
Employee.attributeTypeMap = [
    {
        "name": "employeeID",
        "baseName": "EmployeeID",
        "type": "string"
    },
    {
        "name": "status",
        "baseName": "Status",
        "type": "Employee.StatusEnum"
    },
    {
        "name": "firstName",
        "baseName": "FirstName",
        "type": "string"
    },
    {
        "name": "lastName",
        "baseName": "LastName",
        "type": "string"
    },
    {
        "name": "externalLink",
        "baseName": "ExternalLink",
        "type": "ExternalLink"
    },
    {
        "name": "updatedDateUTC",
        "baseName": "UpdatedDateUTC",
        "type": "Date"
    }
];
(function (Employee) {
    let StatusEnum;
    (function (StatusEnum) {
        StatusEnum[StatusEnum["ACTIVE"] = 'ACTIVE'] = "ACTIVE";
        StatusEnum[StatusEnum["ARCHIVED"] = 'ARCHIVED'] = "ARCHIVED";
        StatusEnum[StatusEnum["GDPRREQUEST"] = 'GDPRREQUEST'] = "GDPRREQUEST";
    })(StatusEnum = Employee.StatusEnum || (Employee.StatusEnum = {}));
})(Employee = exports.Employee || (exports.Employee = {}));
//# sourceMappingURL=employee.js.map