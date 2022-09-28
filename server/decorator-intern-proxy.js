const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');

const onbehalfof = require('./azure');
const asyncHandler = require('express-async-handler');

const setup = (app, azureClient, azureTokenEndpoint) => {
    app.use(
        '/modiacontextholder/api/decorator',
        asyncHandler(async (req, res) => {
            const accessToken = await onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);
            const response = await axios.get(`${process.env.DECORATOR_INTERNAL}/modiacontextholder/api/decorator`, {
                headers: { ...req.headers, Authorization: `Bearer ${accessToken}` },
            });
            res.json({ ...response.data });
        })
    );
    app.use(
        '/internarbeidsflatedecorator', (req, res) => {
            res.redirect(process.env.DECORATOR_INTERNAL + req.originalUrl);
        }
    );
};

module.exports = { setup };
