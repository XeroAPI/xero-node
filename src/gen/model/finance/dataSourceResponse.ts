
export class DataSourceResponse {
    /**
    * Sum of the amounts of all statement lines where the source of the data was a direct bank feed in to Xero via an API integration.   This could be from a bank or aggregator.   This gives an indication on the certainty of correctness of the data.
    */
    'directBankFeed'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was a file manually uploaded in to Xero.   This gives an indication on the certainty of correctness of the data.
    */
    'fileUpload'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was manually input in to Xero.   This gives an indication on the certainty of correctness of the data.
    */
    'manual'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was a direct bank feed in to Xero via an API integration.   This could be from a bank or aggregator.  This gives an indication on the certainty of correctness of the data.  Only positive transactions are included.
    */
    'directBankFeedPos'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was a file manually uploaded in to Xero.   This gives an indication on the certainty of correctness of the data. Only positive transactions are included.
    */
    'fileUploadPos'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was manually input in to Xero.   This gives an indication on the certainty of correctness of the data. Only positive transactions are included.
    */
    'manualPos'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was a direct bank feed in to Xero via an API integration.   This could be from a bank or aggregator.   This gives an indication on the certainty of correctness of the data.  Only negative transactions are included.
    */
    'directBankFeedNeg'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was a file manually uploaded in to Xero.   This gives an indication on the certainty of correctness of the data.  Only negative transactions are included.
    */
    'fileUploadNeg'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was manually input in to Xero.   This gives an indication on the certainty of correctness of the data.  Only negative transactions are included.
    */
    'manualNeg'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was unknown.   This gives an indication on the certainty of correctness of the data.  Only positive transactions are included.
    */
    'otherPos'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was unknown.   This gives an indication on the certainty of correctness of the data.  Only negative transactions are included.
    */
    'otherNeg'?: number;
    /**
    * Sum of the amounts of all statement lines where the source of the data was unknown.   This gives an indication on the certainty of correctness of the data.
    */
    'other'?: number;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "directBankFeed",
            "baseName": "directBankFeed",
            "type": "number"
        },
        {
            "name": "fileUpload",
            "baseName": "fileUpload",
            "type": "number"
        },
        {
            "name": "manual",
            "baseName": "manual",
            "type": "number"
        },
        {
            "name": "directBankFeedPos",
            "baseName": "directBankFeedPos",
            "type": "number"
        },
        {
            "name": "fileUploadPos",
            "baseName": "fileUploadPos",
            "type": "number"
        },
        {
            "name": "manualPos",
            "baseName": "manualPos",
            "type": "number"
        },
        {
            "name": "directBankFeedNeg",
            "baseName": "directBankFeedNeg",
            "type": "number"
        },
        {
            "name": "fileUploadNeg",
            "baseName": "fileUploadNeg",
            "type": "number"
        },
        {
            "name": "manualNeg",
            "baseName": "manualNeg",
            "type": "number"
        },
        {
            "name": "otherPos",
            "baseName": "otherPos",
            "type": "number"
        },
        {
            "name": "otherNeg",
            "baseName": "otherNeg",
            "type": "number"
        },
        {
            "name": "other",
            "baseName": "other",
            "type": "number"
        }    ];

    static getAttributeTypeMap() {
        return DataSourceResponse.attributeTypeMap;
    }
}

