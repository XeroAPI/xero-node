import { ContractType } from '././contractType';
import { DevelopmentalRoleDetails } from '././developmentalRoleDetails';
import { EmploymentStatus } from '././employmentStatus';

export class Contracts {
    /**
    * The contract start date of the employee. This will be locked once an employee has been paid and cannot be changed (YYYY-MM-DD)
    */
    'startDate': string;
    'employmentStatus': EmploymentStatus;
    'contractType': ContractType;
    /**
    * The public key of the contract. Public key is required if the intention is to edit an existing contract. If no key is supplied a new contract will be created
    */
    'publicKey'?: string;
    /**
    * describes whether the contract is fixed term (required if trying to create Fixed term contract)
    */
    'isFixedTerm'?: boolean;
    /**
    * The fixed term end date of the employee. Not required if isFixedTerm is false or not provided (required if trying to create Fixed term contract)
    */
    'fixedTermEndDate'?: string;
    'developmentalRoleDetails'?: DevelopmentalRoleDetails;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "startDate",
            "baseName": "startDate",
            "type": "string"
        },
        {
            "name": "employmentStatus",
            "baseName": "employmentStatus",
            "type": "EmploymentStatus"
        },
        {
            "name": "contractType",
            "baseName": "contractType",
            "type": "ContractType"
        },
        {
            "name": "publicKey",
            "baseName": "publicKey",
            "type": "string"
        },
        {
            "name": "isFixedTerm",
            "baseName": "isFixedTerm",
            "type": "boolean"
        },
        {
            "name": "fixedTermEndDate",
            "baseName": "fixedTermEndDate",
            "type": "string"
        },
        {
            "name": "developmentalRoleDetails",
            "baseName": "developmentalRoleDetails",
            "type": "DevelopmentalRoleDetails"
        }    ];

    static getAttributeTypeMap() {
        return Contracts.attributeTypeMap;
    }
}

