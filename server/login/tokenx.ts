import { BaseClient, ClientAuthMethod, Issuer } from 'openid-client';

interface TokenxConfig {
    discoveryUrl: string;
    clientID: string;
    privateJwk: string;
    tokenEndpointAuthMethod: ClientAuthMethod;
}

const client = async (): Promise<BaseClient> => {
    const tokenxConfig: TokenxConfig = {
        discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL as string,
        clientID: process.env.TOKEN_X_CLIENT_ID as string,
        privateJwk: process.env.TOKEN_X_PRIVATE_JWK as string,
        tokenEndpointAuthMethod: 'private_key_jwt',
    };

    const issuer: Issuer<BaseClient> = await Issuer.discover(tokenxConfig.discoveryUrl);
    const jwk = JSON.parse(tokenxConfig.privateJwk);

    console.log(`Discovered issuer ${issuer.issuer}`);

    return new issuer.Client(
        {
            client_id: tokenxConfig.clientID as string,
            token_endpoint_auth_method: tokenxConfig.tokenEndpointAuthMethod,
        },
        { keys: [jwk] }
    );
};

const getTokenExchangeAccessToken = async (tokenxClient: any, audience: any, req: any) => {
    const now: number = Math.floor(Date.now() / 1000);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: now,
        },
    };
    const bearerToken = req.headers['authorization'].replace('Bearer', '').trim();
    const backendTokenSet = await tokenxClient.grant(
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience: audience,
            subject_token: bearerToken,
        },
        additionalClaims
    );

    return backendTokenSet.access_token;
};
export default { client, getTokenExchangeAccessToken };
