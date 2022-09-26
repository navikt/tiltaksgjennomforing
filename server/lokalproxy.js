const proxy = require('express-http-proxy');

const setup = (app) => {
    console.log('Lokal proxy-setup');
    app.use('/tiltaksgjennomforing/api', (req, res, next) => {
        console.log('Labs og localhost-proxy /tiltaksgjennomforing/api');
        if(req.headers.cookie) {
            let cookies = req.headers.cookie.split(';');
            let cookieWithFakeToken = cookies.filter((c) => {
                return c.includes("fake")
            })
            if (cookieWithFakeToken.length === 0) {
                res.status(401).send();
            } else {
                next();
            }
        } else {
            res.status(401).send();
        }
    })

    app.use(
        '/tiltaksgjennomforing/api',
        proxy('http://localhost:8080', {
            proxyReqPathResolver: (req) => {
                return req.originalUrl.replace(
                    '/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api'
                );
            },
            proxyReqOptDecorator: (options, req) => {
                let cookies = req.headers.cookie.split(';');
                let cookieWithFakeToken = cookies.filter((c) => {
                    return c.includes("fake")
                })
                const accessToken = cookieWithFakeToken[0].split('=')[1]
                options.headers.Authorization = `Bearer ${accessToken}`;
                return options;
            },
        })
    );
};

module.exports = { setup };
