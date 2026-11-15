
/**
* An error. Served as `application/problem+json` when it describes the request as a whole. The `error` of an item result is an `ItemError`, which has the same fields except `status`. 
*/
export class Problem {
    /**
    * Identifies the error.
    */
    'type'?: Problem.TypeEnum;
    /**
    * Present only on a partial failure (a `partial-failure-*` `type`). Names the exact cause within the `type`. Reading it is optional: the `type` alone fixes the recovery action and which identifier fields are present, so branch on `type` and use `subtype` for diagnostics. 
    */
    'subtype'?: Problem.SubtypeEnum;
    /**
    * A short human-readable summary of the error.
    */
    'title'?: string;
    /**
    * The HTTP status this error corresponds to. It is the status of the response. An item result does not repeat it in its `error`: read the item\'s `statusCode` instead. 
    */
    'status'?: number;
    /**
    * A human-readable explanation specific to this occurrence.
    */
    'detail'?: string;
    /**
    * Present only on a partial failure. The Xero Bank Account the item concerns. On `partial-failure-new-account-creation`, the account that was created: connect it through `POST /FeedConnections/ExistingAccount`. On `partial-failure-previous-connection-deletion` and `partial-failure-connection-creation`, the account being connected. Absent on `partial-failure-connection-deletion` and `partial-failure-new-account-existence-not-confirmed`, where the account may not exist. 
    */
    'accountId'?: string;
    /**
    * Present only on a partial failure of type `partial-failure-new-account-creation` or `partial-failure-new-account-existence-not-confirmed`. The name of the account that was created, which is now taken; on `partial-failure-new-account-existence-not-confirmed`, the name of the account that may have been created. 
    */
    'accountName'?: string;
    /**
    * Present only on a partial failure. On `partial-failure-previous-connection-deletion`, the previous connection on the account (removed, or being removed). On `partial-failure-connection-creation`, the connection this request created or was creating: the id it was given before the create (the Feed Connection `id` if it was recorded). When the subtype is `connection-existence-not-confirmed`, the create\'s outcome is unknown and the connection may not exist in Xero. On `partial-failure-connection-deletion`, the connection being deleted (the item `id` also echoes it). Absent on `partial-failure-new-account-creation` and `partial-failure-new-account-existence-not-confirmed`. 
    */
    'connectionId'?: string;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "type",
            "baseName": "type",
            "type": "Problem.TypeEnum"
        },
        {
            "name": "subtype",
            "baseName": "subtype",
            "type": "Problem.SubtypeEnum"
        },
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
            "name": "accountId",
            "baseName": "accountId",
            "type": "string"
        },
        {
            "name": "accountName",
            "baseName": "accountName",
            "type": "string"
        },
        {
            "name": "connectionId",
            "baseName": "connectionId",
            "type": "string"
        }    ];

    static getAttributeTypeMap() {
        return Problem.attributeTypeMap;
    }
}

export namespace Problem {
    export enum TypeEnum {
        InvalidRequest = <any> 'invalid-request',
        InvalidApplication = <any> 'invalid-application',
        SuspendedOrTerminatedApplication = <any> 'suspended-or-terminated-application',
        InvalidOrganisationBankFeeds = <any> 'invalid-organisation-bank-feeds',
        InvalidOrganisationMultiCurrency = <any> 'invalid-organisation-multi-currency',
        InvalidFeedConnectionForOrganisation = <any> 'invalid-feed-connection-for-organisation',
        InvalidUserRole = <any> 'invalid-user-role',
        InvalidAccountToken = <any> 'invalid-account-token',
        MissingIdentifyingFields = <any> 'missing-identifying-fields',
        InvalidCountrySpecified = <any> 'invalid-country-specified',
        AccountNotValid = <any> 'account-not-valid',
        FeedAlreadyConnectedInCurrentOrganisation = <any> 'feed-already-connected-in-current-organisation',
        AccountNameAlreadyExists = <any> 'account-name-already-exists',
        BankFeedNotFound = <any> 'bank-feed-not-found',
        FeedNotFoundOrAlreadyDeleted = <any> 'feed-not-found-or-already-deleted',
        PartialFailureNewAccountCreation = <any> 'partial-failure-new-account-creation',
        PartialFailurePreviousConnectionDeletion = <any> 'partial-failure-previous-connection-deletion',
        PartialFailureConnectionCreation = <any> 'partial-failure-connection-creation',
        PartialFailureConnectionDeletion = <any> 'partial-failure-connection-deletion',
        PartialFailureNewAccountExistenceNotConfirmed = <any> 'partial-failure-new-account-existence-not-confirmed',
        TooManyRequests = <any> 'too-many-requests',
        InternalError = <any> 'internal-error'
    }
    export enum SubtypeEnum {
        ConnectionPhaseFailed = <any> 'connection-phase-failed',
        DeletionPhaseFailed = <any> 'deletion-phase-failed',
        DeletionPhaseNotConfirmed = <any> 'deletion-phase-not-confirmed',
        ConnectionExistenceNotConfirmed = <any> 'connection-existence-not-confirmed',
        ConnectionExistsWithoutFeedConnection = <any> 'connection-exists-without-feed-connection',
        FeedConnectionExistenceNotConfirmedCanCheckOrRetry = <any> 'feed-connection-existence-not-confirmed-can-check-or-retry',
        CheckAccountsOrPromptUserRetry = <any> 'check-accounts-or-prompt-user-retry'
    }
}
