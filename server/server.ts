'use strict';

import { Request, Response } from 'express-serve-static-core';
import path from 'path';
import express, { Express } from 'express';
import helmet from 'helmet';
import { ParsedQs } from 'qs';
import appMedNavDekoratoren from './dekorator/appMedNavDekoratoren';
import appMedModiaDekoratoren from './dekorator/appMedModiaDekoratoren';
import loginProvider from "./login/loginProvider";
import setupPath from "./paths/setupPath";

const server: Express = express();

// security
server.disable('x-powered-by');
server.use(helmet());


async function startServer(): Promise<void> {
    setupPath(server)
    await loginProvider.setupOauth2Clients(server);

    if(process.env.ENABLE_EXTERNAL_MENU) {
        await startMedNavDekoratoren();
    } else if (process.env.ENABLE_INTERNAL_MENU) {
        await startMedModiaDekoratoren();
    }

    const port = process.env.PORT || 3000;
    server.listen(port, () => console.log('server listening on port', port));
}

async function startMedNavDekoratoren(): Promise<void> {
    server.get(
        ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            res.send(appMedNavDekoratoren.getNavdekoratoren(path.resolve(__dirname, 'build', 'index.html')));
        }
    );
    await startServer();
}

async function startMedModiaDekoratoren(): Promise<void> {
    server.get(
      ['/tiltaksgjennomforing/', '/tiltaksgjennomforing/*'],
      (
        req: Request<{}, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>, number>
      ) => {
          res.send(appMedModiaDekoratoren.getModiaDekoratoren());
      }
    );
}

startServer()
  .then(() => console.log('server started successfully'))
  .catch(err => console.error("server failed to start, with error: ", err));

