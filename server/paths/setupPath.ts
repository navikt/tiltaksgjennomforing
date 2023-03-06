import { getMiljø, Miljø } from './miljø';
import pathVariables, { PathVariables } from './pathVariables';
import express, { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import path from "path";

const miljo: Miljø = getMiljø();

export interface EnvProps {
    APIGW_URL: string | undefined;
    APIGW_HEADER: string | undefined;
    LOGIN_URL: string | undefined;
    LOGOUT_URL: string | undefined;
    STILLINGSTITLER_URL: string | undefined;
}

const props: EnvProps = {
    APIGW_URL: process.env.APIGW_URL,
    APIGW_HEADER: process.env.APIGW_HEADER,
    LOGIN_URL: process.env.LOGIN_URL,
    LOGOUT_URL: process.env.LOGOUT_URL,
    STILLINGSTITLER_URL: process.env.STILLINGSTITLER_URL,
};

const BASEPATH: string = '/tiltaksgjennomforing';
const STATIC_PATHS: string[] = ['/static', '/index.css', '/asset-manifest.json'];

function setupPath(app: Express): void {

    setStaticPath(app);

    app.get(
      '/tiltaksgjennomforing/internal/isAlive',
      (
        req: Request<{}, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>, number>
      ): Response<any, Record<string, any>, number> => res.sendStatus(200)
    );

    app.get(
      '/tiltaksgjennomforing/internal/isReady',
      (
        req: Request<{}, any, any, ParsedQs, Record<string, any>>,
        res: Response<any, Record<string, any>, number>
      ): Response<any, Record<string, any>, number> => res.sendStatus(200)
    );

    app.get(
        '/tiltaksgjennomforing/innloggingskilder',
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ) => {
            const innloggingskilder: PathVariables[] = [];

            if (miljo === Miljø.LABS) {
                innloggingskilder.push(...pathVariables.lokalOgLabsInnloggingskilder);
            } else {
                if (!process.env.INTERN_INGRESS) {
                    innloggingskilder.push(...pathVariables.getInnloggingskilderEksternBrukerFlate(props));
                }
                if (process.env.INTERN_INGRESS) {
                    innloggingskilder.push(...pathVariables.getInnloggingskilderInternBrukerFlate(props));
                }
            }
            res.json(innloggingskilder);
        }
    );

    app.get(
        '/tiltaksgjennomforing/logout',
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ): void => {
            res.redirect(props.LOGOUT_URL ?? '');
        }
    );

    app.get(
        '/tiltaksgjennomforing/skal-backupmeny-brukes',
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ): void => {
            res.json(process.env.ENABLE_EXTERNAL_MENU !== 'true' && process.env.ENABLE_INTERNAL_MENU !== 'true');
        }
    );

    app.get(
        '/tiltaksgjennomforing/brukavInternflate',
        (
            req: Request<{}, any, any, ParsedQs, Record<string, any>>,
            res: Response<any, Record<string, any>, number>
        ): void => {
            res.json(process.env.ENABLE_INTERNAL_MENU === 'true');
        }
    );
}

function setStaticPath(app: Express): void {
    STATIC_PATHS.forEach((staticpath: string): Express => {
        return app.use(BASEPATH.concat(staticpath), express.static(path.join(__dirname, 'build'.concat(staticpath))));
    });
}

export default setupPath;
