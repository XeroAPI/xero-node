
export class ReimbursementLine {
    /**
    * Xero reimbursement type identifier
    */
    'reimbursementTypeID'?: string;
    /**
    * Reimbursement type amount
    */
    'amount'?: number;
    /**
    * Reimbursement lines description (max length 50)
    */
    'description'?: string;
    /**
    * Reimbursement expense account. For posted pay run you should be able to see expense account code.
    */
    'expenseAccount'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "reimbursementTypeID",
            "baseName": "ReimbursementTypeID",
            "type": "string"
        },
        {
            "name": "amount",
            "baseName": "Amount",
            "type": "number"
        },
        {
            "name": "description",
            "baseName": "Description",
            "type": "string"
        },
        {
            "name": "expenseAccount",
            "baseName": "ExpenseAccount",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return ReimbursementLine.attributeTypeMap;
    }
}

