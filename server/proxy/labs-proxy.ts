import proxy from 'express-http-proxy';
import { Express, NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RequestOptions } from 'http';
import { createProxyMiddleware } from 'http-proxy-middleware';

const setup = (app: Express) => {

  const apiUrl = 'http://tiltaksgjennomforing-api-labs:8080';

  app.use(
    '/tiltaksgjennomforing/api/kodeverk',
    proxy(apiUrl, {
      proxyReqPathResolver: (req) => {
        return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
      },
    })
  );
  setupFakeLoginProvider(app, apiUrl);
};

function setupFakeLoginProvider(app: Express, apiUrl: string) {
  app.get('/tiltaksgjennomforing/fakelogin/aad', async (req, res) => {
    const navIdent = req.headers['navident'] || 'Z123456';
    const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=aad&aud=fake-aad&NAVident=${navIdent}`;
    const response = await fetch(url);
    const data = await response.text();
    res.cookie('fake-aad-idtoken', data);
    res.redirect('/tiltaksgjennomforing');
  });

  app.get('/tiltaksgjennomforing/fakelogin/tokenx', async (req, res) => {
    const subject = req.headers['fnr'] || '23090170716';
    const url = `https://tiltak-fakelogin.ekstern.dev.nav.no/token?iss=tokenx&aud=fake-tokenx&pid=${subject}&acr=Level4`;
    const response = await fetch(url);
    const data = await response.text();
    res.cookie('fake-tokenx-idtoken', data);
    res.redirect('/tiltaksgjennomforing');
  });

  app.get('/tiltaksgjennomforing/fakelogout', async (req, res) => {
    res.clearCookie('fake-tokenx-idtoken');
    res.clearCookie('fake-aad-idtoken');
    res.redirect('/tiltaksgjennomforing');
  });

  app.use(
    '/tiltaksgjennomforing/api',
    (
      req: Request<{}, any, any, ParsedQs, Record<string, any>>,
      res: Response<any, Record<string, any>, number>,
      next: NextFunction
    ) => {
      if (req.headers.cookie) {
        const cookies = req.headers.cookie.split(';');
        const cookieWithFakeToken = cookies.filter((c) => {
          return c.includes('fake');
        });
        if (cookieWithFakeToken.length === 0) {
          res.status(401).send();
        } else {
          next();
        }
      } else {
        res.status(401).send();
      }
    }
  );

  app.use(
    '/tiltaksgjennomforing/api',
    proxy(apiUrl, {
      proxyReqPathResolver: (req) => {
        return req.originalUrl.replace('/tiltaksgjennomforing/api', '/tiltaksgjennomforing-api');
      },
      proxyReqOptDecorator: (options: RequestOptions, req: Request) => {
        if (req.headers && options.headers) {
          const cookies: string[] | undefined = req.headers.cookie?.split(';');
          const cookieWithFakeToken: string[] | undefined = cookies?.filter((cookie: string) => {
            return cookie.includes('fake');
          });
          if (cookieWithFakeToken) {
            const accessToken = cookieWithFakeToken[0].split('=')[1];
            options.headers.Authorization = `Bearer ${accessToken}`;
          }
        }
        return options;
      },
    })
  );

  app.use(
    '/tiltaksgjennomforing/stillingstitler',
    createProxyMiddleware({
      changeOrigin: true,
      pathRewrite: { '^/tiltaksgjennomforing/stillingstitler': '/' },
      target: process.env.STILLINGSTITLER_URL || 'https://tiltak-stillingstitler.intern.dev.nav.no',
      proxyTimeout: 10000,
    })
  );
}

export default { setup, setupFakeLoginProvider };
