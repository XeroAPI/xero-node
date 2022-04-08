
export class ReimbursementLine {
    /**
    * Xero identifier for payroll reimbursement
    */
    'reimbursementTypeID'?: string;
    /**
    * Reimbursement line description
    */
    'description'?: string;
    /**
    * Reimbursement amount
    */
    'amount'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "reimbursementTypeID",
            "baseName": "reimbursementTypeID",
            "type": "string"
        }        {
            "name": "description",
            "baseName": "description",
            "type": "string"
        }        {
            "name": "amount",
            "baseName": "amount",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return ReimbursementLine.attributeTypeMap;
    }
}

