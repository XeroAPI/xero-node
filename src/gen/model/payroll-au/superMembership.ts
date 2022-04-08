
export class SuperMembership {
    /**
    * Xero unique identifier for Super membership
    */
    'superMembershipID'?: string;
    /**
    * Xero identifier for super fund
    */
    'superFundID': string;
    /**
    * The membership number assigned to the employee by the super fund.
    */
    'employeeNumber': string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "superMembershipID",
            "baseName": "SuperMembershipID",
            "type": "string"
        }        {
            "name": "superFundID",
            "baseName": "SuperFundID",
            "type": "string"
        }        {
            "name": "employeeNumber",
            "baseName": "EmployeeNumber",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return SuperMembership.attributeTypeMap;
    }
}

