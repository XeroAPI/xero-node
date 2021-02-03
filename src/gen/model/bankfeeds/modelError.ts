
/**
* On error, the API consumer will receive an HTTP response with a HTTP Status Code of 4xx or 5xx and a Content-Type of application/problem+json.
*/
export class ModelError {
    /**
    * Human readable high level error description.
    */
    'title'?: string;
    /**
    * The numeric HTTP Status Code, e.g. 404
    */
    'status'?: number;
    /**
    * Human readable detailed error description.
    */
    'detail'?: string;
    /**
    * Identifies the type of error.
    */
    'type'?: ModelError.TypeEnum;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "title",
            "baseName": "title",
            "type": "string"
        },
        {
            "name": "status",
            "baseName": "status",
            "type": "number"
        },
        {
            "name": "detail",
            "baseName": "detail",
            "type": "string"
        },
        {
            "name": "type",
            "baseName": "type",
            "type": "ModelError.TypeEnum"
        }    ];

    static getAttributeTypeMap() {
        return ModelError.attributeTypeMap;
    }
}

export namespace ModelError {
    export enum TypeEnum {
        InvalidRequest = <any> 'invalid-request',
        InvalidApplication = <any> 'invalid-application',
        InvalidFeedConnection = <any> 'invalid-feed-connection',
        DuplicateStatement = <any> 'duplicate-statement',
        InvalidEndBalance = <any> 'invalid-end-balance',
        InvalidStartAndEndDate = <any> 'invalid-start-and-end-date',
        InvalidStartDate = <any> 'invalid-start-date',
        InternalError = <any> 'internal-error',
        FeedAlreadyConnectedInCurrentOrganisation = <any> 'feed-already-connected-in-current-organisation',
        InvalidEndDate = <any> 'invalid-end-date',
        StatementNotFound = <any> 'statement-not-found',
        FeedConnectedInDifferentOrganisation = <any> 'feed-connected-in-different-organisation',
        FeedAlreadyConnectedInDifferentOrganisation = <any> 'feed-already-connected-in-different-organisation',
        BankFeedNotFound = <any> 'bank-feed-not-found',
        InvalidCountrySpecified = <any> 'invalid-country-specified',
        InvalidOrganisationBankFeeds = <any> 'invalid-organisation-bank-feeds',
        InvalidOrganisationMultiCurrency = <any> 'invalid-organisation-multi-currency',
        InvalidFeedConnectionForOrganisation = <any> 'invalid-feed-connection-for-organisation',
        InvalidUserRole = <any> 'invalid-user-role',
        AccountNotValid = <any> 'account-not-valid'
    }
}
