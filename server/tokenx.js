const { Issuer } = require('openid-client');

const client = async () => {
    const tokenxConfig = {
        discoveryUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
        clientID: process.env.TOKEN_X_CLIENT_ID,
        privateJwk: process.env.TOKEN_X_PRIVATE_JWK,
        tokenEndpointAuthMethod: 'private_key_jwt',
    };

    const issuer = await Issuer.discover(tokenxConfig.discoveryUrl);
    console.log(`Discovered issuer ${issuer.issuer}`);
    const jwk = JSON.parse(tokenxConfig.privateJwk);
    return new issuer.Client(
        {
            client_id: tokenxConfig.clientID,
            token_endpoint_auth_method: tokenxConfig.tokenEndpointAuthMethod,
        },
        { keys: [jwk] }
    );
};

const getTokenExchangeAccessToken = async (tokenxClient, req) => {
    let backendTokenSet = undefined;

    console.log('Ny access token');
    const now = Math.floor(Date.now() / 1000);
    const additionalClaims = {
        clientAssertionPayload: {
            nbf: now,
        },
    };
    const bearerToken = req.headers.Authorization.replace("Bearer", "").trim();
    backendTokenSet = await tokenxClient.grant(
        {
            grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
            client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
            subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
            audience: process.env.API_AUDIENCE,
            subject_token: bearerToken,
        },
        additionalClaims
    );

    return backendTokenSet.access_token;
};

module.exports = { client, getTokenExchangeAccessToken };
