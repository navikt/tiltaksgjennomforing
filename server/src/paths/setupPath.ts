import { Express } from 'express';

import { ENABLE_EXTERNAL_MENU, ENABLE_INTERNAL_MENU, INTERN_INGRESS, IS_LABS, LOGOUT_URL } from '../config';
import {
    PathVariables,
    innloggingskilderEksternBrukerFlate,
    innloggingskilderInternBrukerFlate,
    labsInnloggingskilder,
} from './pathVariables';

export const BASEPATH: string = '/tiltaksgjennomforing';
export const STATIC_PATHS: string[] = ['/assets', '/favicon.ico', '/manifest.json'];

export function initializePath(app: Express): void {
    app.get('/tiltaksgjennomforing/internal/isAlive', (_, res) => {
        res.sendStatus(200);
    });

    app.get('/tiltaksgjennomforing/internal/isReady', (_, res) => {
        res.sendStatus(200);
    });

    app.get('/tiltaksgjennomforing/innloggingskilder', (_, res) => {
        const innloggingskilder: PathVariables[] = [];

        if (IS_LABS) {
            innloggingskilder.push(...labsInnloggingskilder);
            res.json(innloggingskilder);
            return;
        }

        if (INTERN_INGRESS) {
            innloggingskilder.push(...innloggingskilderInternBrukerFlate);
            res.json(innloggingskilder);
            return;
        }

        innloggingskilder.push(...innloggingskilderEksternBrukerFlate);
        res.json(innloggingskilder);
    });

    app.get('/tiltaksgjennomforing/logout', (_, res) => {
        res.redirect(LOGOUT_URL as string);
    });

    app.get('/tiltaksgjennomforing/skal-backupmeny-brukes', (_, res) => {
        res.json(!ENABLE_EXTERNAL_MENU && !ENABLE_INTERNAL_MENU);
    });

    app.get('/tiltaksgjennomforing/brukavInternflate', (_, res) => {
        res.json(ENABLE_INTERNAL_MENU);
    });
}
