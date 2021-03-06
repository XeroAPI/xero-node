import { SuperFundType } from '././superFundType';
import { ValidationError } from '././validationError';

export class SuperFund {
    /**
    * Xero identifier for a super fund
    */
    'superFundID'?: string;
    'type': SuperFundType;
    /**
    * Name of the super fund
    */
    'name'?: string;
    /**
    * ABN of the self managed super fund
    */
    'aBN'?: string;
    /**
    * BSB of the self managed super fund
    */
    'bSB'?: string;
    /**
    * The account number for the self managed super fund.
    */
    'accountNumber'?: string;
    /**
    * The account name for the self managed super fund.
    */
    'accountName'?: string;
    /**
    * The electronic service address for the self managed super fund.
    */
    'electronicServiceAddress'?: string;
    /**
    * Some funds assign a unique number to each employer
    */
    'employerNumber'?: string;
    /**
    * The SPIN of the Regulated SuperFund. This field has been deprecated. It will only be present for legacy superfunds. New superfunds will not have a SPIN value. The USI field should be used instead of SPIN.
    */
    'sPIN'?: string;
    /**
    * The USI of the Regulated SuperFund
    */
    'uSI'?: string;
    /**
    * Last modified timestamp
    */
    'updatedDateUTC'?: Date;
    /**
    * Displays array of validation error messages from the API
    */
    'validationErrors'?: Array<ValidationError>;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "superFundID",
            "baseName": "SuperFundID",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "Type",
            "type": "SuperFundType"
        },
        {
            "name": "name",
            "baseName": "Name",
            "type": "string"
        },
        {
            "name": "aBN",
            "baseName": "ABN",
            "type": "string"
        },
        {
            "name": "bSB",
            "baseName": "BSB",
            "type": "string"
        },
        {
            "name": "accountNumber",
            "baseName": "AccountNumber",
            "type": "string"
        },
        {
            "name": "accountName",
            "baseName": "AccountName",
            "type": "string"
        },
        {
            "name": "electronicServiceAddress",
            "baseName": "ElectronicServiceAddress",
            "type": "string"
        },
        {
            "name": "employerNumber",
            "baseName": "EmployerNumber",
            "type": "string"
        },
        {
            "name": "sPIN",
            "baseName": "SPIN",
            "type": "string"
        },
        {
            "name": "uSI",
            "baseName": "USI",
            "type": "string"
        },
        {
            "name": "updatedDateUTC",
            "baseName": "UpdatedDateUTC",
            "type": "Date"
        },
        {
            "name": "validationErrors",
            "baseName": "ValidationErrors",
            "type": "Array<ValidationError>"
        }    ];

    static getAttributeTypeMap() {
        return SuperFund.attributeTypeMap;
    }
}

