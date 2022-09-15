const {Issuer} = require('openid-client');

const client = async () => {
    const azureConfig = {
        discoveryUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        clientID: process.env.AZURE_APP_CLIENT_ID,
        privateJwk: process.env.AZURE_APP_JWKS,
        tokenEndpointAuthMethod: 'private_key_jwt',
        tokenEndpointAuthSigningAlg: 'RS256',
        redirectUri: process.env.AAD_REDIRECT_URL
    };

    const issuer = await Issuer.discover(azureConfig.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    const jwk = JSON.parse(azureConfig.privateJwk);
    return new issuer.Client(
        {
            client_id: azureConfig.clientID,
            token_endpoint_auth_method: azureConfig.tokenEndpointAuthMethod,
            token_endpoint_auth_signing_alg: azureConfig.tokenEndpointAuthSigningAlg,
            redirect_uris: [azureAdConfig.redirectUri]
            
        },
        { keys: [jwk] }
    );
};

const azureTokenEndpoint = async () => {
    const azureConfig = {
        discoveryUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
        clientID: process.env.AZURE_APP_CLIENT_ID,
        privateJwk: process.env.AZURE_APP_JWKS,
        tokenEndpointAuthMethod: 'private_key_jwt',
    };

    const issuer = await Issuer.discover(azureConfig.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    const azureTokenEndpoint = issuer.token_endpoint;
    return azureTokenEndpoint;
}

const getOnBehalfOfAccessToken = async (azureClient, azureTokenEndpoint, req) => {
    console.log('Henter ny on-behalf-of token');
    const bearerToken = req.headers['authorization'].replace('Bearer', '').trim();
    const backendTokenSet = await azureClient
        .grant(
            {
                grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                requested_token_use: 'on_behalf_of',
                scope: process.env.API_SCOPE,
                assertion: bearerToken,
            },
            {
                clientAssertionPayload: {
                    aud: [azureTokenEndpoint],
                },
            }
        )
    return backendTokenSet.access_token;
};

module.exports = { azureTokenEndpoint, client, getOnBehalfOfAccessToken };
