import { BaseClient, ClientAuthMethod, Issuer } from 'openid-client';

const client = async (): Promise<BaseClient> => {
    const azureConfig = {
        discoveryUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        clientID: process.env.AZURE_APP_CLIENT_ID,
        privateJwk: process.env.AZURE_APP_JWKS,
        tokenEndpointAuthMethod: 'private_key_jwt',
        tokenEndpointAuthSigningAlg: 'RS256',
        redirectUri: process.env.AAD_REDIRECT_URL,
    };

    const issuer: Issuer<BaseClient> = await Issuer.discover(azureConfig.discoveryUrl ?? '');
    console.log(`Discovered issuer ${issuer.issuer}`);
    const jwk = JSON.parse(azureConfig.privateJwk ?? '');
    return new issuer.Client(
        {
            client_id: azureConfig.clientID as string,
            token_endpoint_auth_method: azureConfig.tokenEndpointAuthMethod as ClientAuthMethod | undefined,
            token_endpoint_auth_signing_alg: azureConfig.tokenEndpointAuthSigningAlg,
            redirect_uris: [azureConfig.redirectUri as string],
        },
        jwk
    );
};

const azureTokenEndpoint = async (): Promise<any> => {
    const azureConfig = {
        discoveryUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        clientID: process.env.AZURE_APP_CLIENT_ID,
        privateJwk: process.env.AZURE_APP_JWKS,
        tokenEndpointAuthMethod: 'private_key_jwt',
    };

    const issuer: Issuer<BaseClient> = await Issuer.discover(azureConfig.discoveryUrl ?? '');
    console.log(`Discovered issuer ${issuer.issuer}`);
    return issuer.token_endpoint;
};

const getOnBehalfOfAccessToken = async (azureClient: any, azureEndpointToken: any, req: any) => {
    const bearerToken = req.headers.authorization.replace('Bearer', '').trim();
    const backendTokenSet = await azureClient.grant(
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            requested_token_use: 'on_behalf_of',
            scope: process.env.API_SCOPE,
            assertion: bearerToken,
        },
        {
            clientAssertionPayload: {
                aud: [azureEndpointToken],
            },
        }
    );
    return backendTokenSet.access_token;
};
export default { client, azureTokenEndpoint, getOnBehalfOfAccessToken };
