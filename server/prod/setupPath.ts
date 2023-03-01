import { getMiljø, Miljø } from '../common/miljø';
import pathVariables, { PathVariables } from '../common/pathVariables';
import { Express } from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

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

function setupPath(app: Express): void {
    sjekkAtLoginPropsErDefinert();

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

function sjekkAtLoginPropsErDefinert() {
    if (!props.LOGOUT_URL || !props.LOGIN_URL) {
        console.error('Må sette en variabel for innlogging og en for utlogging: LOGOUT_URL, LOGIN_URL.');
        process.exit(1);
    }
}

export default setupPath;
