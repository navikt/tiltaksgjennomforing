import axios from 'axios';
import { createProxyMiddleware } from 'http-proxy-middleware';
const onbehalfof = require('./azure');
const asyncHandler = require('express-async-handler');

const setup = (app, azureClient, azureTokenEndpoint) => {
    app.use(
        '/modiacontextholder/api/decorator',
        asyncHandler(async (req, res) => {
            const accessToken = await onbehalfof.getOnBehalfOfAccessToken(azureClient, azureTokenEndpoint, req);
            return await axios.get(`${process.env.DECORATOR_INTERNAL}/modiacontextholder/api/decorator`, {
                headers: { ...req.headers, Authorization: `Bearer ${accessToken}` },
            });
        })
    );
    app.use(
        '/internarbeidsflatedecorator',
        createProxyMiddleware({ target: process.env.DECORATOR_INTERNAL, changeOrigin: true })
    );
};
export default { setup };
