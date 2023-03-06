import proxy from 'express-http-proxy';
import { Express, NextFunction } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RequestOptions } from 'http';

const setup = (app: Express) => {

  const apiUrl = 'http://tiltaksgjennomforing-api:8080';

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
}

export default { setup, setupFakeLoginProvider };
