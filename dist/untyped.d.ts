/// <reference types="node" />
declare module 'openid-client' {
    import * as http from 'http';
    import * as https from 'https';
    import * as http2 from 'http2';
    import * as tls from 'tls';
    namespace JWKS {
        class KeyStore {
        }
    }
    type JSONWebKeySet = any;
    type RetryFunction = (retry: number, error: Error) => number;
    interface HttpRequestOptions extends tls.SecureContextOptions {
        url?: string;
        headers?: {
            [key: string]: unknown;
        };
        query?: {
            [key: string]: unknown;
        };
        body?: {
            [key: string]: unknown;
        };
        form?: boolean;
        json?: boolean;
        timeout?: number | {
            lookup?: number;
            connect?: number;
            secureConnect?: number;
            socket?: number;
            response?: number;
            send?: number;
            request?: number;
        };
        retry?: number | {
            retries?: number | RetryFunction;
            methods?: Array<'GET' | 'POST' | 'PUT' | 'HEAD' | 'DELETE' | 'OPTIONS' | 'TRACE'>;
            statusCodes?: Array<408 | 413 | 429 | 500 | 502 | 503 | 504>;
            maxRetryAfter?: number;
            errorCodes?: string[];
        };
        followRedirect?: boolean;
        throwHttpErrors?: boolean;
        agent?: http.Agent | https.Agent | boolean | {
            http: http.Agent;
            https: https.Agent;
        };
        [key: string]: unknown;
    }
    type CustomHttpOptionsProvider = (options: HttpRequestOptions) => HttpRequestOptions;
    type TokenTypeHint = 'access_token' | 'refresh_token' | string;
    const custom: {
        setHttpOptionsDefaults(params: HttpRequestOptions): void;
        readonly http_options: unique symbol;
        readonly clock_tolerance: unique symbol;
    };
    type ResponseType = 'code' | 'id_token' | 'code id_token' | 'code token' | 'code id_token token' | 'none';
    type ClientAuthMethod = 'client_secret_basic' | 'client_secret_post' | 'client_secret_jwt' | 'private_key_jwt' | 'tls_client_auth' | 'self_signed_tls_client_auth' | 'none';
    interface ClientMetadata {
        client_id: string;
        id_token_signed_response_alg?: string;
        token_endpoint_auth_method?: ClientAuthMethod;
        client_secret?: string;
        redirect_uris?: string[];
        response_types?: ResponseType[];
        post_logout_redirect_uris?: string[];
        default_max_age?: number;
        require_auth_time?: boolean;
        tls_client_certificate_bound_access_tokens?: boolean;
        request_object_signing_alg?: string;
        id_token_encrypted_response_alg?: string;
        id_token_encrypted_response_enc?: string;
        introspection_endpoint_auth_method?: ClientAuthMethod;
        introspection_endpoint_auth_signing_alg?: string;
        request_object_encryption_alg?: string;
        request_object_encryption_enc?: string;
        revocation_endpoint_auth_method?: ClientAuthMethod;
        revocation_endpoint_auth_signing_alg?: string;
        token_endpoint_auth_signing_alg?: string;
        userinfo_encrypted_response_alg?: string;
        userinfo_encrypted_response_enc?: string;
        userinfo_signed_response_alg?: string;
        [key: string]: unknown;
    }
    interface ClaimsParameterMember {
        essential?: boolean;
        value?: string;
        values?: string[];
        [key: string]: unknown;
    }
    interface AuthorizationParameters {
        acr_values?: string;
        audience?: string;
        claims?: string | {
            id_token?: {
                [key: string]: null | ClaimsParameterMember;
            };
            userinfo?: {
                [key: string]: null | ClaimsParameterMember;
            };
        };
        claims_locales?: string;
        client_id?: string;
        code_challenge_method?: string;
        code_challenge?: string;
        display?: string;
        id_token_hint?: string;
        login_hint?: string;
        max_age?: string;
        nonce?: string;
        prompt?: string;
        redirect_uri?: string;
        registration?: string;
        request_uri?: string;
        request?: string;
        resource?: string | string[];
        response_mode?: string;
        response_type?: string;
        scope?: string;
        ui_locales?: string;
        [key: string]: unknown;
    }
    interface EndSessionParameters {
        id_token_hint?: TokenSet | string;
        post_logout_redirect_uri?: string;
        state?: string;
        [key: string]: unknown;
    }
    interface CallbackParamsType {
        access_token?: string;
        code?: string;
        error?: string;
        error_description?: string;
        error_uri?: string;
        expires_in?: string;
        id_token?: string;
        state?: string;
        token_type?: string;
        session_state?: string;
        [key: string]: unknown;
    }
    interface OAuthCallbackChecks {
        response_type?: string;
        state?: string;
        code_verifier?: string;
    }
    interface OpenIDCallbackChecks extends OAuthCallbackChecks {
        max_age?: number;
        nonce?: string;
    }
    interface CallbackExtras {
        exchangeBody?: object;
        clientAssertionPayload?: object;
    }
    interface RefreshExtras {
        exchangeBody?: object;
        clientAssertionPayload?: object;
    }
    interface GrantBody {
        grant_type: string;
        [key: string]: unknown;
    }
    interface GrantExtras {
        clientAssertionPayload?: object;
    }
    interface IntrospectExtras {
        introspectBody?: object;
        clientAssertionPayload?: object;
    }
    interface RevokeExtras {
        revokeBody?: object;
        clientAssertionPayload?: object;
    }
    interface RequestObjectPayload extends AuthorizationParameters {
        client_id?: string;
        iss?: string;
        aud?: string;
        iat?: number;
        exp?: number;
        jti?: string;
        [key: string]: unknown;
    }
    interface RegisterOther {
        jwks?: JSONWebKeySet;
        initialAccessToken?: string;
    }
    interface DeviceAuthorizationParameters {
        client_id?: string;
        scope?: string;
        [key: string]: unknown;
    }
    interface DeviceAuthorizationExtras {
        exchangeBody?: object;
        clientAssertionPayload?: object;
    }
    interface UserinfoResponse {
        sub: string;
        name?: string;
        given_name?: string;
        family_name?: string;
        middle_name?: string;
        nickname?: string;
        preferred_username?: string;
        profile?: string;
        picture?: string;
        website?: string;
        email?: string;
        email_verified?: boolean;
        gender?: string;
        birthdate?: string;
        zoneinfo?: string;
        locale?: string;
        phone_number?: string;
        updated_at?: number;
        address?: {
            formatted?: string;
            street_address?: string;
            locality?: string;
            region?: string;
            postal_code?: string;
            country?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    }
    interface IntrospectionResponse {
        active: boolean;
        client_id?: string;
        exp?: number;
        iat?: number;
        sid?: string;
        iss?: string;
        jti?: string;
        username?: string;
        aud?: string | string[];
        scope: string;
        token_type?: string;
        cnf?: {
            'x5t#S256'?: string;
            [key: string]: unknown;
        };
        [key: string]: unknown;
    }
    class Client {
        constructor(metadata: ClientMetadata, jwks?: JSONWebKeySet);
        [custom.http_options]: CustomHttpOptionsProvider;
        [custom.clock_tolerance]: number;
        metadata: ClientMetadata;
        authorizationUrl(parameters?: AuthorizationParameters): string;
        endSessionUrl(parameters?: EndSessionParameters): string;
        callbackParams(input: string | http.IncomingMessage | http2.Http2ServerRequest): CallbackParamsType;
        callback(redirectUri: string | undefined, parameters: CallbackParamsType, checks?: OpenIDCallbackChecks, extras?: CallbackExtras): Promise<TokenSet>;
        oauthCallback(redirectUri: string | undefined, parameters: CallbackParamsType, checks?: OAuthCallbackChecks, extras?: CallbackExtras): Promise<TokenSet>;
        refresh(refreshToken: TokenSet | string, extras?: RefreshExtras): Promise<TokenSet>;
        userinfo(accessToken: TokenSet | string): Promise<UserinfoResponse>;
        grant(body: GrantBody, extras?: GrantExtras): Promise<TokenSet>;
        introspect(token: string, tokenTypeHint?: TokenTypeHint, extras?: IntrospectExtras): Promise<IntrospectionResponse>;
        revoke(token: string, tokenTypeHint?: TokenTypeHint, extras?: RevokeExtras): Promise<void>;
        requestObject(payload: RequestObjectPayload): Promise<string>;
        deviceAuthorization(parameters?: DeviceAuthorizationParameters, extras?: DeviceAuthorizationExtras): Promise<DeviceFlowHandle<Client>>;
        static register(metadata: object, other?: RegisterOther): Promise<Client>;
        static fromUri(registrationClientUri: string, registrationAccessToken: string, jwks?: JSONWebKeySet): Promise<Client>;
        static [custom.http_options]: CustomHttpOptionsProvider;
        [key: string]: unknown;
    }
    class DeviceFlowHandle<TClient extends Client> {
        poll(): Promise<TokenSet>;
        expired(): boolean;
        expires_at: number;
        client: TClient;
        user_code: string;
        device_code: string;
        verification_uri: string;
        verification_uri_complete: string;
        expires_in: number;
    }
    interface IssuerMetadata {
        issuer: string;
        authorization_endpoint?: string;
        token_endpoint?: string;
        jwks_uri?: string;
        userinfo_endpoint?: string;
        revocation_endpoint?: string;
        end_session_endpoint?: string;
        registration_endpoint?: string;
        token_endpoint_auth_methods_supported?: string[];
        token_endpoint_auth_signing_alg_values_supported?: string[];
        introspection_endpoint_auth_methods_supported?: string[];
        introspection_endpoint_auth_signing_alg_values_supported?: string[];
        revocation_endpoint_auth_methods_supported?: string[];
        revocation_endpoint_auth_signing_alg_values_supported?: string[];
        request_object_signing_alg_values_supported?: string[];
        mtls_endpoint_aliases?: MtlsEndpointAliases;
        [key: string]: unknown;
    }
    interface MtlsEndpointAliases {
        token_endpoint?: string;
        userinfo_endpoint?: string;
        revocation_endpoint?: string;
        introspection_endpoint?: string;
        device_authorization_endpoint?: string;
    }
    interface TypeOfGenericClient<TClient extends Client> {
        new (metadata: ClientMetadata, jwks?: JSONWebKeySet): TClient;
        [custom.http_options]: CustomHttpOptionsProvider;
        [custom.clock_tolerance]: number;
    }
    class Issuer<TClient extends Client> {
        constructor(metadata: IssuerMetadata);
        Client: TypeOfGenericClient<TClient>;
        metadata: IssuerMetadata;
        [custom.http_options]: CustomHttpOptionsProvider;
        keystore(forceReload?: boolean): Promise<JWKS.KeyStore>;
        static discover(issuer: string): Promise<Issuer<Client>>;
        static webfinger(input: string): Promise<Issuer<Client>>;
        static [custom.http_options]: CustomHttpOptionsProvider;
        [key: string]: unknown;
    }
    interface TokenSetParameters {
        access_token?: string;
        token_type?: string;
        id_token?: string;
        refresh_token?: string;
        scope?: string;
        expires_at?: number;
        session_state?: string;
        [key: string]: unknown;
    }
    interface IdTokenClaims extends UserinfoResponse {
        acr?: string;
        amr?: string[];
        at_hash?: string;
        aud: string | string[];
        auth_time?: number;
        azp?: string;
        c_hash?: string;
        exp: number;
        iat: number;
        iss: string;
        nonce?: string;
        s_hash?: string;
        sub: string;
        [key: string]: unknown;
    }
    class TokenSet implements TokenSetParameters {
        access_token?: string;
        token_type?: string;
        id_token?: string;
        refresh_token?: string;
        expires_in?: number;
        expires_at?: number;
        session_state?: string;
        scope?: string;
        constructor(input?: TokenSetParameters);
        expired(): boolean;
        claims(): IdTokenClaims;
        [key: string]: unknown;
    }
    type StrategyVerifyCallbackUserInfo<TUser> = (tokenset: TokenSet, userinfo: UserinfoResponse, done: (err: any, user?: TUser) => void) => void;
    type StrategyVerifyCallback<TUser> = (tokenset: TokenSet, done: (err: any, user?: TUser) => void) => void;
    type StrategyVerifyCallbackReqUserInfo<TUser> = (req: http.IncomingMessage, tokenset: TokenSet, userinfo: UserinfoResponse, done: (err: any, user?: TUser) => void) => void;
    type StrategyVerifyCallbackReq<TUser> = (req: http.IncomingMessage, tokenset: TokenSet, done: (err: any, user?: TUser) => void) => void;
    interface StrategyOptions<TClient extends Client> {
        client: TClient;
        params?: AuthorizationParameters;
        passReqToCallback?: boolean;
        usePKCE?: boolean | string;
        sessionKey?: string;
    }
    class Strategy<TUser, TClient extends Client> {
        constructor(options: StrategyOptions<TClient>, verify: StrategyVerifyCallback<TUser> | StrategyVerifyCallbackUserInfo<TUser> | StrategyVerifyCallbackReq<TUser> | StrategyVerifyCallbackReqUserInfo<TUser>);
        authenticate(req: any, options?: any): void;
        success(user: any, info?: any): void;
        fail(challenge: any, status: number): void;
        fail(status: number): void;
        redirect(url: string, status?: number): void;
        pass(): void;
        error(err: Error): void;
    }
    namespace generators {
        function random(bytes?: number): string;
        function state(bytes?: number): string;
        function nonce(bytes?: number): string;
        function codeVerifier(bytes?: number): string;
        function codeChallenge(verifier: string): string;
    }
    namespace errors {
        class OPError extends Error {
            error_description?: string;
            error?: string;
            error_uri?: string;
            state?: string;
            scope?: string;
            session_state?: string;
            response?: any;
        }
        class RPError extends Error {
            jwt?: string;
            checks?: object;
            params?: object;
            body?: object;
            response?: any;
        }
    }
}
declare module 'prompt';
