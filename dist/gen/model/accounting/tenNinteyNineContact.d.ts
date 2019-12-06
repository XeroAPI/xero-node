export declare class TenNinteyNineContact {
    'box1'?: number;
    'box2'?: number;
    'box3'?: number;
    'box4'?: number;
    'box5'?: number;
    'box6'?: number;
    'box7'?: number;
    'box8'?: number;
    'box9'?: number;
    'box10'?: number;
    'box11'?: number;
    'box13'?: number;
    'box14'?: number;
    'name'?: string;
    'federalTaxIDType'?: string;
    'city'?: string;
    'zip'?: string;
    'state'?: string;
    'email'?: string;
    'streetAddress'?: string;
    'taxID'?: string;
    'contactId'?: string;
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
